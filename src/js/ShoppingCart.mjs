import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ShoppingCart {
    constructor(key, parentSelector) {
        this.key = key;
        this.parentSelector = parentSelector;
        this.items = [];
        this.total = 0;
    }

    init() {
        this.items = getLocalStorage(this.key) || [];
        this.ensureQuantities();
        this.calculateListTotal();
        this.renderCartContents();
    }

    showPopup(message) {
        const popup = document.createElement("div");
        popup.className = "cart-popup";
        popup.innerText = message;
        document.body.appendChild(popup);

        setTimeout(() => popup.classList.add("show"), 10);     // fade in
        setTimeout(() => popup.classList.remove("show"), 1800); // fade out
        setTimeout(() => popup.remove(), 2300); // remove from DOM
    }

    ensureQuantities() {
        this.items = this.items.map(i => {
            if (!i.quantity) i.quantity = 1;
            return i;
        });
    }

    calculateListTotal() {
        this.total = this.items.reduce(
            (sum, item) => sum + item.FinalPrice * item.quantity,
            0
        );
    }

    saveToLocalStorage() {
        setLocalStorage(this.key, this.items);
    }

    renderCartContents() {
        const parent = document.querySelector(this.parentSelector);
        parent.innerHTML = this.items.map(item => cartItemTemplate(item)).join("");

        document.querySelector(".list-total").innerText = `Total: $${this.total}`;

        this.addListeners();
    }

    addListeners() {
        // DELETE
        document.querySelectorAll(".remove-item").forEach(btn => {
            btn.addEventListener("click", e => {
                const id = e.target.dataset.id;
                this.removeItem(id);
            });
        });

        // PLUS
        document.querySelectorAll(".qty-btn.plus").forEach(btn => {
            btn.addEventListener("click", e => {
                const id = e.target.dataset.id;
                const item = this.items.find(i => i.Id == id);
                this.changeQuantity(id, item.quantity + 1);
            });
        });

        // MINUS
        document.querySelectorAll(".qty-btn.minus").forEach(btn => {
            btn.addEventListener("click", e => {
                const id = e.target.dataset.id;
                const item = this.items.find(i => i.Id == id);
                if (item.quantity > 1) {
                    this.changeQuantity(id, item.quantity - 1);
                }
            });
        });
    }


    removeItem(id) {
        this.items = this.items.filter(item => item.Id != id);
        this.saveToLocalStorage();
        this.calculateListTotal();
        this.renderCartContents();
        this.showPopup("Item removed from cart");
    }


    changeQuantity(id, qty) {
        if (qty < 1) qty = 1;

        this.items = this.items.map(item => {
            if (item.Id == id) item.quantity = qty;
            return item;
        });

        this.saveToLocalStorage();
        this.calculateListTotal();
        this.renderCartContents();
    }
}

// cart card template (keep it at bottom!)
function cartItemTemplate(item) {
    return `
<li class="cart-card divider" data-id="${item.Id}">
  <button class="remove-item" data-id="${item.Id}">CLEAR</button>

  <a href="#" class="cart-card__image">
    <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
  </a>

  <a href="#"><h2 class="card__name">${item.Name}</h2></a>

  <p class="cart-card__color">${item.Colors[0].ColorName}</p>

  <div class="qty-controls" data-id="${item.Id}">
      <button class="qty-btn minus" data-id="${item.Id}">−</button>
      <span class="qty-number">${item.quantity}</span>
      <button class="qty-btn plus" data-id="${item.Id}">+</button>
  </div>

  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
}




