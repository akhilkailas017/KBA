const express=require("express");
const server=express();
const port=3000;

server.use(express.json())

server.get("/",(req,res)=>{
    res.status(200);
    res.send("this is root route")
})

server.post("/", (req, res) => {
    const {name} = req.body;
    res.send(`name is added ${name}`);

})

server.listen(port,(error)=>{
    if(!error){
        console.log("server is running sucessfully running and app is listening")
    }
    else{
        console.log("error occured",error)
    }
})