const {productController, finduser, addProduct, finddata, addcart, searchProduct, findProduct} = require("../Controller/productController");
const authMiddleware = require("../Auth/middleware");

const routingProduct = require("express").Router();
    
        routingProduct.get("/Productdata", productController);

        routingProduct.get("/finduser",authMiddleware , finduser);

        routingProduct.post("/addproduct", addProduct);

        routingProduct.get("/findProduct", finddata);

        routingProduct.get("/addcart",authMiddleware, addcart);

        routingProduct.get("/search", searchProduct);

        routingProduct.post("/finditem", findProduct);

module.exports = routingProduct;