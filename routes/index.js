//Centralizo mis routers aqui

import cartsRouter from "./cart.router.js"
import productsRouter from "./products.router.js"
import viewsRouter from "./views.router.js"

function routerApi(app){
    app.use("/api/products",productsRouter )
    app.use("/api/carts",cartsRouter )
    app.use("/api/",viewsRouter )
}

export default routerApi;