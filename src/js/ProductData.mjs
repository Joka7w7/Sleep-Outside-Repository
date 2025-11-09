function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }

  async getData() {
    try {
      const response = await fetch(this.path);
      return await convertToJson(response);
    } catch (err) {
      console.error(`❌ Error fetching data from ${this.path}:`, err);
      return [];
    }
  }

  async findProductById(id) {
    const products = await this.getData();
    const found = products.find((item) => item.Id.toUpperCase() === id.toUpperCase());
    if (!found) {
      console.warn(`⚠️ Product with ID "${id}" not found in ${this.path}`);
    }
    return found;
  }
}
