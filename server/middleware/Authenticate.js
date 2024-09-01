// const User = require("../models/UserSchema");
const jwt = require("jsonwebtoken");

const Authenticate = async (req, res, next) => {
  try {
    console.log(req.headers.token);
    const token = req.headers.authorization;
    console.log(token, 41);
    // console

    if (token) {
      const decodedData = jwt.verify(token, process.env.SECRET_KEY);
      console.log(decodedData);
      if (decodedData?._id) {
        req.user = decodedData._id;
        // res.send({ success: true, message: "Authorized User" });
        next();
      } else {
        res.send({ success: false, error: "Unauthorized User" });
      }
    } else {
      res.send({ success: false, error: "Failed to authenticate token" });
    }
  } catch (error) {
    // console.log(error);
    res.send({
      success: false,
      error: error?.TokenExpiredError
        ? "Token Expire"
        : "Failed to authenticated token",
    });
  }
};

module.exports = Authenticate;
