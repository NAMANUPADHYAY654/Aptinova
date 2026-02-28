import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UploadCloud, CheckCircle, TrendingUp, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Legend
} from 'recharts';

// Mock data for charts since backend only returns basic db info
const performanceData = [
    { name: 'Mon', parsed: 12, matched: 4 },
    { name: 'Tue', parsed: 19, matched: 8 },
    { name: 'Wed', parsed: 15, matched: 6 },
    { name: 'Thu', parsed: 25, matched: 12 },
    { name: 'Fri', parsed: 22, matched: 10 },
    { name: 'Sat', parsed: 8, matched: 2 },
    { name: 'Sun', parsed: 5, matched: 1 },
];

const skillDemandData = [
    { name: 'Python', demand: 85 },
    { name: 'React', demand: 65 },
    { name: 'FastAPI', demand: 45 },
    { name: 'Machine Learning', demand: 90 },
    { name: 'SQL', demand: 60 }
];

export default function Dashboard() {
    const [stats, setStats] = useState({ jobs: 0, candidates: 0 });
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

    useEffect(() => {
        // Quick fetch to get counts
        const fetchData = async () => {
            try {
                const jobsRes = await axios.get(`${API_URL}/jobs`);
                // Candidates can be fetched per job, but we'll just mock the total count here for visual completeness
                setStats({
                    jobs: jobsRes.data.length,
                    candidates: 15 // Mocked total as the API doesn't expose a /candidates-all endpoint right now
                });
            } catch (err) {
                console.error("Failed to fetch dashboard stats", err);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <div className="header">
                <h1 className="page-title">Analytics Dashboard</h1>
                <div className="header-actions">
                    <button className="btn btn-secondary">
                        <Search size={18} />
                        Search Profiles
                    </button>
                </div>
            </div>

            <motion.div
                className="dashboard-grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, staggerChildren: 0.1 }}
            >
                <motion.div className="glass-card" whileHover={{ y: -5 }}>
                    <div className="stat-label">Total Jobs Active</div>
                    <div className="stat-value">{stats.jobs}</div>
                    <div style={{ color: 'var(--success)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <TrendingUp size={14} /> +2 this week
                    </div>
                </motion.div>
                <motion.div className="glass-card" whileHover={{ y: -5 }}>
                    <div className="stat-label">Resumes Processed</div>
                    <div className="stat-value">106</div>
                    <div style={{ color: 'var(--success)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <UploadCloud size={14} /> +14 today
                    </div>
                </motion.div>
                <motion.div className="glass-card" whileHover={{ y: -5 }}>
                    <div className="stat-label">Recruiter Efficiency Gain</div>
                    <div className="stat-value">32%</div>
                    <div style={{ color: 'var(--accent)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle size={14} /> Time saved vs manual parsing
                    </div>
                </motion.div>
            </motion.div>

            <div className="dashboard-grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
                <div className="glass-card" style={{ height: '350px' }}>
                    <h3 style={{ marginBottom: '1.5rem', fontWeight: 500 }}>Resumes Processed Over Time</h3>
                    <ResponsiveContainer width="100%" height="100%" style={{ paddingBottom: '30px' }}>
                        <AreaChart data={performanceData}>
                            <defs>
                                <linearGradient id="colorParsed" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="name" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
                            <Area type="monotone" dataKey="parsed" stroke="#3b82f6" fillOpacity={1} fill="url(#colorParsed)" />
                            <Area type="monotone" dataKey="matched" stroke="#10b981" fillOpacity={0.3} fill="#10b981" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="glass-card" style={{ height: '350px' }}>
                    <h3 style={{ marginBottom: '1.5rem', fontWeight: 500 }}>Top Skill Demand</h3>
                    <ResponsiveContainer width="100%" height="100%" style={{ paddingBottom: '30px' }}>
                        <BarChart data={skillDemandData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" stroke="#94a3b8" width={90} tick={{ fontSize: 12 }} />
                            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
                            <Bar dataKey="demand" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
