const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
    
        if (!(email && password && firstname && lastname)) {
          throw new Error("All fields are required");
        }
    
        if (!(typeof email === "string" && typeof password === "string" && typeof firstname === "string" && typeof lastname === "string")) {
          throw new Error("Should be in string format");
        }
    
        const existingUser = await User.findOne({ email });
    
        if (existingUser) {
          throw new Error("User already exists!");
        }
    
        const myEncPassword = await bcrypt.hash(password, 10);
    
        const user = await User.create({
          firstname,
          lastname,
          email: email.toLowerCase(),
          password: myEncPassword,
        });
    
        const token = jwt.sign(
          {
            user_id: user._id,
            email,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "2h",
          }
        );
    
        user.token = token;
    
        res.status(201).json({
          success: true,
          message: 'Sign Up Successfully!',
          userDetails: user,
        });
      } catch (error) {
        res.json({
          success: false,
          message: error.message
        })
      }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        if (!(email && password)) {
          throw new Error("Email and password must be provided!");
        }
      
        const user = await User.findOne({ email });
    
        if (!user) {
          throw new Error("User did not exist! Please Register...")
        }
    
        if (!(bcrypt.compare(user.password, password))) {
          throw new Error("Password mismatch! Please Enter valid password!");
        }
    
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.SECRET_KEY,
          {
            expiresIn: "2h",
          }
        );
    
        user.password = undefined;
    
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
    
        res.status(200).cookie("token", token, options).json({
          success: true,
          token,
          user,
        });
    
    
      } catch (error) {
        if(error)
        res.status(400).json({
          success: false,
          message: error.message
        })
      }
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      throw new Error("Users Not Found");
    }
    res.status(200).json({
      success: true,
      message:"All Registered Users are Fetched",
      users
    })
  } catch (error) {
    res.status(400).json({
      error: true,
      message: error.message
    })
  }
}