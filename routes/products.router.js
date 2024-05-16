import ProductManager from "../classes/ProductManager.js"
import {Router} from "express";

const productsRouter = Router();

const pm = new ProductManager()

productsRouter.get('/', async (req,res) => {
    const { limit } = req.query;
    try {
        if (!limit) {
            res.status(200).json( await pm.getProducts())
        }else{
            let newProducts = await pm.getProducts();
            res.status(200).json(newProducts.slice(0,limit));
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

productsRouter.post('/', async (req, res) => {
    const body = req.body;
    try {
        let newProduct = await pm.addProduct(body);
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
    
})

productsRouter.get('/:pid', async (req,res) => {
    const { pid } = req.params;
    try {
        res.status(200).json( await pm.getProductById(parseInt(pid)))
    } catch (error) {
        res.status(500).json({message: error.message});
    }
    
});

productsRouter.put("/:pid", async (req,res) => { 
    const { pid } = req.params;
    const body = req.body
    console.log(body);
    try {
        res.status(200).json(await pm.updateProduct({id: pid, ...body}))
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

productsRouter.delete('/:pid', async (req,res) => {
    const { pid } = req.params;
    try {
        res.status(200).json(await pm.deleteProduct(pid))
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

export default productsRouter