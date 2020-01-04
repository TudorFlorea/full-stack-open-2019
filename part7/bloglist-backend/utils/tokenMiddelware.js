const tokenMiddelware = (req, res, next) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substring(7);
  }
  next();
};

module.exports = tokenMiddelware;
