const login = document.getElementById("login"),
  register = document.getElementById("register"),
  logout = document.getElementById("logout");
let loggedUser = JSON.parse(localStorage.getItem("logged-user"));

window.addEventListener("DOMContentLoaded", () => {
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

  console.log(loggedUser);
  displayProduct();
});

function displayProduct() {
  let tbodyStr = ``;
  let total = 0;
  if (loggedUser.cart.length > 0) {
    loggedUser.cart.forEach((p, i) => {
      total += p.prod.price * p.num;
      tbodyStr +=
        ` 
              <tr>
               <td><strong>${p.prod.title}</strong></td>
              <td>${p.prod.price}</td>
              <td>${p.num}</td>
              <td>$${p.prod.price * p.num}</td>
              <td><i class="bi bi-trash-fill" onclick='deleteProduct(` +
        i +
        `)'></i></td>
      
           </tr>
           `;
      document.getElementsByTagName("tbody")[0].innerHTML = tbodyStr;
      document.getElementById("total-price").innerHTML = total;
    });
  } else {
    document.getElementsByTagName("tbody")[0].innerHTML = ``;
    document.getElementById("total-price").innerHTML = ``;
  }
}

function deleteProduct(index) {
  loggedUser.cart.splice(index, 1);
  localStorage.setItem("logged-user", JSON.stringify(loggedUser));
  displayProduct();
}
