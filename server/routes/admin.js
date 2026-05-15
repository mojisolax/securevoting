import express from 'express';
import Election from '../models/Election.js';
import Candidate from '../models/Candidate.js';
import User from '../models/User.js';
import AuditLog from '../models/AuditLog.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Middleware to check if user is admin (SRC)
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. SRC privileges required.' });
  }
  next();
};

// @route   POST api/admin/elections
// @desc    Create a new election
router.post('/elections', [auth, isAdmin], async (req, res) => {
  try {
    const election = new Election(req.body);
    await election.save();

    await new AuditLog({
      action: 'CREATE_ELECTION',
      user: req.user.userId,
      details: { electionId: election._id, title: election.title }
    }).save();

    res.status(201).json(election);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   PATCH api/admin/candidates/:id/approve
// @desc    Approve a candidate
router.patch('/candidates/:id/approve', [auth, isAdmin], async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
    
    await new AuditLog({
      action: 'APPROVE_CANDIDATE',
      user: req.user.userId,
      details: { candidateId: candidate._id, name: candidate.name }
    }).save();

    res.json(candidate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET api/admin/stats
// @desc    Get voting statistics (Voter turnout etc)
router.get('/stats', [auth, isAdmin], async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'student' });
    const votedUsers = await User.countDocuments({ hasVoted: true });
    const candidates = await Candidate.find().sort({ votes: -1 });

    res.json({
      turnout: ((votedUsers / totalUsers) * 100).toFixed(2) + '%',
      totalVotes: votedUsers,
      totalEligible: totalUsers,
      candidates
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
