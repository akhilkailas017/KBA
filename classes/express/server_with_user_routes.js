const express = require("express")
const app = express();
const port = 3000;


app.use(express.json());

let users = [
    {
        id: 1, name: "john"
    },
    {
        id: 2, name: "jerry",
    }
];

app.get("/users", (req, res) => {
    res.status(200);
    res.json(users);
})

app.post("/users", (req, res) => {
    const newuser = req.body;
    newuser.id = users.length + 1;
    users.push(newuser);
    res.status(201).json(newuser);
})



app.put("/users/:id",(req,res)=>{
    const userid=parseInt(req.params.id) ;
    const updateuser=req.body;
    const userindex=users.findIndex(user=>user.id===userid);

    if(userindex!==-1){
        users[userindex]={...users[userindex],...updateuser};
        res.json(users[userindex]);
    }
    else{
        res.status(404).json({error:"user not found"});
    }
})

app.delete("/users/:id",(req,res)=>{
    const userid=parseInt(req.params.id) ;
    const userindex=users.findIndex(user=>user.id===userid);

    if(userindex !== -1){
        const deleteuser=users.splice(userindex,1)[0];
        res.json(deleteuser);
    }
    else{
        res.status(404).json({error:"user not found"});
    }
})


app.listen(port, (error) => {
    if (!error) {
        console.log("running on port " + port)
    }
    else {
        console.log("error occured", error)
    }
})