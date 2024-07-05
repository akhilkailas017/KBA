const readline=require("readline");
const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
});
const inventory=new Map();
function askcommand(){
    console.log("welcome to the inventory management cli");
    console.log("available commands: add,remove,search,update,summary,exit");
    rl.question("\Enter a command",function(command){
        switch(command.trim().toLowerCase()){
            case "add":
                additemprompt();
                break;
            case "remove":
                removeitemprompt();
                break;
            case "search":
                searchitemprompt();
                break;
            case "update":
                updateitemprompt();
                break;
            case "summary":
                printsummary();
                askcommand();
                break;
            case "exit":
                rl.close();
                break;
            default:
                console.log("invalid command please try again!");
                askcommand();
                break;
        }
    })
}
//add item prompt
function additemprompt(){
    rl.question("enter item id : ",function(id){
        rl.question("enter item name : ",function(name){
            rl.question("enter item category : ",function(catagory){
                rl.question("enter item quantity : ",function(quantity){
                    additem(id,name,catagory,parseInt(quantity));
                    askcommand();
                })
            })
        })
    })
}
// const inventory = new Map();
// function to add an item
function additem(id, name, category, quantity) {
    if (inventory.has(id)) {
        console.log(`error item with id ${id} already exist.`);
    }
    else {
        inventory.set(id, { name, category, quantity });
        console.log(`item with id ${id} added`)
    }
}
// function to remove an item 
function removeitem(id) {
    if (inventory.has(id)) {
        inventory.delete(id);
        console.log(`item with id ${id} removed`);
    }
    else {
        console.log(`error item with id ${id} not found`);
    }
}
// function to search for items
function searchitems(searchterm) {
    const results = [];
    for (const [id, item] of inventory) {
        if (id.includes(searchterm) || item.name.includes(searchterm) || item.category.includes(searchterm)) {
            results.push({ id, ...item });
        }
    }
    if (results.length > 0) {
        console.log("search result:", results);
    }
    else {
        console.log("item not found");
    }
}
// function to update an item
function updateitem(id,newname,newcategory,newquantity){
    if(inventory.has(id)){
        const item=inventory.get(id);
        item.name=newname || item.name;
        item.category=newcategory || item.category;
        item.quantity=newquantity !==undefined ? newquantity : item.quantity;
        inventory.set(id,item);
        console.log(`item with id ${id} updated`);
    }
    else{
        console.log(`error item with id ${id} not found`);
    }
}
//function to print a summary report of all items
function printsummary(){
    if(inventory.size>0){
        console.log("inventory summary");
        for(const [id,item] of inventory){
            console.log(`id ${id},name: ${item,name}, category:${item,category},quantity: ${item,quantity}`);
        }
    }
    else{
        console.log("inventory is empty.")
    }
}

askcommand()