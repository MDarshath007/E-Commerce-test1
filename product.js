const product = JSON.parse(
  localStorage.getItem(
    "selectedProduct"
  )
);

const productDetails =
  document.getElementById(
    "product-details"
  );

if (product && productDetails) {
  productDetails.innerHTML = `
    <img
      class="product-img"
      src="${product.thumbnail}"
      alt="${product.title}"
    />

    <div class="product-details">
      <h1>${product.title}</h1>

      <h4>
        ⭐ (${product.rating})
      </h4>

      <h2>
        $${product.price}
      </h2>

      <p>
        ${product.description}
      </p>

      <h5>
        Category:
        <span class="fw-light">
          ${product.category}
        </span>
      </h5>

      <h5>
        Brand:
        <span class="fw-light">
          ${product.brand}
        </span>
      </h5>

      <button
        class="btn btn-primary w-25 mt-4"
        onclick='addToCart(${JSON.stringify(product)})'
      >
        Add to Cart
      </button>
    </div>
  `;
}