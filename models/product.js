const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    
    brandname: {
        type:String,
        required: true,
    },

    gender: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    imageurl: {
        type: String,
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product