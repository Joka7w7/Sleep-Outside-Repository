// src/js/ProductList.mjs
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;

  const discountPercent = isDiscounted
    ? Math.round(
      ((product.SuggestedRetailPrice - product.FinalPrice) /
        product.SuggestedRetailPrice) *
      100
    )
    : 0;

  return `
    <li class="product-card ${isDiscounted ? "discounted" : ""}">
      <a href="/product_pages/?product=${product.Id}">
        <div class="image-wrapper">
          <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
          ${isDiscounted
      ? `<span class="discount-badge">-${discountPercent}%</span>`
      : ""
    }
        </div>
        <h2 class="card__brand">${product.Brand?.Name ?? ""}</h2>
        <h3 class="card__name">${product.NameWithoutBrand}</h3>
        <p class="product-card__price">
          $${product.FinalPrice.toFixed(2)}
          ${isDiscounted
      ? `<span class="product-card__old-price">$${product.SuggestedRetailPrice.toFixed(
        2
      )}</span>`
      : ""
    }
        </p>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    let list = await this.dataSource.getData(this.category);

    // Normalize data for all file types
    if (Array.isArray(list)) {
      // tents.json
      this.renderList(list);
    } else if (Array.isArray(list.Result)) {
      // sleeping-bags.json & backpacks.json
      this.renderList(list.Result);
    } else {
      console.error("❌ Unknown data structure:", list);
    }
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
