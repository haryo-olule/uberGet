// cart.js

// Get cart data from localStorage
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save cart data to localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add item to cart with root-relative image path
function addToCart(item) {
  const cart = getCart();
  const existingItem = cart.find(cartItem => cartItem.name === item.name);
  
  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    // Ensure image path is root-relative
    const rootRelativeImage = item.image.startsWith('/') ? item.image : `/${item.image}`;
    cart.push({ ...item, image: rootRelativeImage });
  }
  
  saveCart(cart);
  updateCartCount();
}

// Update cart count in header
function updateCartCount() {
  const cart = getCart();
  document.getElementById('cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Render the cart items with proper image paths
function renderCart() {
  const cart = getCart();
  const cartItemsContainer = document.querySelector(".cart-items");
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty.</p>';
    updateSummary();
    return;
  }

  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <img class="cart-item-image" src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p class="cart-item-price">$${item.price}</p>
          <p class="cart-item-quantity">Quantity: 
              <button class="quantity-btn" data-index="${index}" data-action="decrement">-</button>
              <span class="quantity-number">${item.quantity}</span>
              <button class="quantity-btn" data-index="${index}" data-action="increment">+</button>
          </p>
      </div>
      <button class="remove-item" data-index="${index}">🗑️ Remove</button>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  // Add event listeners
  document.querySelectorAll(".remove-item").forEach(button => {
    button.addEventListener("click", () => removeItem(button.dataset.index));
  });

  document.querySelectorAll(".quantity-btn").forEach(button => {
    button.addEventListener("click", () => adjustQuantity(
      button.dataset.index,
      button.dataset.action
    ));
  });

  updateSummary();
  updateCartCount();
}

// Quantity adjustment
function adjustQuantity(index, action) {
  const cart = getCart();
  if (action === "increment") {
    cart[index].quantity++;
  } else if (action === "decrement" && cart[index].quantity > 1) {
    cart[index].quantity--;
  }
  saveCart(cart);
  renderCart();
}

// Remove item from cart
function removeItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

// Update order summary
function updateSummary() {
  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + item.quantity * parseFloat(item.price), 0);
  
  document.getElementById("cart-subtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("cart-total").textContent = `$${subtotal.toFixed(2)}`;
}

// Promo code handling
function applyDiscount(discountRate) {
  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + item.quantity * parseFloat(item.price), 0);
  const discountAmount = subtotal * discountRate;
  
  document.getElementById("discount-amount").textContent = `-$${discountAmount.toFixed(2)}`;
  document.getElementById("cart-total").textContent = `$${(subtotal - discountAmount).toFixed(2)}`;
  document.querySelector(".promo-discount").style.display = "flex";
}

// Initialize cart
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  
  // Promo code application
  document.getElementById("apply-promo").addEventListener("click", () => {
    const promoCode = document.getElementById("promo-input").value.trim();
    if (promoCode === "SAVE10") {
      applyDiscount(0.1);
      alert(`Promo applied! 10% discount added.`);
    } else {
      alert("Invalid promo code.");
    }
  });
});