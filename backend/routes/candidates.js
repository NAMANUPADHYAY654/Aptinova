const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');

// Get all candidates
router.get('/', async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.json(candidates);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific candidate
router.get('/:id', async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params.id);
        if (!candidate) {
            return res.status(404).json({ detail: 'Candidate not found' });
        }
        res.json(candidate);
    } catch (err) {
        res.status(400).json({ detail: err.message });
    }
});

// Create a new candidate
router.post('/', async (req, res) => {
    try {
        const candidate = new Candidate(req.body);
        const newCandidate = await candidate.save();
        res.status(201).json(newCandidate);
    } catch (err) {
        res.status(400).json({ detail: err.message });
    }
});

// Update a candidate
router.put('/:id', async (req, res) => {
    try {
        const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!candidate) {
            return res.status(404).json({ detail: 'Candidate not found' });
        }
        res.json({ message: 'Candidate updated successfully' });
    } catch (err) {
        res.status(400).json({ detail: err.message });
    }
});

// Delete a candidate
router.delete('/:id', async (req, res) => {
    try {
        const candidate = await Candidate.findByIdAndDelete(req.params.id);
        if (!candidate) {
            return res.status(404).json({ detail: 'Candidate not found' });
        }
        res.json({ message: 'Candidate deleted successfully' });
    } catch (err) {
        res.status(400).json({ detail: err.message });
    }
});

module.exports = router;
