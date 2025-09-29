require('dotenv').config();
const express = require('express');
const cors = require('cors'); // ADD THIS LINE
const {connectDB} = require('../config/database.js');
const authRoutes = require('../routes/userRoutes.js');
const cookieParser = require('cookie-parser');
const startupRoutes=require('../routes/startupRoutes.js')
const feedbackRoutes=require('../routes/feedbackRoutes.js')

const app = express()
const port = 3000

// Strong CORS guard: reflect any Origin and allow credentials (single source)
app.use((req, res, next) => {
    // For local dev, allow all origins and avoid credentials to simplify CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', req.headers['access-control-request-headers'] || 'Content-Type, Authorization, Cookie, Accept, Origin, X-Requested-With');
    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }
    next();
});

// Express v5: '*' path patterns are invalid. Preflight handled above in middleware.

// Remove package-based cors to avoid overrides; manual headers above handle CORS

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/users', authRoutes); // User waale saare routes yahan se handle honge
app.use('/api/startups', startupRoutes); // Startup waale saare routes yahan se
app.use('/api/feedback', feedbackRoutes); // Feedback waale saare routes yahan se

// Debug route to check if server is working
app.get('/api/test', (req, res) => {
    res.json({ message: 'Server is working!', timestamp: new Date() });
});

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch(err => {
    console.error("Failed to connect to the database", err);
});