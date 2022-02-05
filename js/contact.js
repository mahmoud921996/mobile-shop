const login = document.getElementById("login"),
  register = document.getElementById("register"),
  logout = document.getElementById("logout");

window.addEventListener("DOMContentLoaded", () => {
  let loggedUser = JSON.parse(localStorage.getItem("logged-user"));
  if (loggedUser) {
    login.style.display = "none";
    register.style.display = "none";
  } else {
    logout.style.display = "none";
  }

  logout.addEventListener("click", () => {
    localStorage.removeItem("logged-user");
    window.location.replace("index.html");
  });
});
