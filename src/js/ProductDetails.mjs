import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.dataSource = dataSource;
        this.product = {};
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);

        this.renderProductDetails();

        document.getElementById("addToCart")
            .addEventListener("click", this.addProductToCart.bind(this));
    }

    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || [];

        // Check if product already exists in cart
        const existingIndex = cartItems.findIndex(
            (item) => item.Id === this.product.Id
        );

        if (existingIndex > -1) {
            // If found, increase quantity
            cartItems[existingIndex].quantity =
                (cartItems[existingIndex].quantity || 1) + 1;
        } else {
            // If not found, add new product with quantity = 1
            this.product.quantity = 1;
            cartItems.push(this.product);
        }

        setLocalStorage("so-cart", cartItems);
        alert(`${this.product.Name} has been added to your cart!`);
    }


    renderProductDetails() {
        const detailsElement = document.getElementById("productDetails");

        if (this.product) {
            detailsElement.innerHTML = `
                <h2>${this.product.Name}</h2>
                <img src="${this.product.Image}" alt="${this.product.Name}">
                <p>Price: $${this.product.ListPrice}</p>
                <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
            `;
        }
    }
}