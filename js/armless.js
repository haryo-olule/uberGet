document.addEventListener("DOMContentLoaded", function () {
  // ---------- Common Navigation Functionality ----------
  const menuButton = document.querySelector(".btn-menu");
  if (menuButton) {
    menuButton.addEventListener("click", function () {
      document.querySelector(".navbar").classList.toggle("active");
    });
  }

  // ---------- Product Page Functionality (from js.js) ----------
  // Close pop-out (if present)
  const popCloseButton = document.querySelector(".close-popout");
  if (popCloseButton) {
    popCloseButton.addEventListener("click", function () {
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
        // Remove active class from all buttons
        tabButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        // Hide all tab contents
        tabContents.forEach((content) => content.classList.remove("active"));
        const tabId = button.dataset.tab;
        const activeTab = document.getElementById(tabId);
        if (activeTab) {
          activeTab.classList.add("active");
        }
      });
    });
  }

  // ---------- Checkout Page Functionality (from cashout.js) ----------
  // Payment method toggling
  const paymentMethods = document.querySelectorAll(".payment-method");
  if (paymentMethods.length) {
    paymentMethods.forEach((method) => {
      method.addEventListener("click", () => {
        paymentMethods.forEach((m) => m.classList.remove("active"));
        method.classList.add("active");

        const methodType = method.dataset.method;
        // Hide all payment detail sections first
        const cardPayment = document.getElementById("card-payment");
        const paypalPayment = document.getElementById("paypal-payment");
        const cashoutPayment = document.getElementById("cashout-payment");
        if (cardPayment) cardPayment.style.display = "none";
        if (paypalPayment) paypalPayment.style.display = "none";
        if (cashoutPayment) cashoutPayment.style.display = "none";

        // Then show the selected payment method section
        if (methodType === "card" && cardPayment) {
          cardPayment.style.display = "block";
        } else if (methodType === "paypal" && paypalPayment) {
          paypalPayment.style.display = "block";
        } else if (methodType === "cashout" && cashoutPayment) {
          cashoutPayment.style.display = "block";
        }
      });
    });
  }

  // Cashout option toggling within the cashout section
  const cashoutOptions = document.querySelectorAll(".cashout-option");
  if (cashoutOptions.length) {
    cashoutOptions.forEach((option) => {
      option.addEventListener("click", () => {
        cashoutOptions.forEach((opt) => opt.classList.remove("active"));
        option.classList.add("active");
        const cashoutType = option.dataset.cashout;

        // Hide all cashout details
        const bankCashout = document.getElementById("bank-cashout");
        const cryptoCashout = document.getElementById("crypto-cashout");
        const giftCashout = document.getElementById("gift-cashout");
        if (bankCashout) bankCashout.style.display = "none";
        if (cryptoCashout) cryptoCashout.style.display = "none";
        if (giftCashout) giftCashout.style.display = "none";

        // Display the selected cashout details
        if (cashoutType === "bank" && bankCashout) {
          bankCashout.style.display = "block";
        } else if (cashoutType === "crypto" && cryptoCashout) {
          cryptoCashout.style.display = "block";
        } else if (cashoutType === "gift" && giftCashout) {
          giftCashout.style.display = "block";
        }
      });
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  // Get the elements where the product details should be displayed
  const productNameDisplay = document.getElementById("product-name-display");
  const productQuantityDisplay = document.getElementById("product-quantity");
  const productPriceDisplay = document.getElementById("product-price-display");

  const storedProductName = localStorage.getItem("ProductName") || "None";
  const storedProductPrice = localStorage.getItem("price") || "$0.00";
  const storedProductQuantity = localStorage.getItem("quantity") || "1";

  if (productNameDisplay) productNameDisplay.textContent = storedProductName;
  if (productPriceDisplay) productPriceDisplay.textContent = storedProductPrice;
  if (productQuantityDisplay)
    productQuantityDisplay.textContent = storedProductQuantity;
});
