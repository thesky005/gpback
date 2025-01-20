const express=require('express');
require('./db/conn');
const dotenv=require("dotenv");
const mongoose=require('mongoose');

const User=require('./model/userSchema');
const Router=require('./router/auth');

const app=express();
const cookieParser=require("cookie-parser");
app.use(cookieParser());
app.use(express.json());
app.use(Router);
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000',  // allow requests from your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // adjust if other methods are used
    credentials: true,  // allow credentials (cookies, authorization headers, etc.)
  }));
dotenv.config({path:'./config.env'});

require('./middleware/authenticate');

const backendUrl = process.env.REACT_APP_BACKEND_URL;
console.log(`Backend URL: ${backendUrl}`);


const port=process.env.PROXY_URL;
console.log(port)
app.use(express.urlencoded({ extended: false }));

app.listen(port,()=>{
    console.log(`Connection setup at ${port}`)
})