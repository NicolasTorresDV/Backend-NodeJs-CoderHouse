const socket = io();

const createProductButton = document.getElementById("createProduct");
const updateProductButton = document.getElementById("updateProduct");
const deleteProductButton = document.getElementById("deleteProduct");
const message = document.getElementById("message")

socket.on("createProductMessage", data => {
    if (!data.id) {
        updateMessage(data.message)
    }
    else{
        updateMessage("Producto creado correctamente!")
    }
})

socket.on("updateProductMessage", data => {
        updateMessage(data.message)
        updateMessage("Producto actualizado correctamente!")
})

socket.on("deleteProductMessage", data => {
        updateMessage(data.message)
        updateMessage("Producto eliminado correctamente!")
})


createProductButton.onclick = () => {
    let data = getFormData(); 
    socket.emit("createProduct",data);
    updateMessage("Producto creado")

}
updateProductButton.onclick = () => {
    let data = getFormData();
    let id = document.getElementById("productId").value;
    if (id) {
        socket.emit("updateProduct",{id, data});
    }else{
        updateMessage("No puede estar el ID vacio")
    }
}
deleteProductButton.onclick = () => {
    let id = document.getElementById("productId").value;
    if (id) {
        socket.emit("deleteProduct",id);
    }else{
        updateMessage("No puede estar el ID vacio")
    }
}

function getFormData(){
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let code = document.getElementById("code").value;
    let price = parseInt(document.getElementById("price").value);
    let stock = parseInt(document.getElementById("stock").value);
    let thumbnail = document.getElementById("thumbnails").value.split(",");

    const product = {title,description,price,thumbnail,code,stock,status: true}

    return product
}

function updateMessage(messages){
    message.innerHTML = messages
}