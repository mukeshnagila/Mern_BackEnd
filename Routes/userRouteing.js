const { register, Login, getUserList } = require("../Controller/userController");

const routing = require("express").Router();

        routing.post("/register", register)
        routing.post("/getUserList", getUserList)

        routing.post("/login", Login)

module.exports = routing;