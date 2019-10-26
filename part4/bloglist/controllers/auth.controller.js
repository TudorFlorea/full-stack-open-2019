const authRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

authRouter.post("/", async (req, res) => {
  const body = req.body;

  const user = await User.findOne({ username: body.username });
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid username or password"
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  res.status(200).json({ token, username: user.username, name: user.name });
});

module.exports = authRouter;
