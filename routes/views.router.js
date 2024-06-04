import ProductManager from "./../classes/ProductManager.js"
import {Router} from "express";

const router = Router();
    
router.get("/", (req, res) => {
    const pm = new ProductManager();
    const products = pm.getProducts();
    res.render("home", {products});
})

router.get("/realtimeproducts", (req, res) => {
    const pm = new ProductManager();
    const products = pm.getProducts();
    res.render("realTimeProducts", {products} );
})

router.get("/productsHandlerWebSockets", (req, res) => {
    res.render("productsHandlerWebSockets", {});
})


export default router; 