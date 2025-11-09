import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.dataSource = dataSource;
        this.product = {};
    }

    async init() {
        try {
            // 1️⃣ Fetch product data
            this.product = await this.dataSource.findProductById(this.productId);

            if (!this.product) {
                document.querySelector("main").innerHTML = `
          <p class="error">Sorry, we couldn’t find this product.</p>
        `;
                return;
            }

            // 2️⃣ Render product details
            this.renderProductDetails();

            // 3️⃣ Add event listener for "Add to Cart"
            const addToCartBtn = document.getElementById("addToCart");
            if (addToCartBtn) {
                addToCartBtn.addEventListener("click", this.addProductToCart.bind(this));
            } else {
                console.warn("⚠️ Add to Cart button not found in HTML.");
            }
        } catch (error) {
            console.error("❌ Error loading product:", error);
            document.querySelector("main").innerHTML = `
        <p class="error">An error occurred while loading this product.</p>
      `;
        }
    }

    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || [];

        // Avoid duplicate products
        const existing = cartItems.find((item) => item.Id === this.product.Id);
        if (existing) {
            alert(`🛒 "${this.product.NameWithoutBrand}" is already in your cart.`);
            return;
        }

        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);

        // Feedback animation
        const btn = document.getElementById("addToCart");
        btn.textContent = "✅ Added!";
        btn.disabled = true;
        setTimeout(() => {
            btn.textContent = "Add to Cart";
            btn.disabled = false;
        }, 2000);
    }

    renderProductDetails() {
        const product = this.product;

        // Gracefully handle missing elements
        const brand = document.getElementById("productBrand");
        const name = document.getElementById("productName");
        const img = document.getElementById("productImage");
        const price = document.getElementById("productPrice");
        const color = document.getElementById("productColor");
        const desc = document.getElementById("productDesc");
        const btn = document.getElementById("addToCart");

        if (brand) brand.textContent = product.Brand?.Name || "Unknown Brand";
        if (name) name.textContent = product.NameWithoutBrand;
        if (img) {
            img.src = product.Image.startsWith("http")
                ? product.Image
                : `../${product.Image.replace(/^(\.\/|\/)/, "")}`; // Ensure correct relative path
            img.alt = product.NameWithoutBrand;
        }
        if (price) price.textContent = `$${product.FinalPrice.toFixed(2)}`;
        if (color) color.textContent = product.Colors?.[0]?.ColorName || "N/A";
        if (desc) desc.innerHTML = product.DescriptionHtmlSimple;
        if (btn) btn.dataset.id = product.Id;
    }
}


