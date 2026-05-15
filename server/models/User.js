import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  matricNo: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'admin', 'auditor', 'candidate'],
    default: 'student'
  },
  department: String,
  faculty: String,
  college: String, // e.g., CASMAS, COPAS, COLENS
  isVerified: {
    type: Boolean,
    default: false
  },
  otp: String,
  otpExpires: Date,
  hasVoted: {
    type: Boolean,
    default: false
  },
  votedElections: [{
    electionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Election' },
    timestamp: Date
  }],
  status: {
    type: String,
    enum: ['active', 'suspended'],
    default: 'active'
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
