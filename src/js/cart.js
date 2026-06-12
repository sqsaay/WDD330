import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  document.querySelectorAll(".qty-minus").forEach((btn) =>
    btn.addEventListener("click", (e) => changeQuantity(e, -1))
  );
  document.querySelectorAll(".qty-plus").forEach((btn) =>
    btn.addEventListener("click", (e) => changeQuantity(e, 1))
  );
  document.querySelectorAll(".remove-item").forEach((btn) =>
    btn.addEventListener("click", removeItem)
  );

  document.getElementById("cartSum").textContent = sumProductsInCart().toFixed(2);
}

function sumProductsInCart() {
  const cartItems = getLocalStorage("so-cart") || [];
  return cartItems.reduce((total, item) => {
    const price = parseFloat(item.FinalPrice) || 0;
    const qty = item.quantity || 1;
    return total + price * qty;
  }, 0);
}


function cartItemTemplate(item, index) {
  const qty = item.quantity || 1;
  const price = parseFloat(item.FinalPrice) || 0;
  const subtotal = (price * qty).toFixed(2);

  return `
    <li class="cart-card divider" data-id="${index}">
      <img src="${item.Image}" alt="${item.Name}" />
      <h2 class="card__name">${item.Name}</h2>

</li>`;
}

function changeQuantity(e, delta) {
  const li = e.target.closest("li");
  if (!li) return;

  const id = li.dataset.id;
  const cartItems = getLocalStorage("so-cart") || [];

  const item = cartItems.find((p) => String(p.Id) === String(id));
  if (!item) return;

  item.quantity = (item.quantity || 1) + delta;
  if (item.quantity < 1) item.quantity = 1;

  setLocalStorage("so-cart", cartItems);
  renderCartContents(); // refresh UI
}


function removeItem(e) {
  const li = e.target.closest("li");
  if (!li) return;

  const id = li.dataset.id;
  let cartItems = getLocalStorage("so-cart") || [];

  cartItems = cartItems.filter((p) => String(p.Id) !== String(id));

  setLocalStorage("so-cart", cartItems);
  renderCartContents();

}

renderCartContents();
