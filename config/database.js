const mongoose = require("mongoose");
const cloudinary = require('cloudinary');

const { MONGODB_URL, CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
exports.connect = async() => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("DB CONNECTED SUCESSFULLY");
    cloudinary.config({
      cloud_name: CLOUDINARY_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret:CLOUDINARY_API_SECRET
  })
  } catch (error) {
      console.log("DB CONNECTION FAILED");
      console.log(error);
      process.exit(1);
  }
  
};
