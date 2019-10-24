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

blogRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (deletedBlog) {
      response.json(deletedBlog.toJSON());
    } else {
      response.status(400).json({
        error: `No blog with the following id: ${id}`
      });
    }
  } catch (err) {
    response.status(400).json({
      error: err.message
    });
  }
});

blogRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const blog = request.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
    if (updatedBlog) {
      response.json(updatedBlog.toJSON());
    } else {
      response.status(400).json({
        error: `No blog with the following id: ${id}`
      });
    }
  } catch (err) {
    response.status(400).json({
      error: err.message
    });
  }
});

module.exports = blogRouter;
