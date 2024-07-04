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
        if (id.includes(searchterm) || item.name.includes(searchterm) || item.category.includes(searchterm) || item.quantity.includes(searchterm)) {
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