const quiz = [
    {
        question: "What is the capital of France?",
        answers: ["Paris", "London", "Berlin", "Madrid"],
        correct: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: "Mars"
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correct: "Pacific"
    }
];

document.addEventListener('DOMContentLoaded', function () {
    showQuestion();
});

let x = 0, mark = 0;
function showQuestion() {
    document.getElementById("question").innerHTML = quiz[x].question;


    for (let i = 0; i < quiz[x].answers.length; i++) {
        const radio = document.createElement("input");
        radio.setAttribute("type", "radio");
        radio.setAttribute("name", "answer");
        radio.setAttribute("value", quiz[x].answers[i]);
        const label = document.createElement("label");
        label.innerHTML = quiz[x].answers[i];
        label.setAttribute("for", `answer${i}`);
        label.setAttribute("class", "answer");

        document.getElementById("answers").appendChild(radio);
        document.getElementById("answers").appendChild(label);
    }
}

function nextQuestion() {
    x++;

    if (x < quiz.length) {
        document.getElementById("answers").innerHTML = " "
        showQuestion();
    } else {
        const btnnext = document.getElementById("next-btn");
        btnnext.remove();
        document.getElementById("question").innerHTML = " ";
        document.getElementById("answers").innerHTML = " ";
        const score = document.getElementById("score");
        score.innerHTML = `<h2> Your score is ${mark} out of ${quiz.length
            } </h2>`;

        for(i=0;i<quiz.length;i++){
        const out = document.createElement("p");
        out.innerHTML = quiz[x].answers[i];
        out.setAttribute("class", "answer");
        document.getElementById("answers").appendChild(out);
        }

    }
}

function ansclick() {
    let answer = document.querySelector('input[name="answer"]:checked').value;
    if (answer == quiz[x].correct) {
        mark++;
    }
    // nextQuestion();
}