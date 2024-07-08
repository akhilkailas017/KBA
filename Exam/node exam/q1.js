
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const data = new Map();

function askquestion() {
    console.log("Application to Manage a Student Database");
    console.log("enter commands : add,remove,update,search,summary,exit ");
    rl.question("enter the command : ", function (command) {
        switch (command.trim().toLowerCase()) {
            case "add": adddataprompt();
                break;
            case "remove": removedataprompt();
                break;
            case "update": updatedataprompt();
                break;
            case "search": searchdataprompt();
                break;
            case "summary": printsummary();
            askquestion();
                break;
            case "exit": rl.close();
                break;
            default: console.log("invalid command");
            askquestion();
            break;
        }
    })
}
function adddataprompt() {
    rl.question("enter id : ", function (id) {
        rl.question("enter student name : ", function (name) {
            rl.question("enter grade : ", function (grade) {
                adddata(id, name, grade);
                askquestion();
            })
        })
    })
}
function adddata(id, name, grade) {
    if (data.has(id)) {
        console.log("id already exists");
    }
    else {
        data.set(id, { name, grade });
        console.log(`${id} added successfully`);
    }
}

function removedataprompt() {
    rl.question("enter id : ", function (id) {
        removedata(id);
        askquestion();
    })
}

function removedata(id) {
    if (data.has(id)) {
        data.delete(id);
        console.log(`${id} removed successfully`);
    }
}

function updatedataprompt() {
    rl.question("enter id : ", function (id) {
        rl.question("enter student name : ", function (name) {
            rl.question("enter grade : ", function (grade) {
                updatedata(id, name, grade);
                askquestion();
            })
        })
    })
}

function updatedata(id, newname, newgrade) {
    if (data.has(id)) {
        let details = data.get(id);
        details.name = newname || details.name;
        details.grade = newgrade || details.grade;
        data.set(id, details);
        console.log(`${id} updated successfully`);
    }
    else {
        console.log("id does not exist");
    }
}

function searchdataprompt() {
    rl.question("enter search term :", function (searchterm) {
        searchdata(searchterm);
        askquestion();
    })
}

function searchdata(searchterm) {
    let result = [];
    for (const [id, details] of data) {
        if (id.includes(searchterm) || details.name.includes(searchterm)) {
            result.push({ id, ...details })
        }
    }
    if (result.length > 0) {
        console.log("result : ", result);
    }
    else {
        console.log("no result found");
    }
}

function printsummary(){
    if (data.size > 0) 
        {
            console.log("summary");
             for (const [id, details] of data) 
            {
            console.log(`id : ${id} ,  name : ${details.name} , grade : ${details.grade}`);
             }
         }
    else 
    {
        console.log("student data is  empty");
    }
}


askquestion();



