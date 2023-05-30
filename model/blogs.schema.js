const mongoose = require('mongoose');


const blogSchema = mongoose.Schema({
    blogTitle:{
        type: String,
        default: "Untitled",
        required: [true, "Blog Title is Required!"],
        // maxLength: [150, "Blog title should be under 150 Characters."],
        minLength: [25, "Blog title should be above 25 Characters."]
    },

    blogSubTitle:{
        type: String,
        // maxLength: [150, "Blog subtitle should be under 200 Characters."],
        minLength: [25, "Blog subtitle should be above 20 Characters."]
    },

    author: {
        type: String,
        required: true,
    },
    contentBody:{
        type: String,
        required: [true, "Content Body is Required!"],
        minLength: [300, "Content Body should be atleast 300 Characters."]
    },

    // Cloudinary for Storing Images...
    bannerImage:{
        id:{
            type: String,
            required: true
        },
        secureURL: {
            type: String,
            required: true 
        }
    },

}, {
    timeStamps:true
})

const Blog = mongoose.model('blogzzz', blogSchema);

module.exports = Blog;