import React, { useState } from "react";
import "../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import i1 from "../assets/reg.avif";
import Navbar from "./Navbar";

const Register = () => {
  const navigate = useNavigate("");
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };

  const [inputdata, setInputdata] = useState({
    username: "",
    email: "",
    password: "",
    dob: "",
    mobile_no: "",
    gender: "",
    address: "",
  });

  // console.log(inputdata);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputdata((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, dob, mobile_no, gender, address } =
      inputdata;

    const response = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        dob,
        mobile_no,
        gender,
        address,
      }),
    });
    const data = await response.json();
    // console.log(data);
    window.localStorage.setItem("Authdata", JSON.stringify(data.userData));
    if (
      !username ||
      !email ||
      !password ||
      !dob ||
      !mobile_no ||
      !gender ||
      !address
    ) {
      toast.error("all the fields required..");
    } else if (!email.includes("@")) {
      toast.error("enter valid email address");
    } else if (password.length < 4) {
      toast.error("password must be more than 4 character");
    } else if (password.length > 8) {
      toast.error("password must be less than 8 character");
    } else if (mobile_no.length !== 10) {
      toast.error("enter valid mobile number");
    } else if (response.status === 413) {
      toast.error("Already exist..");
    } else {
      navigate("/otppage");
    }
  };
  return (
    <>
      <Navbar />
      <div className="register-container">
        <div className="image-container">
          <img src={i1} alt="Placeholder" />
        </div>
        <div className="form-container">
          <h2 className="form-title">Register</h2>

          <form method="post" action="" className="register-form">
            <div className="input-wrapper">
              <input
                type="text"
                name="username"
                className="input-field"
                placeholder="Enter name"
                onChange={handleChange}
                value={inputdata.username}
              />
              <i class="fa-solid fa-user"></i>
            </div>

            <div className="input-wrapper">
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="input-field"
                placeholder="Enter email"
                value={inputdata.email}
              />
              <i class="fa-solid fa-envelope"></i>
            </div>

            <div className="input-wrapper">
              <input
                type={show ? "text" : "password"}
                name="password"
                onChange={handleChange}
                className="input-field"
                placeholder="password"
                value={inputdata.password}
              />
              <span onClick={handleClick}>
                {show ? (
                  <FaEye className="show-btn" />
                ) : (
                  <FaEyeSlash className="show-btn" />
                )}
              </span>
              <i class="fa-solid fa-lock"></i>
            </div>

            <div className="input-wrapper">
              <input
                type="date"
                name="dob"
                onChange={handleChange}
                className="input-field"
                placeholder="Date Of Birth"
                value={inputdata.dob}
              />
              <i class="fa-solid fa-calendar-days"></i>
            </div>

            <div className="input-wrapper">
              <input
                type="text"
                name="mobile_no"
                onChange={handleChange}
                className="input-field"
                placeholder="Enter mobile no"
                value={inputdata.mobile_no}
              />
              <i class="fa-solid fa-phone"></i>
            </div>
            <div className="input-wrapper">
              <input
                type="radio"
                value="Male"
                name="gender"
                onChange={handleChange}
                className="input-radio"
                checked={inputdata.gender === "Male"}
                id="1"
              />
              <label for="1">Male</label>
              <input
                type="radio"
                value="Female"
                name="gender"
                onChange={handleChange}
                className="input-radio"
                checked={inputdata.gender === "Female"}
                id="2"
              />
              <label for="2">Female</label>
              <input
                type="radio"
                value="Other"
                name="gender"
                onChange={handleChange}
                className="input-radio"
                checked={inputdata.gender === "Other"}
                id="3"
              />
              <label for="3">Other</label>
            </div>
            <div className="input-wrapper">
              <textarea
                cols={42}
                rows={5}
                style={{ borderRadius: "7px", paddingTop: "10px" }}
                name="address"
                onChange={handleChange}
                placeholder="Enter Address"
                className="input-field"
                value={inputdata.address}
              />
              <i class="fa-solid fa-address-card"></i>
            </div>
            <button className="register-btn" onClick={handleSubmit}>
              Register
            </button>
            <p className="singup-text">
              Already have Account? <Link to="/login">LogIn</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
