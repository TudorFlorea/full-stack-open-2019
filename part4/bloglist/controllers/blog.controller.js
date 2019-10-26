const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate({
    path: "user",
    model: "User",
    select: {
      blogs: 0
    }
  });
  response.json(blogs.map(blog => blog.toJSON()));
});

blogRouter.post("/", async (request, response) => {
  const body = request.body;

  if (!body.title || !body.url) {
    response.status(400).end();
  } else {
    const user = await User.findById(body.userId);

    const blog = new Blog({
      title: body.title,
      url: body.url,
      likes: body.likes,
      user: user._id
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);

    await user.save();

    response.status(201).json(savedBlog);
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
