// Global Variables
let startQuizbtn = document.querySelector("#startQuiz");
let questionDiv = document.querySelector("#questions");
let questions = [
  { title: "How many words are in the sentence?", choices: ["5", "6", "7", "8"], answer: "7" },
  { title: "What goes into a toaster?", choices: ["Toast", "Grilled Cheese", "Plates", "Bread"], answer: "Bread" },
  { title: "What is 10*2-6*2", choices: ["28", "-100", "8", "-80"], answer: "8" },
  { title: "How many times does a biweekly employee get paid in a year?", choices: ["26", "52", "13", "2"], answer: "26" },
];
let questionsIndex = 1;
let questionsLength = questions.length;
let correctIndex = 0;

// Functions
function startQuiz() {
  createButtons(0);
}
// put in question 1
function createButtons(index) {
  let title = document.createElement("h2");
  title.textContent = questions[index].title;
  questionDiv.appendChild(title);

  //   Add 4 answer Options
  let buttonOne = document.createElement("button");
  buttonOne.textContent = questions[index].choices[0];
  buttonOne.dataset.answer = questions[index].answer;
  //   buttonOne.dataset.correctIndex = questionsIndex;
  questionDiv.appendChild(buttonOne);

  let buttonTwo = document.createElement("button");
  buttonTwo.textContent = questions[index].choices[1];
  buttonTwo.dataset.answer = questions[index].answer;
  questionDiv.appendChild(buttonTwo);

  let buttonThree = document.createElement("button");
  buttonThree.textContent = questions[index].choices[2];
  buttonThree.dataset.answer = questions[index].answer;
  questionDiv.appendChild(buttonThree);

  let buttonFour = document.createElement("button");
  buttonFour.textContent = questions[index].choices[3];
  buttonFour.dataset.answer = questions[index].answer;
  questionDiv.appendChild(buttonFour);
}
// Function Calls
startQuizbtn.addEventListener("click", startQuiz);

questionDiv.addEventListener("click", function (event) {
  console.log(event);
  let choice = event.target.innerHTML;
  let answer = event.target.dataset.answer;

  if (choice === answer) {
    if (questionsIndex < questionsLength) {
      alert("Correct");
      createButtons(questionsIndex);
      questionsIndex++;
    } else {
      alert("Game Over");
    }
  }
});
