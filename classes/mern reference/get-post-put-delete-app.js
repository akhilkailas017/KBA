const express=require("express")
const app=express()
const port=3000
const {mongoose}=require("mongoose")
const sample=require('./models/dataModel.js')
const path=require("path")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname,"public")))


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public',"index.html"))
})
app.get('/new-task',(req,res)=>{
    res.sendFile(path.join(__dirname,'public',"addTask.html"))
})
app.get('/submit',(req,res)=>{
    res.sendFile(path.join(__dirname,'public',"submit.html"))
})
app.get('/view',(req,res)=>{
    res.sendFile(path.join(__dirname,'public',"view.html"))
})
app.get('/update',(req,res)=>{
    res.sendFile(path.join(__dirname,'public',"update.html"))
})
app.get('/updated',(req,res)=>{
    res.sendFile(path.join(__dirname,'public',"updated.html"))
})


app.get("/search/:id",async(req,res)=>{
    try{
    const id=req.params.id
    const result= await sample.findOne({taskid:id})
    res.json(result)
    }catch(error){
        console.log(error);
    }
})

app.post("/new-task",async(req,res)=>{
    try{
        const data=req.body
        console.log("test")
        const result=await sample.create(data);
        // res.status(201).json(result)
        res.redirect("/submit")
    }catch(error){
        console.log(error);
        res.status(500).json()
    }
})

app.put("/edit/:id",async(req,res)=>{
    try{
        const id=req.params.id
        const data=req.body
        const result= await sample.updateOne({taskid:id},{$set:data})
        res.status(200).json(result)
    }catch(error){
        res.json(error)
    }
})

app.delete("/delete/:id",async(req,res)=>{
    try{
    const id=req.params.id
    await sample.deleteOne({taskid:id})
    res.json("deleted")
    }catch(error){
        res.json(error)
    }
})


mongoose.connect('mongodb://localhost:27017/ToDo')
const database=mongoose.connection;
database.on("error",(error)=>{
    console.log(error)
})
database.once("connected",()=>{
    console.log("database connected")
})
app.listen(port,()=>{
    console.log("server is running")
})