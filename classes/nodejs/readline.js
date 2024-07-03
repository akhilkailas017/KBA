const readline = require("readline");

// create an interface to read data from standard input (stdin) and standard output (stdout)

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function askname() {
    rl.question("what is your name ", function (name) {
        console.log(`hello, ${name}!`);
        askFavoriteLanguage();
    });
}

function askFavoriteLanguage() {
    rl.question(
        "what is your favorite programming language ",
        function (language) {
            console.log(`${language} is a great choice`);
            rl.close();
        });
}

console.log("welcome to simple cli using readline");
askname();
