const express = require('express');
const { createBlog, getAllBlogs } = require('../controllers/blogs.controller');

const router = express.Router();

router.route("/blogs").post(createBlog);
router.route("/blogs").get(getAllBlogs);

// router.route("/blogs/:id").get(deleteBlog);
// router.route("/blogs/:id").post(updateBlog);

module.exports = router