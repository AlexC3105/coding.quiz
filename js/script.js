const startBtn = document.querySelector("#start-btn");
const questionsDisplay = document.querySelector("#questions");
const initialInput = document.querySelector("#initial-form");
const timer = document.querySelector("#timer");
const form = document.querySelector("#form");

let currentQuestion = {}
let availableQuestions = []
let questionCounter = 0
let acceptingAnswers = true
let time = 60;
let score = 0;

let questions = [
    {
        question: "What does HTML stand for:",
        choice1: "Hypertext Markup Language",
        choice2: "Hey Too Much Layout",
        choice3: "Hit The Mother Load",
        choice4: "Hieroglyphics To Machine Legible",
        answer: "1"
    },

    {
        question: "What does CSS do to a Web page:",
        choice1: "Add Style",
        choice2: "Add Interaction",
        choice3: "Chicken Salad Sandwich",
        choice4: "Dims Your Screen",
        answer: "1"
    },

    {
        question: "What does JavaScript dgo:",
        choice1: "Animate Websites",
        choice2: "Make Phone Apps",
        choice3: "Invokes Functions",
        choice4: "All of the above",
        answer: "4"
    },

    {
        question: "What function is used to print messages on the console:",
        choice1: "console.log",
        choice2: "console.com",
        choice3: "console.print",
        choice4: "console.web",
        answer: "1"
    },

    {
        question: "What is considered the Basement of a Web page:",
        choice1: "HTML",
        choice2: "CSS",
        choice3: "JavaScript",
        choice4: "HTTP",
        answer: "1"
    },
]

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
    currentQuestion = availableQuestions[questionsIndex];
    questionDisplay.innerText = "";
    questionDisplay.style.display = "flex";
    const prompt = `
     <p>${currentQuestion.question}</p>
      <div id="choiceSelection">
       <button data-choice="1">${currentQuestion.choice1}</button>
       <button data-choice="2">${currentQuestion.choice2}</button>
       <button data-choice="3">${currentQuestion.choice3}</button>
       <button data-choice="4">${currentQuestion.choice4}</button>
      </div>`;
    questionDisplay.innerHTML = prompt;
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
        questionDisplay.appendChild(correct);
    } else {
        time = time - 100;
        const incorrect = document.createElement("h3");
        incorrect.style.color = "red";
        incorrect.textContent = "Try Again !!!";
        questionDisplay.appendChild(incorrect);
    }
    availableQuestions.splice(questionsIndex, 1);
    if (availableQuestions.lenght === 0) {
        setTimeout(() => {
            endQuiz();
        }, 1000);
    } else {
        setTimeout(() => {
            buildQuestion();
        }, 1000);
    }
}

function endQuiz() {
    score = time;
    questionDisplay.style.display = "none";
    timer.style.display = "none";
    form.style.display = "block";
    score = (score >= 0 ? score : 0);
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