const data = require("../Store/data");
const userModel = require("../Models/userModel");

const productController = (req,res) => {
    return res.send(data);
}

const finduser = async (req, res) => {
    const user = req.user;
    if (user && user.email) {
        try {
          const userDetails = await userModel.findOne({ email: user.email });
          if (userDetails) {
            res.send(userDetails);
          } else {
            res.status(404).send("User not found");
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
          res.status(500).send("Internal Server Error");
        }
    } else {
        res.status(401).send("Unauthorized");
    }
};

module.exports = {productController, finduser};