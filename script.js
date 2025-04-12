// Start the Here Sing-up Pages
function signUpPage() {
    // Get input values from the form
    let fullName = document.getElementById('full-name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let checkBox = document.querySelector('input[name="CheckBox"]').checked;

    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    const namePattern = /^[a-zA-Z\s]+$/;
    const emailExists = userInformation.some((user) => user.email === email);
    const passwordExists = userInformation.some(
        (user) => user.password === password
    );
    if (!fullName && !email && !password) {
        alert("Please fill the all required fields.");
    }
    // Validate required fields
    if (!fullName || fullName.length < 4) {
        alert("Fullname is mandatory and minimum four letter please enter");
        return;
    }
    if (!namePattern.test(fullName)) {
        alert("Full name should only contain letters and spaces.");
        return;
    }
    if (!email) {
        alert("Email is mandatory please enter");
        return;
    }
    if (!emailPattern.test(email)) {
        alert("Enter the proper Email")
        return;
    }
    if (!password || password.length < 8) {
        alert("Please enter the 8 length of password.")
    } else if (!passwordPattern.test(password)) {
        alert("Password should contain one capital letter one number and special character");
        return;
    }
    if (emailExists) {
        alert("This email is already registered. Please use a different email.");
        return;
    } else if (passwordExists) {
        alert("This password is already exist. Please use a different password.");
        return;
    }
    if (!checkBox) {
        alert("Accept the terms and conditions");
        return;
    } else {
        alert("successfully registered...");
    }

    // Save data to local storage
    let userData = { fullName, email, timeTaken: null, score: [], playCount: 0, testInformation: [] };
    userInformation.push(userData);
    localStorage.setItem("userData", JSON.stringify(userInformation));
    const userBasicData = { fullName, email, password };
    userBasicInformation.push(userBasicData);
    localStorage.setItem("userBasicData", JSON.stringify(userBasicInformation));
    window.location.href = "../index.html";

    document.getElementById('full-name').value = '';
    document.getElementById('email-id').value = '';
    document.getElementById('password').value = '';
    document.querySelector('input[name="CheckBox"]').checked = false;
}

// Here start the Login Page code
function loginUserData() {
    const loginEmail = document.getElementById('email-id').value;
    const loginPassword = document.getElementById('password').value;
    if (!loginEmail || !loginPassword) {
        alert('Please fill in all required fields.');
        return;
    }
    loginUser(loginEmail, loginPassword);
}

// Match the data for login ...//
function loginUser(loginEmail, loginPassword) {
    const users = JSON.parse(localStorage.getItem("userBasicData")) || [];
    const userFound = users.find(function (user) {
        return user.email === loginEmail && user.password === loginPassword;
    });
    if (userFound) {
        localStorage.setItem("loggedInEmail", loginEmail);
        window.location.href = 'User/startQuiz.html';
    } else {
        alert("Invalid email or password");
    }
}

// Here start the Array Question...
const questions = [
    {
        question: "Which type of language is JavaScript?",
        options: ["Object-Oriented", "Object-Based", "Assembly-Language", "High-Level"],
        answer: 1,
        choosedAnswer: null,
    },
    {
        question: "Which method is used to print something in the console?",
        options: ["console.print()", "log.console()", "console.log()", "print.console()"],
        answer: 2,
        choosedAnswer: null,
    },
    {
        question: "How do you declare a variable in JavaScript?",
        options: ["var", "let", "const", "All of the above"],
        answer: 3,
        choosedAnswer: null,
    },
    {
        question: " Which of the following is not a primitive data type in JavaScript?",
        options: ["String", "Number", "Object", "Boolean"],
        answer: 2,
        choosedAnswer: null,
    },
    {
        question: "What is the correct way to write an array in JavaScript?",
        options: [
            'var colors = "red", "green", "blue";',
            'var colors = ["red", "green", "blue"];',
            'var colors = (1:"red", 2:"green", 3:"blue");',
            'var colors = "red"; "green"; "blue";'
        ],
        answer: 1,
        choosedAnswer: null,
    },
    {
        question: "What does `NaN` stand for in JavaScript?",
        options: ["Not-a-Name", "Not-a-Number", "Null-a-Name", "None-a-Number"],
        answer: 1,
        choosedAnswer: null,
    },
    {
        question: "Which company developed JavaScript?",
        options: ["Microsoft", "Sun Microsystems", "Netscape", "Oracle"],
        answer: 2,
        choosedAnswer: null,
    },
    {
        question: "What will `typeof null` return?",
        options: ["null", "object", "undefined", "string"],
        answer: 1,
        choosedAnswer: null,
    },
    {
        question: "How can you convert a string to a number in JavaScript?",
        options: ["Number()", "parseInt()", "parseFloat()", "All of the above"],
        answer: 3,
        choosedAnswer: null,
    },
    {
        question: "What is the result of `2 + \"2\"` in JavaScript?",
        options: ["4", "\"22\"", "NaN", "Error"],
        answer: 1,
        choosedAnswer: null,
    },
    {
        question: "How do you write a conditional statement in JavaScript?",
        options: ["if (x > y) {}", "if x > y then {}", "if x > y: {}", "if x > y do {}"],
        answer: 0,
        choosedAnswer: null,
    },
    {
        question: "Which JavaScript method is used to remove the last element of an array?",
        options: ["pop()", "shift()", "splice()", "delete()"],
        answer: 0,
        choosedAnswer: null,
    },
    {
        question: "Which of the following is not a JavaScript data type?",
        options: ["String", "Number", "Boolean", "Character"],
        answer: 3,
        choosedAnswer: null,
    },
    {
        question: "How do you create a function in JavaScript?",
        options: ["function myFunction() {}", "function:myFunction() {}", "def myFunction() {}", "function = myFunction() {}"],
        answer: 0,
        choosedAnswer: null,
    },
    {
        question: "Which of the following is the correct syntax for an arrow function?",
        options: [
            "let add = (a, b) => { return a + b; };",
            "let add = (a, b) => a + b;",
            "Both A and B",
            "None of the above"
        ],
        answer: 2,
        choosedAnswer: null,
    },
    {
        question: "What will `console.log(0 == false)` return?",
        options: ["true", "false", "Error", "Undefined"],
        answer: 0,
        choosedAnswer: null,
    },
    {
        question: "What will `console.log(0 === false)` return?",
        options: ["true", "false", "Error", "Undefined"],
        answer: 1,
        choosedAnswer: null,
    },
    {
        question: "How do you add an element to the beginning of an array?",
        options: ["push()", "unshift()", "append()", "add()"],
        answer: 1,
        choosedAnswer: null,
    },
    {
        question: "What is the output of `console.log(typeof NaN)`?",
        options: ["number", "NaN", "undefined", "object"],
        answer: 0,
        choosedAnswer: null,
    },
    {
        question: "What does the `this` keyword refer to in JavaScript?",
        options: ["The current object", "The previous object", "Global object", "None of the above"],
        answer: 0,
        choosedAnswer: null,
    }
];

const userBasicInformation = JSON.parse(localStorage.getItem("userBasicData")) || [];
const userInformation = JSON.parse(localStorage.getItem("userData")) || [];
let storeData = JSON.parse(localStorage.getItem("allQuizData")) || [];
localStorage.setItem("questionAnswer", JSON.stringify(questions))

// QuestionPages start here..
let quizQuestion = document.getElementById("quiz-question");
let optionList = document.getElementById("option-list");
let quizProgress = document.getElementById("quiz-progress");
let quizProgressBarFill = document.getElementById("quiz-progress-bar-fill");
let nextButton = document.getElementById("next");
let previousButton = document.getElementById("previous");

let currentQuestionIndex = 0;
let score = 0;
let currentQuestion;
let questionSequence = [];

function shuffleQuestions() {
    let shuffledData = Array.from(questions);
    shuffledData.sort(() => Math.random() - 0.5);
    return shuffledData.slice(0, 10);
}

function eyeButtonToggle() {
    let eyeButton = document.getElementById("eye-icon");
    if (password.type == "password") {
        password.type = "text";
        eyeButton.classList.remove("fa-eye-slash");
        eyeButton.classList.add("fa-eye");
    } else {
        password.type = "password";
        eyeButton.classList.remove("fa-eye");
        eyeButton.classList.add("fa-eye-slash");
    }
}

function navigate() {
    window.location.href = "question.html"
}

let quizStartTime;
storeData = JSON.parse(localStorage.getItem("allQuizData")) || [];
function startQuiz() {
    if (!localStorage.getItem("quizStarted")) {
        localStorage.setItem("quizStarted", true); // Set flag
    }
    currentQuestionIndex = 0;
    score = 0;
    questionSequence = shuffleQuestions();
    localStorage.setItem("allQuizData", JSON.stringify(questionSequence));
    storeData = questionSequence;
    storeData = JSON.parse(localStorage.getItem("allQuizData"));
    quizStartTime = new Date();
    showQuestion();
}

// Here start the code of showQuestion function....
function showQuestion() {
    if (currentQuestionIndex === 0) {
        previousButton.style.display = "none";
    } else {
        previousButton.style.display = "block";
    }
    if (storeData[currentQuestionIndex]) {
        currentQuestion = storeData[currentQuestionIndex];
    }

    let questionNo = currentQuestionIndex + 1;
    quizQuestion.innerHTML = `${questionNo}. ${currentQuestion.question}`;
    optionList.innerHTML = "";

    if (questionNo === storeData.length - 1) {
        quizProgress.innerHTML = "Last 2 Questions Left";
    } else if (questionNo === storeData.length) {
        quizProgress.innerHTML = "Hey This is the last question";
    } else {
        quizProgress.innerHTML = `Question ${questionNo} of ${storeData.length}`;
    }

    currentQuestion.options.forEach((answer, index) => {
        const li = document.createElement("li");
        li.innerHTML = answer;
        li.classList.add("option");
        optionList.appendChild(li);

        if (currentQuestion.choosedAnswer === index) {
            li.classList.add("selected");
        }
        li.addEventListener("click", function () {
            selectAnswer(li, index);
        });
    });
    updateProgressBar();
}

//Here start the code of option selected....
function selectAnswer(li, index) {
    const allOptions = document.querySelectorAll(".option");
    allOptions.forEach((option) => {
        option.classList.remove("selected");
    });
    li.classList.add("selected");
    // Update the selected answer in storeData
    storeData[currentQuestionIndex].choosedAnswer = index;
    localStorage.setItem("allQuizData", JSON.stringify(storeData));
}

// Here show the next question....
function nextQuestion() {
    let selectedOption = document.querySelector(".option.selected");
    if (!selectedOption) {
        alert("Please select an answer before moving to the next question.");
        return;
    }
    currentQuestionIndex++;
    let storeData = JSON.parse(localStorage.getItem("allQuizData"));
    showQuestion();
    if (currentQuestionIndex < storeData.length - 1) {
        showQuestion();
    } else if (currentQuestionIndex === storeData.length - 1) {
        showQuestion();
        nextButton.innerHTML = "Submit";
    } else {
        let finalScore = calculateScore();
        const quizEndTime = new Date();
        const timeTaken = calculateTimeTaken(quizStartTime, quizEndTime);
        let text = "Are you sure you want to submit";
        if (confirm(text) == true) {
            alert(`Quiz finished! Your score is ${finalScore} out of 100.Time taken: ${timeTaken}`);
            updateUserScore(finalScore, timeTaken);
            saveTestInformation(storeData, finalScore, timeTaken);
            nextButton.disabled = true;
            window.location.href = "leaderboard.html";
        }
    }
}

// Here user solve the question time taken calculate....
function calculateTimeTaken(startTime, endTime) {
    const timeDifferent = Math.floor((endTime - startTime) / 1000);
    const minutes = Math.floor(timeDifferent / 60);
    const seconds = timeDifferent % 60;
    return `${minutes} : ${seconds}`;
}

// Here calculate the user score....
function calculateScore() {
    let finalScore = 0;
    storeData.forEach((question) => {
        if (question.choosedAnswer === question.answer) {
            finalScore += 10;
        }
    });
    return finalScore;
}

// Here update the user score....
function updateUserScore(finalScore) {
    const users = JSON.parse(localStorage.getItem("userData")) || [];
    const loginEmail = localStorage.getItem("loggedInEmail");
    const userIndex = users.findIndex((user) => user.email === loginEmail);
    if (userIndex != -1) {
        if (!Array.isArray(users[userIndex].score)) {
            users[userIndex].score = [];
        }
        users[userIndex].score.push(finalScore);
        localStorage.setItem("userData", JSON.stringify(users));
    }
}

function getFlattenedLeaderboard() {
    const users = JSON.parse(localStorage.getItem("userData")) || [];
    let leaderboard = [];
    users.forEach(user => {
        if (Array.isArray(user.score)) {
            user.score.forEach(score => {
                leaderboard.push({ fullName: user.fullName, score: score, email: user.email, timeTaken: score.timeTaken });
            });
        }
    });
    leaderboard.sort((a, b) => b.score - a.score);
    return leaderboard;
}

function updatePlayCount() {
    const users = JSON.parse(localStorage.getItem("userData")) || [];
    const loggedInEmail = localStorage.getItem("loggedInEmail");
    const userIndex = users.findIndex((user) => user.email === loggedInEmail);
    if (userIndex !== -1) {
        users[userIndex].playCount = (users[userIndex].playCount || 0) + 1;
        localStorage.setItem("userData", JSON.stringify(users));
    }
}

//Here start the code of update the progress bar....
function updateProgressBar() {
    const progressPercentage = ((currentQuestionIndex + 1) / storeData.length) * 100;
    quizProgressBarFill.style.width = progressPercentage + '%';
}

// Here show the previous question....
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion()
    }
}

