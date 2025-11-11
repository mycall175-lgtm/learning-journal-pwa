document.addEventListener("DOMContentLoaded", function() {
  const signupForm = document.getElementById("signupForm");

  if (!signupForm) {
    console.error("Signup form not found!");
    return;
  }

  // Regular signup form
  signupForm.addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent page reload

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    alert(`Account created for ${username} (${email})!`);
    window.location.href = "login.html"; // Redirect to login page
  });

  // Social login buttons
  const googleBtn = document.querySelector('.btn-google');
  const facebookBtn = document.querySelector('.btn-facebook');
  const githubBtn = document.querySelector('.btn-github');

  if (googleBtn) {
    googleBtn.addEventListener('click', function() {
      alert("Google signup successful! (mock demo)");
      window.location.href = "index.html";
    });
  }

  if (facebookBtn) {
    facebookBtn.addEventListener('click', function() {
      alert("Facebook signup successful! (mock demo)");
      window.location.href = "index.html";
    });
  }

  if (githubBtn) {
    githubBtn.addEventListener('click', function() {
      alert("GitHub signup successful! (mock demo)");
      window.location.href = "index.html";
    });
  }
});
