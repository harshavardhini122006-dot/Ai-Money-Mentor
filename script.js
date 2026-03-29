let chart;

// LOAD THEME
window.onload = function () {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
};

// DARK MODE
function toggleDarkMode() {
  document.body.classList.toggle("dark");

  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
}

// MAIN ANALYSIS
function analyze() {

  let income = +document.getElementById("income").value || 0;
  let expenses = +document.getElementById("expenses").value || 0;
  let savings = income - expenses;

  // KPI
  document.getElementById("monthlySavings").innerText = "₹" + savings;
  document.getElementById("ratioText").innerText =
    income > 0 ? ((expenses / income) * 100).toFixed(1) + "% spent" : "--";

  // SCORE
  let score = (savings / income) * 100;
  if (!isFinite(score) || score < 0) score = 0;
  if (score > 100) score = 100;

  let scoreEl = document.getElementById("score");
  let statusEl = document.getElementById("status");
  let card = document.getElementById("scoreCard");

  let current = 0;
  let interval = setInterval(() => {
    if (current >= score) clearInterval(interval);
    else {
      current++;
      scoreEl.innerText = current;
    }
  }, 10);

  if (score < 30) {
    scoreEl.style.color = "#ef4444";
    statusEl.innerText = "Poor";
    card.style.border = "2px solid #ef4444";
  } else if (score < 70) {
    scoreEl.style.color = "#f59e0b";
    statusEl.innerText = "Average";
    card.style.border = "2px solid #f59e0b";
  } else {
    scoreEl.style.color = "#22c55e";
    statusEl.innerText = "Good";
    card.style.border = "2px solid #22c55e";
  }

  // INTELLIGENCE
  let decision = document.getElementById("decisionText");
  let rate = (savings / income) * 100;

  if (rate < 10) {
    decision.innerText = "Critical: Increase savings and reduce expenses immediately.";
  } else if (rate < 20) {
    decision.innerText = "Moderate: Improve savings to strengthen financial stability.";
  } else {
    decision.innerText = "Strong: Maintain habits and increase investments.";
  }

  // BENCHMARK
  let benchmark = "";
  if (rate < 10) benchmark = "Below Average (<10%)";
  else if (rate < 20) benchmark = "Average (10–20%)";
  else benchmark = "Excellent (20%+)";

  document.getElementById("benchmarkText").innerText = benchmark;

  // RISKS
  let risks = [];

  if (expenses > income) risks.push("Expenses exceed income");
  if (rate < 10) risks.push("Very low savings rate");
  if (income === 0) risks.push("Income missing");

  let riskList = document.getElementById("riskList");
  riskList.innerHTML = "";

  risks.forEach(r => {
    let li = document.createElement("li");
    li.innerText = r;
    riskList.appendChild(li);
  });

  // GOAL TIMELINE
  let target = 1000000;
  let months = savings > 0 ? Math.ceil(target / savings) : 0;

  document.getElementById("goalTimeline").innerText =
    savings > 0
      ? `₹10,00,000 achievable in ~${months} months`
      : "Increase savings to estimate timeline.";

  // CHART
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

  // sync simulator
  document.getElementById("incomeSlider").value = income;
  document.getElementById("expenseSlider").value = expenses;
}

// SIMULATOR
function updateSimulation() {

  let income = +document.getElementById("incomeSlider").value;
  let expenses = +document.getElementById("expenseSlider").value;

  let savings = income - expenses;

  document.getElementById("simResult").innerText =
    `Income ₹${income}, Expenses ₹${expenses}, Savings ₹${savings}`;
}
