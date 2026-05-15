import React from 'react';
import { Vote, User, LogOut } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="glass-card" style={{ 
      margin: '1rem', 
      padding: '0.75rem 2rem', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      position: 'sticky',
      top: '1rem',
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ 
          background: 'var(--primary)', 
          padding: '0.5rem', 
          borderRadius: '10px',
          color: 'var(--secondary)',
          display: 'flex'
        }}>
          <Vote size={24} />
        </div>
        <div>
          <h1 style={{ fontSize: '1.25rem', color: 'var(--primary)', margin: 0 }}>Caleb Votes</h1>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0, fontWeight: 600 }}>OFFICIAL SRC PORTAL</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <a href="#" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 500 }}>Dashboard</a>
        <a href="#" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 500 }}>Candidates</a>
        <a href="#" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 500 }}>Results</a>
        
        <div style={{ 
          height: '24px', 
          width: '1px', 
          background: 'var(--border)' 
        }}></div>

        <button className="btn" style={{ 
          background: 'transparent', 
          padding: '0.5rem', 
          color: 'var(--text-main)' 
        }}>
          <User size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
