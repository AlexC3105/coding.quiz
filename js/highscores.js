const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const scores = document.querySelector("#scoreList");
function displayHighScore() {
    if (highScores.lenght > 0) {
        const storedScores = highScores.sort((a, b) => b.score - a.score);
        const highScoresList = document.createElement("ol");
        storedScores.forEach(score => {
            const listItem = document.createElement("li");
            listItem.textContent = `${score.initials}: ${score.score}`;
            highScoresList.appendChild(listItem);
        });
        scores.appendChild(highScoresList);
    } else {
        console.log("No HighScores Available !!!");
    }
}
displayHighScore()