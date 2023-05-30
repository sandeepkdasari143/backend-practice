const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateCookieToken = require("../utils/generateCookieToken");

exports.signup = async (req, res, next) => {
    try {
      const {username, email, password} = req.body;
    

      if(!username || !email || !password){
          return next(new Error("username, email and password are required!"))
      }
  
      //Take out the user info from the database...
      const isExistedUser = await User.findOne({ email: email })
      
      if (isExistedUser) {
          throw new Error("User already Exists! SignIn instead of SignUp!");
      }
  
      const user = await User.create({
          username,
          email,
          password
      });
  
      generateCookieToken(user, res);

      } catch (error) {
        res.json({
          success: false,
          message: error.message
        })
      }
}

exports.login = async (req, res) => {
    try {
        //Take the data fromt the request body...
        const { email, password } = req.body;
        console.log(req.body)

        //Handle the absence of the request body...
        if (!email || !password) {
            throw new Error("Email and Password are compulsory!");
        }

        //Take out the user info from the database...
        const user = await User.findOne({ email: email }).select("+password");

        //Throw an error if the user does not exist in the database...
        if (!user) {
            throw new Error("User does not exist. Kindly Register or SignUp!");
        }

        //Check if the password matches...
        const isPasswordCorrect = user.isValidPassword(password);

        //If the password doesn't matches, then Throw an error...
        if (!isPasswordCorrect) {
            throw new Error("Password is incorrect.");
        }

        //Generate the Cookie Token and Give them a good Response...
        generateCookieToken(user, res);
    
    
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