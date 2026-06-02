import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `
    <div class="product-card">
      <a href="product_pages/index.html?product=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}" />
        <h3>${product.Brand.Name}</h3>
        <h2>${product.Name}</h2>
        <p class="product-card__price">$${product.ListPrice}</p>
        <p class="product__color">${product.Colors[0].ColorName}</p>
      </a>
    </div>
  `;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.products = [];
    }

    async init() {
        this.products = await this.dataSource.getData();
        this.renderList(this.products);
    }

    renderList(products) {
        // Use the reusable utility function
        renderListWithTemplate(productCardTemplate, this.listElement, products, "afterbegin", true);
    }
}
