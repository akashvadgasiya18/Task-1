const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const sendMail = require("../utils/sendMail");
const jwt = require("jsonwebtoken");
const Authenticate = require("../middleware/Authenticate");
require("dotenv").config();
require("../db/conn");

async function genrateOtp(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// ----------------------- for Register post Data --------------------

router.post("/register", async (req, res) => {
  const { username, email, password, dob, mobile_no, gender, address } =
    req.body;
  // console.log(req.body);

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      res.send({ error: "User Already Exist" });
    } else {
      if (
        !username ||
        !email ||
        !password ||
        !dob ||
        !mobile_no ||
        !gender ||
        !address
      ) {
        res.send({ error: "All Fields Are required" });
      } else {
        const hashPassword = await bcrypt.hash(password, 10);

        const otp = await genrateOtp(100000, 999999);
        console.log(otp);
        await sendMail({
          email: req.body.email,
          subject: "Sign Up Authentication",
          message: `<h1>OTP :</h1><br/> ${otp} `,
        });
        const userData = new User({
          username,
          email,
          password: hashPassword,
          dob,
          mobile_no,
          gender,
          address,
          otp,
        });

        console.log(userData);
        await userData.save();
        res.send({ success: true, userData });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

// -------------------------- verifying OTP --------------------------------------------

router.post("/verifyOTP", async (req, res) => {
  const { otp, email } = req.body;
  console.log(req.body);

  // const { votp, email } = req.body;
  const user = await User.findOne({ email: email, otp: otp });
  // console.log(typeof user.otp, typeof otp, 77);
  // console.log(user);
  // console.log(otp == user.otp);

  // console.log(email);
  if (user) {
    const otp = user.otp;

    const resUser = await User.updateOne(
      { _id: user._id },
      { $set: { verified: true } }
    );
    console.log(resUser);
    res
      .status(201)
      .send({ message: "Register Successfully....!", success: true });
  } else {
    res.status(412).send({ error: "Invalid otp" });
  }
});

// ------------------------- fro Login -----------------------------------

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  try {
    let token;
    const userDetail = await User.findOne({ email: email });
    // console.log(userDetail.password);
    if (userDetail) {
      const match = await bcrypt.compare(password, userDetail.password);
      // console.log(match);

      if (!match) {
        res.status(413).json({ error: "credential not matched.." });
      } else {
        token = await userDetail.generateAuthToken();
        res.cookie("jwtoken", token, {
          httpOnly: true,
        });
        res.status(201).json(token);
        console.log(token);
      }
    } else {
      res.status(413).json({ error: "user not found.." });
    }
  } catch (error) {
    console.log(error);
  }
});

// --------------------------------- forgot password ----------------------------------------

router.post("/forgot_password", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(429).json({});
  }
  try {
    const oldUser = await User.findOne({ email: email });
    if (oldUser) {
      const secret = process.env.SECRET_KEY + oldUser.password;
      const token = jwt.sign(
        { email: oldUser.email, id: oldUser._id },
        secret,
        {
          expiresIn: "5m",
        }
      );

      const link = `http://localhost:8000/reset-password/${oldUser._id}/${token}`;

      await sendMail({
        email: req.body.email,
        subject: "RESET PASSWORD",
        message: `<h1>Link for Reset Password  :</h1><br/> ${link} `,
      });
      console.log(link);
      return res.status(201).json({ message: "Link Send successfully..." });
    } else {
      return res.status(413).json({ message: "Not exists." });
    }

    // console.log(link);
  } catch (error) {
    console.log(error);
  }
});

// ----------------------------- reset password ------------------------------------------------

router.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const oldUser = await User.findOne({ _id: id });

  if (oldUser) {
    const secret = process.env.SECRET_KEY + oldUser.password;
    try {
      const verify = jwt.verify(token, secret);
      res.render("index", { email: verify.email, status: "Not verified" });
    } catch (error) {
      console.log(error);
      res.status(411).send("not verifed.");
    }
  } else {
    return res.status(413).json({ message: "Not exists." });
  }
});

router.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.render("index", { status: 402 });
  }

  const oldUser = await User.findOne({ _id: id });
  if (oldUser) {
    const secret = process.env.SECRET_KEY + oldUser.password;
    try {
      const verify = jwt.verify(token, secret);
      if (password.length <= 5) {
        return res.render("index", { status: 429 });
      } else {
        const salt = await bcrypt.genSalt(10);
        const n_password = await bcrypt.hash(password, salt);
        await User.updateOne(
          {
            _id: id,
          },
          {
            $set: {
              password: n_password,
            },
          }
        );
        res.render("index", { status: 201 });
      }
    } catch (err) {
      console.log(err);
      res.status(411).json({});
    }
  } else {
    return res.render("index", { status: 413 });
  }
});

// -------------------------------edit user details and update details ------------------------------

const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false, message: "no token" });
    }
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (error) {
    return res.json(error);
  }
};

router.get("/edituserdata/:id", async (req, res) => {
  try {
    const user = req.user;
    console.log(user, 243);
    const { id } = req.params;
    console.log(req.params);

    const singleData = await User.findById({ _id: id });
    res.status(201).json(singleData);
    console.log(singleData);
  } catch (error) {
    res.status(404).json(error);
  }
});

// -------------------------- edit user profile ----------------------

router.post("/edit_detail/:id", async (req, res) => {
  const { username, dob, mobile_no, gender, address } = req.body;
  const { id } = req.params;
  try {
    const userExist = await User.findOne({ _id: id });
    if (!userExist) {
      return res.status(413).json({});
    } else {
      if (mobile_no.length < 10) {
        return res
          .status(427)
          .json({ error: "mobile number should be 10 digit" });
      } else {
        const n_username = await username;
        const n_dob = await dob;
        const n_mobile_no = await mobile_no;
        const n_gender = await gender;
        const n_address = await address;
        await User.updateOne(
          {
            _id: id,
          },
          {
            $set: {
              username: n_username,
              dob: n_dob,
              mobile_no: n_mobile_no,
              gender: n_gender,
              address: n_address,
            },
          }
        );
        return res.status(201).json({ message: "updated successfully.." });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/profile", Authenticate, async (req, res) => {
  try {
    const pId = req.user;
    console.log(pId, 297);
    const userId = pId.toString();
    const userExist = await User.findOne({ _id: userId });
    res.status(200).json(userExist);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
