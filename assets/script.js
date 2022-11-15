// Global Variables
let startQuizbtn = document.querySelector("#startQuiz");
let questionDiv = document.querySelector("#questions");
let questions = [
  { title: "this is the first question?", choices: ["hi", "how", "do", "you"], answer: "hi" },
  { title: "this is the second question?", choices: ["hi2", "how2", "d2o", "you2"], answer: "you2" },
];
let questionsLength = (questions.length = 1);
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
    alert("Correct");
  }
});
