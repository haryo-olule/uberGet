document.addEventListener("DOMContentLoaded", function () {
  // ---------- Common Navigation Functionality ----------
  const menuButton = document.querySelector(".btn-menu");
  if (menuButton) {
    menuButton.addEventListener("click", () => {
      document.querySelector(".navbar").classList.toggle("active");
    });
  }

  // ---------- Product Page Functionality ----------
  // Close pop-out (if present)
  const popCloseButton = document.querySelector(".close-popout");
  if (popCloseButton) {
    popCloseButton.addEventListener("click", () => {
      const popOutSection = document.getElementById("pop2");
      if (popOutSection) {
        popOutSection.style.display = "none";
      }
    });
  }

  // Tab switching for product details
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");
  if (tabButtons.length) {
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Loop over all buttons to remove active state
        tabButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        // Loop over all tab contents to hide them
        tabContents.forEach((content) => content.classList.remove("active"));
        const tabId = button.dataset.tab;
        const activeTab = document.getElementById(tabId);
        if (activeTab) {
          activeTab.classList.add("active");
        }
      });
    });
  }

  // ---------- Checkout Page Functionality ----------
  // Helper function to toggle display for a given set of sections
  function toggleDisplay(sections, targetKey) {
    Object.entries(sections).forEach(([key, elementId]) => {
      const section = document.getElementById(elementId);
      if (section) {
        section.style.display = key === targetKey ? "block" : "none";
      }
    });
  }

  // Payment method toggling
  const paymentMethods = document.querySelectorAll(".payment-method");
  // Object mapping payment method types to their section IDs
  const paymentSections = {
    card: "card-payment",
    paypal: "paypal-payment",
    cashout: "cashout-payment"
  };

  if (paymentMethods.length) {
    paymentMethods.forEach((method) => {
      method.addEventListener("click", () => {
        // Remove active state from all methods and then set active on clicked method
        paymentMethods.forEach((m) => m.classList.remove("active"));
        method.classList.add("active");

        // Toggle display for payment sections
        const methodType = method.dataset.method;
        toggleDisplay(paymentSections, methodType);
      });
    });
  }

  // Cashout option toggling within the cashout section
  const cashoutOptions = document.querySelectorAll(".cashout-option");
  // Object mapping cashout types to their section IDs
  const cashoutSections = {
    bank: "bank-cashout",
    crypto: "crypto-cashout",
    gift: "gift-cashout"
  };

  if (cashoutOptions.length) {
    cashoutOptions.forEach((option) => {
      option.addEventListener("click", () => {
        cashoutOptions.forEach((opt) => opt.classList.remove("active"));
        option.classList.add("active");

        const cashoutType = option.dataset.cashout;
        toggleDisplay(cashoutSections, cashoutType);
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // --- Checkout Total Update ---
  const checkoutProduct = JSON.parse(localStorage.getItem("checkoutProduct"));
  const priceDisplay = document.getElementById("product-price-display");
  const quantityDisplay = document.getElementById("product-quantity");
  const nameDisplay = document.getElementById("product-name-display");

  if (checkoutProduct && priceDisplay) {
    if (nameDisplay) nameDisplay.textContent = checkoutProduct.name || "N/A";
    if (quantityDisplay) quantityDisplay.textContent = checkoutProduct.quantity || "1";
    priceDisplay.textContent = `$${checkoutProduct.total.toFixed(2)}`;
  } else if (priceDisplay) {
    // Fallback if no product details are found
    priceDisplay.textContent = "$0.00";
  }
  
  // Other checkout page functionality can be added here…
});

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const display = document.getElementById("cart-count");
  if (display) display.textContent = count;
}

function addToCart(productId, productName, price, imageSrc) {
  const cart = getCart();
  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity++;
  } else {
    cart.push({
      id: productId,
      name: productName,
      price: price,
      image: imageSrc,
      quantity: 1,
    });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(productName + " added to your cart!");
}

document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const productEl = event.target.closest(".headphone-col");
    const productName = productEl.querySelector("h1").textContent;
    const price = productEl.querySelector("h2").textContent.replace("$", "");
    const imageSrc = productEl.querySelector("img").src;
    const productId = productName.toLowerCase().replace(/\s+/g, "-");
    addToCart(productId, productName, price, imageSrc);
  });
});
updateCartCount();
