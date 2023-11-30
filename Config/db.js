const cloudUrl = "mongodb+srv://nagilamukesh43:Udemy123@cluster0.mnfm72w.mongodb.net/?retryWrites=true&w=majority"
const mongoose = require("mongoose");

mongoose.set("strictQuery",true);

const connectToDatabase= async() => {
    try{
        await mongoose.connect(cloudUrl)
        console.log("connection success");
    }catch(err){
        console.log("Error In DAtabase", err);
    }
}
// connectToDatabase();
module.exports = connectToDatabase;