const config = require("./utils/config");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const blogRouter = require("./controllers/blog.controller");
const userRouter = require("./controllers/user.controller");

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors());
app.use(bodyParser.json());

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);

module.exports = app;
