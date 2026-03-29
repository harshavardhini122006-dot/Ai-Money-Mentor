let chart;

// NAVIGATION
function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => {
    sec.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}

// DARK MODE
function toggleDark() {
  document.body.classList.toggle("dark");
}

// CALCULATE
function calculate() {
  let income = +document.getElementById("income").value;
  let expenses = +document.getElementById("expenses").value;

  let savings = income - expenses;
  document.getElementById("savings").innerText = "Savings: ₹" + savings;

  let score = (savings / income) * 100 || 0;
  document.getElementById("score").innerText = score.toFixed(2);

  // CHART
  if (chart) chart.destroy();

  chart = new Chart(document.getElementById("chart"), {
    type: "bar",
    data: {
      labels: ["Income", "Expenses", "Savings"],
      datasets: [{
        data: [income, expenses, savings]
      }]
    }
  });

  // GOAL TIME
  let months = savings > 0 ? Math.ceil(1000000 / savings) : 0;
  document.getElementById("goalTime").innerText =
    "Estimated time: " + months + " months";
}

// CHATBOT (Simple AI logic simulation)
function sendMessage() {
  let input = document.getElementById("userInput").value;
  let chatBox = document.getElementById("chatBox");

  if (!input) return;

  let userMsg = document.createElement("div");
  userMsg.innerText = "🧑 You: " + input;
  chatBox.appendChild(userMsg);

  let botMsg = document.createElement("div");

  let response = "";

  if (input.toLowerCase().includes("save")) {
    response = "Try saving at least 20% of your income.";
  } else if (input.toLowerCase().includes("invest")) {
    response = "Consider mutual funds or index funds for beginners.";
  } else if (input.toLowerCase().includes("budget")) {
    response = "Follow 50-30-20 budgeting rule.";
  } else {
    response = "I can help with savings, investing, and budgeting.";
  }

  botMsg.innerText = "🤖 AI: " + response;
  chatBox.appendChild(botMsg);

  document.getElementById("userInput").value = "";
}
