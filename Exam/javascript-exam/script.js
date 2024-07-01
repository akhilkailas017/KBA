let recipes=[];
let difficultys=[];

function addrecipe(){

    

    const recipeinput = document.getElementById("recipe");
    const difficultyinput = document.getElementById("difficulty");
    const recipelist =document.getElementById("recipelist");

    

    let recipe = recipeinput.value.trim();
    const difficulty = Number(difficultyinput.value.trim());

    if (recipe !== '' && !isNaN(difficulty) && difficulty >= 1 && difficulty <= 3) {

        recipes.push(recipe);
        difficultys.push(difficulty);

        const li=document.createElement("li");
        li.textContent=recipe;

        switch(difficulty){
            case 1: li.classList.add("easy");
            break;
            case 2: li.classList.add("moderate");
            break;
            case 3: li.classList.add("hard");
            break
        }

        const completebtn=document.createElement("button");
        completebtn.textContent="Complete";
        completebtn.onclick= function (){
            
            li.classList.toggle("complete");
        }
        li.appendChild(completebtn);


        const editbtn = document.createElement('button');
        editbtn.textContent = 'editbtn';
        editbtn.onclick = function () {
            let newrecipe = prompt('Enter the new Recipe name : ', recipe);
            if (newrecipe !== null && newrecipe.trim() !== '') {
                const recipeIndex = recipes.indexOf(recipe);
                recipes[recipeIndex] = newrecipe;
                li.firstChild.textContent = newrecipe;
                recipe = newrecipe;
            }
        };
        li.appendChild(editbtn);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = function () {
            recipelist.removeChild(li);
            const recipeIndex = recipes.indexOf(recipe);
            recipes.splice(recipeIndex, 1);
            difficultys.splice(recipeIndex, 1);
        };

        li.appendChild(removeButton);

        
        recipelist.appendChild(li);
        recipeinput.value = '';
        difficultyinput.value = '';

    }
}