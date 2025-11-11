document.addEventListener("DOMContentLoaded", function() {
  const loginForm = document.getElementById("loginForm");

  if (!loginForm) {
    console.error("Login form not found!");
    return;
  }

  loginForm.addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent page reload

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Simple mock login
    if (username === "user" && password === "1234") {
      alert("Login successful!");
      window.location.href = "index.html";
    } else {
      alert("Invalid username or password");
    }
  });
});
