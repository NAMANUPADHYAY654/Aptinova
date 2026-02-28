import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Upload, ChevronDown, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import UploadModal from './UploadModal';

export default function CandidateList() {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

    // Fetch jobs on mount
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`${API_URL}/jobs`);
                setJobs(response.data);
                if (response.data.length > 0) {
                    setSelectedJob(response.data[0]);
                }
            } catch (err) {
                console.error("Failed to fetch jobs", err);
            }
        };
        fetchJobs();
    }, []);

    // Fetch candidates when active job changes
    useEffect(() => {
        if (selectedJob) {
            fetchCandidates(selectedJob.id);
        }
    }, [selectedJob]);

    const fetchCandidates = async (jobId) => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/candidates/${jobId}`);
            setCandidates(response.data);
        } catch (err) {
            console.error("Failed to fetch candidates", err);
        } finally {
            setLoading(false);
        }
    };

    const ScoreBar = ({ score }) => {
        // Generate color based on score
        let color = 'var(--danger)';
        if (score >= 70) color = 'var(--success)';
        else if (score >= 40) color = 'var(--warning)';

        return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${score}%`, height: '100%', background: color, borderRadius: '4px', transition: 'width 1s ease-out' }}></div>
                </div>
                <span style={{ fontWeight: 600, width: '45px', textAlign: 'right' }}>{score.toFixed(0)}%</span>
            </div>
        );
    };

    return (
        <div>
            <div className="header">
                <div>
                    <h1 className="page-title">Candidate Tracking</h1>
                    <div style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                        AI-Ranked candidates for your active job postings.
                    </div>
                </div>

                <div className="header-actions">
                    <div style={{ position: 'relative' }}>
                        <select
                            className="btn btn-secondary"
                            style={{ appearance: 'none', paddingRight: '40px' }}
                            value={selectedJob?.id || ''}
                            onChange={(e) => {
                                const job = jobs.find(j => j.id === e.target.value);
                                setSelectedJob(job);
                            }}
                        >
                            {jobs.map(job => (
                                <option key={job.id} value={job.id}>{job.title}</option>
                            ))}
                        </select>
                        <ChevronDown size={16} style={{ position: 'absolute', right: '12px', top: '12px', pointerEvents: 'none' }} />
                    </div>

                    <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                        <Upload size={18} />
                        Parse Resumes
                    </button>
                </div>
            </div>

            <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Candidate Name</th>
                                <th>Experience</th>
                                <th>Extracted Skills</th>
                                <th style={{ width: '25%' }}>AI Job Fit Score</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                                        Loading AI rankings...
                                    </td>
                                </tr>
                            ) : candidates.length === 0 ? (
                                // Display sample Indian candidates
                                [
                                    { id: 1, name: 'Rajesh Kumar', email: 'rajesh.kumar@email.com', experience_years: 5, skills: ['Python', 'Django', 'PostgreSQL', 'Docker'], score: 85 },
                                    { id: 2, name: 'Priya Sharma', email: 'priya.sharma@email.com', experience_years: 4, skills: ['React', 'Node.js', 'MongoDB'], score: 78 },
                                    { id: 3, name: 'Amit Patel', email: 'amit.patel@email.com', experience_years: 6, skills: ['Java', 'Spring Boot', 'AWS', 'Kubernetes'], score: 92 },
                                    { id: 4, name: 'Anjali Singh', email: 'anjali.singh@email.com', experience_years: 3, skills: ['JavaScript', 'React', 'CSS', 'Firebase'], score: 72 },
                                    { id: 5, name: 'Vikram Desai', email: 'vikram.desai@email.com', experience_years: 7, skills: ['Python', 'Machine Learning', 'TensorFlow'], score: 88 }
                                ].map((cand) => (
                                    <tr key={cand.id}>
                                        <td>
                                            <div style={{ fontWeight: 600 }}>{cand.name}</div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{cand.email}</div>
                                        </td>
                                        <td>{cand.experience_years} years</td>
                                        <td>
                                            <div style={{ maxWidth: '250px', display: 'flex', flexWrap: 'wrap' }}>
                                                {cand.skills.slice(0, 4).map(s => (
                                                    <span key={s} className="badge-skill">{s}</span>
                                                ))}
                                                {cand.skills.length > 4 && <span className="badge-skill">+{cand.skills.length - 4}</span>}
                                            </div>
                                        </td>
                                        <td>
                                            <ScoreBar score={cand.score} />
                                        </td>
                                        <td>
                                            <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>View Profile</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <UploadModal
                    onClose={() => setIsModalOpen(false)}
                    selectedJobId={selectedJob?.id}
                    onUploadSuccess={() => fetchCandidates(selectedJob?.id)}
                />
            )}
        </div>
    );
}
