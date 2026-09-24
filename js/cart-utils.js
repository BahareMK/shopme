/* ============================================================
   Shopme — cart storage helpers (localStorage only, no backend)
   ============================================================ */

const CART_KEY = "shopme_cart";

function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCountBadge();
}

function addToCart(id, qty = 1) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === Number(id));
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: Number(id), qty });
  }
  saveCart(cart);
  showToast("Added to cart");
}

function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter((item) => item.id !== Number(id));
  saveCart(cart);
}

function setQty(id, qty) {
  const cart = getCart();
  const item = cart.find((item) => item.id === Number(id));
  if (item) {
    item.qty = Math.max(1, qty);
    saveCart(cart);
  }
}

function clearCart() {
  saveCart([]);
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function getCartLines() {
  return getCart()
    .map((item) => {
      const product = getProductById(item.id);
      if (!product) return null;
      return { ...item, product };
    })
    .filter(Boolean);
}

function getCartTotal() {
  return getCartLines().reduce((sum, line) => sum + line.product.price * line.qty, 0);
}

function updateCartCountBadge() {
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = getCartCount();
}

/* Small transient toast notification used across pages */
function showToast(message) {
  let toast = document.getElementById("shopme-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "shopme-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove("show"), 1800);
}

document.addEventListener("DOMContentLoaded", updateCartCountBadge);

/* ---------- Global click delegation: works on every page ---------- */

document.addEventListener("click", (e) => {
  const addBtn = e.target.closest(".add-to-cart-btn");
  if (addBtn) {
    e.preventDefault();
    const qty = readQtyFor(addBtn);
    addToCart(addBtn.dataset.id, qty);
    return;
  }

  const buyBtn = e.target.closest(".buy-now-btn");
  if (buyBtn) {
    e.preventDefault();
    const qty = readQtyFor(buyBtn);
    addToCart(buyBtn.dataset.id, qty);
    window.location.href = "cart.html";
  }
});

function readQtyFor(btn) {
  if (!btn.dataset.qtyFrom) return 1;
  const el = document.getElementById(btn.dataset.qtyFrom);
  const value = el ? parseInt(el.value, 10) : 1;
  return Number.isFinite(value) && value > 0 ? value : 1;
}

/* ---------- Global search: works from any page's header ---------- */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("search-form");
  if (!form) return;

  // Pre-fill the search box from the URL so a search "sticks" after navigating.
  const params = new URLSearchParams(window.location.search);
  const input = document.getElementById("search-input");
  const select = document.getElementById("search-category");
  if (input && params.get("q")) input.value = params.get("q");
  if (select && params.get("cat")) select.value = params.get("cat");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = input ? input.value.trim() : "";
    const cat = select ? select.value : "all";

    if (typeof window.performSearch === "function") {
      window.performSearch(q, cat);
    } else {
      const qs = new URLSearchParams();
      if (q) qs.set("q", q);
      if (cat && cat !== "all") qs.set("cat", cat);
      const query = qs.toString();
      window.location.href = "index.html" + (query ? "?" + query : "");
    }
  });
});
