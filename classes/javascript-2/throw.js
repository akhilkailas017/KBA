let age;

function checkAge(){

    if(age <18){
        throw new Error("you must be 18 or older");
    } else {
        console.log("you are allowed");
    }
}

try{
    checkAge(16);
} catch (error){
    console.log("error "+error.message);
} finally{
    console.log("this always executed");
}