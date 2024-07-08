
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const inventory = new Map();

function askcommand() {
    console.log("inventory");
    console.log("commands: add,remove,search,update,summary,exit");
    rl.question("enter a command : ", function (command) {
        switch (command.trim().toLowerCase()) {
            case "add": additemprompt();
                break;
            case "remove": removeitemprompt();
                break;
            case "search": searchitemprompt();
                break;
            case "update": updateitemprompt();
                break;
            case "summary": printsummary();
                askcommand();
                break;
            case "exit": rl.close();
                break;
            default: console.log("invalid");
                askcommand();
                break;
        }
    })
}

function additemprompt(){
    rl.question("enter id : ", function(id){
        rl.question("enter name : ",function(name){
            rl.question("enter catagory : ",function(catagory){
                rl.question("enter quantity : ",function(quantity){
                    additem(id,name,catagory,parseInt(quantity));
                    askcommand();
                })
            })
        })
    })
}

function additem(id,name,catagory,quantity){
    if(inventory.has(id)){
        console.log("id already present");
    }
    else{
        inventory.set(id,{name,catagory,quantity});
        console.log(`item with id ${id} added`);
    }
}

function removeitemprompt(){
    rl.question("enter id : ",function(id){
        removeitem(id);
        askcommand();   
    })
}

function removeitem(id){
    if(inventory.has(id)){
        inventory.delete(id);
        console.log(`item with ${id} removed`);
    }
    else{
        console.log("id not found");
    }
}

function searchitemprompt(){
    rl.question("enter search term : ",function(searchterm){
        searchitem(searchterm);
        askcommand();
    })
}

function searchitem(searchterm){
    const result=[];
    for(const [id,item] of inventory){
        if(id.includes(searchterm)||item.name.includes(searchterm)||item.catagory.includes(searchterm)){
            result.push(id,...item)
        }
    }
    if(result.length>0){
        console.log("search result",result);
    }
    else{
        console.log("not found");
    }
}

function updateitemprompt(){
    rl.question("enter id ",function(id){
        rl.question("enter name : ",function(name){
            rl.question("enter catagory : ",function(catagory){
                rl.question("enter quantity : ",function(quantity){
                    updateitem(id,name,catagory,parseInt(quantity));
                    askcommand();
                })
            })
        })
    })
}

function updateitem(id,newname,newcatagory,newquantity){
    if(inventory.has(id)){
        const item =inventory.get(id);
        item.name= newname|| item.name;
        item.catagory=newcatagory|| item.catagory;
        item.quantity= newquantity!==undefined?newquantity:item.quantity;
        inventory.set(id,item);
        console.log(`item with ${id}updated`);
    }
    else{
        console.log("id not found");
    }
}

function printsummary(){
    if(inventory.size>0){
        console.log("inventory summary");
        for(const [id,item] of inventory){
            console.log(`id : ${id} , name : ${item.name} , catagory : ${item.catagory} , quantity: ${item.quantity}`);
    }
    }
    else
    {
        console.log("inventory empty");
    }
}

askcommand();