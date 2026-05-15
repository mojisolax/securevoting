import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Users, ShieldCheck, FileText, Check, X, RefreshCcw, History } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const token = localStorage.getItem('token');
      const statsRes = await axios.get('http://localhost:5000/api/admin/stats', {
        headers: { 'x-auth-token': token }
      });
      setStats(statsRes.data);
      setCandidates(statsRes.data.candidates);
      
      // We need a route for logs, I'll add a placeholder or fetch if I implement it
      // For now, I'll assume candidates is enough or fetch logs from a new route
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/api/admin/candidates/${id}/approve`, {}, {
        headers: { 'x-auth-token': token }
      });
      fetchAdminData();
    } catch (err) {
      alert('Approval failed');
    }
  };

  if (loading) return <div style={{ padding: '5rem', textAlign: 'center' }}>Loading Admin Portal...</div>;

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>SRC Admin Dashboard</h1>
          <p style={{ color: 'var(--text-muted)' }}>Election Oversight & Management Portal</p>
        </div>
        <button onClick={fetchAdminData} className="btn btn-primary" style={{ gap: '0.5rem' }}>
          <RefreshCcw size={18} /> Refresh Data
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL TURNOUT</p>
              <h2 style={{ fontSize: '2rem', color: 'var(--primary)' }}>{stats?.turnout}</h2>
            </div>
            <BarChart size={32} color="var(--primary)" />
          </div>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL VOTES</p>
              <h2 style={{ fontSize: '2rem', color: 'var(--accent)' }}>{stats?.totalVotes}</h2>
            </div>
            <ShieldCheck size={32} color="var(--accent)" />
          </div>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>ELIGIBLE VOTERS</p>
              <h2 style={{ fontSize: '2rem', color: 'var(--text-main)' }}>{stats?.totalEligible}</h2>
            </div>
            <Users size={32} color="#475569" />
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <section className="glass-card" style={{ padding: '2rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <FileText color="var(--primary)" /> Candidate Management
            </h3>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--border)' }}>
                <th style={{ padding: '1rem' }}>Candidate</th>
                <th style={{ padding: '1rem' }}>Position</th>
                <th style={{ padding: '1rem' }}>Status</th>
                <th style={{ padding: '1rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map(cand => (
                <tr key={cand._id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{cand.name}</td>
                  <td style={{ padding: '1rem' }}>{cand.position}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '20px', 
                      fontSize: '0.75rem', 
                      fontWeight: 700,
                      background: cand.status === 'approved' ? '#dcfce7' : '#fef9c3',
                      color: cand.status === 'approved' ? '#166534' : '#854d0e'
                    }}>
                      {cand.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    {cand.status !== 'approved' && (
                      <button 
                        onClick={() => handleApprove(cand._id)}
                        className="btn" 
                        style={{ background: 'var(--accent)', color: 'white', padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                      >
                        <Check size={14} style={{ marginRight: '0.4rem' }} /> Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <History size={20} color="var(--primary)" /> System Audit Log
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Placeholder for real logs */}
            <div style={{ padding: '0.75rem', borderLeft: '3px solid var(--accent)', background: '#f8fafc' }}>
              <p style={{ fontSize: '0.8rem', fontWeight: 700, margin: 0 }}>VOTE_CASTED</p>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0 }}>Student: 21/0452 | Time: Just now</p>
            </div>
            <div style={{ padding: '0.75rem', borderLeft: '3px solid var(--primary)', background: '#f8fafc' }}>
              <p style={{ fontSize: '0.8rem', fontWeight: 700, margin: 0 }}>ADMIN_LOGIN</p>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0 }}>User: SRC_Chair | Time: 5 mins ago</p>
            </div>
            <div style={{ padding: '0.75rem', borderLeft: '3px solid #64748b', background: '#f8fafc' }}>
              <p style={{ fontSize: '0.8rem', fontWeight: 700, margin: 0 }}>CANDIDATE_REG</p>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0 }}>Name: Oladipo Mosun | Time: 1 hour ago</p>
            </div>
          </div>
          <button className="btn" style={{ width: '100%', marginTop: '2rem', border: '1px solid var(--border)', fontSize: '0.8rem' }}>
            View Full Audit Trail
          </button>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
