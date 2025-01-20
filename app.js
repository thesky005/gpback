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

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://bankagentbridgegreivanceportal.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(cookieParser());
app.use(express.json());

app.options('*', cors(corsOptions)); 

app.use(Router);

const port = process.env.PORT || 8000;
console.log(`Backend running on port: ${port}`);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
