import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  let cartItems = getLocalStorage("so-cart") || [];
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
  console.log("Cart now:", cartItems);
}

async function addToCartHandler(e) {
  e.preventDefault();
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("addToCart");
  if (button) button.addEventListener("click", addToCartHandler);
});
