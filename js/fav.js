// Get liked items from localStorage
function getLikedItems() {
    return JSON.parse(localStorage.getItem("likedItems")) || [];
  }
  
  // Save liked items to localStorage
  function saveLikedItems(items) {
    localStorage.setItem("likedItems", JSON.stringify(items));
  }
  
  // Toggle Like
  function toggleLike(button) {
    const productEl = button.closest(".headphone-col");
    const productName = productEl.querySelector("h1").textContent.trim();
    const price = productEl.querySelector("h2").textContent.replace("$", "").trim();
    const image = productEl.querySelector("img").getAttribute("src");
    const stock = productEl.querySelector("p").textContent.trim();
    const productId = productName.toLowerCase().replace(/\s+/g, "-");
  
    const likedItems = getLikedItems();
    const index = likedItems.findIndex((item) => item.id === productId);
  
    if (index > -1) {
      // Unlike
      likedItems.splice(index, 1);
      updateLikeIcon(button, false);
    } else {
      // Like
      likedItems.push({
        id: productId,
        name: productName,
        price: price,
        image: image,
        stock: stock,
      });
      updateLikeIcon(button, true);
    }
  
    saveLikedItems(likedItems);
    updateLikesCount();
  }
  
  // Update like/unlike icon
  function updateLikeIcon(button, isLiked) {
    const icon = button.querySelector("i");
    icon.classList.toggle("fa-solid", isLiked);
    icon.classList.toggle("far", !isLiked);
  }
  
  // Update like count display
  function updateLikesCount() {
    const likeCount = getLikedItems().length;
    const likeCounter = document.getElementById("like-count");
    if (likeCounter) {
      likeCounter.textContent = likeCount;
    }
  }
  
  // Attach like button event listeners
  function setupLikeButtons() {
    document.querySelectorAll(".like-button").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleLike(btn);
      });
    });
  }
  
  // Initialize
  setupLikeButtons();
  updateLikesCount();
  