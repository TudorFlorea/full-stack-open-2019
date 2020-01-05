const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

usersRouter.get("/", async (req, res) => {
  try {
    const users = await User.find({}).populate({
      path: "blogs",
      model: "Blog",
      select: {
        user: 0
      }
    });
    console.log(users);
    res.json(users.map(user => user.toJSON()));
  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
});

usersRouter.post("/", async (req, res) => {
  const body = req.body;
  if (!body.password || (body.password.length && body.password.length < 3)) {
    res.status(400).json({
      error: "password must be at least 3 characters long"
    });
  } else {
    try {
      const passwordHash = await bcrypt.hash(body.password, 10);

      const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
      });

      const savedUser = await user.save();

      res.json(savedUser.toJSON());
    } catch (err) {
      res.status(400).json({
        error: err.message
      });
    }
  }
});

module.exports = usersRouter;
