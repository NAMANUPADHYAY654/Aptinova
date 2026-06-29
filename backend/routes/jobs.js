const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// Get all jobs
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific job
router.get('/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ detail: 'Job not found' });
        }
        res.json(job);
    } catch (err) {
        res.status(400).json({ detail: err.message });
    }
});

// Create a new job
router.post('/', async (req, res) => {
    try {
        const job = new Job(req.body);
        const newJob = await job.save();
        res.status(201).json(newJob);
    } catch (err) {
        res.status(400).json({ detail: err.message });
    }
});

// Update a job
router.put('/:id', async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!job) {
            return res.status(404).json({ detail: 'Job not found' });
        }
        res.json({ message: 'Job updated successfully' });
    } catch (err) {
        res.status(400).json({ detail: err.message });
    }
});

// Delete a job
router.delete('/:id', async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) {
            return res.status(404).json({ detail: 'Job not found' });
        }
        res.json({ message: 'Job deleted successfully' });
    } catch (err) {
        res.status(400).json({ detail: err.message });
    }
});

module.exports = router;
