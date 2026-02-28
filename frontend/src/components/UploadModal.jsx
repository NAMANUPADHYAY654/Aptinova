import React, { useState, useRef } from 'react';
import axios from 'axios';
import { UploadCloud, CheckCircle, X, FileText, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function UploadModal({ onClose, selectedJobId, onUploadSuccess }) {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            setResult(null);
            setError('');
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const uploadResume = async () => {
        if (!file) return;

        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('file', file);
        if (selectedJobId) {
            formData.append('job_id', selectedJobId);
        }

        try {
            toast.loading("Parsing abstract syntax...", { id: 'parse-toast' });
            const response = await axios.post(`${API_URL}/parse-resume`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setResult(response.data);
            toast.success("Resume parsed successfully!", { id: 'parse-toast' });
            if (onUploadSuccess) onUploadSuccess();
        } catch (err) {
            const errorMsg = err.response?.data?.detail || "An error occurred during parsing";
            setError(errorMsg);
            toast.error(errorMsg, { id: 'parse-toast' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <motion.div
                className="modal-content"
                onClick={e => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.3, type: "spring" }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h2 style={{ fontSize: '1.4rem' }}>Parse Resume (PDF)</h2>
                    <button className="btn btn-secondary" style={{ padding: '6px' }} onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {!result ? (
                    <>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            accept="application/pdf"
                            onChange={handleFileChange}
                        />

                        <div className="upload-area" onClick={handleUploadClick}>
                            <UploadCloud size={48} className="upload-icon" />
                            <h3>Drag & Drop or Click to Upload</h3>
                            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                                {file ? file.name : 'Supports .pdf files up to 5MB'}
                            </p>
                        </div>

                        {error && (
                            <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', borderRadius: '8px', marginBottom: '1rem' }}>
                                {error}
                            </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                            <button
                                className="btn btn-primary"
                                onClick={uploadResume}
                                disabled={!file || loading}
                            >
                                {loading ? <Loader2 className="spinner" size={18} /> : 'Parse & Score Content'}
                            </button>
                        </div>
                    </>
                ) : (
                    <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                        <CheckCircle size={64} style={{ color: 'var(--success)', margin: '0 auto 1rem auto' }} />
                        <h3 style={{ marginBottom: '0.5rem' }}>Successfully Parsed!</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>Extracted {result.extracted_skills.length} skills from {result.filename}.</p>

                        {result.score !== null && (
                            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '1.5rem', marginTop: '1.5rem', border: '1px solid var(--border)' }}>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>AI Job-Fit Score</div>
                                <div style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--accent)' }}>
                                    {result.score.toFixed(0)}%
                                </div>
                            </div>
                        )}

                        <button className="btn btn-primary" style={{ marginTop: '2rem', width: '100%' }} onClick={onClose}>
                            View Candidate Tracking
                        </button>
                    </div>
                )}
            </motion.div>

            <style>{`
        .spinner { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
        </div>
    );
}
