const express = require("express")
const app = express();
const cors = require("cors");
const connectToDatabase = require("./Config/db");
const routing = require("./Routes/userRouteing");
const routingProduct = require("./Routes/productRouting");
const paymentRoute = require("./Routes/paymentRoute");

app.use(express.json());
app.use(cors({
    origin : "*"
}))
app.use("/api", routing);
app.use("/api", routingProduct);
app.use('/api/payment', paymentRoute);

app.get('/', (req, res) => {
    res.send('API is running fine')
});

app.listen(8008, async(req,res) => {
    try{
        await connectToDatabase()
        console.log("erver is running PORT No :- 8008")
    }
    catch(err){
        console.log("Error in Starting Server", err)
    }
})