const login = document.getElementById("login"),
  register = document.getElementById("register"),
  logout = document.getElementById("logout"),
  navbar = document.getElementById("navbar");

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
  window.onscroll = function () {
    if(window.scrollY >= 200){
      navbar.classList.add('bg-dark');
    }else{
      navbar.classList.remove('bg-dark')
    }

  }

  fetch("https://mahmoud921996.github.io/jsonapi/data/products.json").then((data)=>{
    return data.json()
  }).then(({products})=>{
    const bestSeller=products.filter(p=> p.best === true)
    document.getElementById('best-selling-products').innerHTML = displayproducts(bestSeller);
  })

});

function displayproducts(products) {
  let productsStr = "";
  products.forEach(prod => {
    productsStr += `
    <div class="col-md-6 col-lg-3">
    <a href="product.html?id=${prod.id}" class="product text-decoration-none">
    <div class="card text-muted text-center" style="width: 18rem;">
    <img src="${prod.image}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${prod.title}</h5>
    <span href="#">${prod.price}$</span>
    </div>
    </div>
    </a>
    </div>
    `;
  });
  return productsStr;
}



