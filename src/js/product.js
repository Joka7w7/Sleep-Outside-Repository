import { getParam } from "../js/utils.mjs";
import ProductData from "../js/ProductData.mjs";
import ProductDetails from "../js/ProductDetails.mjs";

// Get the product ID from the URL, e.g. ?product=880RR
const productId = getParam("product");

// Ensure we have a valid productId
if (!productId) {
    console.error("❌ No product ID found in the URL.");
    document.querySelector("main").innerHTML = `
    <p class="error">Product not found. Please go back and select a product.</p>
  `;
} else {
    // Create the data source for the correct category
    const dataSource = new ProductData("tents");

    // Create the product detail instance
    const product = new ProductDetails(productId, dataSource);

    // Initialize the product detail page
    product.init().catch((error) => {
        console.error("Error initializing product details:", error);
        document.querySelector("main").innerHTML = `
      <p class="error">We’re sorry, something went wrong loading this product.</p>
    `;
    });
}

