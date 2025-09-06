// ------------------ LOGIN CHECK & WELCOME ------------------
let loggedInUser = localStorage.getItem("username");

// Only redirect if we're on the transcript page
if (!loggedInUser && document.getElementById("transcript")) {
  window.location.href = "login.html"; // redirect to login page
} else if (loggedInUser && document.getElementById("transcript")) {
  const welcomeContainer = document.createElement("div");
  welcomeContainer.id = "welcomeContainer";
  welcomeContainer.style.display = "flex";
  welcomeContainer.style.justifyContent = "space-between";
  welcomeContainer.style.alignItems = "center";
  welcomeContainer.style.marginBottom = "15px";

  const welcomeDiv = document.createElement("div");
  welcomeDiv.textContent = `Welcome, ${loggedInUser}!`;
  welcomeDiv.style.fontWeight = "bold";

  const logoutBtn = document.createElement("button");
  logoutBtn.textContent = "Logout";
  logoutBtn.style.padding = "6px 12px";
  logoutBtn.style.backgroundColor = "#e74c3c";
  logoutBtn.style.color = "#fff";
  logoutBtn.style.border = "none";
  logoutBtn.style.borderRadius = "6px";
  logoutBtn.style.cursor = "pointer";

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("username");
    window.location.href = "login.html";
  });

  welcomeContainer.appendChild(welcomeDiv);
  welcomeContainer.appendChild(logoutBtn);

  document.querySelector(".container").prepend(welcomeContainer);
}

// ------------------ LOGIN HANDLING ------------------
const users = {
  "sree": "password123",
  "jhon": "password456",
};

const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const usernameInput = document.getElementById("username").value.trim();
    const passwordInput = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("errorMsg");

    if (users[usernameInput] && users[usernameInput] === passwordInput) {
      localStorage.setItem("username", usernameInput);
      window.location.href = "index.html"; // redirect to transcript page
    } else {
      errorMsg.textContent = "Invalid username or password!";
    }
  });
}

// ------------------ SOCKET.IO FOR TRANSCRIPT ------------------
const socket = io("http://localhost:5000");

// Elements
const sendBtn = document.getElementById("sendBtn");
const transcriptInput = document.getElementById("transcript");
const outputDiv = document.getElementById("output");
const loadingDiv = document.getElementById("loading");
const summaryP = document.getElementById("summary");
const actionItemsUl = document.getElementById("actionItems");
const taskAssignmentsUl = document.getElementById("taskAssignments");

// Send transcript
if (sendBtn) {
  sendBtn.addEventListener("click", () => {
    const transcript = transcriptInput.value.trim();
    if (!transcript) return alert("Please enter a transcript.");

    // Show loading spinner
    if (loadingDiv) loadingDiv.classList.remove("hidden");
    if (outputDiv) outputDiv.classList.add("hidden");

    socket.emit("transcript", transcript);
  });
}

// Receive summary from backend
socket.on("summary", (data) => {
  if (loadingDiv) loadingDiv.classList.add("hidden");
  if (outputDiv) outputDiv.classList.remove("hidden");

  summaryP.textContent = data.summary;

  actionItemsUl.innerHTML = "";
  data.actionItems.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    actionItemsUl.appendChild(li);
  });

  taskAssignmentsUl.innerHTML = "";
  for (const [member, task] of Object.entries(data.taskAssignments)) {
    const li = document.createElement("li");
    li.textContent = `${member}: ${task}`;
    taskAssignmentsUl.appendChild(li);
  }
});
