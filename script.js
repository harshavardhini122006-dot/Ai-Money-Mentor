let chart;

function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

function analyze() {

  let income = +document.getElementById("income").value || 0;
  let expenses = +document.getElementById("expenses").value || 0;
  let savings = income - expenses;

  let ratio = income ? (expenses / income) * 100 : 0;
  let score = income ? (savings / income) * 100 : 0;

  document.getElementById("score").innerText = score.toFixed(0);
  document.getElementById("savings").innerText = "₹" + savings;
  document.getElementById("ratio").innerText = ratio.toFixed(0) + "%";

  document.getElementById("insight").innerText =
    score > 50 ? "Strong finances" : "Needs improvement";

  document.getElementById("benchmark").innerText = "Ideal savings: 20%+";
  document.getElementById("risk").innerText =
    savings < 0 ? "High risk" : "Low risk";

  document.getElementById("goal").innerText =
    savings > 0 ? "On track" : "Increase savings";

  document.getElementById("whatif").innerText =
    "Increase savings to improve score";

  /* ANALYTICS */
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

  document.getElementById("analyticsText").innerText =
    `Income ₹${income}, Expenses ₹${expenses}, Savings ₹${savings}`;

  /* GOALS */
  let advice = "";
  let list = [];

  if (expenses > income) {
    advice = "Reduce expenses immediately.";
    list = ["Cut unnecessary spending", "Avoid debt"];
  } else if ((expenses / income) > 0.7) {
    advice = "High spending detected.";
    list = ["Reduce lifestyle expenses", "Increase savings"];
  } else {
    advice = "Good financial health.";
    list = ["Start investing", "Build emergency fund"];
  }

  document.getElementById("goalAdvice").innerText = advice;

  let goalList = document.getElementById("goalList");
  goalList.innerHTML = "";

  list.forEach(i => {
    let li = document.createElement("li");
    li.innerText = i;
    goalList.appendChild(li);
  });
}

/* CHAT */
function toggleChat() {
  document.getElementById("chatPanel").classList.toggle("hidden");
}

function sendMessage() {
  let input = document.getElementById("chatInput").value;
  if (!input) return;

  let box = document.getElementById("chatBox");

  box.innerHTML += `<p><b>You:</b> ${input}</p>`;

  let reply = "I can help with finance.";

  if (input.includes("save")) reply = "Save 20% of income.";
  if (input.includes("invest")) reply = "Mutual funds are good.";
  if (input.includes("budget")) reply = "Follow 50-30-20 rule.";

  box.innerHTML += `<p><b>AI:</b> ${reply}</p>`;

  document.getElementById("chatInput").value = "";
}
