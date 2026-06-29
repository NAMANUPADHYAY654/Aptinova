const express = require('express');
const router = express.Router();
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload and process resume file
router.post('/', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        
        // TODO: Implement resume parsing here
        res.json({
            filename: req.file.originalname,
            size: req.file.size,
            status: "uploaded",
            message: "Resume uploaded successfully"
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