//Click the image come to your front popup...//
let logoutContainer = document.getElementById("logout-container");
let flag = 0;
function popUp() {
    if (flag == 0) {
        logoutContainer.style.display = "block";
        flag = 1;
    } else {
        logoutContainer.style.display = "none";
        flag = 0;
    }
};

let quizLogoutContainer = document.getElementById("quiz-logout-container");
function popUpShow() {
    if (flag == 0) {
        quizLogoutContainer.style.display = "block";
        flag = 1;
    } else {
        quizLogoutContainer.style.display = "none";
        flag = 0;
    }
};

// Here start the logout function....//
function logout() {
    let message = "Are you sure you want to logout";
    if (confirm(message) == true) {
        localStorage.removeItem("loggedInEmail");
        window.location.href = "../index.html";
    };
};

var users = JSON.parse(localStorage.getItem("userData")) || [];
users.sort((a, b) => b.score - a.score);
let loggedInEmail = localStorage.getItem("loggedInEmail");
let loggedInUser = users.find((user) => user.email === loggedInEmail);
if (loggedInUser) {
    document.querySelector(".navbar-content li:nth-child(2)").innerText = loggedInUser.fullName;
    // document.getElementById("my-name1").innerText = `Hii, ${loggedInUser.fullName}`;
    // document.getElementById("my-email1").innerText = loggedInEmail;
    document.getElementById("my-name").innerText = `Hii, ${loggedInUser.fullName}`;
    document.getElementById("my-email").innerText = loggedInEmail;
}

