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
    },
    // Optional special offer fields for early adopters
    hasSpecialOffer: {
        type: Boolean,
        default: false
    },
    specialOfferText: {
        type: String,
        default: ''
    },
    specialOfferCode: {
        type: String,
        default: null
    },
    discount: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
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

        // Normalize legacy form fields to new schema
        const normalizedOffer = {
            hasSpecialOffer: Boolean(
                startupData.hasSpecialOffer ||
                startupData.specialOffer ||
                startupData.specialOfferText ||
                startupData.couponCode ||
                (typeof startupData.discount === 'number' && startupData.discount > 0)
            ),
            specialOfferText: startupData.specialOfferText || startupData.specialOffer || '',
            specialOfferCode: startupData.specialOfferCode || startupData.couponCode || null,
            discount: typeof startupData.discount === 'number' ? startupData.discount : 0,
        };

        const newStartup = await Startup.create({
            ...startupData,
            ...normalizedOffer,
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
        // If user context not present (e.g., local/dev), return all startups
        if (!req.user || !req.user.userId) {
            const allStartups = await Startup.find({})
                .populate('founderId', 'fullName')
                .sort({ createdAt: -1 });
            return res.status(200).json(allStartups);
        }

        // Logged-in adopter
        const userId = req.user.userId;
        const adopter = await User.findById(userId);

        // If no interests set, return all startups instead of empty list
        if (!adopter || !Array.isArray(adopter.interests) || adopter.interests.length === 0) {
            const allStartups = await Startup.find({})
                .populate('founderId', 'fullName')
                .sort({ createdAt: -1 });
            return res.status(200).json(allStartups);
        }

        // Filter by adopter interests
        const startups = await Startup.find({
            categories: { $in: adopter.interests }
        })
            .populate('founderId', 'fullName')
            .sort({ createdAt: -1 });

        res.status(200).json(startups);
    } catch (error) {
        console.error('Error building adopter feed:', error);
        // Fallback to safe empty list to avoid breaking the UI
        try {
            const allStartups = await Startup.find({}).sort({ createdAt: -1 });
            return res.status(200).json(allStartups);
        } catch (e) {
            return res.status(200).json([]);
        }
    }
};



const getStartupsForFounder = async (req, res) => {
    try {
        const founderId = req.user?.userId;
        if (!founderId) {
            // In local/dev without auth, gracefully return empty list
            return res.status(200).json({
                message: 'Startups retrieved successfully',
                startups: [],
                count: 0
            });
        }
        
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

// Get single startup by ID (public/adopter view)
const getStartupById = async (req, res) => {
    try {
        const { id } = req.params;
        const startup = await Startup.findById(id).populate('founderId', 'fullName');
        if (!startup) {
            return res.status(404).json({ message: 'Startup not found' });
        }
        res.status(200).json(startup);
    } catch (error) {
        console.error('Error fetching startup by id:', error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

// Persist upvote for adopter
const upvoteStartup = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ message: 'Authentication required' });

        const startup = await Startup.findById(id);
        if (!startup) return res.status(404).json({ message: 'Startup not found' });

        const user = await User.findById(userId);
        const exists = user.upvotedStartups.some(s => String(s) === String(id));
        if (!exists) {
            user.upvotedStartups.push(id);
            await user.save();
        }
        res.status(200).json({ message: 'Upvoted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Remove upvote
const removeUpvote = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ message: 'Authentication required' });
        const user = await User.findById(userId);
        user.upvotedStartups = user.upvotedStartups.filter(s => String(s) !== String(id));
        await user.save();
        res.status(200).json({ message: 'Removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Get adopter's upvoted startups
const getMyUpvotes = async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ message: 'Authentication required' });
        const user = await User.findById(userId).populate('upvotedStartups');
        res.status(200).json({ startups: user.upvotedStartups || [] });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Update startup (founder only)
const updateStartup = async (req, res) => {
    try {
        const { startupId } = req.params;
        const founderId = req.user?.userId;
        
        if (!founderId) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        // Check if startup exists and belongs to the founder
        const existingStartup = await Startup.findById(startupId);
        if (!existingStartup) {
            return res.status(404).json({ message: 'Startup not found' });
        }

        if (existingStartup.founderId.toString() !== founderId) {
            return res.status(403).json({ message: 'Not authorized to update this startup' });
        }

        const startupData = req.body;

        // Basic server-side caps for media arrays
        if (Array.isArray(startupData.media)) {
            startupData.media = startupData.media.slice(0, 5);
        }

        // Normalize legacy form fields to new schema
        const normalizedOffer = {
            hasSpecialOffer: Boolean(
                startupData.hasSpecialOffer ||
                startupData.specialOffer ||
                startupData.specialOfferText ||
                startupData.couponCode ||
                (typeof startupData.discount === 'number' && startupData.discount > 0)
            ),
            specialOfferText: startupData.specialOfferText || startupData.specialOffer || '',
            specialOfferCode: startupData.specialOfferCode || startupData.couponCode || null,
            discount: typeof startupData.discount === 'number' ? startupData.discount : 0,
        };

        const updatedStartup = await Startup.findByIdAndUpdate(
            startupId,
            {
                ...startupData,
                ...normalizedOffer,
                founderId: founderId // Ensure founderId doesn't change
            },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: 'Startup updated successfully',
            startup: updatedStartup
        });
    } catch (error) {
        console.error('Startup update error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Exports mein bhi add karein
module.exports = { createStartup, getFeedForAdopter, getStartupsForFounder, getFeedbackForStartup, getStartupById, updateStartup, upvoteStartup, removeUpvote, getMyUpvotes }