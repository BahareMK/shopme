/* ============================================================
   Shopme — product detail page rendering
   ============================================================ */

function renderProductPage() {
  const params = new URLSearchParams(window.location.search);
  const product = getProductById(params.get("id"));
  const root = document.getElementById("product-root");
  const crumb = document.getElementById("breadcrumb-category");

  if (!product) {
    root.innerHTML = `
      <div class="no-results">
        <h2>We couldn't find that product</h2>
        <p>It may have been removed. Try browsing from the homepage instead.</p>
        <p><a href="index.html" class="continue-shopping-btn">Back to Shopme home</a></p>
      </div>
    `;
    return;
  }

  document.title = `${product.title} — Shopme`;
  if (crumb) {
    crumb.textContent = product.category;
    crumb.href = `index.html?cat=${encodeURIComponent(product.category)}`;
  }

  const price = formatPrice(product.price);
  const original = product.originalPrice ? formatPrice(product.originalPrice) : null;
  const savingsPct = original ? Math.round((1 - product.price / product.originalPrice) * 100) : null;

  root.innerHTML = `
    <div class="detail-image-box">
      <div class="detail-image" style="background:${product.color}">${product.emoji}</div>
    </div>

    <div class="detail-info">
      <h1>${product.title}</h1>
      <a class="brand-link" href="index.html?cat=${encodeURIComponent(product.category)}">Visit the Shopme ${product.category} store</a>
      <div class="detail-rating">
        <span class="stars">${renderStars(product.rating)}</span>
        <a href="#reviews-note">${product.reviews.toLocaleString()} ratings</a>
        ${product.badge ? `<span class="product-badge" style="position:static;">${product.badge}</span>` : ""}
      </div>
      <hr class="divider" />
      <div class="detail-price-block">
        <div class="product-price">
          <span class="price-symbol">$</span><span class="price-dollars">${price.dollars}</span><span class="price-cents">${price.cents}</span>
          ${original ? `<span class="price-original">List: $${original.dollars}.${original.cents}</span>` : ""}
        </div>
        ${savingsPct ? `<div class="detail-savings">You save ${savingsPct}% ($${(product.originalPrice - product.price).toFixed(2)})</div>` : ""}
      </div>
      <hr class="divider" />
      <ul class="detail-bullets">
        <li>Category: ${product.category}</li>
        <li>Rated ${product.rating.toFixed(1)} out of 5 stars by ${product.reviews.toLocaleString()} shoppers</li>
        <li>Fast, free Shopme Delivery on this item</li>
        <li>30-day hassle-free returns (demo policy)</li>
        <li id="reviews-note">This is placeholder catalog data for a front-end demo — no real inventory or shipping.</li>
      </ul>
    </div>

    <div class="buy-box">
      <div class="product-price">
        <span class="price-symbol">$</span><span class="price-dollars">${price.dollars}</span><span class="price-cents">${price.cents}</span>
      </div>
      <div class="buy-box-delivery">
        FREE delivery <b>tomorrow</b> if you order within 4 hrs
        <span class="in-stock">In Stock</span>
      </div>
      <div class="qty-row">
        <label for="qty-select">Qty:</label>
        <select id="qty-select" class="qty-select">
          ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => `<option value="${n}">${n}</option>`).join("")}
        </select>
      </div>
      <button class="add-to-cart-btn" data-id="${product.id}" data-qty-from="qty-select">Add to Cart</button>
      <button class="buy-now-btn" data-id="${product.id}" data-qty-from="qty-select">Buy Now</button>
      <p class="secure-note">🔒 Secure demo transaction — this storefront has no real payment processing or backend.</p>
    </div>
  `;

  renderRelatedProducts(product);
}

function renderRelatedProducts(product) {
  const section = document.getElementById("related-products");
  if (!section) return;
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 6);
  if (related.length === 0) {
    section.hidden = true;
    return;
  }
  section.querySelector(".product-grid").innerHTML = related.map(productCardHTML).join("");
}

document.addEventListener("DOMContentLoaded", renderProductPage);
