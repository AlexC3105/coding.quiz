var questions = [
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

var score = 0;
var questionsIndex = 0;
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");
var secondsLeft = 61;
var holdInterval = 0;
var penalty = 10;
var ulCreate = document.createElement("ul");

timer.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "!!! Out of Time !!!";
            }
        }, 1000);
    }
    render(questionsIndex);
});

function render(questionsIndex) {
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    for (var i = 0; i < questions.length; i++) {
        var userQuestions = questions[questionsIndex].title;
        var userChoices = questions[questionsIndex].choices;
        questionsDiv.textContent = userQuestions;
    }
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

function compare(event) {
    var element = event.target;
    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        if (element.textContent == questions[questionsIndex].answer) {
            score++;
            createDiv.textContent = "!!! Correct !!! it is in fact: " + questions[questionsIndex].answer;
        } else {
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "!!! Wrong !!! the correct answer is: " + questions[questionsIndex].answer;
        }
    }

    questionsIndex++;

    if (questionsIndex >= questions.length) {
        allDone();
        createDiv.textContent = "!!! You did it !!!" + "" + "Your got " + score + "/" + questions.length + " Correct.";
    } else {
        render(questionsIndex);
    }
    questionsDiv.appendChild(createDiv);
}

function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done"
    questionsDiv.appendChild(createH1);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");
    questionsDiv.appendChild(createP);

    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;
        questionsDiv.appendChild(createP2);
    }
}

var createLabel = document.createElement("label");
createLabel.setAttribute("id", "createLabel");
createLabel.textContent = "Please enter your initials: ";
questionsDiv.appendChild(createLabel);

var createInput = document.createElement("input");
createInput.setAttribute("type", "text");
createInput.setAttribute("id", "initials");
createInput.textContent = "";
questionsDiv.appendChild(createInput);

var createSubmit = document.createElement("button");
createSubmit.setAttribute("type", "submit");
createSubmit.setAttribute("id", "Submit");
createSubmit.textContent = "Submit";
questionsDiv.appendChild(createSubmit);

createSubmit.addEventListener("click", function () {
    var initials = createInput.value;
    if (initials === null) {
        console.log("Please enter your initials.");
    } else {
        var finalScore = {
            initials: initials,
            score: timeRemaining
        }
        console.log(finalScore);
        var allScores = localStorage.getItem(allScores);
        if (allScores === null) {
            allScores = [];
        } else {
            allScores = JSON.parse(allScores);
        }
        allScores.push(finalScore);
        var newScore = JSON.stringify(allScores);
        localStorage.setItem("allScores", newScore);
        window.location.replace("./highscore.html");
    }
});
