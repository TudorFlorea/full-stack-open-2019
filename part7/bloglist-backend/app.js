const config = require("./utils/config");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const blogRouter = require("./controllers/blog.controller");
const userRouter = require("./controllers/user.controller");
const authRouter = require("./controllers/auth.controller");
const tokenMiddelware = require("./utils/tokenMiddelware");

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors());
app.use(bodyParser.json());
app.use(tokenMiddelware);

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

module.exports = app;
