const express = require('express');
const app = express();
require("dotenv").config();
const path= require('path');
const mongoose=require('mongoose');
const sample=require('./Models/blogdetails.js');


const uri = process.env.mongo_uri;
mongoose.connect(uri);
const database = mongoose.connection;
database.on("error", (error) => {
    console.log(error);
});
database.once("connected", () => {
    console.log("Database Connected");
});


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));


const PORT=process.env.PORT||4000;


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'blog.html'));
});

app.post('/submit-form',async (req, res) => {
    try{
        const data=req.body;
        console.log(data)
        const details= await sample.create(data);
        res.status(201).redirect('/thank-you');
    
       }
    catch(error){
    res.status(500).json
    }
});

app.get('/thank-you', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'submit.html'));
});

app.get('/blog', (req,res) => {
    res.json(blogs);
})

app.get("/blog/:id", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'viewblog.html'));
});

app.get('/api/blog/:id',async (req, res) => {
    const id= req.params.id;
    const details= await sample.findOne({BlogID: id})
    console.log(details);
    res.json(details);
});



app.listen(PORT,()=>{
    console.log(`application running in ${PORT}`);
})