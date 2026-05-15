import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import VotingBoard from './pages/VotingBoard';
import AdminDashboard from './pages/AdminDashboard';
import Results from './pages/Results';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/vote" element={<ProtectedRoute><Navbar /><VotingBoard /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><Navbar /><AdminDashboard /></ProtectedRoute>} />
            <Route path="/results" element={<ProtectedRoute><Navbar /><Results /></ProtectedRoute>} />
            
            <Route path="/" element={
              <div style={{ minHeight: '100vh' }}>
                <Navbar />
                <main>
                  <LandingPage />
                </main>
                <footer style={{ textAlign: 'center', padding: '4rem 0 2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <p>&copy; 2026 Caleb University Student Representative Council. Built for Excellence.</p>
                </footer>
              </div>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
