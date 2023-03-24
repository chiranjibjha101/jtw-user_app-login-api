const jwt = require("jsonwebtoken");

const env = require("dotenv");

env.config();
exports.gentoken = (data) => {
  const key = process.env.MY_KEY;

  console.log(key);
  return jwt.sign(data, key);
};

exports.decodeToken = (token) => {
  const key = process.env.MY_KEY;
  return jwt.verify(token, key);
};
