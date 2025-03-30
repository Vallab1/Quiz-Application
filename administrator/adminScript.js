let sideBar = document.getElementById("side-bar");
let show = 0;
function popUp() {
  if (show == 0) {
    sideBar.style.display = "block";
    show = 1;
  }
  else {
    sideBar.style.display = "none";
    show = 0;
  }
}
let logoutFlag = 0;
function popUpLogout() {
  let logoutContainer = document.getElementById("logout-container");
  if (logoutFlag == 0) {
    logoutContainer.style.display = "block";
    logoutFlag = 1;
  } else {
    logoutContainer.style.display = "none";
    logoutFlag = 0;
  }
}

function popUp_Add_Question() {
  document.getElementById("add-new-questions").style.display = "block";
  
}
function closePopUp() {
  document.getElementById("add-new-questions").style.display = "none";
}

function openView() {
  document.getElementById("view-questions").style.display = "block";
}

function closeView() {
  document.getElementById("view-questions").style.display = "none";
}

function closeEdit() {
  document.getElementById("edit-questions").style.display = "none";
}

// Admin login form
function adminLogin() {
  let emailId = document.getElementById("email-id").value;
  let password = document.getElementById("password").value;
  if (!emailId || !password) {
    alert("Fill the all field mandatory. ");
    return;
  } else if (emailId === "admin123@gmail.com" && password === "Admin@123") {
    alert("Successfull login");
    window.location.href = "adminPage.html";
  } else {
    alert("Invailid Email and Password");
  };
};
// logout
function logout() {
  let message = "Are you sure you want to logout.";
  if (confirm(message) == true) {
    window.location.href = "adminLogin.html";
  };
};
// eye toggle
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

// user information show
document.addEventListener("DOMContentLoaded", function () {
  let tableBody = document.querySelector("#table tbody");

  let userInformation = JSON.parse(localStorage.getItem("userData")) || [];

  // Function to populate table with user data
  function populateTable() {
    tableBody.innerHTML = ""; // Clear existing data
    userInformation.forEach((user, index) => {
      let row = `<tr>
                <td>${index + 1}.</td>
                <td>${user.fullName}</td>
                <td>${user.email}</td>
                <td>${user.testInformation.length}</td>
                <td>${user.score.join(", ")}</td>
                <td><a href='testDetails.html?userIndex=${index}'class="view-more">View More</a></td>

            </tr>`;
      tableBody.innerHTML += row;
    });
  }

  populateTable(); // Populate table on page load
});


function userTestAttempts() {
  let urlParams = new URLSearchParams(window.location.search);
  let userIndex = urlParams.get("userIndex");

  let userData = JSON.parse(localStorage.getItem("userData")) || [];
  let selectedUser = userData[userIndex];

  if (!selectedUser) {
    console.error("Selected user data not found");
    return;
  }
let userTestContainer = document.querySelector("#user-test-details");
  document.getElementById("user-name").textContent = selectedUser.fullName + " | ";
  document.getElementById("user-email").innerHTML = selectedUser.email;

  if (!selectedUser.testInformation || selectedUser.testInformation.length === 0) {
    console.error("No test information available for the selected user.");
    return;
  }

  let userTestAttemptInformation = document.querySelector(".table tbody");

  if (!userTestAttemptInformation) {
    console.error("Table element not found");
    return;
  }

  userTestAttemptInformation.innerHTML = ""; // Clear previous rows

  selectedUser.testInformation.forEach((attempt, index) => {
    let row = `<tr>
                <td>${index + 1}.</td>
                <td>${attempt.testDate}</td>
                <td>${attempt.score}</td>
                <td>${attempt.timeTaken || "N/A"}</td>
                <td><a href='testGiveDetails.html?userIndex=${userIndex}&attemptIndex=${index}' class="view-more">View Test</a></td>
              </tr>`;

    userTestAttemptInformation.innerHTML += row; // Append new row
  });
  rowCount = selectedUser.testInformation.length;
  userTestContainer.style.height = `${rowCount * 50 + 100}px`;
}


if (document.querySelector(".table")) {
  userTestAttempts();
}