function updateLeaderboard() {
    const leaderboard = getFlattenedLeaderboard();
    console.log(leaderboard)
    const loggedInEmail = localStorage.getItem("loggedInEmail");
    console.log("loggedInEmail");
    loggedInUser = leaderboard.find((entry) => entry.email === loggedInEmail);
    let userRank = leaderboard.findIndex(entry => entry.email === loggedInEmail) + 1;
    document.getElementById("user-rank-title").innerText = `Wow your rank ${userRank}`;
    document.getElementById("user-score").innerText = `Your score ${loggedInUser.score}`;
    //first rank update
    if (leaderboard[0]) {
        document.querySelector("#first-rank-container .actual-score p").innerText = leaderboard[0].score;
        document.querySelector("#first-rank-container .circle .username").innerText = leaderboard[0].fullName;
    }
    // second rank update
    if (leaderboard[1]) {
        document.querySelector("#second-rank-container .second-actual-score p").innerText = leaderboard[1].score;
        document.querySelector("#second-rank-container .circle .username").innerText = leaderboard[1].fullName;
    }
    // third rank update
    if (leaderboard[2]) {
        document.querySelector("#third-rank-container .third-actual-score p").innerText = leaderboard[2].score;
        document.querySelector("#third-rank-container .circle .username").innerText = leaderboard[2].fullName;
    }
    // update ranking 4-6
    const rankingBoard = document.querySelectorAll(".ranking-board .ranking");
    rankingBoard.forEach((rank, index) => {
        const user = leaderboard[index + 3];
        if (user) {
            rank.querySelector(".user-name span").innerText = `#${index + 4}`;
            rank.querySelector(".user-name").innerHTML = `<span>#${index + 4} </span> #${user.fullName}`;
            rank.querySelector(".user-name + .user-name").innerText = user.score;
        }
    });
    if (userRank >= 6) {
        const sixRank = rankingBoard[2];
        sixRank.querySelector("user-name span").innerText = `#${userRank}`;
        sixRank.querySelector("user-name").innerHTML = `<span> #${userRank}</span> ${loggedInUser.fullName}`;
        sixRank.querySelector(".user-name + .user-name").innerText = loggedInUser.score;
    }
}

