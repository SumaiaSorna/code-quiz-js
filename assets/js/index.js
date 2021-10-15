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

const constructOptions = function (options) {
  const optionContainer = document.createElement("div");
  optionContainer.setAttribute("class", "options-container");

  for (let i = 0; i < options.length; i++) {
    // get the current option from array
    const option = options[i];

    // create my button
    const optionButton = document.createElement("button");
    optionButton.setAttribute("class", "option-item");
    optionButton.textContent = option;

    // append to optionsContainer
    optionContainer.appendChild(optionButton);
  }

  return optionContainer;
};

const constructQuestionContainer = function (question) {
  console.log(question);

  // construct container div

  const questionContainer = document.createElement("div");
  questionContainer.setAttribute("class", "container question-container");

  // construct h2 element

  const questionH2 = document.createElement("h2");
  questionH2.setAttribute("class", "question");
  questionH2.textContent = question.title;

  // construct options div
  const options = constructOptions(question.options);
  console.log(options);

  // appending h2 and options div to container div

  questionContainer.append(questionH2, options);
  return questionContainer;
};

//  render question container
const renderQuestionContainer = function () {
  console.log("renderQuestionContainer");

  // get the current question
  const currentQuestion = codeQuestions[0];

  // construct the HTML for the question container
  const questionContainer = constructQuestionContainer(currentQuestion);
  // append the container to the document
  document.getElementById("main-container").appendChild(questionContainer);
};

const removeStartContainer = function () {
  console.log("removeStartContainer");
  // target start container
  const startContainer = document.getElementById("start-container");
  console.log(startContainer);
  // remove from container
  startContainer.remove();
};

const startTimer = function () {
  // declare the timer
  const timer = setInterval(timerTick, 1000);
  // declare the timer tick function
  //......................................................................
};
// function to execute when start button is called
const startQuiz = function () {
  // remove start container
  removeStartContainer();

  // render question container
  renderQuestionContainer();

  // start timer
  starTimer();
};

// target the start quiz button
const startButton = document.getElementById("start-quiz");

// add a click event listener and start quiz
startButton.addEventListener("click", startQuiz);
