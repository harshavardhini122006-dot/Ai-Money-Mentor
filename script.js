let chart;

// LOAD THEME
window.onload = function () {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
};

// DARK MODE TOGGLE
function toggleDarkMode() {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

// ANALYZE
function analyze() {

  let income = +document.getElementById("income").value || 0;
  let expenses = +document.getElementById("expenses").value || 0;

  let savings = income - expenses;

  // KPI updates
  document.getElementById("monthlySavings").innerText = "₹" + savings;

  document.getElementById("ratioText").innerText =
    income > 0 ? ((expenses / income) * 100).toFixed(1) + "% spent" : "--";

  // SCORE
  let score = (savings / income) * 100;
  if (!isFinite(score) || score < 0) score = 0;
  if (score > 100) score = 100;

  let scoreEl = document.getElementById("score");
  let statusEl = document.getElementById("status");
  let scoreCard = document.getElementById("scoreCard");

  // Animation
  let current = 0;
  let interval = setInterval(() => {
    if (current >= score) clearInterval(interval);
    else {
      current++;
      scoreEl.innerText = current;
    }
  }, 10);

  // Color coding
  scoreCard.style.border = "2px solid transparent";

  if (score < 30) {
    scoreEl.style.color = "#ef4444";
    scoreCard.style.border = "2px solid #ef4444";
    statusEl.innerText = "Poor";
  } else if (score < 70) {
    scoreEl.style.color = "#f59e0b";
    scoreCard.style.border = "2px solid #f59e0b";
    statusEl.innerText = "Average";
  } else {
    scoreEl.style.color = "#22c55e";
    scoreCard.style.border = "2px solid #22c55e";
    statusEl.innerText = "Good";
  }

  // AI Advice
  document.getElementById("aiAdvice").innerText =
    "Increase savings consistency and invest through SIP for long-term growth.";

  // Goal Advice
  let goal = document.getElementById("goal").value;

  let goalAdvice = "";
  if (goal === "Retirement") goalAdvice = "Focus on long-term equity + SIP.";
  else if (goal === "Buy House") goalAdvice = "Save for down payment.";
  else if (goal === "Car") goalAdvice = "Avoid heavy loans.";
  else goalAdvice = "Maintain emergency fund of 6 months.";

  document.getElementById("goalAdvice").innerText = goalAdvice;

  // Projection
  let yearly = savings * 12;
  document.getElementById("projection").innerText =
    "Yearly Savings: ₹" + yearly;

  // Chart
  if (chart) chart.destroy();

  chart = new Chart(document.getElementById("inputChart"), {
    type: "bar",
    data: {
      labels: ["Income", "Expenses", "Savings"],
      datasets: [{
        data: [income, expenses, savings]
      }]
    },
    options: {
      plugins: { legend: { display: false } }
    }
  });
}