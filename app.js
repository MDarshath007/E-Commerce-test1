const API_URL = "https://dummyjson.com/products";
let data = [];

// -------------------- RENDER FUNCTIONS --------------------

function renderBanner(product) {
return `     <img
      class="img-fluid banner-img py-5 card-img"
      src="${product.thumbnail}"
      alt="${product.title}"
    />
  `;
}

function renderFeaturedProducts(product) {
return ` <div class="card rounded-3 mx-2 d-flex flex-column"
      style="min-width:14rem; min-height:430px;">

  <a href="product.html"
     onclick="saveProduct(${product.id})"
     style="text-decoration:none; color:black;">

    <img
      src="${product.thumbnail}"
      class="card-img-top product-img"
      alt="${product.title}"
    />
  </a>

  <div class="card-body d-flex flex-column">

    <h5>${product.title}</h5>

    <p>⭐ (${product.rating})</p>

    <h4>$${product.price}</h4>

    <button
      class="btn btn-primary w-100 mt-auto"
      onclick='addToCart(${JSON.stringify(product)})'>
      Add to Cart
    </button>

  </div>
</div>


`;
}

// -------------------- FETCH PRODUCTS --------------------

async function getProducts() {
const response = await fetch(
"https://dummyjson.com/products?limit=0"
);

data = await response.json();

// Banner products
const categories = [
"smartphones",
"laptops",
"mens-watches",
"womens-watches",
"tablets"
];

let bannerProducts = [];

for (const category of categories) {
const response = await fetch(
`https://dummyjson.com/products/category/${category}`
);


const categoryData = await response.json();

bannerProducts.push(...categoryData.products);


}

const banner =
document.getElementById("banner");

if (banner) {
bannerProducts
.sort(() => Math.random() - 0.5)
.slice(0, 3)
.forEach(product => {
banner.innerHTML +=
renderBanner(product);
});
}

// Featured Products
const featuredProducts =
document.getElementById(
"featured-products"
);

if (featuredProducts) {
const randomProducts =
data.products
.filter(
product => product.rating >= 3.5
)
.sort(() => Math.random() - 0.5)
.slice(0, 5);

randomProducts.forEach(product => {
  featuredProducts.innerHTML +=
    renderFeaturedProducts(product);
});

}

// Category Filter
const categoryButtons =
document.querySelectorAll(
".category-btn"
);

categoryButtons.forEach(button => {
button.addEventListener(
"click",
async (e) => {
e.preventDefault();

    const categories =
      button.dataset.category.split(
        ","
      );

    let allProducts = [];

    for (const category of categories) {
      const response =
        await fetch(
          `https://dummyjson.com/products/category/${category}`
        );

      const data =
        await response.json();

      allProducts.push(
        ...data.products
      );
    }

    localStorage.setItem(
      "filteredProducts",
      JSON.stringify(allProducts)
    );

    window.location.href =
      "filter-page.html";
  }
);


});
}

getProducts();

// -------------------- SELECTED PRODUCT --------------------

function saveProduct(id) {
const selectedProduct =
data.products.find(
product => product.id === id
);

localStorage.setItem(
"selectedProduct",
JSON.stringify(selectedProduct)
);
}

// -------------------- CART --------------------

function addToCart(product) {
let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

const existingProduct =
cart.find(
item => item.id === product.id
);

if (existingProduct) {
existingProduct.quantity++;
} else {
cart.push({
...product,
quantity: 1
});
}

localStorage.setItem(
"cart",
JSON.stringify(cart)
);
}

// -------------------- SEARCH --------------------

const searchBar =
document.getElementById(
"search-bar"
);

const searchBtn =
document.getElementById(
"search-btn"
);

searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const searchText = searchBar.value
    .trim()
    .toLowerCase();

  // Empty search
  if (!searchText) {
    localStorage.setItem(
      "filteredProducts",
      JSON.stringify([])
    );

    window.location.href =
      "filter-page.html";

    return;
  }

  const response = await fetch(
    `https://dummyjson.com/products/search?q=${searchText}`
  );

  const data = await response.json();

  localStorage.setItem(
    "filteredProducts",
    JSON.stringify(data.products)
  );

  window.location.href =
    "filter-page.html";
});