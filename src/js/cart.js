import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || []; // ✅ Add fallback array

  const productList = document.querySelector(".product-list");

  if (cartItems.length === 0) {
    // ✅ Handle empty cart gracefully
    productList.innerHTML = `
      <li class="empty-cart">
        <p>Your cart is empty.</p>
      </li>
    `;
    return; // Stop execution here
  }

  // ✅ Otherwise, render the cart items
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productList.innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img
          src="${item.Image}"
          alt="${item.Name}"
        />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>
  `;
}

renderCartContents();
