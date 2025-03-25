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

const likeButtons = document.querySelectorAll(".like-button");
if (likeButtons.length) {
  likeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const icon = button.querySelector("i");
      icon.classList.toggle("fa-solid");
      icon.classList.toggle("far");
    });
  });
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Update the cart count display
function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = count;
  }
}

// Add an item to the cart
function addToCart(productId, productName, price, imageSrc) {
  const cart = getCart();

  // Check if product already exists in cart
  const existingItemIndex = cart.findIndex((item) => item.id === productId);
  if (existingItemIndex !== -1) {
    // Increase quantity if item already exists
    cart[existingItemIndex].quantity += 1;
  } else {
    // Add new item to cart
    cart.push({
      id: productId,
      name: productName,
      price: price,
      image: imageSrc,
      quantity: 1,
    });
  }

  // Save updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update the cart count display
  updateCartCount();

  // Show confirmation message
  alert(`${productName} has been added to your cart!`);
}

// Initialize functionality on page load
document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();

  // Add event listeners to "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.stopPropagation();

      // Get product details from the parent element
      const productElement = this.closest(".headphone-col");
      const productName = productElement.querySelector("h1").textContent;
      const price = productElement
        .querySelector("h2")
        .textContent.replace("$", "");
      const imageSrc = productElement.querySelector("img").src;
      const productId = productName.toLowerCase().replace(/\s+/g, "-");

      addToCart(productId, productName, price, imageSrc);
    });
  });
});

// Select all category and type checkboxes
const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
const typeCheckboxes = document.querySelectorAll('input[name="type"]');
const itemsContainer = document.querySelector(".col-row"); // Parent container of items
const items = Array.from(document.querySelectorAll(".headphone-col")); // Convert NodeList to Array for sorting
const sortBySelect = document.getElementById("sort-by");

// Function to update items based on selected filters and sorting
function updateFilters() {
  const selectedCategories = Array.from(categoryCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  const selectedTypes = Array.from(typeCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  let filteredItems = items.filter((item) => {
    const itemCategory = item.getAttribute("data-category");
    const itemType = item.getAttribute("data-type");

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(itemCategory);
    const matchesType =
      selectedTypes.length === 0 || selectedTypes.includes(itemType);

    return matchesCategory && matchesType;
  });

  // Sorting Logic
  const sortBy = sortBySelect.value;
  if (sortBy === "low-to-high") {
    filteredItems.sort((a, b) => getPrice(a) - getPrice(b));
  } else if (sortBy === "high-to-low") {
    filteredItems.sort((a, b) => getPrice(b) - getPrice(a));
  }

  // Clear and re-append items in sorted order
  itemsContainer.innerHTML = "";
  filteredItems.forEach((item) => itemsContainer.appendChild(item));
}

// Helper function to extract the price from an item
function getPrice(item) {
  const priceText = item.querySelector("h2").innerText.replace(/[^0-9.]/g, "");
  return parseFloat(priceText);
}

// Event listeners for category, type, and sort filters
[...categoryCheckboxes, ...typeCheckboxes].forEach((checkbox) => {
  checkbox.addEventListener("change", updateFilters);
});

sortBySelect.addEventListener("change", updateFilters);


const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});
