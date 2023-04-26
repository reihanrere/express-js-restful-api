import mongoose from "mongoose";

const products = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

export default mongoose.model('Products', products);