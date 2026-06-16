let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartContainer =
    document.getElementById("cart-container");

    cart.forEach(product => {
      cartContainer.innerHTML += `
        <div class="product d-flex align-items-center justify-content-between">
        <img
          src="${product.thumbnail}"
          alt=""
          class="product-img"
        />

        <h2 class="product-name">${product.title}</h2>

        <h2 class="price">${product.price}</h2>

        <div class="btn-group">
          <button type="button" class="btn btn-primary" onclick = "DecreaseQuantity(${product.id})">-</button>

          <button type="button" class="btn btn-dark">${product.quantity}</button>

          <button type="button" class="btn btn-primary" onclick = "IncreaseQuantity(${product.id})">+</button>
        </div>

        <h2 class="total">Total: ${(product.price*product.quantity).toFixed(2)}</h2>

        <button class="btn btn-danger dlt-btn" onclick = "removeProduct(${product.id})">X</button>
      </div>` 
    });

function IncreaseQuantity(id)
{
  const product = cart.find(item => item.id === id)
  product.quantity++;
  localStorage.setItem("cart",JSON.stringify(cart));
  location.reload()
}

function DecreaseQuantity(id)
{
  const product = cart.find(item => item.id === id)
  
  if(product.quantity > 1)
  {
    product.quantity--;
  }
  
  localStorage.setItem("cart",JSON.stringify(cart));
  location.reload()
}

function removeProduct(id)
{
  cart = cart.filter(item => item.id !== id)
  localStorage.setItem("cart",JSON.stringify(cart));
  location.reload();
}

const subtotal = cart.reduce(
  (sum, item)=>{
    return sum+item.price*item.quantity
  },0
)
console.log(subtotal)

const orderSummaryContainer = document.getElementById("order-summary")

const shipping = 5;
const discount = subtotal*0.1;
const total = subtotal - discount + shipping;

orderSummaryContainer.innerHTML+=`<section class="cart-summary">
        <div class="summary-row">
          <h3>Subtotal</h3>
          <h3>${subtotal.toFixed(2)}</h3>
        </div>

        <div class="summary-row">
          <h3>Discount</h3>
          <h3>-${discount.toFixed(2)}</h3>
        </div>

        <div class="summary-row">
          <h3>Shipping</h3>
          <h3>${shipping.toFixed(2)}</h3>
        </div>

        <hr />

        <div class="summary-row total-row">
          <h2>Total</h2>
          <h2>${total.toFixed(2)}</h2>
        </div>

        <button class="btn btn-primary w-100 rounded-3" onclick="orderPlaced()">
          Proceed to Checkout
        </button>
      </section>`

if (cart.length === 0) {
  cartContainer.innerHTML = `
    <h2 class="text-center mt-5">
      Your cart is empty 🛒
    </h2>
  `;
  orderSummaryContainer.innerHTML = ``
}

function orderPlaced()
{
  window.location.href = "HTML files/order-success.html"
}
