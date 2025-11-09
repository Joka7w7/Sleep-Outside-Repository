import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: "src/index.html",
        product: "src/product_pages/index.html",  // ✅ change this line
        cart: "src/cart/index.html",
        checkout: "src/checkout/index.html"
      },
    },
  },
});
