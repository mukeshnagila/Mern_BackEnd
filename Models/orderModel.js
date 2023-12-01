// Import Mongoose
const mongoose = require("mongoose");

// Define the order schema
const orderSchema = mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
    },
    products: [
        {
            id: {
                type: Number,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            discr: {
                type: String,
                required: true,
            },
            Wname: {
                type: String,
                required: true,
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the order model
const Order = mongoose.model("Order", orderSchema);

// Export the model
module.exports = Order;
