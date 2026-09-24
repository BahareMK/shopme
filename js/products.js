/* ============================================================
   Shopme — product catalog (static demo data, no backend)
   ============================================================ */

const PRODUCTS = [
  { id: 1,  title: "Wireless Noise-Cancelling Headphones, Over-Ear, 40H Battery", category: "Electronics", price: 79.99, originalPrice: 129.99, rating: 4.5, reviews: 12834, emoji: "🎧", color: "#e8f1fb", badge: "Best Seller" },
  { id: 2,  title: "Smart Watch with Heart Rate & Sleep Monitor, 1.8\" Display", category: "Electronics", price: 39.99, originalPrice: 59.99, rating: 4.2, reviews: 5602, emoji: "⌚", color: "#fdf0e6", badge: "Shopme's Choice" },
  { id: 3,  title: "Portable Bluetooth Speaker, Waterproof, 24H Playtime", category: "Electronics", price: 24.5, originalPrice: null, rating: 4.6, reviews: 9021, emoji: "🔊", color: "#eaf6ec", badge: "" },
  { id: 4,  title: "27-inch 2K QHD Monitor, 100Hz, Ultra-Slim Bezel", category: "Computers", price: 189.99, originalPrice: 229.99, rating: 4.7, reviews: 3120, emoji: "🖥️", color: "#eef2fb", badge: "Best Seller" },
  { id: 5,  title: "Mechanical Gaming Keyboard, RGB Backlit, Hot-Swappable", category: "Computers", price: 49.99, originalPrice: 69.99, rating: 4.4, reviews: 7710, emoji: "⌨️", color: "#f5f0fb", badge: "" },
  { id: 6,  title: "Wireless Ergonomic Mouse, USB-C Rechargeable", category: "Computers", price: 18.99, originalPrice: null, rating: 4.3, reviews: 4402, emoji: "🖱️", color: "#eafaf7", badge: "" },
  { id: 7,  title: "1TB Portable External SSD, USB 3.2 Gen 2", category: "Computers", price: 74.99, originalPrice: 94.99, rating: 4.8, reviews: 2231, emoji: "💾", color: "#fef7e6", badge: "Amazon's Choice-style pick" },
  { id: 8,  title: "12-Piece Non-Stick Cookware Set, Dishwasher Safe", category: "Home & Kitchen", price: 89.0, originalPrice: 120.0, rating: 4.6, reviews: 6114, emoji: "🍳", color: "#fdeeee", badge: "Best Seller" },
  { id: 9,  title: "Robot Vacuum Cleaner with Mapping & App Control", category: "Home & Kitchen", price: 159.99, originalPrice: 219.99, rating: 4.3, reviews: 8890, emoji: "🤖", color: "#eef6fd", badge: "" },
  { id: 10, title: "Stainless Steel Insulated Water Bottle, 32oz", category: "Home & Kitchen", price: 15.99, originalPrice: 19.99, rating: 4.7, reviews: 15234, emoji: "🍶", color: "#eafaf4", badge: "" },
  { id: 11, title: "6-Quart Programmable Slow Cooker", category: "Home & Kitchen", price: 34.99, originalPrice: null, rating: 4.5, reviews: 3987, emoji: "🍲", color: "#fdf3e9", badge: "" },
  { id: 12, title: "Atomic Habits: Tiny Changes, Remarkable Results (Paperback)", category: "Books", price: 11.98, originalPrice: 18.99, rating: 4.9, reviews: 54210, emoji: "📘", color: "#fdf6e3", badge: "Best Seller" },
  { id: 13, title: "The Silent Orbit: A Space Thriller Novel", category: "Books", price: 9.49, originalPrice: 14.99, rating: 4.4, reviews: 1892, emoji: "📕", color: "#fdecee", badge: "" },
  { id: 14, title: "Learn to Code: A Beginner's Guide to Programming", category: "Books", price: 21.99, originalPrice: null, rating: 4.3, reviews: 2765, emoji: "📗", color: "#eaf7ee", badge: "" },
  { id: 15, title: "Men's Classic Fit Cotton T-Shirt (3-Pack)", category: "Fashion", price: 19.99, originalPrice: 26.99, rating: 4.2, reviews: 4310, emoji: "👕", color: "#eef2fb", badge: "" },
  { id: 16, title: "Women's Running Shoes, Lightweight Breathable", category: "Fashion", price: 42.0, originalPrice: 65.0, rating: 4.5, reviews: 6789, emoji: "👟", color: "#fdeeee", badge: "Shopme's Choice" },
  { id: 17, title: "Unisex Polarized Sunglasses, UV400 Protection", category: "Fashion", price: 13.99, originalPrice: 22.0, rating: 4.1, reviews: 2984, emoji: "🕶️", color: "#f4f4f4", badge: "" },
  { id: 18, title: "Leather Wallet with RFID Blocking, Slim Bifold", category: "Fashion", price: 17.5, originalPrice: null, rating: 4.6, reviews: 5123, emoji: "👛", color: "#fdf3e9", badge: "" },
  { id: 19, title: "Building Blocks Creative Set, 500 Pieces", category: "Toys & Games", price: 27.99, originalPrice: 34.99, rating: 4.8, reviews: 7301, emoji: "🧩", color: "#eafaf4", badge: "Best Seller" },
  { id: 20, title: "Remote Control Stunt Car, 4WD Off-Road", category: "Toys & Games", price: 32.99, originalPrice: 44.99, rating: 4.3, reviews: 2456, emoji: "🚙", color: "#fdecee", badge: "" },
  { id: 21, title: "Classic Wooden Chess Set with Storage", category: "Toys & Games", price: 22.99, originalPrice: null, rating: 4.7, reviews: 1673, emoji: "♟️", color: "#f5f0fb", badge: "" },
  { id: 22, title: "Vitamin C Facial Serum with Hyaluronic Acid, 1oz", category: "Beauty", price: 14.99, originalPrice: 21.99, rating: 4.4, reviews: 11234, emoji: "🧴", color: "#eaf6ec", badge: "" },
  { id: 23, title: "Electric Toothbrush, Rechargeable with 4 Brush Heads", category: "Beauty", price: 26.99, originalPrice: 39.99, rating: 4.6, reviews: 8802, emoji: "🪥", color: "#eef6fd", badge: "Best Seller" },
  { id: 24, title: "Ceramic Hair Straightener, Fast Heating, Dual Voltage", category: "Beauty", price: 21.5, originalPrice: 29.99, rating: 4.2, reviews: 3345, emoji: "💇", color: "#fdf0e6", badge: "" },
  { id: 25, title: "Adjustable Dumbbell Set, 5-25 lbs Pair", category: "Sports & Outdoors", price: 99.0, originalPrice: 139.0, rating: 4.5, reviews: 2109, emoji: "🏋️", color: "#eef2fb", badge: "" },
  { id: 26, title: "Insulated Camping Tent, 4-Person, Waterproof", category: "Sports & Outdoors", price: 64.99, originalPrice: 89.99, rating: 4.4, reviews: 1567, emoji: "⛺", color: "#eafaf7", badge: "" },
  { id: 27, title: "Yoga Mat with Carrying Strap, Non-Slip, 6mm", category: "Sports & Outdoors", price: 16.99, originalPrice: 24.99, rating: 4.7, reviews: 9456, emoji: "🧘", color: "#fdf6e3", badge: "Shopme's Choice" },
  { id: 28, title: "Stainless Steel French Press Coffee Maker, 34oz", category: "Home & Kitchen", price: 23.99, originalPrice: 29.99, rating: 4.6, reviews: 4021, emoji: "☕", color: "#fdf3e9", badge: "" },
];

