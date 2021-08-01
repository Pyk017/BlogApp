const express = require("express");
const Blog = require("../models/blog");
const route = express.Router();
const blogControllers = require("../controllers/blogController");

route.get("/blogs", blogControllers.blog_index);

route.post("/blogs", blogControllers.blog_create_post);

route.get("/blog/:id", blogControllers.blog_details);

route.delete("/blog/:id", blogControllers.blog_delete);

route.get("/blogs/create", blogControllers.blog_create_get);

module.exports = route;
