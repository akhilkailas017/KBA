const express=require('express');
const app=express();

const session = require ('express-session');


const dotenv=require('dotenv');
dotenv.config();


const pageroute=require('./src/routes/pageroutes');
const loginroute = require('./src/routes/loginroutes');
const auth=require('./src/middleware/auth')
app.use('/',pageroute,loginroute);

app.use(session({
    secret: '1',
    resave: false,
    saveUninitialized: false
}))


app.listen(3000,()=>{
    console.log('server is running on port 3000');
})