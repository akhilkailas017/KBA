const express = require("express")
const {mongoose}=require("mongoose")
const routes=require('./routes.js')


const app = express();
const port = 3000;


app.listen(port,()=>{
        console.log("running on port "+port);
})

app.use(express.json());
app.use('/',routes);

mongoose.connect("mongodb://localhost:27017/users")


const database = mongoose.connection;
database.on("error", (error) => {
   console.log(error);
});
database.once("connected", () => {
   console.log("Database Connected");
});