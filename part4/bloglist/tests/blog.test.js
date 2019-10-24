const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

const initialBlogs = [
  {
    title: "Title 1",
    author: "Author 1",
    url: "https://google.com",
    likes: 20
  },
  {
    title: "Title 2",
    author: "Author 2",
    url: "https://facebook.com",
    likes: 10
  }
];

beforeEach(async () => {
  await Blog.deleteMany({});
  await new Blog(initialBlogs[0]).save();
  await new Blog(initialBlogs[1]).save();
});

describe("retriving posts", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("request returns the correct number of blogs", async () => {
    const blogs = await api.get("/api/blogs");
    expect(blogs.body.length).toBe(2);
  });

  test("blogs have an id property", async () => {
    const blogs = await api.get("/api/blogs");
    expect(blogs.body[0].id).toBeDefined();
  });
});

describe("saving a post", () => {
  test("blog is saved correctly in the database", async () => {
    const newBlog = {
      title: "Title 3",
      author: "Author 3",
      url: "https://site.com"
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201);

    const response = await api.get("/api/blogs");

    expect(response.body.length).toBe(initialBlogs.length + 1);
    expect(response.body).toContainEqual(expect.objectContaining(newBlog));
  });

  test("on a saved blog if no likes are present they default to 0", async () => {
    const newBlog = {
      title: "Title 3",
      author: "Author 3",
      url: "https://site.com"
    };

    const savedBlog = await api.post("/api/blogs").send(newBlog);

    expect(savedBlog.body).toHaveProperty("likes", 0);
  });

  test("get a 400 response when the title or url is missing from the request", async () => {
    const blogWithoutTitleAndUrl = {
      author: "Author 3"
    };

    await api
      .post("/api/blogs")
      .send(blogWithoutTitleAndUrl)
      .expect(400);
  });
});

describe("deleting a blog", () => {
  test("making a request with wrong id retuns 400", async () => {
    await api
      .delete("/api/blogs/1")
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  test("deleting a post works correctly", async () => {
    const blogs = await api.get("/api/blogs");
    const id = blogs.body[0].id;

    const deletedBlog = await api.delete(`/api/blogs/${id}`);

    expect(deletedBlog.body).toEqual(blogs.body[0]);

    const newBlogs = await api.get("/api/blogs");

    expect(newBlogs.body.length).toBe(blogs.body.length - 1);
  });
});

describe("update a blog", () => {
  test("updating a blog with a wong id returns 400", async () => {
    const blogUpdate = { title: "new title" };

    await api
      .put(`/api/blogs/1`)
      .send(blogUpdate)
      .expect(400);
  });

  test("updating a blog works correctly", async () => {
    const blogs = await api.get("/api/blogs");
    const id = blogs.body[0].id;

    const blogUpdate = { likes: 999 };

    const updatedBlog = await api.put(`/api/blogs/${id}`).send(blogUpdate);

    expect(updatedBlog.body).toHaveProperty("likes", blogUpdate.likes);
  });

  test("updating a non existang blog returns 400", async () => {
    const blogUpdate = { likes: 999 };

    await api
      .put(`/api/blogs/111111111111111111111111`)
      .send(blogUpdate)
      .expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
