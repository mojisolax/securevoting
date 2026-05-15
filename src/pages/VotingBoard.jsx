import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { CheckCircle2, ShieldAlert, Award, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VotingBoard = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [voted, setVoted] = useState(false);
  const [error, setError] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('President');
  const { user } = useContext(AuthContext);

  const positions = [
    'President', 'Vice President', 'General Secretary', 'Financial Secretary', 
    'PRO', 'Welfare Director', 'Sports Director', 'Hostel Rep', 'Treasurer', 'Academic Director'
  ];

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/voting/candidates', {
        headers: { 'x-auth-token': token }
      });
      setCandidates(res.data);
    } catch (err) {
      setError('Failed to load candidates.');
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (candidateId) => {
    if (!window.confirm('Are you sure you want to cast your vote for this candidate? This action cannot be undone.')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5000/api/voting/vote/${candidateId}`, {}, {
        headers: { 'x-auth-token': token }
      });
      setVoted(true);
    } catch (err) {
      alert(err.response?.data?.message || 'Voting failed.');
    }
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}><Loader2 className="animate-spin" size={48} color="var(--primary)" /></div>;

  if (voted || user?.hasVoted) {
    return (
      <div className="container" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card" style={{ padding: '4rem', maxWidth: '600px', margin: '0 auto' }}>
          <CheckCircle2 size={80} color="var(--accent)" style={{ marginBottom: '1.5rem' }} />
          <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '1rem' }}>Vote Recorded Successfully!</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Thank you for participating in the Caleb University SRC Elections. Your vote has been encrypted and securely added to the ledger.
          </p>
          <button className="btn btn-primary" onClick={() => window.location.href = '/'}>Return to Home</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <header style={{ marginBottom: '3rem', borderBottom: '1px solid var(--border)', paddingBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>SRC Voting Ballot</h1>
        <p style={{ color: 'var(--text-muted)' }}>Select a position to view candidates and cast your vote.</p>
        
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', padding: '1rem 0', scrollbarWidth: 'none' }}>
          {positions.map(pos => (
            <button 
              key={pos}
              onClick={() => setSelectedPosition(pos)}
              className="btn"
              style={{ 
                whiteSpace: 'nowrap',
                background: selectedPosition === pos ? 'var(--primary)' : 'white',
                color: selectedPosition === pos ? 'white' : 'var(--text-main)',
                border: '1px solid var(--border)',
                padding: '0.5rem 1.25rem'
              }}
            >
              {pos}
            </button>
          ))}
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
        <AnimatePresence mode="wait">
          {candidates.filter(c => c.position === selectedPosition).map(candidate => (
            <motion.div 
              key={candidate._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-card"
              style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <div style={{ 
                width: '120px', 
                height: '120px', 
                borderRadius: '60px', 
                overflow: 'hidden', 
                marginBottom: '1.5rem',
                border: '4px solid var(--secondary)',
                background: '#eee'
              }}>
                {candidate.imageUrl ? (
                  <img src={candidate.imageUrl} alt={candidate.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>
                    <User size={64} />
                  </div>
                )}
              </div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>{candidate.name}</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center' }}>
                {candidate.department} | {candidate.faculty || 'CASMAS'}
              </p>
              
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', width: '100%', marginBottom: '2rem', fontSize: '0.85rem' }}>
                <p style={{ fontStyle: 'italic', color: '#475569' }}>"{candidate.manifesto || 'No manifesto provided.'}"</p>
              </div>

              <button 
                className="btn btn-primary" 
                style={{ width: '100%', gap: '0.75rem' }}
                onClick={() => handleVote(candidate._id)}
              >
                Vote for {candidate.name} <Award size={18} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {candidates.filter(c => c.position === selectedPosition).length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
            <ShieldAlert size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <p>No approved candidates for this position yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VotingBoard;
