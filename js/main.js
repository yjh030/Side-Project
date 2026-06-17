document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Custom Cursor
  initCustomCursor();

  // 2. Sticky Navbar on Scroll
  initStickyHeader();

  // 3. Dynamic Product Rendering (based on page)
  renderPageProducts();

  // 4. Shopping Cart System (State & UI)
  initShoppingCart();

  // 5. Contact Form Handler (if present)
  initContactForm();
});

/* ==========================================================================
   1. Custom Cursor System
   ========================================================================== */
function initCustomCursor() {
  // Create cursor elements dynamically so they are present on all pages
  const dot = document.createElement("div");
  const outline = document.createElement("div");
  
  dot.className = "custom-cursor-dot";
  outline.className = "custom-cursor-outline";
  
  document.body.appendChild(dot);
  document.body.appendChild(outline);

  // Position variables
  let mouseX = 0;
  let mouseY = 0;
  let outlineX = 0;
  let outlineY = 0;

  // Track mouse movement
  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Immediate dot positioning
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    dot.style.opacity = "1";
    outline.style.opacity = "1";
  });

  // Smooth lagging outline animation
  function animateOutline() {
    // 0.15 is the easing factor (smaller = slower follow)
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    
    outline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0)`;
    requestAnimationFrame(animateOutline);
  }
  animateOutline();

  // Hide cursor when mouse leaves the window
  document.addEventListener("mouseleave", () => {
    dot.style.opacity = "0";
    outline.style.opacity = "0";
  });

  // Re-enable and bind hover animations to interactive elements
  refreshCursorHoverBinds();

  // Handle mobile touch (hide custom cursor on touch devices)
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    dot.style.display = "none";
    outline.style.display = "none";
  }
}

// Re-binds mouse hover state changes to interactive items (useful after dynamic renders)
function refreshCursorHoverBinds() {
  const dot = document.querySelector(".custom-cursor-dot");
  const outline = document.querySelector(".custom-cursor-outline");
  if (!dot || !outline) return;

  const hoverables = document.querySelectorAll(
    "a, button, select, input, textarea, .product-card, .btn, .nav-links li, .color-option, .size-option, .cart-icon"
  );
  
  hoverables.forEach(el => {
    // Avoid double-binding
    el.removeEventListener("mouseenter", handleMouseEnter);
    el.removeEventListener("mouseleave", handleMouseLeave);
    
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);
  });

  function handleMouseEnter() {
    dot.classList.add("cursor-hover");
    outline.classList.add("cursor-hover");
  }

  function handleMouseLeave() {
    dot.classList.remove("cursor-hover");
    outline.classList.remove("cursor-hover");
  }
}

/* ==========================================================================
   2. Sticky Header
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

/* ==========================================================================
   3. Product Renderings
   ========================================================================== */
function renderPageProducts() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  // Determine filtering based on grid data attributes
  const filterGender = grid.getAttribute("data-gender"); // 'men', 'women', 'all'
  const filterStyle = grid.getAttribute("data-style");   // 'canvas', 'casual', 'all'
  const maxItems = parseInt(grid.getAttribute("data-limit")) || 0; // limit count

  let filtered = [...products];

  if (filterGender && filterGender !== "all") {
    // Unisex shoes should show up in both categories
    filtered = filtered.filter(p => p.gender === filterGender || p.gender === "unisex");
  }

  if (filterStyle && filterStyle !== "all") {
    filtered = filtered.filter(p => p.style === filterStyle);
  }

  // Sort option handling
  const sortSelect = document.getElementById("product-sort");
  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      sortAndRender(sortSelect.value);
    });
  }

  function sortAndRender(criteria) {
    let sorted = [...filtered];
    if (criteria === "price-low") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (criteria === "price-high") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (criteria === "popular") {
      sorted.sort((a, b) => b.rating - a.rating);
    }
    
    displayProducts(sorted);
  }

  function displayProducts(itemsList) {
    grid.innerHTML = "";
    
    let displayList = itemsList;
    if (maxItems > 0) {
      displayList = itemsList.slice(0, maxItems);
    }

    if (displayList.length === 0) {
      grid.innerHTML = `<p class="no-products">目前尚無符合此類別的鞋款</p>`;
      return;
    }

    displayList.forEach(product => {
      const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
      
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <div class="product-badge">-${discount}%</div>
        <a href="product.html?id=${product.id}" class="product-image-container">
          <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
        </a>
        <div class="product-info">
          <span class="product-category-tag">${translateGender(product.gender)} | ${translateStyle(product.style)}</span>
          <h3 class="product-title"><a href="product.html?id=${product.id}">${product.name}</a></h3>
          <div class="product-rating">
            <span class="stars">${"★".repeat(Math.round(product.rating))}${"☆".repeat(5 - Math.round(product.rating))}</span>
            <span class="rating-num">(${product.rating})</span>
          </div>
          <div class="product-price-row">
            <span class="price">NT$ ${product.price.toLocaleString()}</span>
            <span class="original-price">NT$ ${product.originalPrice.toLocaleString()}</span>
          </div>
          <button class="btn btn-primary add-to-cart-quick" data-id="${product.id}">
            <svg class="cart-svg" viewBox="0 0 24 24"><path fill="currentColor" d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2m0-3h10.13c.75 0 1.41-.41 1.75-1.03l3.58-6.47A1.002 1.002 0 0 0 21.58 6H5.21l-.94-2H1v2h2l3.6 7.59l-1.35 2.45c-.16.28-.25.61-.25.96a2 2 0 0 0 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z"/></svg>
            加入購物車
          </button>
        </div>
      `;
      grid.appendChild(card);
    });

    // Re-bind quick add listeners
    const quickAddBtns = grid.querySelectorAll(".add-to-cart-quick");
    quickAddBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const pId = btn.getAttribute("data-id");
        quickAddToCart(pId);
      });
    });

    // Refresh custom cursor hover binding
    refreshCursorHoverBinds();
  }

  // Initial render (default sort is popular)
  sortAndRender("popular");
}

