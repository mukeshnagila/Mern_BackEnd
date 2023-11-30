const {productController, finduser, addProduct, finddata} = require("../Controller/productController");
const authMiddleware = require("../Auth/middleware");

const routingProduct = require("express").Router();
    
        routingProduct.get("/Productdata", productController);

        routingProduct.get("/finduser",authMiddleware , finduser);

        routingProduct.post("/addproduct", addProduct);

        routingProduct.get("/findProduct", finddata);

module.exports = routingProduct;