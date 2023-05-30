const express = require('express');
const { createBlog } = require('../controllers/blogs.controller');

const router = express.Router();

router.route("/blogs").post(createBlog);
// router.route("/blogs/:id").get(deleteBlog);
// router.route("/blogs/:id").post(updateBlog);

module.exports = router