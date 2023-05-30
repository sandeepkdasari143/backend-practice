require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const User = require("./model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fileUpload = require("express-fileupload");
const app = express();
app.use(express.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp"
}));

app.get("/", (req, res) => {
  // res.send("<h1>HELLO JAYANTH</h1>");
  res.json({
    name: "jayanth",
  });
});

const authRouter = require('./routes/auth.router');
const blogRouter = require('./routes/blogs.router');

app.use('/', authRouter);
app.use('/', blogRouter);



module.exports = app;
