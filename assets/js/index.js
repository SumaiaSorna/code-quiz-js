const codeQuestions = [
  {
    title: "The # symbol specifies that the selector is?",
    options: ["class", "tag", "first", "id"],
    correctOption: "id",
  },
  {
    title: "Which of the following tags is used to insert a blank line?",
    options: ["<br>", "<h1>", "<hr>", "<p>"],
    correctOption: "<br>",
  },
  {
    title: "What does CSS stand for?",
    options: [
      "Custom Style Sheets",
      "Computer Style Sheets",
      "Colorful Style Sheets",
      "Cascading Style Sheets",
    ],
    correctOption: "Cascading Style Sheets",
  },
];

let count = codeQuestions.length * 5;

let currentQuestionIndex = 0;

const constructOptions = function (options) {
  const optionContainer = document.createElement("div");
  optionContainer.setAttribute("class", "options-container");

  for (let i = 0; i < options.length; i++) {
    // get the current option from array
    const option = options[i];

    // create my button
    const optionButton = document.createElement("button");
    optionButton.setAttribute("class", "option-item");
    optionButton.setAttribute("name", "option");
    optionButton.setAttribute("data-option", option);
    optionButton.textContent = option;

    // append to optionsContainer
    optionContainer.appendChild(optionButton);
  }

  return optionContainer;
};
const verifyAnswer = function (event) {
  const target = event.target;
  const currentTarget = event.currentTarget;

  // check if click is from button ONLY
  if (target.getAttribute("name") === "option") {
    // get the option user clicked on
    const userOption = target.getAttribute("data-option");

    // get the correct option for the question
    const correctOption = currentTarget.getAttribute("data-correct");

    console.log(userOption, correctOption);

    // verify the 2
    if (userOption !== correctOption) {
      // time penalty deduct 5 seconds
      count -= 5;
    } else {
      console.log("CORRECT");
    }
    // go to next question 0
    currentQuestionIndex += 1;

    // check if last question
    if (currentQuestionIndex < codeQuestions.length) {
      // render the next question
      removeQuestionContainer();
      renderQuestionContainer();
    } else {
      console.log("render score form");
    }
  }
};

const constructQuestionContainer = function (question) {
  // construct container div

  const questionContainer = document.createElement("div");
  questionContainer.setAttribute("class", "container question-container");
  questionContainer.setAttribute("id", "question-container");
  questionContainer.setAttribute("data-correct", question.correctOption);

  // construct h2 element

  const questionH2 = document.createElement("h2");
  questionH2.setAttribute("class", "question");
  questionH2.textContent = question.title;

  // construct options div
  const options = constructOptions(question.options);

  // appending h2 and options div to container div

  questionContainer.append(questionH2, options);

  // add event listener to listen for click events
  questionContainer.addEventListener("click", verifyAnswer);
  return questionContainer;
};

//  render question container
const renderQuestionContainer = function () {
  // get the current question
  const currentQuestion = codeQuestions[currentQuestionIndex];

  // construct the HTML for the question container
  const questionContainer = constructQuestionContainer(currentQuestion);
  // append the container to the document
  document.getElementById("main-container").appendChild(questionContainer);
};

const removeStartContainer = function () {
  // target start container
  const startContainer = document.getElementById("start-container");

  // remove from container
  startContainer.remove();
};

const removeQuestionContainer = function () {
  // target question container
  const questionContainer = document.getElementById("question-container");

  // remove from container
  questionContainer.remove();
};

const startTimer = function () {
  // declare the timer tick function
  const timerTick = function () {
    // check if the countdown has reached 0
    if (count >= 0 && currentQuestionIndex < codeQuestions.length) {
      // render the countdown time in the document

      document.getElementById("countdown").textContent = count;
      count -= 1;
    } else {
      // render game over container
      console.log("GAME OVER");
      clearInterval(timer);
    }
  };
  // declare the timer
  const timer = setInterval(timerTick, 1000);
};

// function to execute when start button is called
const startQuiz = function () {
  // remove start container
  removeStartContainer();

  // render question container
  renderQuestionContainer();

  // start timer
  startTimer();
};

// target the start quiz button
const startButton = document.getElementById("start-quiz");

// add a click event listener and start quiz
startButton.addEventListener("click", startQuiz);
