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

let currentQuestionIndex = 0;
let count = codeQuestions.length * 5;
//let count = 5;

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

const constructAlert = function (className, text) {
  // construct div
  const alertDiv = document.createElement("div");
  alertDiv.setAttribute("class", className);
  alertDiv.textContent = text;

  return alertDiv;
};

const getFromLocalStorage = function (key, defaultValue) {
  const localStorageData = JSON.parse(localStorage.getItem(key));

  if (!localStorageData) {
    return defaultValue;
  } else {
    return localStorageData;
  }
};

const storeScore = function () {
  // get the count value
  const score = count;
  // get user initials from input
  const initials = document.getElementById("user-initials").value;
  // construct score object
  const scoreObject = {
    score: score,
    initials: initials,
  };

  // get from LS before inserting object
  const highscores = getFromLocalStorage("highscores", []);

  //insert the score object
  highscores.push(scoreObject);

  // write back to LS
  localStorage.setItem("highscores", JSON.stringify(highscores));
};

const constructForm = function () {
  const divContainer = document.createElement("div");
  divContainer.setAttribute("class", "container score-form");

  const form = document.createElement("form");

  const h2Element = document.createElement("h2");
  h2Element.setAttribute("class", "question");
  h2Element.textContent = "Your score is " + count;

  const formContainer = document.createElement("div");
  formContainer.setAttribute("class", "form-container");

  const formInputDiv = document.createElement("div");
  formInputDiv.setAttribute("class", "form-item");

  const formInput = document.createElement("input");
  formInput.setAttribute("placeholder", "Enter your initials");
  formInput.setAttribute("id", "user-initials");

  const formButtonDiv = document.createElement("div");
  formButtonDiv.setAttribute("class", "form-item");

  const formButton = document.createElement("button");
  formButton.setAttribute("class", "btn");
  formButton.textContent = "Submit";

  formInputDiv.append(formInput);
  formButtonDiv.append(formButton);

  formContainer.append(formInputDiv, formButtonDiv);

  form.append(h2Element, formContainer);
  divContainer.append(form);

  form.addEventListener("submit", storeScore);

  return divContainer;
};

const renderSuccessAlert = function () {
  // construct alert
  const alert = constructAlert(
    "container answer-alert answer-alert-success",
    "Congratulations, you are correct!!"
  );

  // append the alert to the document
  document.getElementById("alert-container").appendChild(alert);

  // declare a timeout function  (to remove the element)
  const afterWait = function () {
    // remove alert
    alert.remove();
    // kill timeout
    clearTimeout(delay);
  };

  // start timeout (delay)
  const delay = setTimeout(afterWait, 1000);
};

const renderDangerAlert = function () {
  //construct alert
  const alert = constructAlert(
    "container answer-alert answer-alert-danger",
    "Oops, You are incorrect!!"
  );

  // append the alert to the document
  document.getElementById("alert-container").appendChild(alert);

  // declare a timeout function  (to remove the element)
  const afterWait = function () {
    // remove alert
    alert.remove();
    // kill timeout
    clearTimeout(delay);
  };

  // start timeout (delay)
  const delay = setTimeout(afterWait, 1000);
};

const renderScoreForm = function () {
  // remove the last question
  removeQuestionContainer();

  // construct score for form
  const form = constructForm();

  // append form to document
  document.getElementById("main-container").append(form);
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
      document.getElementById("countdown").textContent = count;
      renderDangerAlert();
    } else {
      console.log("CORRECT");
      renderSuccessAlert();
    }
    // go to next question 0 1 2 (3)
    currentQuestionIndex += 1;

    // check if last question
    if (currentQuestionIndex < codeQuestions.length) {
      // render the next question
      removeQuestionContainer();
      renderQuestionContainer();
    } else {
      renderScoreForm();
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

const renderGameOver = function () {
  const divContainer = document.createElement("div");
  divContainer.setAttribute("class", "container game-over");

  const h2Element = document.createElement("h2");
  h2Element.textContent = "GAME OVER";

  divContainer.append(h2Element);

  document.getElementById("main-container").append(divContainer);
};

const startTimer = function () {
  // declare the timer tick function
  const timerTick = function () {
    if (currentQuestionIndex >= codeQuestions.length) {
      clearInterval(timer);
    } else if (count < 0) {
      clearInterval(timer);
      removeQuestionContainer();
      renderGameOver();
    } else {
      count -= 1;
      document.getElementById("countdown").textContent = count;
    }
  };
  // declare the timer
  const timer = setInterval(timerTick, 1000);
};

const initialLocalStorage = function () {
  const dataFormLS = JSON.parse(localStorage.getItem("highscores"));
  if (!dataFormLS) {
    localStorage.setItem("highscores", JSON.stringify([]));
  }
};

// function to execute when start button is called
const startQuiz = function () {
  // initialise local storage
  initialLocalStorage();
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
