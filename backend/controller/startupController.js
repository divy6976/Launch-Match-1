const mongoose = require('mongoose');
const User = require('../model/usermodel');
const Feedback = require('../model/feedbackModel');

// Create a simple working schema here temporarily
const startupSchema = new mongoose.Schema({
    founderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    tagline: {
        type: String,
        required: true,
        minlength: 10,
        trim: true
    },
    description: {
        type: String,
        required: true,
        minlength: 50
    },
    industry: {
        type: String,
        required: true
    },
    categories: {
        type: [String],
        required: true
    },
    businessType: {
        type: String,
        enum: ["B2B", "B2C"],
        required: true
    },
    targetAudience: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true,
        match: [/^https?:\/\/.+/, "Please enter a valid URL"]
    },
    // Optional media storage (base64 for quick MVP)
    logo: {
        type: String, // data URL/base64
        default: null
    },
    media: {
        type: [String], // array of data URL/base64
        default: []
    }
}, { timestamps: true });

const Startup = mongoose.model('Startup', startupSchema);

const createStartup = async (req, res) => {
    try {
        // Check if user is authenticated
        const founderId = req.user ? req.user.userId : new mongoose.Types.ObjectId();
        const startupData = req.body;

        // Basic server-side caps for media arrays
        if (Array.isArray(startupData.media)) {
            startupData.media = startupData.media.slice(0, 5);
        }

        const newStartup = await Startup.create({
            ...startupData,
            founderId: founderId
        });

        res.status(201).json({
            message: 'Startup created successfully',
            startup: newStartup
        });
    } catch (error) {
        console.error('Startup creation error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const getFeedForAdopter = async (req, res) => {
    try {
        // Step 1: Logged-in adopter ki ID middleware se lo
        const userId = req.user.userId;

        // Step 2: User ke interests database se nikaalo
        const adopter = await User.findById(userId);
        if (!adopter || !adopter.interests || adopter.interests.length === 0) {
            // Agar user ne interests select nahi kiye hain
            return res.status(200).json([]); // Khaali feed bhej do
        }

        // Step 3: Magic Query - Sirf woh startups dhoondho jinki category user ke interest se match karti hai
        const startups = await Startup.find({
            categories: { $in: adopter.interests } // $in operator match karta hai
        }).populate('founderId', 'fullName'); // Bonus: Founder ka naam bhi saath mein bhej do

        // Step 4: Matching startups ki list wapas bhejo
        res.status(200).json(startups);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};



const getStartupsForFounder = async (req, res) => {
    try {
        const founderId = req.user.userId;
        
        const startups = await Startup.find({ founderId: founderId })
            .populate('founderId', 'fullName')
            .sort({ createdAt: -1 }); // Latest first

        res.status(200).json({
            message: 'Startups retrieved successfully',
            startups: startups,
            count: startups.length
        });
    } catch (error) {
        console.error('Error fetching founder startups:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const getFeedbackForStartup = async (req, res) => {
    try {
        const { startupId } = req.params;

        // Security Check: Ensure karna ki jo founder request kar raha hai, woh is startup ka owner hai
        // (Yeh logic aap ek alag middleware 'isOwner' mein bhi daal sakte hain)
        const startup = await Startup.findById(startupId);
        if (startup.founderId.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Not authorized to view this feedback' });
        }

        const feedbacks = await Feedback.find({ startupId: startupId }).populate('userId', 'fullName');

        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Exports mein bhi add karein
module.exports = { createStartup, getFeedForAdopter, getStartupsForFounder, getFeedbackForStartup }