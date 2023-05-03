let questions = [
    {
        title: "What does HTML stand for:",
        choices: ["Hypertext Markup Language", "Hey Too Much Layout", "Hit The Mother Load", "Hieroglyphics To Machine Legible"],
        answer: "Hypertext Markup Language"
    },

    {
        title: "What does CSS do to a Web page:",
        choices: ["Add Style", "Add Interaction", "Chicken Salad Sandwich", "Dims Your Screen"],
        answer: "Add Style"
    },

    {
        title: "What does JavaScript dgo:",
        choices: ["Animate Websites", "Make Phone Apps", "Invokes Functions", "All of the above"],
        answer: "All of the above"
    },

    {
        title: "What function is used to print messages on the console:",
        choices: ["console.log", "console.com", "console.print", "console.web"],
        answer: "console.log"
    },

    {
        title: "What is considered the Basement of a Web page:",
        choices: ["HTML", "CSS", "JavaScript", "HTTP"],
        answer: "HTML"
    },
];

let currentQuestion = {};
let availableQuestions = [];
let questionCounter = 0;
let acceptingAnswers = true;
let time = 60;
let score = 0;

const startBtn = document.querySelector("#start-btn");
const questionsDisplay = document.querySelector("#questions");
const initialInput = document.querySelector("#initial-form");
const timer = document.querySelector("#timer");
const form = document.querySelector("#form");

form.style.display = "none"

startBtn.addEventListener("click", () => {
    questionCounter = 0
    availableQuestions = [...questions]
    buildQuestion();
    setInterval(() => {
        time--;
        timer.innerText = "Time:" + time;
        if (time <= 0) {
            endQuiz();
        }
    }, 1000);
});

function buildQuestion() {
    if (time <= 0) {
        endQuiz()
        return;
    }
    const questionIndex = Math.floor(Math.random() * availableQuestions.lenght);
    currentQuestion = availableQuestions[questionIndex];
    questionsDisplay.innerText = "";
    questionsDisplay.style.display = "flex";
    const prompt = `
    <p>${currentQuestion.question}</p>
    <div id="choiceSelection">
    <button data-choice="1">${currentQuestion.choice1}</button>
    <button data-choice="2">${currentQuestion.choice2}</button>
    <button data-choice="3">${currentQuestion.choice3}</button>
    <button data-choice="4">${currentQuestion.choice4}</button>
    </div>`;
    questionsDisplay.innerHTML = prompt;
    const choiceSelection = document.querySelector("#choiceSelection");
    choiceSelection.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", () => {
            checkAnswer(currentQuestion, questionIndex, availableQuestions, button);
        });
    });
}
function checkAnswer(currentQuestion, questionIndex, availableQuestions, button) {
    if (button.dataset.choice === currentQuestion.answer) {
        const correct = document.createElement("h3");
        correct.style.color = "green";
        correct.textContent = "Correct !!!";
        questionsDisplay.appendChild(correct);
    } else {
        time = time - 100;
        const incorrect = document.createElement("h3");
        incorrect.style.color = "red";
        incorrect.textContent = "Try Again !!!";
        questionsDisplay.appendChild(incorrect);
    }
    if (availableQuestions.lenght === 0) {
        setTimeout(() => {
            endQuiz();
        }, 1000);
    }
}
function endQuiz() {
    score = time;
    questionsDisplay.style.display = "none";
    timer.style.display = "none";
    form.style.display = "block";
    score = (score >= 0 ? score = 0);
    document.querySelector("#final-score").innerText = "Your Score is: " + score;
}
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const initials = initialInput.value;
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ initials, score });
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.href = "./highscores.html";
});