import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`🚀 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

// Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`📡 Server running on http://localhost:${PORT}`);
  });
});

// Basic Route
app.get('/', (req, res) => {
  res.send('Caleb University Voting System API is running...');
});

// Database Models (Example)
const VoterSchema = new mongoose.Schema({
  matricNo: { type: String, required: true, unique: true },
  fullName: String,
  hasVoted: { type: Boolean, default: false },
  votedAt: Date
});

const Voter = mongoose.model('Voter', VoterSchema);
