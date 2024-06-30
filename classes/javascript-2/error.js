try{
    //code that might cause error
    let result=riskyOperation();
    console.log(result);
} catch(error){
    //code to handle error
    console.log("an error occured"+error.message);
} finally {
    //code that runs regardless of error
    console.log("this will always run");
}

function riskyOperation(){
    let obj;
    return obj.property;
}
