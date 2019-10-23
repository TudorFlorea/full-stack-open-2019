require("dotenv").config();

let mongoUri;

if (process.env.NODE_ENV === "test") {
  mongoUri = process.env.MONGODB_URI_TEST;
} else {
  mongoUri = process.env.MONGODB_URI;
}

module.exports = {
  MONGODB_URI: mongoUri,
  PORT: process.env.PORT
};
