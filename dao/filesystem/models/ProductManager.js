import Product from "./classes/Product.js";
import {__dirname} from "../../../utils.js";
import { fileURLToPath } from 'url';
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);

const PATH = `${__dirname}/Products.json`;



class ProductManager {

    constructor() {

        this.path = PATH

        this.products = this.loadProducts();

    }



    loadProducts() {

        if (fs.existsSync(this.path)) {

            const productsJSON = fs.readFileSync(this.path, 'utf-8');

            return JSON.parse(productsJSON);

        } else {

            fs.writeFileSync(this.path, JSON.stringify([]));

            return [];

        }

    }



    async getProducts() {

        try {

            return this.products;

        } catch (error) {

            console.error("Error al leer el archivo de productos:", error);

            throw error;

        }

    }



    getProductById(id) {

        const productSearched = this.products.find((product) => product.id === id
        );

        return productSearched || {message: `Product with id ${id} not found`};

    }



    addProduct(product) {

        // let product = { title, description, price, thumbnail, code, stock };

        if (!this.isValidProduct(product)) {

            throw new Error("All fields are required.");

        }

        const existingProduct = this.products.find((existingProduct) => existingProduct.code === product.code);

        if (existingProduct) {

            return {message: "Code is repeated"};

        }

        const newID = this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1;

        let newProduct = new Product(newID, product.title, product.description, product.price,product.status || true, product.stock, product.category,product.thumbnail || [])

        this.products.push(newProduct);

        fs.writeFileSync(this.path, JSON.stringify(this.products));


        return newProduct;

    }



    updateProduct(product) {
        console.log(product); 

        let updatedProducts = this.products.map((oneProduct) => {

            if (oneProduct.id == product.id) {

                oneProduct = { ...product };

            }

            return oneProduct;

        });



        fs.writeFileSync(this.path, JSON.stringify(updatedProducts));

        return {message: `Product with id: ${product.id} . Has been updated`};

    }



    deleteProduct(id) {

        let updatedProducts = this.products.filter(oneProduct => oneProduct.id != id);

        fs.writeFileSync(this.path, JSON.stringify(updatedProducts));

        return {message: `Product with id: ${id} .  Has been deleted`};

    }



    isValidProduct(product) {

        const requiredFields = ['title', 'description', 'price', 'category', 'code', 'stock'];

        return requiredFields.every((field) => product[field]);

    }

}



export default ProductManager;