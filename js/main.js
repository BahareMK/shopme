/* ============================================================
   Shopme — home page rendering & search
   ============================================================ */

function renderPromoRow() {
  const el = document.getElementById("promo-row");
  if (!el) return;
  const cats = CATEGORIES.slice(0, 4);
  el.innerHTML = cats
    .map((cat) => {
      const items = PRODUCTS.filter((p) => p.category === cat).slice(0, 4);
      return `
        <div class="promo-card">
          <h2>${cat}</h2>
          <div class="promo-grid">
            ${items.map((p) => `<a href="product.html?id=${p.id}" class="promo-tile" style="background:${p.color}">${p.emoji}</a>`).join("")}
          </div>
          <a class="promo-link" href="index.html?cat=${encodeURIComponent(cat)}">Shop ${cat}</a>
        </div>
      `;
    })
    .join("");
}

function renderDealsStrip() {
  const el = document.getElementById("deals-strip");
  if (!el) return;
  const deals = PRODUCTS.filter((p) => p.originalPrice).slice(0, 10);
  el.innerHTML = deals.map(productCardHTML).join("");
}

function renderCategorySections() {
  const container = document.getElementById("category-sections");
  if (!container) return;
  container.innerHTML = CATEGORIES.map((cat) => {
    const items = PRODUCTS.filter((p) => p.category === cat);
    return `
      <section class="section">
        <div class="section-head">
          <h2>${cat}</h2>
          <a href="index.html?cat=${encodeURIComponent(cat)}">See more ›</a>
        </div>
        <div class="product-grid">${items.map(productCardHTML).join("")}</div>
      </section>
    `;
  }).join("");
}

function renderSearchResults(q, cat) {
  const homeSections = document.getElementById("home-sections");
  const resultsSection = document.getElementById("search-results");
  if (!resultsSection) return;

  const query = (q || "").toLowerCase();
  const results = PRODUCTS.filter((p) => {
    const matchesQuery = !query || p.title.toLowerCase().includes(query) || p.category.toLowerCase().includes(query);
    const matchesCat = !cat || cat === "all" || p.category === cat;
    return matchesQuery && matchesCat;
  });

  const label = [q ? `"${q}"` : "", cat && cat !== "all" ? `in ${cat}` : ""].filter(Boolean).join(" ");

  if (homeSections) homeSections.hidden = true;
  resultsSection.hidden = false;

  if (results.length === 0) {
    resultsSection.innerHTML = `
      <div class="no-results">
        <h2>No results for ${label || "your search"}</h2>
        <p>Try checking your spelling, using fewer or more general words, or browse a category from the menu above.</p>
        <p><a href="index.html" class="continue-shopping-btn">Back to Shopme home</a></p>
      </div>
    `;
    return;
  }

  resultsSection.innerHTML = `
    <div class="section-head">
      <h2>${results.length} result${results.length === 1 ? "" : "s"} ${label ? "for " + label : ""}</h2>
      <a href="index.html">Clear search</a>
    </div>
    <div class="product-grid">${results.map(productCardHTML).join("")}</div>
  `;
}

function showHomeSections() {
  const homeSections = document.getElementById("home-sections");
  const resultsSection = document.getElementById("search-results");
  if (homeSections) homeSections.hidden = false;
  if (resultsSection) resultsSection.hidden = true;
}

// Exposed so the shared header search form (cart-utils.js) can call into
// this page instead of doing a full navigation/reload.
window.performSearch = function (q, cat) {
  const qs = new URLSearchParams();
  if (q) qs.set("q", q);
  if (cat && cat !== "all") qs.set("cat", cat);
  const query = qs.toString();
  history.replaceState(null, "", "index.html" + (query ? "?" + query : ""));

  if (!q && (!cat || cat === "all")) {
    showHomeSections();
  } else {
    renderSearchResults(q, cat);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  renderPromoRow();
  renderDealsStrip();
  renderCategorySections();

  const params = new URLSearchParams(window.location.search);
  const q = params.get("q") || "";
  const cat = params.get("cat") || "all";
  if (q || (cat && cat !== "all")) {
    renderSearchResults(q, cat);
  }

  // Live-filter as the shopper types, without needing to press Enter.
  const input = document.getElementById("search-input");
  if (input) {
    input.addEventListener("input", () => {
      const select = document.getElementById("search-category");
      const value = input.value.trim();
      const category = select ? select.value : "all";
      if (!value && (!category || category === "all")) {
        showHomeSections();
        history.replaceState(null, "", "index.html");
      } else {
        window.performSearch(value, category);
      }
    });
  }
});
