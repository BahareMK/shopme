/* ============================================================
   Shopme — cart page rendering & demo checkout
   ============================================================ */

function cartLineHTML(line) {
  const p = line.product;
  const lineTotal = (p.price * line.qty).toFixed(2);
  return `
    <div class="cart-line" data-id="${p.id}">
      <a href="product.html?id=${p.id}" class="cart-line-image" style="background:${p.color}">${p.emoji}</a>
      <div class="cart-line-details">
        <h3 class="cart-line-title"><a href="product.html?id=${p.id}">${p.title}</a></h3>
        <div class="cart-line-stock">In Stock</div>
        <div class="cart-line-actions">
          <label for="qty-${p.id}">Qty:</label>
          <select id="qty-${p.id}" class="qty-select" data-id="${p.id}">
            ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
              .map((n) => `<option value="${n}" ${n === line.qty ? "selected" : ""}>${n}</option>`)
              .join("")}
          </select>
          <button type="button" class="remove-line-btn" data-id="${p.id}">Delete</button>
        </div>
      </div>
      <div class="cart-line-price">$${lineTotal}</div>
    </div>
  `;
}

function renderCartPage() {
  const lines = getCartLines();
  const box = document.getElementById("cart-items-box");
  const summary = document.getElementById("summary-box");
  const emptyState = document.getElementById("empty-cart");

  if (lines.length === 0) {
    box.hidden = true;
    summary.hidden = true;
    emptyState.hidden = false;
    return;
  }

  box.hidden = false;
  summary.hidden = false;
  emptyState.hidden = true;

  const count = lines.reduce((sum, l) => sum + l.qty, 0);
  const total = getCartTotal();

  box.querySelector("#cart-lines").innerHTML = lines.map(cartLineHTML).join("");
  box.querySelector("#cart-subtotal-count").textContent = count;
  box.querySelector("#cart-subtotal-amount").textContent = total.toFixed(2);

  summary.querySelector("#summary-count").textContent = count;
  summary.querySelector("#summary-amount").textContent = total.toFixed(2);
}

document.addEventListener("DOMContentLoaded", () => {
  renderCartPage();

  document.addEventListener("change", (e) => {
    const select = e.target.closest(".qty-select");
    if (select) {
      setQty(select.dataset.id, parseInt(select.value, 10));
      renderCartPage();
    }
  });

  document.addEventListener("click", (e) => {
    const removeBtn = e.target.closest(".remove-line-btn");
    if (removeBtn) {
      removeFromCart(removeBtn.dataset.id);
      renderCartPage();
      showToast("Item removed");
    }
  });

  const checkoutBtn = document.getElementById("checkout-btn");
  const modal = document.getElementById("checkout-modal");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (getCartCount() === 0) return;
      modal.hidden = false;
    });
  }
  const closeModalBtn = document.getElementById("close-modal-btn");
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      clearCart();
      modal.hidden = true;
      renderCartPage();
    });
  }
});
