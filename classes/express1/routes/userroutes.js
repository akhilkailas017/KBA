const express=require("express");
const router=express.Router()



router.use(express.json());

let users = [
    {
        id: 1, name: "john"
    },
    {
        id: 2, name: "jerry",
    }
];

router.get("/", (req, res) => {
    res.status(200);
    res.json(users);
})

router.post("/", (req, res) => {
    const newuser = req.body;
    newuser.id = users.length + 1;
    users.push(newuser);
    res.status(201).json(newuser);
})



router.put("/:id",(req,res)=>{
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

router.delete("/:id",(req,res)=>{
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

module.exports=router;