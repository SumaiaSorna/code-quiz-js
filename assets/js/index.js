const codeQuestions = [
  {
    title: "The # symbol specifies that the selector is?",
    options: ["class", "tag", "first", "id"],
    correctAnswer: "id",
  },
  {
    title: "Which of the following tags is used to insert a blank line?",
    options: ["<br>", "<h1>", "<hr>", "<p>"],
    correctAnswer: "<br>",
  },
  {
    title: "What does CSS stand for?",
    options: [
      "Custom Style Sheets",
      "Computer Style Sheets",
      "Colorful Style Sheets",
      "Cascading Style Sheets",
    ],
    correctAnswer: "Cascading Style Sheets",
  },
];

const constructQuestionContainer = function (question) {
  console.log(question);

  // construct container div

  const questionContainer = document.createElement("div");
  questionContainer.setAttribute("class", "container question-container");
  console.log(questionContainer);

  // construct h2 element

  // construct options div
};

//  render question container
const renderQuestionContainer = function () {
  console.log("renderQuestionContainer");

  // get the current question
  const currentQuestion = codeQuestions[0];

  // construct the HTML for the question container
  constructQuestionContainer(currentQuestion);
  // append the container to the document
};

const removeStartContainer = function () {
  console.log("removeStartContainer");
  // target start container
  const startContainer = document.getElementById("start-container");
  console.log(startContainer);
  // remove from container
  startContainer.remove();
};

// function to execute when start button is called
const startQuiz = function () {
  console.log("startQuiz");
  // remove start container
  removeStartContainer();

  // render question container
  renderQuestionContainer();
};

// target the start quiz button
const startButton = document.getElementById("start-quiz");

// add a click event listener and start quiz
startButton.addEventListener("click", startQuiz);
