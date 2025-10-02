

const express = require('express');
const router = express.Router();
const { createStartup, getFeedForAdopter, getStartupsForFounder, getFeedbackForStartup, getStartupById, updateStartup, upvoteStartup, removeUpvote, getMyUpvotes } = require('../controller/startupController');
const { isLoggedIn, isFounder, isAdopter } = require('../middleware/auth');


// Test route (no auth required)
router.get('/test', (req, res) => {
    res.json({ message: 'Startup routes working!' });
});

// Test POST route (no auth required) - for testing
router.post('/test', (req, res) => {
    res.json({ 
        message: 'POST route working!', 
        body: req.body,
        received: true 
    });
}); 

// Simple route without auth for testing

// Founder apne startups dekh sakta hai (fetch from DB)
router.get('/my-startups', isLoggedIn, isFounder, getStartupsForFounder);
// Sirf logged-in founder hi startup create kar sakta hai
router.post('/', isLoggedIn, isFounder, createStartup);
// Sirf logged-in founder hi startup update kar sakta hai
router.put('/:startupId', isLoggedIn, isFounder, updateStartup);
// Adopter/public feed (controller handles personalization if logged in)
router.get('/', getFeedForAdopter);

// Adopter upvotes persistence
router.post('/:id/upvote', isLoggedIn, isAdopter, upvoteStartup);
router.delete('/:id/upvote', isLoggedIn, isAdopter, removeUpvote);
router.get('/my-upvotes/list', isLoggedIn, isAdopter, getMyUpvotes);

// Debug route to check if GET / is working
router.get('/debug', (req, res) => {
    res.json({ message: 'GET /debug route working!' });
});

// Ek startup ke saare feedback dekhne ke liye
router.get('/:startupId/feedback', isLoggedIn, isFounder, getFeedbackForStartup);

// Public/adopter: get startup by id
router.get('/:id', getStartupById);

module.exports = router;
