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

    addProductToCart(product) {
        const cartItems = getLocalStorage("so-cart") || []; // get cart array of items from local storage if null set to empty array
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);
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