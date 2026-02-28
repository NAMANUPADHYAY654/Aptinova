import React, { useState } from 'react';
import { LayoutDashboard, Users, Settings, LogOut, BrainCircuit } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Dashboard from './components/Dashboard';
import CandidateList from './components/CandidateList';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="app-container">
      <Toaster position="top-right" toastOptions={{
        style: { background: '#1e293b', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
      }} />

      {/* Sidebar Navigation */}
      <div className="sidebar">
        <div className="logo-area">
          <BrainCircuit className="logo-icon" size={28} />
          <span>Aptinova</span>
        </div>

        <div className="nav-links">
          <div
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </div>
          <div
            className={`nav-item ${activeTab === 'candidates' ? 'active' : ''}`}
            onClick={() => setActiveTab('candidates')}
          >
            <Users size={20} />
            <span>Candidates</span>
          </div>
          <div
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={20} />
            <span>Settings</span>
          </div>
        </div>

        <div style={{ marginTop: 'auto' }}>
          <div className="nav-item">
            <LogOut size={20} />
            <span>Sign Out</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'candidates' && <CandidateList />}
        {activeTab === 'settings' && (
          <div>
            <h2 className="page-title">Settings</h2>
            <div className="glass-card" style={{ marginTop: '2rem' }}>
              <p>Platform settings and configuration options would go here.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
