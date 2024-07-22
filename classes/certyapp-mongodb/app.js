const express = require("express")
const {mongoose}=require("mongoose")
const routes=require('./routes.js')
const dotenv=require('dotenv')
dotenv.config();

const uri=process.env.mongo_uri;


const app = express();
const port = 3000;


app.listen(port,()=>{
        console.log("running on port "+port);
})

app.use(express.json());
app.use('/',routes);

mongoose.connect(uri)


const database = mongoose.connection;
database.on("error", (error) => {
   console.log(error);
});
database.once("connected", () => {
   console.log("Database Connected");
});