function testAttemptDetails() {
  let urlParams = new URLSearchParams(window.location.search);
  let userIndex = urlParams.get("userIndex");
  let attemptIndex = urlParams.get("attemptIndex");

  if (userIndex === null || attemptIndex === null) return;

  let userData = JSON.parse(localStorage.getItem("userData")) || [];
  let selectedUser = userData[userIndex];
  let attempt = selectedUser?.testInformation[attemptIndex];

  if (!attempt?.testDetails) return;

  document.getElementById("user-name").textContent = selectedUser.fullName + " | ";
  document.getElementById("user-email").innerHTML = selectedUser.email;
  document.querySelector(".test").innerHTML = `<strong>Test:</strong> ${parseInt(attemptIndex) + 1}`;
  document.querySelector(".score").innerHTML = `<strong>Score:</strong> ${attempt.score}`;
  document.querySelector(".test-date").innerHTML = `<strong>Test Date:</strong> ${attempt.testDate || "N/A"}`;
  document.querySelector(".time-taken").innerHTML = `<strong>Time Taken:</strong> ${attempt.timeTaken}`;

  let questionContainer = document.getElementById("question-content");
  questionContainer.innerHTML = ""; // Clear existing content

  attempt.testDetails.slice(0, 10).forEach((detail, index) => {
    let optionsHTML = detail.allOptions
      .map(
        (option, i) => `
          <div class="option-list ${i === detail.choosedAnswer ? 'selected' : ''}">
            <strong>Option: ${i + 1}</strong>
            <p class="option-${i + 1}">${option}</p>
          </div>`
      )
      .join("");

    let questionHTML = `
    <div id="question-content">
        <div class="question">
        <strong>Question ${index + 1}:</strong>
        <p>${detail.question}</p>
        </div>
        <div class="option">
          ${optionsHTML}
        </div>
        <p class="your-answer"><strong>Your Answer:</strong> ${detail.choosedAnswer !== null ? detail.allOptions[detail.choosedAnswer] : "N/A"}</p>
        <p class="correct-answer"><strong>Correct Answer:</strong> ${detail.correctAnswer !== null ? detail.allOptions[detail.correctAnswer] : "N/A"}</p>
    </div>
  </div>
    `;

    questionContainer.innerHTML += questionHTML;
  });
}
document.addEventListener("DOMContentLoaded", testAttemptDetails);
function adjustHeight() {
  let container = document.getElementById("test-attempt-details");
  let questionContent = document.getElementById("question-content");
  
  if (container && questionContent) {
      container.style.height = questionContent.scrollHeight + "px";
  }
}

// Call function after content is loaded
document.addEventListener("DOMContentLoaded", adjustHeight);
window.addEventListener("resize", adjustHeight);


function display_Quiz_Question() {
  let storedQuestions = JSON.parse(localStorage.getItem("questionAnswer")) || [];
  let quizContainer = document.getElementById("quiz-attempt-details");

  let tableBody = document.querySelector("#question-table tbody");
  tableBody.innerHTML = ""; // Clear existing rows

  storedQuestions.forEach((quiz, index) => {
    let row = `
      <tr>
        <td class="sr-no">${index + 1}</td>
        <td class="questions">${quiz.question}</td>
        <td class="actions">
          <i class="fa-solid fa-eye" onclick="openView(${index})"></i>
          <i class="fa-solid fa-pen" onclick="openEdit(${index})"></i>
          <i class="fa-solid fa-trash" onclick="showDeletePopup(${index})"></i>
        </td>
      </tr>`;

    tableBody.innerHTML += row;
  });
  // Dynamically adjust the height of quiz-attempt-details
  let rowCount = storedQuestions.length;
  quizContainer.style.height = `${rowCount * 50 + 100}px`; 
}
// Call function to display quiz questions on page load
document.addEventListener("DOMContentLoaded", display_Quiz_Question);

function openEdit(index) {
  let questions = JSON.parse(localStorage.getItem("questionAnswer")) || [];
  let selectedQuestion = questions[index];

  // Populate the fields
  document.querySelector("#edit-question-input").value = selectedQuestion.question;
  document.querySelector("#edit-option-1").value = selectedQuestion.options[0];
  document.querySelector("#edit-option-2").value = selectedQuestion.options[1];
  document.querySelector("#edit-option-3").value = selectedQuestion.options[2];
  document.querySelector("#edit-option-4").value = selectedQuestion.options[3];
document.querySelector("#edit-option-selected").value = selectedQuestion.answer; //set correct answer in dropdown

  // Save index for updating
  document.getElementById("edit-questions").dataset.index = index;

  // Show the edit section
  document.getElementById("edit-questions").style.display = "block";
}

