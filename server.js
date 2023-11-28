const express = require("express")
const app = express();

app.get('/', (req, res) => {
    res.send('API is running fine')
});

app.listen(8008, () => {
    try{
        console.log("erver is running PORT No :- 8008")
    }
    catch(err){
        console.log("Error in Starting Server", err)
    }
})