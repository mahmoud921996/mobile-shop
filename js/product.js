const alert = document.getElementById("prod-alert");

window.addEventListener("DOMContentLoaded", () => {
  alert.style.display = "none";
  let prod, loggedUser;
  const users = JSON.parse(localStorage.getItem("users"));
  loggedUser = JSON.parse(localStorage.getItem("logged-user"));

  const quantity = document.getElementById("quantity");

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

  let addToCart = document.getElementById("add-to-cart");
  addToCart.addEventListener("click", () => {
    console.log(loggedUser);
    if (loggedUser) {
      const currentProd = loggedUser.cart.find(p => p.prod.id === prod.id);
      if (currentProd) {
        currentProd.num += +quantity.value;
      } else {
        loggedUser.cart.push({
          prod,
          num: +quantity.value,
        });
      }
      document.getElementById("quantity-grammer").innerHTML = `${
        quantity.value
      } ${quantity.value > 1 ? "x" : ""} <strong>${prod.title}</strong> ${
        quantity.value > 1 ? "have" : "has"
      }`;
      alert.style.display = "block";
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("logged-user", JSON.stringify(loggedUser));
    } else {
      window.location = "login.html";
    }
  });

  //fetch data;
  fetch("https://mahmoud921996.github.io/jsonapi/data/products.json")
    .then(data => {
      return data.json();
    })
    .then(({ products }) => {
      const prodId = +location.search.replace(/\D/gi, "");
      prod = products.find(prod => prod.id === prodId);
      const { image, id, price, title } = prod;
      document.getElementById("prod-image").src = `${image}`;
      document.getElementById("prod-name").innerHTML = title;
      document.getElementById("prod-price").innerHTML = "$" + price;
    });
});
