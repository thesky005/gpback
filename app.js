const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
require('./db/conn'); // Database connection
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const Router = require('./router/auth');
const User = require('./model/userSchema');

dotenv.config({ path: './config.env' });

const app = express();

// CORS middleware - This is the primary solution
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://bankagentbridgegreivanceportal.vercel.app'); // Replace with your frontend URL
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Include OPTIONS
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Important for cookies
    next();
});

// Alternative CORS configuration using the cors package (less preferred in this specific case but useful for other scenarios)
/*
const corsOptions = {
    origin: 'https://bankagentbridgegreivanceportal.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests
*/

// Middleware for parsing cookies and JSON body
app.use(cookieParser());
app.use(express.json());

// Use routes from the router module
app.use(Router);

// Set port from environment variables or default to 5000
const port = process.env.PORT || 8000;

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});