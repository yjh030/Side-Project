document.addEventListener("DOMContentLoaded", () => {
  // Read query parameters
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  
  const product = products.find(p => p.id === productId);
  
  const container = document.getElementById("product-detail-container");
  if (!product) {
    if (container) {
      container.innerHTML = `
        <div class="text-center" style="padding: 100px 0;">
          <h2 style="font-size: 28px; color: var(--text-dark); margin-bottom: 15px;">抱歉，找不到該項商品</h2>
          <p style="margin-bottom: 30px; color: var(--text-muted);">該鞋款可能已下架或網址不正確，請返回商城首頁瀏覽其他商品。</p>
          <a href="index.html" class="btn btn-primary">返回首頁</a>
        </div>
      `;
    }
    return;
  }
  
  // Set page titles & meta descriptions for SEO
  document.title = `${product.name} | SoleStride 極步`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute("content", `${product.name} - ${product.description.substring(0, 80)}...`);
  }
  
  // Set Breadcrumbs product name
  const breadcrumbProduct = document.getElementById("breadcrumb-product-name");
  if (breadcrumbProduct) {
    breadcrumbProduct.textContent = product.name;
  }
  
  // Render product details
  if (container) {
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    
    // Colors List
    let colorsHTML = "";
    product.colors.forEach((color, idx) => {
      colorsHTML += `
        <div class="color-option ${idx === 0 ? 'active' : ''}" data-color="${color.name}" title="${color.name}">
          <div class="color-swatch" style="background-color: ${color.hex};"></div>
        </div>
      `;
    });
    
    // Sizes List
    let sizesHTML = "";
    product.sizes.forEach((size, idx) => {
      sizesHTML += `
        <div class="size-option ${idx === 0 ? 'active' : ''}" data-size="${size}">
          ${size}
        </div>
      `;
    });
    
    // Features List
    let featuresHTML = "";
    product.features.forEach(feat => {
      featuresHTML += `
        <div class="bullet-item">
          <span class="bullet-check">✓</span>
          <span>${feat}</span>
        </div>
      `;
    });
    
    container.innerHTML = `
      <div class="product-detail-grid">
        <!-- Gallery -->
        <div class="detail-gallery">
          <img src="${product.image}" alt="${product.name}" class="detail-main-img" id="detail-main-image">
        </div>
        
        <!-- Info Panel -->
        <div class="detail-info">
          <div class="detail-badge-row">
            <span class="detail-tag">${translateGender(product.gender)}</span>
            <span class="detail-tag">${translateStyle(product.style)}</span>
            <span class="detail-tag sale-tag">限時特惠 -${discount}%</span>
          </div>
          
          <h1 class="detail-title">${product.name}</h1>
          <div class="detail-english-title">${product.englishName}</div>
          
          <div class="detail-rating-row">
            <div class="product-rating">
              <span class="stars" style="font-size: 18px; color: #fbbf24; letter-spacing: -2px;">${"★".repeat(Math.round(product.rating))}${"☆".repeat(5 - Math.round(product.rating))}</span>
              <span class="rating-num" style="font-size: 14px; color: var(--text-muted); margin-left: 6px;">
                ${product.rating} 分 (共 ${product.reviews} 則顧客評價)
              </span>
            </div>
          </div>
          
          <div class="detail-price-box">
            <span class="price">NT$ ${product.price.toLocaleString()}</span>
            <span class="original-price">NT$ ${product.originalPrice.toLocaleString()}</span>
          </div>
          
          <!-- Color Selector -->
          <div class="selector-title">款式顏色</div>
          <div class="color-options" id="color-options-selector">
            ${colorsHTML}
          </div>
          
          <!-- Size Selector -->
          <div class="selector-title">選擇尺碼 (歐規 EUR)</div>
          <div class="size-options" id="size-options-selector">
            ${sizesHTML}
          </div>
          
          <!-- Quantity & Purchase row -->
          <div class="qty-checkout-row">
            <div class="detail-qty-select">
              <button class="detail-qty-btn" id="qty-minus-btn">-</button>
              <div class="detail-qty-val" id="qty-val-display">1</div>
              <button class="detail-qty-btn" id="qty-plus-btn">+</button>
            </div>
            <button class="btn btn-primary" id="add-to-cart-detail-btn">
              <svg class="cart-svg" viewBox="0 0 24 24" style="margin-right: 8px;"><path fill="currentColor" d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2m0-3h10.13c.75 0 1.41-.41 1.75-1.03l3.58-6.47A1.002 1.002 0 0 0 21.58 6H5.21l-.94-2H1v2h2l3.6 7.59l-1.35 2.45c-.16.28-.25.61-.25.96a2 2 0 0 0 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z"/></svg>
              加入購物車
            </button>
          </div>
          
          <!-- Features -->
          <div class="detail-bullets">
            ${featuresHTML}
          </div>
          
          <!-- Description -->
          <div class="detail-desc-box">
            <h3>工藝細節與特色說明</h3>
            <p>${product.description}</p>
          </div>
        </div>
      </div>
    `;
    
    // Add interactions
    setupDetailInteractiveLogic(product);
  }

  // Render related items
  renderRelatedProducts(product);
});

