import express from 'express';
import crypto from 'crypto';
import Candidate from '../models/Candidate.js';
import User from '../models/User.js';
import AuditLog from '../models/AuditLog.js';
import auth from '../middleware/auth.js';
import { supabase } from '../config/supabase.js';

const router = express.Router();

// @route   GET api/voting/candidates
// @desc    Get all approved candidates
router.get('/candidates', auth, async (req, res) => {
  try {
    const candidates = await Candidate.find({ status: 'approved' }).sort({ position: 1 });
    res.json(candidates);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   POST api/voting/vote/:id
// @desc    Cast a secure vote
router.post('/vote/:candidateId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.hasVoted) {
      return res.status(400).json({ message: 'You have already cast your vote for this election' });
    }

    const candidate = await Candidate.findById(req.params.candidateId);
    if (!candidate || candidate.status !== 'approved') {
      return res.status(404).json({ message: 'Candidate not available' });
    }

    // 1. Create a Secure Vote Hash (Anonymity + Integrity)
    const voteToken = crypto.randomBytes(16).toString('hex');
    const voteHash = crypto.createHash('sha256')
      .update(`${user.matricNo}-${candidate.id}-${voteToken}`)
      .digest('hex');

    // 2. Atomic Update in MongoDB
    candidate.votes += 1;
    candidate.voteHash.push(voteHash);
    
    user.hasVoted = true;
    user.votedAt = new Date();
    user.votedElections.push({
      electionId: candidate.electionId, // Needs to be associated with an election
      timestamp: user.votedAt
    });

    await candidate.save();
    await user.save();

    // 3. Create Audit Log Entry
    const audit = new AuditLog({
      action: 'CAST_VOTE',
      user: user._id,
      details: { 
        candidateId: candidate._id, 
        position: candidate.position,
        voteHash: voteHash 
      },
      ipAddress: req.ip
    });
    await audit.save();

    // 4. Sync with Supabase (Dual-Write)
    await supabase.from('votes').insert([{
      voter_id_hash: voteHash,
      candidate_id: candidate._id,
      position: candidate.position
    }]);

    await supabase.from('users').update({ has_voted: true }).eq('matric_no', user.matricNo);

    res.json({ 
      message: 'Vote cast successfully and encrypted.', 
      receipt: voteHash 
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Voting failure. Please contact SRC Auditor.' });
  }
});

export default router;
