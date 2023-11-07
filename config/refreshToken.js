const jwt = require("jsonwebtoken");

const genrateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "3d" });
};

module.exports = { genrateRefreshToken };
