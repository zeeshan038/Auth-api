//NPM Packages
const jwt = require("jsonwebtoken");

const genrateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

module.exports = genrateToken;
