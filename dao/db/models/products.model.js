import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const productCollection = "products"

const stringRequired = {type:String, required: true};
const numberRequired = {type:Number, required: true};

const productSchema = new mongoose.Schema({

    title: stringRequired,
    description: stringRequired,
    code: {type:String, unique: true, required: true},
    price: numberRequired,
    status: {type:Boolean,required: false} || true,
    stock: numberRequired,
    category: stringRequired,
    thumbnails: {type:Array,required: false}

});

productSchema.plugin(mongoosePaginate)

export const productModel = mongoose.model(productCollection, productSchema)