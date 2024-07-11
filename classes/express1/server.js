const express = require("express")

const app = express();
const router=require("./routes/userroutes")
app.use("/users",router)
const port = 3000;

app.listen(port,(error)=>{
    if(!error){
        console.log("running on port "+port)
        }
        else{
            console.log("error occured",error)
        }
})