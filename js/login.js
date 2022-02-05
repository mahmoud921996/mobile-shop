const alert = document.getElementById("login-alert");

window.addEventListener("DOMContentLoaded", () => {
  alert.style.display = "none";
});

const form = document.getElementById("login-form");
const users = JSON.parse(localStorage.getItem("users") || null) || [];

form.addEventListener("submit", e => {
  e.preventDefault();
  let user;
  if (users) {
    user = users.find(user => user.email === form.email.value);
  }
  if (user && user.password === form.password.value) {
    localStorage.setItem("logged-user", JSON.stringify(user));
    window.location.replace("index.html");
  } else {
    return (alert.style.display = "block");
  }
});