function translateGender(gender) {
  if (gender === "men") return "男性專區";
  if (gender === "women") return "女性專區";
  return "男女皆宜";
}

function translateStyle(style) {
  if (style === "canvas") return "布鞋";
  if (style === "casual") return "休閒鞋";
  return style;
}

/* ==========================================================================
   4. Shopping Cart System (State & UI)
   ========================================================================== */
let cart = [];

function initShoppingCart() {
  // Load cart state from localStorage
  const savedCart = localStorage.getItem("solestride_cart");
  if (savedCart) {
    try {
      cart = JSON.parse(savedCart);
    } catch (e) {
      cart = [];
    }
  }

  // Setup elements
  const cartToggle = document.getElementById("cart-toggle");
  const cartDrawer = document.getElementById("cart-drawer");
  const cartClose = document.getElementById("cart-close");
  const cartOverlay = document.getElementById("cart-overlay");
  const checkoutBtn = document.getElementById("cart-checkout-btn");

  if (cartToggle && cartDrawer) {
    cartToggle.addEventListener("click", (e) => {
      e.preventDefault();
      openCart();
    });
  }

  if (cartClose) {
    cartClose.addEventListener("click", closeCart);
  }

  if (cartOverlay) {
    cartOverlay.addEventListener("click", closeCart);
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("購物車是空的！");
        return;
      }
      triggerCheckout();
    });
  }

  // Update navbar count & cart items rendering on load
  updateCartUI();
}

function saveCart() {
  localStorage.setItem("solestride_cart", JSON.stringify(cart));
  updateCartUI();
}

function openCart() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-overlay");
  if (drawer && overlay) {
    drawer.classList.add("open");
    overlay.classList.add("active");
  }
}

function closeCart() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-overlay");
  if (drawer && overlay) {
    drawer.classList.remove("open");
    overlay.classList.remove("active");
  }
}

function quickAddToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  // For quick add, default to first size and first color option
  const defaultSize = product.sizes[0];
  const defaultColor = product.colors[0].name;

  addToCart(productId, 1, defaultSize, defaultColor);
  
  // Show visual feedback or open cart
  openCart();
}

function addToCart(productId, quantity, size, color) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  // Check if identical item (id, size, color) exists
  const existingItemIndex = cart.findIndex(
    item => item.id === productId && item.size === size && item.color === color
  );

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({
      id: productId,
      name: product.name,
      price: product.price,
      image: product.image,
      size: size,
      color: color,
      quantity: quantity
    });
  }

  saveCart();
  showToast(`已成功將 ${product.name} 加入購物車！`);
}

