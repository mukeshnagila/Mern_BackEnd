
const jwt = require("jsonwebtoken");
const secret_key = "Mukesh";

const authmiddleware = async (req, res, next) => {
  const BearerToken = req.headers["authorization"];

  if (BearerToken) {
    const token = BearerToken.split(" ")[1];
    try {
      const validate = jwt.verify(token, secret_key);
      if (validate) {
        // Attach user information to the request object
        req.user = validate;
        return next();
      }
    } catch (error) {
      return res.status(401).json({ msg: "Token verification failed" });
    }
  }

  return res.status(401).json({ msg: "User is not authorized" });
};

module.exports = authmiddleware;


// const jwt = require("jsonwebtoken");
// const secret_key = "Mukesh";
// const authmiddleware = async(req, res, next) => {
//   const BearerToken = req.headers["authorization"];

//   if (BearerToken) {
//     const token = BearerToken.split(" ")[1];
//     const validate = jwt.verify(token, secret_key);
//     if (validate) {
//       next();
//     }
//     return res.send({ msg: "user is not authorized" });
//   }
//   return res.send({ msg: "user is not allowed" });
// };

// module.exports = authmiddleware;



// const jwt = require("jsonwebtoken");
// const secret_key = "Mukesh";

// const authmiddleware = async (req, res, next) => {
//   const BearerToken = req.headers["Authorization"];

//   if (BearerToken) {
//     const token = BearerToken.split(" ")[1];
//     try {
//       const validate = jwt.verify(token, secret_key);
//       if (validate) {
//         // Call next to pass control to the next middleware or route handler
//         return next();
//       }
//     } catch (error) {
//       // Handle the error if jwt.verify fails
//       return res.status(401).json({ msg: "Token verification failed" });
//     }
//   }

//   // Send a response if the token is missing or invalid
//   return res.status(401).json({ msg: "User is not authorized" });
// };

// module.exports = authmiddleware;