function saveEdit() {
  let questions = JSON.parse(localStorage.getItem("questionAnswer")) || [];
  let index = document.getElementById("edit-questions").dataset.index;

  if (index === undefined) return;

  questions[index] = {
    question: document.querySelector("#edit-question-input").value,
    options: [
      document.querySelector("#edit-option-1").value,
      document.querySelector("#edit-option-2").value,
      document.querySelector("#edit-option-3").value,
      document.querySelector("#edit-option-4").value
    ],
    answer: document.querySelector("#edit-option-selected").value // Save selected correct answer
  };

  localStorage.setItem("questionAnswer", JSON.stringify(questions));
  alert("Question updated successfully!");
  document.getElementById("edit-questions").style.display = "none";
}


function openView(index) {
  let questions = JSON.parse(localStorage.getItem("questionAnswer")) || [];
  let question = questions[index];

  if (question) {
      document.getElementById("view-question-input").value = question.question;
      document.getElementById("view-option-1").value = question.options[0];
      document.getElementById("view-option-2").value = question.options[1];
      document.getElementById("view-option-3").value = question.options[2];
      document.getElementById("view-option-4").value = question.options[3];

      // Ensure the correct answer is selected
      document.getElementById("view-option-selected").value = question.answer;
  }

  document.getElementById("view-questions").style.display = "block";
}

// Function to close the view modal
function closeView() {
  document.getElementById("view-questions").style.display = "none";
}

let deleteIndex = null; // Store the index of the question to delete

function showDeletePopup(index) {
    deleteIndex = index; // Save the index to delete
    document.getElementById("delete").style.display = "block"; // Show popup
}

function confirmDelete() {
    if (deleteIndex !== null) {
        let questions = JSON.parse(localStorage.getItem("questionAnswer")) || [];

        if (deleteIndex >= 0 && deleteIndex < questions.length) {
            questions.splice(deleteIndex, 1); // Remove the question at the saved index
            localStorage.setItem("questionAnswer", JSON.stringify(questions));
            display_Quiz_Question(); // Refresh the quiz list
        }
    }

    closeDeletePopup(); // Hide popup after deleting
}

function closeDeletePopup() {
    document.getElementById("delete").style.display = "none";
    deleteIndex = null; // Reset index
}


// Function to update dropdown options dynamically
// function updateDropdownOptions() {
//   document.querySelector("#edit-option-1").textContent = document.querySelector("#add-option-1").value || "Option-1";
//   document.querySelector("#edit-option-2").textContent = document.querySelector("#add-option-2").value || "Option-2";
//   document.querySelector("#edit-option-3").textContent = document.querySelector("#add-option-3").value || "Option-3";
//   document.querySelector("#edit-option-4").textContent = document.querySelector("#add-option-4").value || "Option-4";
// }

// // Call this function whenever an input is typed in option fields
// document.querySelector("#add-option-1").addEventListener("input", updateDropdownOptions);
// document.querySelector("#add-option-2").addEventListener("input", updateDropdownOptions);
// document.querySelector("#add-option-3").addEventListener("input", updateDropdownOptions);
// document.querySelector("#add-option-4").addEventListener("input", updateDropdownOptions);

let questions = JSON.parse(localStorage.getItem("questionAnswer")) || [];
let currentEditIndex = null;

function add_Question_Answer(event) {
  event.preventDefault(); // Stop form from submitting

  // updateDropdownOptions();

  let question = document.getElementById("add-question-input").value.trim();
  let optionA = document.getElementById("add-option-1").value.trim();
  let optionB = document.getElementById("add-option-2").value.trim();
  let optionC = document.getElementById("add-option-3").value.trim();
  let optionD = document.getElementById("add-option-4").value.trim();
  let correctAnswer = document.getElementById("add-option-selected").value.trim(); // ✅ Corrected ID
  console.log("Question:", question);
  console.log("Option A:", optionA);
  console.log("Option B:", optionB);
  console.log("Option C:", optionC);
  console.log("Option D:", optionD);
  console.log("Correct Answer:", correctAnswer);
  if (!question || !optionA || !optionB || !optionC || !optionD || !correctAnswer) {
      alert("Please fill in all fields!");
      return;
  }

  const questionData = {
      question: question,
      options: [optionA, optionB, optionC, optionD],
      answer: correctAnswer,
      choosedAnswer: null,
  };

  if (currentEditIndex === null) {
      questions.push(questionData);
  } else {
      questions[currentEditIndex] = questionData;
      currentEditIndex = null; // ✅ Reset edit index after update
  }

  localStorage.setItem("questionAnswer", JSON.stringify(questions));
  alert("✅ Question added successfully!");

  display_Quiz_Question();
  closePopUp();
}

// Function to close popup
function closePopUp() {
  document.getElementById("add-new-questions").style.display = "none";
}

// Function to close popup
function closePopUp() {
  document.getElementById("add-new-questions").style.display = "none";
}
