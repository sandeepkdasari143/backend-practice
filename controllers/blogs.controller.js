const { Mongoose } = require("mongoose");
const Blog = require("../model/blogs.schema");
const cloudinary = require("cloudinary");
const { v4: uuidv4 } = require('uuid');

exports.createBlog = async (req, res) => {
    try {
        const { blogTitle, blogSubTitle, contentBody, author } = req.body;

        if (!blogTitle) {
            throw new Error("blogTitle required!");
        }
        if (!blogSubTitle) {
            throw new Error("blogSubTitle required!");
        }
        if (!contentBody) {
            throw new Error("contentBody required!");
        }
        if (!author) {
            throw new Error("author required!");
        }

        const blogID = uuidv4();
        let cloudinaryResult;

    
        if (req.files) {
            let bannerImage = req.files.photo;

            cloudinaryResult = await cloudinary.v2.uploader.upload(bannerImage.tempFilePath, {
                folder:`${author}/${blogID}`
            });

            console.log("Cloudinary Result: ", cloudinaryResult);
        }

        const blog = await Blog.create({
            blogTitle,
            blogSubTitle,
            author,
            contentBody,
            bannerImage:{
                id: cloudinaryResult.public_id,
                secureURL: cloudinaryResult.secure_url
            },
        })

        if (!blog) {
            throw new Error("Couldn't create blog!");
        }

        res.status(201).json({
            success: true,
            message: "Successfully New Blog Created!",
            blog
        })
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        if (!blogs) {
            throw new Error("Blogs Not Found");
        }
        res.status(200).json({
            success: true,
            message:"All Registered Blogs are Fetched",
            blogs
        })
        } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}