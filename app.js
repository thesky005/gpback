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