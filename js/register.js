window.addEventListener("DOMContentLoaded", event => {
  console.log("page is fully loaded");
  const alert = document.getElementById("alert");
  alert.style.display = "none";
});

const form = document.getElementById("register-form");
const users = JSON.parse(localStorage.getItem("users") || null) || [];

form.addEventListener("submit", e => {
  e.preventDefault();
  if (users.find(user => user.email === form.email.value)) {
    const alert = document.getElementById("alert");
    return (alert.style.display = "block");
  }
  const user = {
    email: form.email.value,
    username: form.username.value,
    phone: form.phone.value,
    password: form.password.value,
    cart: [],
  };
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  window.location.replace("login.html");
});
