const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
require('./db/conn');  // Database connection
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const Router = require('./router/auth');
const User = require('./model/userSchema');

dotenv.config({ path: './config.env' });

const app = express();

// Enable CORS
const corsOptions = {
  origin: 'https://bankagentbridgegreivanceportal.vercel.app', // Frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Methods you want to support
  credentials: true,  // Allow credentials (cookies, Authorization headers)
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
};

// Apply CORS middleware globally
app.use(cors(corsOptions));

// Middleware for parsing cookies and JSON body
app.use(cookieParser());
app.use(express.json());

// Handle preflight OPTIONS requests globally
app.options('*', cors(corsOptions)); 

// Use routes from the router module
app.use(Router);

// Set port from environment variables or default to 5000
const port = process.env.PORT || 5000;
console.log(`Backend running on port: ${port}`);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
