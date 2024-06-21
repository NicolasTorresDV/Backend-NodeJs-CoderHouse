class Product{
    constructor(id,title,description,price,status,stock, category,thumbnail,code,){
        this.id = id
        this.title = title
        this.description = description
        this.code = code
        this.price = price
        this.status = status || true
        this.stock = stock
        this.category = category
        this.thumbnail = thumbnail
    }
}

export default Product;