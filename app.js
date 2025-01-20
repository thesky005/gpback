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

app.use(cookieParser());
app.use(express.json());
app.use(Router);

const corsOptions = {
  origin: 'https://bankagentbridgegreivanceportal.vercel.app',  // allow requests from your frontend's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // adjust if other methods are used
  credentials: true,  // allow cookies and authorization headers
  allowedHeaders: ['Content-Type', 'Authorization'],  // specify allowed headers
};

app.use(cors(corsOptions));

// Handle preflight OPTIONS request
app.options('*', cors(corsOptions));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://bankagentbridgegreivanceportal.vercel.app');  // Allow specific origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');  // Allow methods
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');  // Allow specific headers
  next();
});

const port = process.env.PROXY_URL;
console.log(`Backend running on port: ${port}`);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
