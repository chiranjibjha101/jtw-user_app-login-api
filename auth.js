const users = require("./users");
exports.authLogin = async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    const tokenVerify = require("./jwtGenerator");
    const tokenData = tokenVerify.decodeToken(token);
    const { userId, password } = tokenData;
    const user_info = await users.findOne({ userId });
    if (user_info && user_info.password === password) {
      res.status(201).json({ status: "User loged in using  token" });
    }
  } else {
    next();
  }
};

exports.authAction = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ status: "login to post" });
  } else {
    const tokenVerify = require("./jwtGenerator");
    const tokenData = tokenVerify.decodeToken(token);
    req.userId = tokenData.userId;
    next();
  }
};
