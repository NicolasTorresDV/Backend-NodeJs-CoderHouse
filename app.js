import ProductManager from "./dao/filesystem/models/ProductManager.js";
import { Server } from "socket.io";
import {__dirname} from "./utils.js";
import express from "express";
import handlebars from "express-handlebars"
import mongoose from 'mongoose';
import routerApi from "./routes/index.js";

const PORT = 8080
const myApp = express()

//Añado esto para poder usar los elementos publicos
myApp.use(express.static(__dirname + "/public"))

//Product manager para hacer cambios en Socket
const pm = new ProductManager()

//Preparar la configuración del Server para recubir objetos JSON
myApp.use(express.json())
myApp.use(express.urlencoded({extended:true}))


//Handlebars
myApp.engine("handlebars", handlebars.engine());
myApp.set("views", __dirname + "/views");
myApp.set("view engine", "handlebars")

//Añado esto para poder usar los elementos publicos
myApp.use(express.static(__dirname + "/public"))

//Conexion a servidor
const httpServer = myApp.listen(PORT, () => {
    console.log("Mi port:" + PORT)
})

//MongoDB
const connectMongoDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://NTorres:1234sabe@codercluster.jthf60w.mongodb.net/ecommerce?retryWrites=true&w=majority")
        console.log("Conectado a MongoDB via Mongoose");
    } catch (error) {
        console.error("No se pudo conectad a la BD usando Mongoose: " + error);
        process.exit();
    }
};

connectMongoDB();

//Creamos el server para sockets
const socketServer = new Server(httpServer);
socketServer.on("connection", socket => {
    console.log("Cliente conectado");
    socket.emit("updateProductsRealTime",pm.getProducts())
    
    socket.on("createProduct", data => {
        let productCreated = pm.addProduct(data)
        socket.emit("createProductMessage",productCreated )
        socket.emit("updateProductsRealTime",pm.getProducts())
    })

    socket.on("updateProduct", data => {
        let messageUpdated = pm.updateProduct(parseInt(data.id), data.data)
        socket.emit("updateProductMessage",messageUpdated )
        socket.emit("updateProductsRealTime",pm.getProducts())
    })

    socket.on("deleteProduct", data => {
        let messageDeleted = pm.deleteProduct(data);
        socket.emit("deleteProductMessage",messageDeleted )
        socket.emit("updateProductsRealTime",pm.getProducts())
    })
    
    
})





//Usamos las rutas
routerApi(myApp);