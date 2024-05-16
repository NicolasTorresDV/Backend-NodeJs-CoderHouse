//Centralizo mis routers aqui

import cartsRouter from "./cart.router.js"
import productsRouter from "./products.router.js"

function routerApi(app){
    app.use("/api/products",productsRouter )
    app.use("/api/carts",cartsRouter )
}

export default routerApi;