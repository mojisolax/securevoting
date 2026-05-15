import mongoose from 'mongoose';

const electionSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., "SRC Executive Elections 2026"
  description: String,
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'], 
    default: 'upcoming' 
  },
  positions: [{
    title: { type: String, required: true },
    maxVotes: { type: Number, default: 1 }
  }]
}, { timestamps: true });

const Election = mongoose.model('Election', electionSchema);
export default Election;
