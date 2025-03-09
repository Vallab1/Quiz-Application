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
  if (userIndex === null) {
    console.error("User index not found");
    return;
  }
  let userData = JSON.parse(localStorage.getItem("userData")) || [];
  let selectedUser = userData[userIndex];
  // console.log(userData)
  console.log(selectedUser)
  document.getElementById('user-name').innerHTML = selectedUser.fullName ;
  document.getElementById('user-email').innerHTML = selectedUser.email;
  if (!selectedUser || !selectedUser.testInformation) {
    console.error("Selected user data not found");
    return;
  }

  let userTestAttemptInformation = document.querySelector(".table tbody");
  if (!userTestAttemptInformation) {
    console.error("Table element not found");
    return;
  }

  userTestAttemptInformation.innerHTML = "";
  selectedUser.testInformation.forEach((attempt, index) => {
    const row = userTestAttemptInformation.insertRow();
    row.insertCell(0).innerText = ` ${index + 1}`;
    // let attemptScore = attempt.score || 0;
    row.insertCell(1).innerText = attempt.testDate;
    row.insertCell(2).innerText = attempt.score ;
    row.insertCell(3).innerText = attempt.timeTaken || "N/A";
    row.insertCell(4).innerHTML = `<a href="fullTestDetails.html?userIndex=${userIndex}&attemptIndex=${index}" style="color:white; background-color= blue, font-weight:bold, a:hover:{text-decoration:underline}">View more</a>`;
  });
}
if (document.querySelector(".table")) {
  userTestAttempts();
}