const CATEGORIES = [...new Set(PRODUCTS.map((p) => p.category))];

/* Helpers shared across pages */
function formatPrice(value) {
  const parts = value.toFixed(2).split(".");
  return { dollars: parts[0], cents: parts[1] };
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  let html = "";
  for (let i = 0; i < full; i++) html += "★";
  if (half) html += "⯨";
  const empty = 5 - full - (half ? 1 : 0);
  for (let i = 0; i < empty; i++) html += "☆";
  return html;
}

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === Number(id));
}

/* Shared product card markup — used on the homepage, search results,
   deals strip, and the "related products" row on the product page. */
function productCardHTML(p) {
  const price = formatPrice(p.price);
  const original = p.originalPrice ? formatPrice(p.originalPrice) : null;
  return `
    <div class="product-card" data-id="${p.id}">
      ${p.badge ? `<div class="product-badge">${p.badge}</div>` : ""}
      <a class="product-link" href="product.html?id=${p.id}">
        <div class="product-image" style="background:${p.color}"><span class="emoji">${p.emoji}</span></div>
        <h3 class="product-title">${p.title}</h3>
        <div class="product-rating">
          <span class="stars">${renderStars(p.rating)}</span>
          <span class="review-count">(${p.reviews.toLocaleString()})</span>
        </div>
        <div class="product-price">
          <span class="price-symbol">$</span><span class="price-dollars">${price.dollars}</span><span class="price-cents">${price.cents}</span>
          ${original ? `<span class="price-original">$${original.dollars}.${original.cents}</span>` : ""}
        </div>
        <div class="product-delivery"><b>FREE</b> Shopme Delivery</div>
      </a>
      <button class="add-to-cart-btn" data-id="${p.id}">Add to Cart</button>
    </div>
  `;
}
