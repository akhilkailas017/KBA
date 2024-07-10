const express = require("express")

const app = express();
const port = 3000;
app.get("/",(req,res)=>{
    res.status(200);
    res.send("welcome to root route");
})
app.get("/users",(req,res)=>{
    res.status(200);
    res.send("welcome user");
})
app.listen(port,(error)=>{
    if(!error){
        console.log("running on port "+port)
        }
        else{
            console.log("error occured",error)
        }
})
