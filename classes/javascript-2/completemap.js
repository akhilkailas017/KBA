let itemmap=new Map();

itemmap.set(1,"Item 1");
itemmap.set(2,"Item 2");
itemmap.set(3,"Item 3");

function displayitems(map){

    let itemlist = document.getElementById("itemlist");
    itemlist.innerHTML="";

    map.forEach((value,key)=>{

        let listitem=document.createElement("li");
        listitem.textContent=`${key} : ${value}`;

        let editbutton=document.createElement("button");
        editbutton.textContent="Edit";
        editbutton.onclick=()=>edititem(key);

        let deletebutton=document.createElement("button");
        deletebutton.textContent="Delete";
        deletebutton.onclick=()=>deleteitem(key);

        let controlsdiv=document.createElement("div");
        controlsdiv.className="controls";

        controlsdiv.append(editbutton);
        controlsdiv.append(deletebutton);

        listitem.appendChild(controlsdiv)
        itemlist.appendChild(listitem);
    })
}

function additem(key,value){
    itemmap.set(key,value);
    displayitems(itemmap);
}

function edititem(key){
    let newvalue=prompt("Enter new value",itemmap.get(key));
    if(newvalue!==null){
        itemmap.set(key,newvalue);
        displayitems(itemmap);
    }
}

function deleteitem(key){
    itemmap.delete(key);
    displayitems(itemmap);
}

document.getElementById("additemform").addEventListener("submit",(e)=>{
    e.preventDefault();
    let key=document.getElementById("itemkey").value;
    let value=document.getElementById("itemvalue").value;
    additem(key,value);
    document.getElementById("additemform").reset();
})

window.onload=()=>{
    displayitems(itemmap);
}