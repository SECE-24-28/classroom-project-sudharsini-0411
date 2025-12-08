let isSignup = false;

const formTitle = document.getElementById("form-title");
const submitBtn = document.getElementById("submit-btn");
const toggleBtn = document.getElementById("toggle-btn");
const toggleText = document.getElementById("toggle-text");
const authForm = document.getElementById("auth-form");
const errorMsg = document.getElementById("error-msg");

// Toggle Login / Signup
if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
        isSignup = !isSignup;

        if (isSignup) {
            formTitle.innerText = "Signup";
            submitBtn.innerText = "Create Account";
            toggleText.innerHTML = `Already have an account? <span id="toggle-btn">Login</span>`;
        } else {
            formTitle.innerText = "Login";
            submitBtn.innerText = "Login";
            toggleText.innerHTML = `Don't have an account? <span id="toggle-btn">Signup</span>`;
        }
    });
}

// Login / Signup Function
if (authForm) {
    authForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const pass = document.getElementById("password").value;

        if (isSignup) {
            if (localStorage.getItem(email)) {
                errorMsg.innerText = "User already exists!";
                return;
            }
            localStorage.setItem(email, pass);
            alert("Signup successful! Please login.");
            window.location.reload();
        } else {
            let storedPass = localStorage.getItem(email);

            if (storedPass && storedPass === pass) {
                localStorage.setItem("loggedUser", email);
                window.location.href = "dashboard.html";
            } else {
                errorMsg.innerText = "Invalid Email or Password!";
            }
        }
    });
}

const loggedUser = localStorage.getItem("loggedUser");

// ---------------- Dashboard Page --------------------
if (window.location.pathname.includes("dashboard.html")) {

    if (!loggedUser) {
        window.location.href = "index.html";
    }

    document.getElementById("userEmail").innerText = loggedUser;

    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedUser");
        window.location.href = "index.html";
    });

    // Recharge Form & History
    const rechargeForm = document.getElementById("recharge-form");
    const historyList = document.getElementById("history-list");

    let history = JSON.parse(localStorage.getItem("history_" + loggedUser)) || [];

    function loadHistory() {
        historyList.innerHTML = "";
        history.forEach(h => {
            let li = document.createElement("li");
            li.textContent = `${h.phone} | ${h.operator} | ₹${h.amount} | ${h.date}`;
            historyList.appendChild(li);
        });
    }
    loadHistory();

    rechargeForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const phone = document.getElementById("phone").value;
        const operator = document.getElementById("operator").value;
        const amount = document.getElementById("amount").value;
        const successMsg = document.getElementById("success-msg");

        if (phone.length !== 10) {
            successMsg.innerText = "Enter valid 10-digit number!";
            successMsg.style.color = "red";
            return;
        }

        const entry = {
            phone,
            operator,
            amount,
            date: new Date().toLocaleString()
        };

        history.unshift(entry);
        localStorage.setItem("history_" + loggedUser, JSON.stringify(history));

        successMsg.innerText = "Recharge Successful!";
        successMsg.style.color = "green";

        rechargeForm.reset();
        loadHistory();
    });
}

// -------------- Plans Page (Fetch from API) -------------------
if (window.location.pathname.includes("plans.html")) {

    async function loadPlans() {
        const operator = document.getElementById("operatorSelect").value;
        const planList = document.getElementById("planList");

        planList.innerHTML = `<p>Loading...</p>`;

        try {
            const response = await fetch("https://69327aa9e5a9e342d26f55e7.mockapi.io/recharge");
            const plans = await response.json();

            const filterPlans = plans.filter(p => p.operator.toLowerCase() === operator.toLowerCase());
            planList.innerHTML = "";

            if (filterPlans.length === 0) {
                planList.innerHTML = "<p>No plans available.</p>";
                return;
            }

            filterPlans.forEach(plan => {
                const div = document.createElement("div");
                div.className = "plan-card";

                div.innerHTML = `
                    <h3>₹${plan.price}</h3>
                    <p><strong>Validity:</strong> ${plan.validity}</p>
                    <p><strong>Data:</strong> ${plan.data}</p>
                `;
                planList.appendChild(div);
            });

        } catch (error) {
            planList.innerHTML = "<p>Error loading plans!</p>";
        }
    }

    window.showPlans = loadPlans;
}
