 // signup.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#signupForm");
  const msgEl = document.querySelector("#message");

  if (!form) {
    console.error("signup.js: #signupForm not found");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.querySelector("#username").value.trim();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value;

    // Required fields check
    if (!username || !email || !password) {
      showMessage("⚠️ Please fill all fields.", "error");
      return;
    }

    // Rule: allow passwords of length <= 6 only
    if (password.length > 6) {
      showMessage("🔒 Password must be 6 characters or fewer.", "error");
      return;
    }

    // Save user to localStorage
    const userData = { username, email, password };
    try {
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (err) {
      console.error("Error saving to localStorage:", err);
      showMessage("❌ Could not save data.", "error");
      return;
    }

    // success + redirect
    showMessage("✅ Account created — redirecting...", "success");
    setTimeout(() => (window.location.href = "choose.html"), 900);
  });

  // helper
  function showMessage(text, type = "info") {
    if (!msgEl) {
      alert(text);
      return;
    }
    msgEl.textContent = text;
    msgEl.style.color = type === "error" ? "red" : "green";
  }
});
