const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userAccount = require("../Models/userModel")
const secret_key = "Mukesh";

const register = async(req,res) => {
    try{
    const data = req.body;
    const registerdetail = await userAccount.find({email: data.email});

    if(registerdetail.length === 0) {
                const saltround = 10;
            // console.log(saltround);

            const hashpass = bcrypt.hashSync(data.password, saltround);
            // console.log(hashpass);

            const token = jwt.sign({email: data.email}, secret_key,{expiresIn: "1d"});
            console.log(token);

            const user = await userAccount.create({
                    name: data.name,
                    email: data.email,
                    password: hashpass,
            })
            console.log(user);

            res.send({ message: 'Your Email Is Registered Successfully......', token: token });
    }else{
        
        console.log(registerdetail);
        return res.send({message: "User Already Registered"});
    }
    
    }catch(err){
        res.send({ message: 'Somthing Wrong......',err});
        console.log(err);
    }
}

const getUserList = async (req, res) => {
    try {
      const userList = await userAccount.find();
      res.send({ users: userList });
    } catch (err) {
      res.status(500).send({ message: 'Error fetching user list', error: err });
    }
  };

const Login = async(req, res) => {
    const logindata = req.body;
  
    const user = await userAccount.findOne({email : logindata.email});
  
    if (user) {

      const validate = bcrypt.compareSync(logindata.password,user.password); /// it will give you the boolean value

      if(validate){
          const token = jwt.sign({email: logindata.email}, secret_key,{expiresIn:"1d"})/// for genrating jwt token
          console.log(token);
          return res.send({message: "user logged in successfully", token: token})
      }else{
          return res.send({message: "User is not correct. Please enter the correct details"})
      }
  
    } else {
      console.log('Email is not found. Please enter a valid email.');
      res.send({ message: 'Login failed. Email not found.' });
    }
}

module.exports = { register, Login, getUserList };