
const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    id:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    subcategory:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    Wname:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    oldprice:{
        type: Number,
        required: true
    },
    discr:{
        type: String,
        required: true
    }
})

const allProducts = mongoose.model("allProducts", productSchema)

module.exports = allProducts;
