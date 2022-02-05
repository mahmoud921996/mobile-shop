const fetchProducts = async () => {
  try {
    const results = await fetch("https://mahmoud921996.github.io/jsonapi/data/products.json");
    const data = await results.json();
    const products = data.products;
    return products;
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener("load", async () => {
  const products = await fetchProducts();
  displayProds(products);
});
const productsContainer = document.getElementById("products-container");
const displayProds = products => {
  let productsStr = "";
  products.forEach(prod => {
    const { id, title, image, price } = prod;
    productsStr += `
        <div class='col-md-6 col-lg-3 mb-5'>
        <a class='product text-decoration-none text-dark' href='product.html?id=${id}'>
        <div class='card text-dark'>
        <img src=${image} class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title py-3">${title}</h5>
        <p class="card-text"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis nesciunt repellendus a incidunt? Debitis...   <a class='product text-decoration-none text-primary' href='product.html?id=${id}'>
        <span class='see-more ' >See More</span>
        </a>
        </p>
      </div>
      <div class="card-footer bg-transparent border-success d-flex justify-content-between align-items-center">
      <span>${price}$</span>
    <span>available</span>

      </div>
      </div>
      </a>
      </div>
        `;
  });
  if (productsContainer) {
    productsContainer.innerHTML = productsStr;
  }
};

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
    window.location.replace("main.html");
  });
});

//filtering
const categoryList = document.getElementById("category-list");
const filterItems = document.getElementsByClassName("filter-links");

if (categoryList) {
  categoryList.addEventListener("click", async e => {
    const target = e.target.closest(".nav-link");
    if (!target) return;
    const id = target.dataset.id;
    const products = await fetchProducts();
    if (id) {
      Array.from(filterItems).forEach(btn => btn.classList.remove("active"));
      target.classList.add("active");
      // Load Products

      let menuCategory = products.filter(product => {
        if (product.category === id) {
          return product;
        }
      });
      if (id === "all") {
        displayProds(products);
      } else {
        displayProds(menuCategory);
      }
    }
  });
}
