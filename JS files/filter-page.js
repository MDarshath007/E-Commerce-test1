const products =
  JSON.parse(
    localStorage.getItem("filteredProducts")
  ) || [];

const filteredProducts =
  document.getElementById(
    "filtered-container"
  );

if (products.length === 0) {
  filteredProducts.innerHTML = `
    <div class="text-center mt-5">
      <h1>Product Not Found 😕</h1>
      <p>Try searching for another product.</p>
    </div>
  `;
} else {
  products.forEach(product => {
    filteredProducts.innerHTML += `
      <div
        class="product-container mb-5 px-3"
        onclick='saveFilteredProduct(${JSON.stringify(product.id)})'
        style="cursor:pointer"
      >

        <div class="product-image-section">
          <img
            class="product-img"
            src="${product.thumbnail}"
            alt="${product.title}"
          />
        </div>

        <div class="product-details">
          <h1>${product.title}</h1>
          <h4>⭐ (${product.rating})</h4>
          <h2>$${product.price}</h2>
          <p>${product.description}</p>

        </div>

      </div>
    `;
  });
}

function saveFilteredProduct(id) {
  const product = products.find(
    item => item.id === id
  );

  localStorage.setItem(
    "selectedProduct",
    JSON.stringify(product)
  );

  window.location.href =
    "/HTML files/product.html";
}