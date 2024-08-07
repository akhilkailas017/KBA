const inventory = new Map();
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
//hardcode values
//adding item
additem("1","laptop","electronics",10);
additem("2","chair","furniture",100);
additem("3","notebook","stationary",100);
//removing an item
removeitem("2");
//searching for an item
searchitems("laptop");
searchitems("stationary");
searchitems("1");
//updating an item
updateitem("1","gaming laptop","electronics",8);