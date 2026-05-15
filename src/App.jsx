import React from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <LandingPage />
      </main>
      
      <footer style={{ 
        textAlign: 'center', 
        padding: '4rem 0 2rem', 
        color: 'var(--text-muted)',
        fontSize: '0.9rem'
      }}>
        <p>&copy; 2026 Caleb University Student Representative Council. Built for Excellence.</p>
      </footer>
    </div>
  );
}

export default App;