/* ==========================================================================
   Detail Interactivity Setup
   ========================================================================== */
function setupDetailInteractiveLogic(product) {
  let selectedColor = product.colors[0].name;
  let selectedSize = product.sizes[0];
  let quantity = 1;

  const colorSelector = document.getElementById("color-options-selector");
  const sizeSelector = document.getElementById("size-options-selector");
  const qtyMinus = document.getElementById("qty-minus-btn");
  const qtyPlus = document.getElementById("qty-plus-btn");
  const qtyDisplay = document.getElementById("qty-val-display");
  const addToCartBtn = document.getElementById("add-to-cart-detail-btn");

  // Color options switching
  if (colorSelector) {
    const options = colorSelector.querySelectorAll(".color-option");
    options.forEach(opt => {
      opt.addEventListener("click", () => {
        options.forEach(o => o.classList.remove("active"));
        opt.classList.add("active");
        selectedColor = opt.getAttribute("data-color");
      });
    });
  }

  // Size options switching
  if (sizeSelector) {
    const options = sizeSelector.querySelectorAll(".size-option");
    options.forEach(opt => {
      opt.addEventListener("click", () => {
        options.forEach(o => o.classList.remove("active"));
        opt.classList.add("active");
        selectedSize = parseInt(opt.getAttribute("data-size"));
      });
    });
  }

  // Quantity controllers
  if (qtyMinus && qtyDisplay) {
    qtyMinus.addEventListener("click", () => {
      if (quantity > 1) {
        quantity--;
        qtyDisplay.textContent = quantity;
      }
    });
  }

  if (qtyPlus && qtyDisplay) {
    qtyPlus.addEventListener("click", () => {
      quantity++;
      qtyDisplay.textContent = quantity;
    });
  }

  // Add to cart submit
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      // Access cart logic from main.js (available in window context or global scope)
      if (typeof addToCart === "function") {
        addToCart(product.id, quantity, selectedSize, selectedColor);
        
        // Open Cart drawer
        if (typeof openCart === "function") {
          openCart();
        }
      }
    });
  }

  // Re-bind cursor triggers for dynamically added buttons
  if (typeof refreshCursorHoverBinds === "function") {
    refreshCursorHoverBinds();
  }
}

/* ==========================================================================
   Related Products Rendering
   ========================================================================== */
function renderRelatedProducts(currentProduct) {
  const container = document.getElementById("related-products-container");
  if (!container) return;

  // Filter 4 shoes that match style or gender but exclude current product
  let related = products.filter(p => p.id !== currentProduct.id);
  
  // Prioritize same style
  let styleMatches = related.filter(p => p.style === currentProduct.style);
  if (styleMatches.length < 4) {
    // Fill up with gender matches or others
    const otherMatches = related.filter(p => p.style !== currentProduct.style);
    related = [...styleMatches, ...otherMatches].slice(0, 4);
  } else {
    related = styleMatches.slice(0, 4);
  }

  container.innerHTML = "";

  related.forEach(product => {
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
          <span class="stars" style="color: #fbbf24; letter-spacing: -2px;">${"★".repeat(Math.round(product.rating))}${"☆".repeat(5 - Math.round(product.rating))}</span>
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
    container.appendChild(card);
  });

  // Bind quick add listeners to related product buttons
  const quickAddBtns = container.querySelectorAll(".add-to-cart-quick");
  quickAddBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const pId = btn.getAttribute("data-id");
      if (typeof quickAddToCart === "function") {
        quickAddToCart(pId);
      }
    });
  });

  // Re-bind cursor triggers
  if (typeof refreshCursorHoverBinds === "function") {
    refreshCursorHoverBinds();
  }
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
