// Global Variables
let startQuizbtn = document.querySelector("#startQuiz");
let questionDiv = document.querySelector("#questions");
let starter = document.querySelector("#starter");
let initialBox = document.querySelector("#initials");
let submitInitialsBtn = document.querySelector("#submitInitials");
let playAgainBtn = document.querySelector("#playAgain");
let timerElement = document.querySelector("#timerDisplay");
let viewScores = document.querySelector("#viewScores");
let showScores = document.querySelector("#viewHighScoreBtn");
let questions = [
  { title: "How many words are in the sentence?", choices: ["5", "6", "7", "8"], answer: "7" },
  { title: "What goes into a toaster?", choices: ["Toast", "Grilled Cheese", "Plates", "Bread"], answer: "Bread" },
  { title: "What is 10*2-6*2", choices: ["28", "-100", "8", "-80"], answer: "8" },
  { title: "How many times does a biweekly employee get paid in a year?", choices: ["26", "52", "13", "2"], answer: "26" },
];
let questionsIndex = 1;
let questionsLength = questions.length;
let correctIndex = 0;
let timer;
let timerCount;
let scores = JSON.parse(localStorage.getItem("scores")) || [];
let topTen = 0;

// Functions

// Start Quiz Button
function startQuiz() {
  if (scores.length !== 10) {
    topTen = 1;
  } else {
    topTen = scores[scores.length - 1].score;
  }
  createButtons(0);
  starter.style.display = "none";
  playAgainBtn.innerHTML = "";
  viewScores.innerHTML = "";
  submitInitialsBtn.innerHTML = "";
  initialBox.innerHTML = "";
  timerCount = 30;
  startTimer();
}
// Timer Start
function startTimer() {
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;
    let timerPct = timerCount / 30;
    document.querySelector("#timerBar").style.width = timerPct * 100 + "%";
    console.log(timerPct + "%");
    if (timerCount <= 10 && timerCount > 0) {
      timerElement.style.color = "red";
    } else if (timerCount > 10) {
      timerElement.style.color = "green";
    } else if (timerCount === 0) {
      gameOver();
      clearInterval(timer);
    }
  }, 1000);
}

// put in question 1
function createButtons(index) {
  let title = document.createElement("h2");
  title.textContent = questions[index].title;
  title.setAttribute("id", "title");
  questionDiv.appendChild(title);

  //   Add 4 answer Options
  let buttonOne = document.createElement("button");
  buttonOne.textContent = questions[index].choices[0];
  buttonOne.dataset.answer = questions[index].answer;
  buttonOne.setAttribute("id", "btnOne");
  buttonOne.setAttribute("class", "button");
  //   buttonOne.dataset.correctIndex = questionsIndex;
  questionDiv.appendChild(buttonOne);

  let buttonTwo = document.createElement("button");
  buttonTwo.textContent = questions[index].choices[1];
  buttonTwo.dataset.answer = questions[index].answer;
  buttonTwo.setAttribute("id", "btnTwo");
  buttonTwo.setAttribute("class", "button");
  questionDiv.appendChild(buttonTwo);

  let buttonThree = document.createElement("button");
  buttonThree.textContent = questions[index].choices[2];
  buttonThree.dataset.answer = questions[index].answer;
  buttonThree.setAttribute("id", "btnThree");
  buttonThree.setAttribute("class", "button");
  questionDiv.appendChild(buttonThree);

  let buttonFour = document.createElement("button");
  buttonFour.textContent = questions[index].choices[3];
  buttonFour.dataset.answer = questions[index].answer;
  buttonFour.setAttribute("id", "btnFour");
  buttonFour.setAttribute("class", "button");
  questionDiv.appendChild(buttonFour);
}

// Replace Buttons for Questions >1
function replaceButtons(index) {
  let title = document.getElementById("title");
  title.textContent = questions[index].title;

  let buttonOne = document.getElementById("btnOne");
  buttonOne.textContent = questions[index].choices[0];
  buttonOne.dataset.answer = questions[index].answer;
  buttonOne.classList.remove("bgc_red");

  let buttonTwo = document.getElementById("btnTwo");
  buttonTwo.textContent = questions[index].choices[1];
  buttonTwo.dataset.answer = questions[index].answer;
  buttonTwo.classList.remove("bgc_red");

  let buttonThree = document.getElementById("btnThree");
  buttonThree.textContent = questions[index].choices[2];
  buttonThree.dataset.answer = questions[index].answer;
  buttonThree.classList.remove("bgc_red");

  let buttonFour = document.getElementById("btnFour");
  buttonFour.textContent = questions[index].choices[3];
  buttonFour.dataset.answer = questions[index].answer;
  buttonFour.classList.remove("bgc_red");
}

// Game Over Function
function gameOver() {
  questionDiv.innerHTML = "";
  viewScores.innerHTML = "";
  clearInterval(timer);
  questionsIndex = 1;

  if (topTen <= timerCount && timerCount !== 0) {
    let enterBox = document.createElement("input");
    enterBox.setAttribute("placeholder", "ENTER YOUR INITIALS");
    enterBox.setAttribute("id", "initialsInput");
    enterBox.setAttribute("class", "textInput");
    initialBox.appendChild(enterBox);

    let submitBtn = document.createElement("button");
    submitBtn.textContent = "SUBMIT YOUR HIGH SCORE";
    submitBtn.setAttribute("class", "button");
    submitInitialsBtn.appendChild(submitBtn);
  } else {
    let again = document.createElement("button");
    again.textContent = "PLAY AGAIN?";
    again.setAttribute("class", "button");

    playAgainBtn.appendChild(again);
  }
}
// DisplayScores
function displayScores(event) {
  submitInitialsBtn.innerHTML = "";
  initialBox.innerHTML = "";
  starter.style.display = "flex";
  playAgainBtn.innerHTML = "";
  questionDiv.innerHTML = "";
  clearInterval(timer);
  event.preventDefault();
  scores.forEach((scr) => {
    viewScores.innerHTML += `${scr.name}: ${scr.score} <br>`;
  });
}

// Submit High Score
function submitHighScore() {
  let name = document.querySelector("#initialsInput").value;
  let score = timerCount;
  let userScore = {
    name: name,
    score: score,
  };
  scores.push(userScore);
  scores.sort((score1, score2) => {
    return score1.score < score2.score ? 1 : -1;
  });
  let topTenScores = scores.slice(0, 10);
  console.log(topTenScores);
  localStorage.setItem("scores", JSON.stringify(topTenScores));

  // Reset to Start again
  submitInitialsBtn.innerHTML = "";
  initialBox.innerHTML = "";
  let again = document.createElement("button");
  again.textContent = "PLAY AGAIN?";
  again.setAttribute("class", "button");
  playAgainBtn.appendChild(again);
}
// Function Calls
startQuizbtn.addEventListener("click", startQuiz);
playAgainBtn.addEventListener("click", startQuiz);
submitInitialsBtn.addEventListener("click", submitHighScore);
showScores.addEventListener("click", displayScores);

questionDiv.addEventListener("click", function (event) {
  console.log(event);
  let choice = event.target.innerHTML;
  let answer = event.target.dataset.answer;

  if (choice === answer) {
    if (questionsIndex < questionsLength) {
      replaceButtons(questionsIndex);
      questionsIndex++;
    } else {
      gameOver();
    }
  } else {
    event.target.classList.add("bgc_red");
    if (timerCount >= 10) {
      timerCount = timerCount - 10;
    } else {
      timerCount = 0;
      gameOver();
    }
  }
});
