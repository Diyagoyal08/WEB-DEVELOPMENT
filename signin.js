 document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#signinForm");
  const msgEl = document.querySelector("#message");

  if (!form) {
    console.error("signin.js: #signinForm not found");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value;

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!username || !password) {
      alert("Please fill all fields");
      return;
    }

    if (savedUser && savedUser.username === username && savedUser.password === password) {
      window.location.href = "choose.html";
    } else {
      alert("Invalid login");
    }
  });
});
