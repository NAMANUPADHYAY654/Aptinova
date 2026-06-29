const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        default: null
    },
    skills: {
        type: [String],
        default: []
    },
    experience_years: {
        type: Number,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    resume_url: {
        type: String,
        default: null
    },
    job_fit_score: {
        type: Number,
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: false
});

// Transform the output to include `id` instead of `_id` and remove `__v` to match the Python backend
candidateSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Candidate', candidateSchema);
