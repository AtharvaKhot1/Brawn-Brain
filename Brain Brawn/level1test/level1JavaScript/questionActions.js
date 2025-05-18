const attackButton = document.getElementById("attackButton");
const blockButton = document.getElementById("blockButton");
const modal = document.getElementById("questionModal");
const questionText = document.getElementById("questionText");
const optionButtons = document.querySelectorAll(".option-button");
const feedbackEl = document.getElementById("feedback");

let currentAction = "";
let currentQuestion = null;
let optionsMapping = {};
let isDefending = false;
let enemyReadyToStrike = false;

attackButton.addEventListener("click", () => displayQuestion("attack"));
blockButton.addEventListener("click", () => displayQuestion("block"));

function displayQuestion(action) {
  currentAction = action;
  const questions = getQuestions();
  currentQuestion =
    questions.easy[Math.floor(Math.random() * questions.easy.length)];

  questionText.textContent = currentQuestion.questionText;
  const options = currentQuestion.options;
  optionsMapping = {};

  for (let i = 0; i < options.length; i++) {
    const letter = String.fromCharCode(65 + i);
    optionsMapping[letter] = options[i];
    document.getElementById(
      `option${letter}`
    ).textContent = `${letter}: ${options[i]}`;
  }

  optionButtons.forEach((button) => {
    button.removeAttribute("data-selected");
    button.removeAttribute("data-correct");
    button.removeAttribute("data-incorrect");
  });

  feedbackEl.className = "feedback";
  feedbackEl.textContent = "";
  feedbackEl.style.display = "none";

  modal.style.display = "flex";

  optionButtons.forEach((button) => {
    button.onclick = function () {
      handleOptionSelection(this.getAttribute("data-option"));
    };
  });
}

function handleOptionSelection(selectedOption) {
  const selectedAnswer = optionsMapping[selectedOption];
  const correctAnswer = currentQuestion.correctAnswer;
  const isCorrect = selectedAnswer === correctAnswer;

  optionButtons.forEach((button) => {
    button.removeAttribute("data-selected");
    button.removeAttribute("data-correct");
    button.removeAttribute("data-incorrect");
  });

  const selectedButton = document.querySelector(
    `.option-button[data-option="${selectedOption}"]`
  );
  selectedButton.setAttribute("data-selected", "true");

  const correctOption = Object.keys(optionsMapping).find(
    (key) => optionsMapping[key] === correctAnswer
  );
  const correctButton = document.querySelector(
    `.option-button[data-option="${correctOption}"]`
  );

  if (isCorrect) {
    selectedButton.setAttribute("data-correct", "true");
    if (isDefending) {
      feedbackEl.textContent = "You blocked the attack! Minimal damage taken.";
      playerHealth -= 5;
    } else {
      feedbackEl.textContent = `Correct! Performing ${currentAction}.`;
      performAction(currentAction);
      enemyReadyToStrike = true;
    }
  } else {
    selectedButton.setAttribute("data-incorrect", "true");
    correctButton.setAttribute("data-correct", "true");
    if (isDefending) {
      feedbackEl.textContent =
        "You failed to block the attack! Major damage taken.";
      playerHealth -= 25;
    } else {
      feedbackEl.textContent = "Incorrect! Your move failed.";
      enemyReadyToStrike = true;
    }
  }

  feedbackEl.className = isCorrect ? "feedback correct" : "feedback incorrect";
  feedbackEl.style.display = "block";

  setTimeout(() => {
    modal.style.display = "none";
    isDefending = false;
    updateHealthBars();
    checkWinCondition();

    if (enemyReadyToStrike) {
      enemyReadyToStrike = false;
      showIncomingEnemyStrike();
    }
  }, 1500);
}

function showIncomingEnemyStrike() {
  const message = document.createElement("div");
  message.className = "overlay";

  const box = document.createElement("div");
  box.className = "message-box";

  const h2 = document.createElement("h2");
  h2.textContent = "The enemy is preparing to strike! You must block it!";
  box.appendChild(h2);

  message.appendChild(box);
  document.body.appendChild(message);

  setTimeout(() => {
    document.body.removeChild(message);
    isDefending = true;
    displayQuestion("defense");
  }, 2500);
}

function performAction(action) {
  console.log(`Performing ${action} action`);

  if (action === "attack") {
    enemyHealth -= 25;
  } else if (action === "block") {
    playerHealth += 5;
  }

  updateHealthBars();
  checkWinCondition();
}

