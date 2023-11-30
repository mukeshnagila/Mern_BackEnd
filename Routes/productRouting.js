const {productController, finduser} = require("../Controller/productController");
const authMiddleware = require("../Auth/middleware");

const routingProduct = require("express").Router();
    
        routingProduct.get("/Productdata", productController);

        routingProduct.get("/finduser",authMiddleware , finduser);

module.exports = routingProduct;