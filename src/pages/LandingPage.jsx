import React from 'react';
import { ChevronRight, ShieldCheck, Zap, BarChart3 } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="container" style={{ paddingTop: '4rem' }}>
      <section style={{ textAlign: 'center', marginBottom: '6rem' }}>
        <h1 style={{ 
          fontSize: '4rem', 
          lineHeight: 1.1, 
          marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          The Future of Campus <br /> Decisions is Here.
        </h1>
        <p style={{ 
          fontSize: '1.25rem', 
          color: 'var(--text-muted)', 
          maxWidth: '600px', 
          margin: '0 auto 2.5rem' 
        }}>
          Secure, transparent, and seamless voting for the Caleb University Student Representative Council. Your voice, amplified.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
            Cast Your Vote <ChevronRight size={20} style={{ marginLeft: '0.5rem' }} />
          </button>
          <button className="btn" style={{ 
            background: 'white', 
            border: '1px solid var(--border)', 
            padding: '1rem 2.5rem', 
            fontSize: '1.1rem' 
          }}>
            View Live Results
          </button>
        </div>
      </section>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '2rem',
        marginBottom: '6rem'
      }}>
        <div className="glass-card" style={{ padding: '2.5rem' }}>
          <div style={{ 
            background: 'rgba(0, 45, 98, 0.1)', 
            width: '50px', 
            height: '50px', 
            borderRadius: '12px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'var(--primary)',
            marginBottom: '1.5rem'
          }}>
            <ShieldCheck size={28} />
          </div>
          <h3>Secure & Verified</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>
            Every vote is encrypted and verified against official university records to ensure total integrity.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '2.5rem' }}>
          <div style={{ 
            background: 'rgba(255, 215, 0, 0.1)', 
            width: '50px', 
            height: '50px', 
            borderRadius: '12px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: '#B8860B',
            marginBottom: '1.5rem'
          }}>
            <Zap size={28} />
          </div>
          <h3>Instant Processing</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>
            No more waiting days for results. Our system processes votes in real-time as they are cast.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '2.5rem' }}>
          <div style={{ 
            background: 'rgba(0, 168, 107, 0.1)', 
            width: '50px', 
            height: '50px', 
            borderRadius: '12px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'var(--accent)',
            marginBottom: '1.5rem'
          }}>
            <BarChart3 size={28} />
          </div>
          <h3>Visual Analytics</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>
            Dynamic charts and data visualization provide a clear picture of election trends and results.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
