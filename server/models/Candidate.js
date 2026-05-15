import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true,
    enum: [
      'President', 
      'Vice President', 
      'General Secretary', 
      'Financial Secretary', 
      'PRO', 
      'Welfare Director', 
      'Sports Director',
      'Hostel Rep',
      'Treasurer',
      'Academic Director'
    ]
  },
  department: String,
  faculty: String,
  manifesto: String,
  imageUrl: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  votes: {
    type: Number,
    default: 0
  },
  voteHash: [String] // Hashes of votes for audit
}, { timestamps: true });

const Candidate = mongoose.model('Candidate', candidateSchema);
export default Candidate;
