const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs.map(blog => blog.toJSON()));
});

blogRouter.post("/", async (request, response) => {
  if (!request.body.title || !request.body.url) {
    response.status(400).end();
  } else {
    const blog = new Blog(request.body);

    const result = await blog.save();
    response.status(201).json(result);
  }
});

module.exports = blogRouter;
