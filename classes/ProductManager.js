class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(product) {
    const { title, description, price, thumbnail, code, stock } = product;

    const newProduct = {
      id: this.products.length + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    // verificar que todos los campos sean obligatorio
    this.validateProduct(newProduct);

    // verificar que no se repita el code
    const productExist = this.products.find((product) => product.code === code);
    if (productExist) throw new Error("Already exists a product with that code");

    // Agregamos el producto al array
    this.products.push(newProduct);
  }

  getProducts() {
    console.log(this.products);
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    
    if (!product) throw new Error("Not found");

    console.log(product);
  }

  validateProduct(product) {
    if (Object.values(product).includes(undefined))
      throw new Error("All fields are required");
  }
}