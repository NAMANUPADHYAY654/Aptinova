import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Briefcase, MapPin, DollarSign, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function JobsManager() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    
    // New Job Form State
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [experience, setExperience] = useState(0);
    const [skills, setSkills] = useState('');
    const [location, setLocation] = useState('');

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/jobs`);
            setJobs(response.data);
        } catch (err) {
            console.error("Failed to fetch jobs", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateJob = async (e) => {
        e.preventDefault();
        try {
            const newJob = {
                title,
                description,
                experience_required: parseInt(experience),
                required_skills: skills.split(',').map(s => s.trim()),
                location
            };
            await axios.post(`${API_URL}/jobs`, newJob);
            setIsCreating(false);
            // Reset form
            setTitle(''); setDescription(''); setExperience(0); setSkills(''); setLocation('');
            fetchJobs();
        } catch (err) {
            console.error("Failed to create job", err);
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="header">
                <div>
                    <h1 className="page-title">Job Management</h1>
                    <div style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                        Manage active roles and requirements.
                    </div>
                </div>
                <div className="header-actions">
                    <button className="btn btn-primary" onClick={() => setIsCreating(!isCreating)}>
                        {isCreating ? 'Cancel' : <><Plus size={18} /> New Posting</>}
                    </button>
                </div>
            </div>

            {isCreating && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="glass-card" style={{ marginBottom: '2rem' }}>
                    <h2 style={{ marginBottom: '1.5rem', color: 'var(--accent)' }}>Create New Job Posting</h2>
                    <form onSubmit={handleCreateJob}>
                        <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                            <div className="cyber-input-group">
                                <label>Job Title</label>
                                <input required value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Senior Cybernetic Engineer" />
                            </div>
                            <div className="cyber-input-group">
                                <label>Location</label>
                                <input required value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Neo Tokyo / Remote" />
                            </div>
                        </div>
                        <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                            <div className="cyber-input-group">
                                <label>Required Experience (Years)</label>
                                <input type="number" required value={experience} onChange={e => setExperience(e.target.value)} min="0" />
                            </div>
                            <div className="cyber-input-group">
                                <label>Required Skills (Comma separated)</label>
                                <input required value={skills} onChange={e => setSkills(e.target.value)} placeholder="React, Node, Cybernetics" />
                            </div>
                        </div>
                        <div className="cyber-input-group">
                            <label>Description</label>
                            <textarea required value={description} onChange={e => setDescription(e.target.value)} rows="4" placeholder="Detailed job description..."></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>Publish Role</button>
                    </form>
                </motion.div>
            )}

            <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))' }}>
                {loading ? (
                    <div style={{ color: 'var(--text-secondary)' }}>Loading active jobs...</div>
                ) : jobs.length === 0 ? (
                    <div className="glass-card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }}>
                        No active jobs found. Create one to get started.
                    </div>
                ) : jobs.map(job => (
                    <div key={job.id} className="glass-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>{job.title}</h3>
                            <span className="badge badge-success">Active</span>
                        </div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={16} color="var(--accent)" /> {job.location || 'Remote'}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Clock size={16} color="var(--accent)" /> {job.experience_required}+ Years Exp.</div>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.5rem' }}>
                            {job.required_skills?.slice(0,3).map(skill => (
                                <span key={skill} className="badge-skill">{skill}</span>
                            ))}
                            {job.required_skills?.length > 3 && <span className="badge-skill">+{job.required_skills.length - 3}</span>}
                        </div>
                        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>0 Candidates</span>
                            <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>Manage</button>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
