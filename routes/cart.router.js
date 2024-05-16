import CartManager from "../classes/CartManager.js";
import {Router} from "express";

const cartsRouter = Router();

const cm = new CartManager()

cartsRouter.post("/", async (req,res) => {
    try {
        let newCart = await cm.addCart();
        res.status(201).json(newCart)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

cartsRouter.post("/:cid/product/:pid", async (req,res) => {
    const { cid , pid } = req.params;
    try {
        res.status(200).json( await cm.addProductToCart(parseInt(cid),parseInt(pid)))
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

cartsRouter.get('/:cid', async (req,res) => {
    const { cid } = req.params;
    try {
        res.status(200).json( await cm.getCartById(parseInt(cid)))
    } catch (error) {
        res.status(500).json({message: error.message});
    }
    
});

export default cartsRouter