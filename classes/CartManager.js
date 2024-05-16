import Cart from "./Cart.js"
import ProductManager from "./ProductManager.js"
import fs from "fs"

const PATH = "./Carritos.json"

class CartManager{
    constructor(){
        this.path = PATH
        this.carts = []
        if(!fs.existsSync(this.path.toString())){
            fs.writeFileSync(this.path.toString(),JSON.stringify(this.carts))
        }

    }

    getCarts(){
        let cartsJSON = fs.readFileSync(this.path.toString(),'utf-8');
        return JSON.parse(cartsJSON);
    }

    getCartById(id){

        this.carts = this.getCarts();

        let cartSearched = this.carts.filter(cart =>  cart.id === id)
        
        if (cartSearched.length == 0 ){
            return {message: "Error, carrito no encontrado"}
        }

        return cartSearched[0]

    }

    addCart(){
        this.carts = this.getCarts();
        let newId = 1;
        
        if (!this.carts.length == 0)
            newId = this.carts[this.carts.length - 1].id + 1

        let newCart = new Cart(newId, []);

        this.carts.push(newCart);
        fs.writeFileSync(this.path.toString(), JSON.stringify(this.carts));
        
        return newCart
    }

    addProductToCart(idCart, idProduct){
        //Compruebo si existe el carrito
        let cart = this.getCartById(idCart);
        if (!cart.id) {
            return cart;
        }
        let newPM = new ProductManager();
        let quantity = 1;
        let productsExist = cart.products.filter(oneProd => oneProd.id === idProduct) 
        let updateProducts = [];
        let updatedCart = [];
        let updatedCarts = [];
        //Compruebo si existe el producto
        let newProduct = newPM.getProductById(idProduct);
        if (!newProduct.id) {
            return newProduct;
        }
        console.log("Hola");

        if (cart.products.length == 0 || productsExist.length == 0) {
            cart.products.push({id: idProduct, quantity: quantity})
            updatedCart = {...cart}
        }
        
        if (productsExist.length > 0) {
            quantity = productsExist[0].quantity + 1;
            
            updateProducts = cart.products.map(
            (oneProd) => {
                if (oneProd.id === idProduct){
                    oneProd = {id: idProduct,quantity}
                }  
                return oneProd
            }
            )
            updatedCart = {...cart, products: updateProducts}
        }
        
        updatedCarts = this.carts.map(
            (oneCart) => {
                if (oneCart.id == idCart){
                    oneCart = {...oneCart,...updatedCart}
                }
                return oneCart
            }
        )
        
        fs.writeFileSync(this.path.toString(), JSON.stringify(updatedCarts));

        return {updatedCart}        
        
    }    
        
}


export default CartManager