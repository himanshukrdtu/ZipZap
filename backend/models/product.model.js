import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    weight: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: String,  
        required: false,
    },
    deliveryTime: {
        type: String,  
        required: false,
    },
    imageUrl: {
        type: String,  
        required: false,
    },
    category: {
        type: String, 
        required: true,
    },
    stock: {
        type: Number, 
        default: 0,
    }
}, { timestamps: true });

export const Product = mongoose.model('Product', productSchema);
export default Product;