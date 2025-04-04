document.addEventListener("DOMContentLoaded", function () {
  // ================================
  // 1. NAVBAR TOGGLE
  // ================================
  const btnMenu = document.querySelector(".btn-menu");
  const navbar = document.querySelector(".navbar");
  if (btnMenu && navbar) {
    btnMenu.addEventListener("click", () => {
      navbar.classList.toggle("show");
    });
  }

  // ================================
  // 2. FILTER FUNCTIONALITY
  // ================================
  const filterButtons = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".headphone-col");
  if (filterButtons.length && items.length) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove 'active' class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        // Add 'active' class to the clicked button
        button.classList.add("active");
        // Determine the filter category from the button's data attribute
        const filterCategory = button.getAttribute("data-filter");
        // Show/hide items based on category
        items.forEach((item) => {
          const categoryType = item.getAttribute("data-category");
          if (filterCategory === "all" || categoryType === filterCategory) {
            item.style.display = "inline-block";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }

  // ================================
  // 4. CART FUNCTIONALITY (UPDATED)
  // ================================
  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const display = document.getElementById("cart-count");
    if (display) display.textContent = count;
  }

  function showPopup(message) {
    // Create popup elements
    const popup = document.createElement("div");
    popup.className = "cart-popup";

    // Add item icon
    const icon = document.createElement("i");
    icon.className = "fas fa-check-circle";
    popup.appendChild(icon);

    // Add message
    const text = document.createElement("span");
    text.textContent = message;
    popup.appendChild(text);

    // Add styles
    popup.style.position = "fixed";
    popup.style.top = "50px"; // Changed from bottom to top
    popup.style.left = "10%"; // Position to center with 80% width
    popup.style.width = "80%"; // Set width to 80%
    popup.style.backgroundColor = " #ff6600";
    popup.style.color = "white";
    popup.style.padding = "12px 20px";
    popup.style.borderRadius = "4px";
    popup.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
    popup.style.display = "flex";
    popup.style.alignItems = "center";
    popup.style.justifyContent = "center"; // Center content horizontally
    popup.style.gap = "8px";
    popup.style.zIndex = "1000";
    popup.style.opacity = "0";
    popup.style.transition = "opacity 0.3s ease-in-out";
    popup.style.fontSize = "1.3rem"; // Larger font size
    popup.style.textAlign = "center"; // Center text

    // Add to document
    document.body.appendChild(popup);

    // Show popup with animation
    setTimeout(() => {
      popup.style.opacity = "1";
    }, 10);

    // Remove popup after 3 seconds
    setTimeout(() => {
      popup.style.opacity = "0";
      setTimeout(() => {
        document.body.removeChild(popup);
      }, 300);
    }, 3000);
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
    // Replace alert with custom popup
    showPopup(productName + " added to your cart!");
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

  // ================================
  // 5. QUANTITY COUNTER (if present)
  // ================================
  const incrementBtn = document.querySelector("#increment");
  const decrementBtn = document.querySelector("#decrement");
  const counterDisplay = document.querySelector(".quantity span");
  if (incrementBtn && decrementBtn && counterDisplay) {
    let counter = parseInt(counterDisplay.textContent) || 0;
    incrementBtn.addEventListener("click", () => {
      counter++;
      counterDisplay.textContent = counter;
    });
    decrementBtn.addEventListener("click", () => {
      if (counter > 0) {
        counter--;
      }
      counterDisplay.textContent = counter;
    });
  }

  // ================================
  // 6. IMAGE SWITCHING IN PRODUCT POP-OUT
  // ================================
  const images = document.querySelectorAll(".pol1 img");
  const popImage = document.querySelector(".pop-col img");
  if (images.length && popImage) {
    images.forEach((img) => {
      img.addEventListener("click", () => {
        popImage.src = img.src;
      });
    });
  }

  // ================================
  // 7. TAB FUNCTIONALITY (Product Details)
  // ================================
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");
  if (tabButtons.length) {
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        tabButtons.forEach((btn) => btn.classList.remove("active"));
        tabContents.forEach((content) => content.classList.remove("active"));
        button.classList.add("active");
        const tabId = button.getAttribute("data-tab");
        const activeTab = document.getElementById(tabId);
        if (activeTab) {
          activeTab.classList.add("active");
        }
      });
    });
  }

  // ================================
  // 8. "BUY NOW" BUTTON STORAGE FUNCTIONALITY
  // ================================
  const buyNowButton = document.querySelector(
    '.btn-actions a[href="cashout.html"]'
  );
  if (buyNowButton) {
    buyNowButton.addEventListener("click", function (e) {
      // Optionally, prevent default if you need asynchronous handling:
      // e.preventDefault();
      const productNameElement =
        document.querySelector("#ProductName") ||
        document.querySelector(".pop-col1 h2") ||
        document.querySelector(".headphone-col h1");
      const priceElement =
        document.querySelector(".price") ||
        document.querySelector(".headphone-col h2");
      const descriptionElement =
        document.querySelector(".pop-col1 p") ||
        document.querySelector(".headphone-col p");
      const quantityElement = document.querySelector(".quantity span");
      const colorElement = document.querySelector(".colors a");

      // Parse price and quantity to calculate total
      const priceValue = priceElement
        ? parseFloat(priceElement.innerText.replace("$", ""))
        : 0;
      const quantityValue = quantityElement
        ? parseInt(quantityElement.innerText)
        : 1;
      const total = priceValue * quantityValue;

      const productDetails = {
        name: productNameElement ? productNameElement.innerText.trim() : "",
        price: priceElement ? priceElement.innerText.trim() : "",
        description: descriptionElement
          ? descriptionElement.innerText.trim()
          : "",
        quantity: quantityElement ? quantityElement.innerText.trim() : "1",
        color: colorElement ? colorElement.innerText.trim() : "Default",
        total: total,
      };

      localStorage.setItem("checkoutProduct", JSON.stringify(productDetails));
      // Uncomment the next line to force a redirect if needed:
      // window.location.href = "cashout.html";
    });
  }

  // ================================
  // 9. CHECKOUT PAGE FUNCTIONALITY (Payment Method & Cashout Options)
  // ================================
  const paymentMethods = document.querySelectorAll(".payment-method");
  if (paymentMethods.length) {
    paymentMethods.forEach((method) => {
      method.addEventListener("click", () => {
        paymentMethods.forEach((m) => m.classList.remove("active"));
        method.classList.add("active");
        const methodType = method.dataset.method;
        const cardPayment = document.getElementById("card-payment");
        const paypalPayment = document.getElementById("paypal-payment");
        const cashoutPayment = document.getElementById("cashout-payment");
        if (cardPayment) cardPayment.style.display = "none";
        if (paypalPayment) paypalPayment.style.display = "none";
        if (cashoutPayment) cashoutPayment.style.display = "none";
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

  const cashoutOptions = document.querySelectorAll(".cashout-option");
  if (cashoutOptions.length) {
    cashoutOptions.forEach((option) => {
      option.addEventListener("click", () => {
        cashoutOptions.forEach((opt) => opt.classList.remove("active"));
        option.classList.add("active");
        const cashoutType = option.dataset.cashout;
        const bankCashout = document.getElementById("bank-cashout");
        const cryptoCashout = document.getElementById("crypto-cashout");
        const giftCashout = document.getElementById("gift-cashout");
        if (bankCashout) bankCashout.style.display = "none";
        if (cryptoCashout) cryptoCashout.style.display = "none";
        if (giftCashout) giftCashout.style.display = "none";
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

  const signUpButton = document.getElementById("signUp");
  const signInButton = document.getElementById("signIn");
  const signUpLink = document.getElementById("signUpLink");
  const signInLink = document.getElementById("signInLink");
  const loginInfo = document.querySelector(".login-info"); // Changed from ".container" to ".login-info"

  // Desktop buttons
  signUpButton.addEventListener("click", () => {
    loginInfo.classList.add("right-panel-active"); // Changed from "container" to "loginInfo"
  });

  signInButton.addEventListener("click", () => {
    loginInfo.classList.remove("right-panel-active"); // Changed from "container" to "loginInfo"
  });

  // Mobile links
  if (signUpLink) {
    signUpLink.addEventListener("click", () => {
      loginInfo.classList.add("right-panel-active"); // Changed from "container" to "loginInfo"
    });
  }

  if (signInLink) {
    signInLink.addEventListener("click", () => {
      loginInfo.classList.remove("right-panel-active"); // Changed from "container" to "loginInfo"
    });
  }
});
