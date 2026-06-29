const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const candidatesRouter = require('./routes/candidates');
const jobsRouter = require('./routes/jobs');
const dashboardRouter = require('./routes/dashboard');
const uploadRouter = require('./routes/upload');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
    origin: ['http://localhost:5175', 'http://localhost:5174', 'http://localhost:5173'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URL || 'mongodb://localhost:27017/aptinova';
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/candidates', candidatesRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/upload', uploadRouter);

// Health check
app.get('/health', async (req, res) => {
    try {
        if (mongoose.connection.readyState === 1) {
            res.json({ status: 'healthy', database: 'connected' });
        } else {
            res.json({ status: 'unhealthy', database: 'disconnected' });
        }
    } catch (err) {
        res.status(500).json({ status: 'unhealthy', error: err.message });
    }
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Aptinova API',
        version: '1.0.0'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
