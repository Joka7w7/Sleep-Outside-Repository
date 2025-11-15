async function loadHtmlFragment(id, url) {
    const container = document.getElementById(id);
    const response = await fetch(url);
    const content = await response.text();
    container.innerHTML = content;
}

loadHtmlFragment("main-header", "/partials/header.html");
loadHtmlFragment("main-footer", "/partials/footer.html");

import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");

const productList = new ProductList("tents", dataSource, listElement);
productList.init();
