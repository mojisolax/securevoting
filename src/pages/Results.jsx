import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Loader2, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Results = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPosition, setSelectedPosition] = useState('President');

  const positions = [
    'President', 'Vice President', 'General Secretary', 'Financial Secretary', 
    'PRO', 'Welfare Director', 'Sports Director', 'Hostel Rep', 'Treasurer', 'Academic Director'
  ];

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/voting/candidates', {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setCandidates(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCandidates = candidates.filter(c => c.position === selectedPosition);
  
  const chartData = {
    labels: filteredCandidates.map(c => c.name),
    datasets: [
      {
        label: 'Votes',
        data: filteredCandidates.map(c => c.votes),
        backgroundColor: [
          'rgba(0, 45, 98, 0.8)',
          'rgba(255, 215, 0, 0.8)',
          'rgba(0, 168, 107, 0.8)',
          'rgba(220, 38, 38, 0.8)',
          'rgba(147, 51, 234, 0.8)',
        ],
        borderRadius: 8,
      },
    ],
  };

  if (loading) return <div style={{ padding: '5rem', textAlign: 'center' }}><Loader2 className="animate-spin" /></div>;

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <TrendingUp size={40} /> Election Results
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Real-time transparency for Caleb University SRC Elections</p>
      </header>

      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', padding: '1rem 0', marginBottom: '2rem' }}>
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '2rem' }}>Vote Distribution: {selectedPosition}</h3>
          {filteredCandidates.length > 0 ? (
            <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          ) : (
            <p style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>No data available for this position.</p>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '2rem' }}>Detailed Standings</h3>
          {filteredCandidates.sort((a, b) => b.votes - a.votes).map((cand, idx) => (
            <div key={cand._id} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '1rem', 
              background: idx === 0 ? 'rgba(255, 215, 0, 0.1)' : 'transparent',
              borderRadius: '8px',
              borderBottom: '1px solid var(--border)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontWeight: 800, color: 'var(--primary)', width: '20px' }}>{idx + 1}.</span>
                <div>
                  <p style={{ fontWeight: 700, margin: 0 }}>{cand.name}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>{cand.department}</p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontWeight: 800, margin: 0, color: 'var(--primary)' }}>{cand.votes} Votes</p>
                {idx === 0 && <span style={{ fontSize: '0.6rem', background: 'var(--secondary)', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 700 }}>LEADING</span>}
              </div>
            </div>
          ))}
          {filteredCandidates.length === 0 && <p style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>No candidates found.</p>}
        </motion.div>
      </div>
    </div>
  );
};

export default Results;
