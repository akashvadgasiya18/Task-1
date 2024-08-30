// const User = require("../models/UserSchema");
const jwt = require("jsonwebtoken");

const Authenticate = async (req, res, next) => {
  // try {
  //   const authHeader = req.headers["authorization"];
  //   const token = authHeader && authHeader.split(" ")[1];

  //   if (!token) {
  //     return res
  //       .status(401)
  //       .json({ message: "Access denied. No token provided." });
  //   }

  //   // Verify the token
  //   const decoded = jwt.verify(token, process.env.SECRET_KEY);

  //   // Find the user by ID from the decoded token
  //   const user = await User.findOne({
  //     _id: decoded._id,
  //     "tokens.token": token,
  //   });

  //   if (!user) {
  //     return res.status(401).json({ message: "Invalid token." });
  //   }

  //   // Attach the user and token to the request object for use in the route handler
  //   req.user = user;
  //   req.token = token;

  //   // Proceed to the next middleware or route handler
  //   next();
  // } catch (err) {
  //   res.status(401).json({ message: "Invalid token." });
  // }

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
