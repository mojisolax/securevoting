import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { supabase } from '../config/supabase.js';

const router = express.Router();

// @route   POST api/auth/register
// @desc    Register a student
router.post('/register', async (req, res) => {
  const { matricNo, fullName, email, password, college, department } = req.body;

  try {
    // 1. Check if user already exists in MongoDB
    let user = await User.findOne({ matricNo });
    if (user) {
      return res.status(400).json({ message: 'Student with this matric number already exists.' });
    }

    // 2. Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create User in MongoDB
    user = new User({
      matricNo,
      fullName,
      email,
      password: hashedPassword,
      college,
      department
    });
    await user.save();

    // 4. Sync with Supabase (Dual-Write)
    const { data, error: supabaseError } = await supabase
      .from('users')
      .insert([
        { 
          matric_no: matricNo, 
          full_name: fullName, 
          email: email, 
          has_voted: false,
          college: college,
          department: department
        }
      ]);

    if (supabaseError) {
      console.error('Supabase Sync Error:', supabaseError.message);
      // Optional: If you want registration to fail if Supabase fails, uncomment below
      // throw new Error('Supabase sync failed: ' + supabaseError.message);
    }

    // 5. Generate JWT
    const payload = { userId: user.id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });

    res.status(201).json({ token, user: { id: user.id, fullName, matricNo, role: user.role } });

  } catch (err) {
    console.error('Registration Error:', err.message);
    res.status(500).json({ message: 'Registration failed: ' + err.message });
  }
});

// @route   POST api/auth/login
// @desc    Login student
router.post('/login', async (req, res) => {
  const { matricNo, password } = req.body;

  try {
    const user = await User.findOne({ matricNo });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const payload = { userId: user.id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });

    res.json({ token, user: { id: user.id, fullName: user.fullName, matricNo: user.matricNo } });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