function updateCartUI() {
  // Update count elements
  const countBadges = document.querySelectorAll(".cart-count");
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  countBadges.forEach(badge => {
    badge.textContent = totalItemsCount;
    if (totalItemsCount > 0) {
      badge.style.display = "flex";
    } else {
      badge.style.display = "none";
    }
  });

  // Render items inside drawer
  const itemsContainer = document.getElementById("cart-items-container");
  const totalAmountEl = document.getElementById("cart-total-amount");

  if (itemsContainer) {
    itemsContainer.innerHTML = "";

    if (cart.length === 0) {
      itemsContainer.innerHTML = `
        <div class="cart-empty">
          <p>您的購物車空空如也</p>
          <a href="women.html" class="btn btn-outline" style="margin-top: 15px; display: inline-block;">立即去逛逛</a>
        </div>
      `;
      if (totalAmountEl) totalAmountEl.textContent = "NT$ 0";
      refreshCursorHoverBinds();
      return;
    }

    let subtotal = 0;

    cart.forEach((item, index) => {
      subtotal += item.price * item.quantity;
      const itemRow = document.createElement("div");
      itemRow.className = "cart-item";
      itemRow.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <p class="cart-item-meta">規格: ${item.color} / 尺寸 ${item.size}</p>
          <div class="cart-item-price-row">
            <span class="cart-item-price">NT$ ${item.price.toLocaleString()}</span>
            <div class="quantity-controller">
              <button class="qty-btn qty-minus" data-index="${index}">-</button>
              <span class="qty-val">${item.quantity}</span>
              <button class="qty-btn qty-plus" data-index="${index}">+</button>
            </div>
          </div>
        </div>
        <button class="cart-item-remove" data-index="${index}">&times;</button>
      `;
      itemsContainer.appendChild(itemRow);
    });

    if (totalAmountEl) {
      totalAmountEl.textContent = `NT$ ${subtotal.toLocaleString()}`;
    }

    // Set up quantity and remove event listeners
    const minusBtns = itemsContainer.querySelectorAll(".qty-minus");
    const plusBtns = itemsContainer.querySelectorAll(".qty-plus");
    const removeBtns = itemsContainer.querySelectorAll(".cart-item-remove");

    minusBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-index"));
        if (cart[idx].quantity > 1) {
          cart[idx].quantity--;
        } else {
          cart.splice(idx, 1);
        }
        saveCart();
      });
    });

    plusBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-index"));
        cart[idx].quantity++;
        saveCart();
      });
    });

    removeBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-index"));
        cart.splice(idx, 1);
        saveCart();
      });
    });

    refreshCursorHoverBinds();
  }
}

// Global Toast Notifications
function showToast(message) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast-message";
  toast.innerHTML = `
    <span class="toast-check">✓</span>
    <span class="toast-text">${message}</span>
  `;
  container.appendChild(toast);

  // Animate in
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  // Remove after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// Simulation of Checkout process
function triggerCheckout() {
  // Create modal markup
  const modal = document.createElement("div");
  modal.className = "checkout-modal-overlay active";
  modal.innerHTML = `
    <div class="checkout-modal-content">
      <div class="success-icon">✓</div>
      <h2>感謝您的訂購！</h2>
      <p>我們已收到您的模擬訂單。訂單編號：#SS-${Math.floor(100000 + Math.random() * 900000)}</p>
      <p style="font-size: 14px; color: #64748b; margin-top: 10px;">這是一個展示用靜態網頁，不會進行真實扣款或出貨。</p>
      <button class="btn btn-primary close-checkout-modal" style="margin-top: 25px; width: 100%;">回到商店</button>
    </div>
  `;
  document.body.appendChild(modal);

  // Clear shopping cart
  cart = [];
  saveCart();
  closeCart();

  const closeBtn = modal.querySelector(".close-checkout-modal");
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
    setTimeout(() => {
      modal.remove();
    }, 300);
  });
  
  refreshCursorHoverBinds();
}

/* ==========================================================================
   5. Contact Form Handler
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Simple validation feedback
    const name = document.getElementById("contact-name")?.value || "";
    const email = document.getElementById("contact-email")?.value || "";
    const message = document.getElementById("contact-message")?.value || "";

    if (!name || !email || !message) {
      alert("請填寫所有必填欄位！");
      return;
    }

    // Success response
    const container = form.parentElement;
    container.innerHTML = `
      <div class="contact-success-box">
        <svg class="success-check-svg" viewBox="0 0 24 24" width="60" height="60"><circle cx="12" cy="12" r="10" fill="#e2f0d9"/><path d="M9 12l2 2 4-4" stroke="#4b9e28" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>
        <h3>謝謝您的訊息，${name}！</h3>
        <p>您的聯絡信件已發送成功。我們會在 24 小時內與您聯繫。</p>
        <button class="btn btn-outline" onclick="window.location.reload()" style="margin-top: 20px;">重新填寫</button>
      </div>
    `;
    
    refreshCursorHoverBinds();
  });
}
