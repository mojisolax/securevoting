import React, { useContext } from 'react';
import { Vote, User, LogOut, LayoutDashboard } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
      </Link>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        {user ? (
          <>
            <Link to="/vote" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>VOTING BALLOT</Link>
            <Link to="/results" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>RESULTS</Link>
            {user.role === 'admin' && (
              <Link to="/admin" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem' }}>ADMIN PANEL</Link>
            )}
            
            <div style={{ height: '24px', width: '1px', background: 'var(--border)' }}></div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700 }}>{user.fullName}</p>
                <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-muted)' }}>{user.matricNo}</p>
              </div>
              <button onClick={handleLogout} className="btn" style={{ background: '#fee2e2', color: '#dc2626', padding: '0.5rem' }}>
                <LogOut size={18} />
              </button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="btn" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Login</Link>
            <Link to="/register" className="btn btn-primary">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
