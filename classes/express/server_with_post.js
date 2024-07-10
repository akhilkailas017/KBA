const express = require("express")
const app = express();
const port = 3000;

app.use(express.json());

app.post("/",(req,res)=>{
   const {name}=req.body
    res.send(`welcome ${name}`);
})


app.listen(port,(error)=>{
    if(!error){
        console.log("running on port "+port)
        }
        else{
            console.log("error occured",error)
        }
})
