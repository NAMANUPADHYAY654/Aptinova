import React from 'react';
import { X, Brain, CheckCircle, XCircle, TrendingUp, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CandidateProfile({ candidate, onClose }) {
    if (!candidate) return null;

    return (
        <AnimatePresence>
            <div className="modal-overlay" onClick={onClose}>
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="modal-content" 
                    style={{ width: '700px' }}
                    onClick={e => e.stopPropagation()}
                >
                    <button 
                        onClick={onClose}
                        style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                    >
                        <X size={24} />
                    </button>

                    <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '8px', background: 'rgba(0,240,255,0.1)', border: '1px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                            <Cpu size={40} />
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.8rem', color: '#fff', margin: '0 0 5px 0' }}>{candidate.name}</h2>
                            <div style={{ color: 'var(--text-secondary)' }}>{candidate.email} • {candidate.experience_years} Years Experience</div>
                        </div>
                    </div>

                    <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div>
                            <h3 style={{ color: 'var(--accent)', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Brain size={16} /> AI Insight Analysis
                            </h3>
                            <p style={{ lineHeight: '1.6', fontSize: '0.95rem', color: 'var(--text-primary)', background: 'rgba(0,0,0,0.3)', padding: '1rem', borderLeft: '3px solid var(--accent-purple)' }}>
                                {candidate.job_fit_score > 80 
                                    ? "Exceptional candidate. Technical skills strongly align with requirements. Recommended for immediate interview loop." 
                                    : candidate.job_fit_score > 50 
                                    ? "Solid foundational skills. May require ramp-up in specific advanced areas but displays good potential."
                                    : "Does not meet the core technical requirements. Consider for alternative entry-level positions."}
                            </p>
                        </div>
                        
                        <div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h3 style={{ color: 'var(--success)', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <CheckCircle size={16} /> Key Strengths
                                </h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {candidate.skills.slice(0, 3).map(s => (
                                        <span key={s} className="badge-skill" style={{ borderColor: 'var(--success)', color: 'var(--success)' }}>{s}</span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 style={{ color: 'var(--danger)', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <XCircle size={16} /> Missing / Weak Areas
                                </h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    <span className="badge-skill" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>System Design</span>
                                    <span className="badge-skill" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>GraphQL</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                        <button className="btn btn-secondary" onClick={onClose}>Close</button>
                        <button className="btn btn-primary" style={{ background: 'var(--accent)', color: '#000', boxShadow: 'var(--neon-glow)' }}>
                            <TrendingUp size={18} /> Proceed to Interview
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