function getQuestions() {
  return {
    easy: [
      {
        questionText: "What is the main purpose of HTML?",
        options: [
          "To style web pages",
          "To structure web pages",
          "To add interactivity",
          "To store data",
        ],
        correctAnswer: "To structure web pages",
      },
      {
        questionText: "Which is a programming language?",
        options: ["Python", "Photoshop", "Excel", "PowerPoint"],
        correctAnswer: "Python",
      },
      {
        questionText: "What does CPU stand for?",
        options: [
          "Central Process Unit",
          "Central Processing Unit",
          "Computer Personal Unit",
          "Central Processor Utility",
        ],
        correctAnswer: "Central Processing Unit",
      },
      {
        questionText: "Which language is primarily used for web development?",
        options: ["Python", "C", "JavaScript", "Java"],
        correctAnswer: "JavaScript",
      },
      {
        questionText: "What does HTML stand for?",
        options: [
          "Hyper Trainer Marking Language",
          "Hyper Text Markup Language",
          "Hyper Text Making Language",
          "High Text Markup Language",
        ],
        correctAnswer: "Hyper Text Markup Language",
      },
      {
        questionText: "What is the extension of JavaScript files?",
        options: [".js", ".java", ".script", ".html"],
        correctAnswer: ".js",
      },
      {
        questionText: "Which of these is a frontend framework?",
        options: ["React", "Django", "Flask", "Spring"],
        correctAnswer: "React",
      },
      {
        questionText: "Which company developed Python?",
        options: ["Microsoft", "Google", "Apple", "None of the above"],
        correctAnswer: "None of the above",
      },
      {
        questionText: "Which keyword is used to define a function in Python?",
        options: ["func", "function", "def", "define"],
        correctAnswer: "def",
      },
      {
        questionText: "What is a loop used for?",
        options: [
          "Storing data",
          "Repeating tasks",
          "Handling errors",
          "Debugging",
        ],
        correctAnswer: "Repeating tasks",
      },
      {
        questionText: "Which of these is not a data type?",
        options: ["int", "string", "boolean", "loop"],
        correctAnswer: "loop",
      },
      {
        questionText: "Which symbol is used for comments in JavaScript?",
        options: ["//", "#", "<!--", "/*"],
        correctAnswer: "//",
      },
      {
        questionText: "What is the full form of CSS?",
        options: [
          "Cascading Style Sheets",
          "Creative Style Sheets",
          "Colorful Style Sheets",
          "Computer Style Sheets",
        ],
        correctAnswer: "Cascading Style Sheets",
      },
      {
        questionText: "What does JSON stand for?",
        options: [
          "JavaScript Object Notation",
          "JavaScript Output Name",
          "Java Source Object Notation",
          "Java Standard Object Notation",
        ],
        correctAnswer: "JavaScript Object Notation",
      },
      {
        questionText: "Which method is used to print in Python?",
        options: ["echo", "console.log", "printf", "print"],
        correctAnswer: "print",
      },
      {
        questionText: "Which is used to style a webpage?",
        options: ["HTML", "JavaScript", "Python", "CSS"],
        correctAnswer: "CSS",
      },
      {
        questionText: "Which is not a programming language?",
        options: ["Python", "Java", "Ruby", "HTML"],
        correctAnswer: "HTML",
      },
      {
        questionText: "Which of these is a backend language?",
        options: ["HTML", "CSS", "JavaScript", "Python"],
        correctAnswer: "Python",
      },
      {
        questionText: "Which of these is not an IDE?",
        options: ["VS Code", "PyCharm", "Sublime", "Google Chrome"],
        correctAnswer: "Google Chrome",
      },
      {
        questionText: "What is the default port for HTTP?",
        options: ["443", "21", "80", "22"],
        correctAnswer: "80",
      },
      {
        questionText: "Which of these is used to connect to a database?",
        options: ["API", "ORM", "JSON", "CSS"],
        correctAnswer: "ORM",
      },
      {
        questionText: "Which HTML tag is used for links?",
        options: ["<img>", "<a>", "<link>", "<href>"],
        correctAnswer: "<a>",
      },
      {
        questionText: "Which protocol is used to send emails?",
        options: ["HTTP", "SMTP", "FTP", "SSH"],
        correctAnswer: "SMTP",
      },
      {
        questionText: "Which operator is used to compare two values?",
        options: ["=", "==", "!=", "<="],
        correctAnswer: "==",
      },
      {
        questionText: "Which of these is not an array method in JavaScript?",
        options: ["push", "pop", "add", "shift"],
        correctAnswer: "add",
      },
      {
        questionText: "Which keyword is used to create a class in Java?",
        options: ["define", "function", "class", "new"],
        correctAnswer: "class",
      },
      {
        questionText: "What does SQL stand for?",
        options: [
          "Structured Query Language",
          "Sequential Query Language",
          "Structured Question Language",
          "Simple Query Language",
        ],
        correctAnswer: "Structured Query Language",
      },
      {
        questionText: "Which HTML tag is used to display an image?",
        options: ["<image>", "<img>", "<src>", "<pic>"],
        correctAnswer: "<img>",
      },
      {
        questionText: "What is Git used for?",
        options: ["Design", "Version control", "Hosting", "Testing"],
        correctAnswer: "Version control",
      },
      {
        questionText: "Which of the following is not a loop in Python?",
        options: ["for", "while", "do-while", "loop"],
        correctAnswer: "loop",
      },
      {
        questionText: "What does API stand for?",
        options: [
          "Application Programming Interface",
          "Advanced Programming Interface",
          "Application Program Index",
          "Applied Programming Instruction",
        ],
        correctAnswer: "Application Programming Interface",
      },
      {
        questionText: "What does DOM stand for?",
        options: [
          "Document Object Model",
          "Data Object Method",
          "Direct Output Model",
          "Dynamic Output Method",
        ],
        correctAnswer: "Document Object Model",
      },
      {
        questionText: "Which of these is a NoSQL database?",
        options: ["MySQL", "Oracle", "MongoDB", "PostgreSQL"],
        correctAnswer: "MongoDB",
      },
      {
        questionText: "Which of the following is a boolean value?",
        options: ["Yes", "No", "True", "Maybe"],
        correctAnswer: "True",
      },
      {
        questionText: "What is recursion?",
        options: [
          "A loop",
          "Function calling itself",
          "Sorting method",
          "Array technique",
        ],
        correctAnswer: "Function calling itself",
      },
      {
        questionText: "What is the output of 3 + '3' in JavaScript?",
        options: ["6", "33", "Error", "undefined"],
        correctAnswer: "33",
      },
      {
        questionText: "What does 'null' represent in programming?",
        options: ["0", "Nothing", "False", "Empty array"],
        correctAnswer: "Nothing",
      },
      {
        questionText: "Which symbol is used for 'not equal' in most languages?",
        options: ["<>", "!=", "~=", "=!"],
        correctAnswer: "!=",
      },
      {
        questionText: "What is the output of 2 ** 3 in Python?",
        options: ["5", "6", "8", "9"],
        correctAnswer: "8",
      },
      {
        questionText: "Which language is used for Android development?",
        options: ["Swift", "Java", "Kotlin", "Both Java and Kotlin"],
        correctAnswer: "Both Java and Kotlin",
      },
      {
        questionText: "Which of these is a version control system?",
        options: ["Git", "Docker", "Node.js", "Yarn"],
        correctAnswer: "Git",
      },
      {
        questionText: "Which tag is used for the largest heading in HTML?",
        options: ["<h6>", "<head>", "<h1>", "<h0>"],
        correctAnswer: "<h1>",
      },
      {
        questionText: "Which of these is a valid variable name?",
        options: ["1name", "first-name", "_name", "class"],
        correctAnswer: "_name",
      },
      {
        questionText: "What is a compiler?",
        options: [
          "A debugger",
          "A translator of code",
          "A browser",
          "A database",
        ],
        correctAnswer: "A translator of code",
      },
      {
        questionText: "Which Python keyword is used to handle exceptions?",
        options: ["except", "handle", "catch", "error"],
        correctAnswer: "except",
      },
      {
        questionText: "Which of these is a type of loop?",
        options: ["if", "switch", "for", "try"],
        correctAnswer: "for",
      },
      {
        questionText:
          "Which of these is used to initialize a new Git repository?",
        options: ["git start", "git create", "git init", "git new"],
        correctAnswer: "git init",
      },
      {
        questionText: "Which command is used to install packages in Python?",
        options: ["npm install", "python install", "pip install", "py install"],
        correctAnswer: "pip install",
      },
      {
        questionText: "Which file is used to describe a Node.js project?",
        options: ["package.js", "app.js", "package.json", "config.json"],
        correctAnswer: "package.json",
      },
      {
        questionText: "Which of these is a primitive data type?",
        options: ["Array", "Object", "String", "Function"],
        correctAnswer: "String",
      },
      {
        questionText: "What is the function of 'return'?",
        options: [
          "Stop a loop",
          "End a program",
          "Return a value from a function",
          "Print output",
        ],
        correctAnswer: "Return a value from a function",
      },
    ],
  };
}

document.addEventListener("keydown", (event) => {
  if (modal.style.display === "flex") {
    const key = event.key.toUpperCase();
    if (["A", "B", "C", "D"].includes(key)) {
      handleOptionSelection(key);
    }
  }
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