function checkUserData() {
    const users = JSON.parse(localStorage.getItem("userData")) || [];
    if (users.length > 0) {
        console.log("User data found:", users);
    } else {
        console.log("No user data found.");
    }
}

function saveTestInformation(questions, score, timeTaken){
    let userInformation = JSON.parse(localStorage.getItem("userData")) || [];
    const loggedInEmail = localStorage.getItem("loggedInEmail");
    const userIndex = userInformation.findIndex(user =>user.email === loggedInEmail);

    if(userIndex !== -1){
        const testResult = {
            testDate: new Date().toLocaleDateString(),
            score: score,
            timeTaken: timeTaken,
            testDetails: questions.map(question => ({
                question: question.question,
                allOptions: question.options,
                choosedAnswer:question.choosedAnswer,
                correctAnswer: question.answer,
                selectedAnswer: question.choosedAnswer !== null ? question.options[question.choosedAnswer] : null,
                wrongAnswer: question.choosedAnswer !== question.answer ? question.options[question.answer] :null,
                rightAnswer: question.choosedAnswer === question.answer ? question.options[question.answer] : null, 

            }))
        };
        if(!userInformation[userIndex].testInformation){
            userInformation[userIndex].testInformation = [];
        }
        userInformation[userIndex].testInformation.push(testResult);
        localStorage.setItem("userData",JSON.stringify(userInformation));
    }
}

