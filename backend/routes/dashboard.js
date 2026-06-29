const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');
const Job = require('../models/Job');

// Get dashboard statistics
router.get('/', async (req, res) => {
    try {
        const total_candidates = await Candidate.countDocuments({});
        const total_jobs = await Job.countDocuments({});
        
        res.json({
            total_candidates: total_candidates,
            total_jobs: total_jobs,
            processed_resumes: 0,
            pending_candidates: 0
        });
    } catch (err) {
        res.status(500).json({ detail: err.message });
    }
});

module.exports = router;
