import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import i1 from "../assets/log.avif";
import Navbar from "./Navbar";

const Login = () => {
  const navigate = useNavigate("");
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data1 = await response.json();
    // console.log("logindata", data1);

    window.localStorage.setItem("RToken", JSON.stringify(data1));

    if (!email || !password) {
      toast.error("all the fields required..");
    } else if (!email.includes("@")) {
      toast.error("enter valid email address");
    } else if (response.status === 413) {
      toast.error("Invalid Credential...");
    } else if (response.status === 201) {
      navigate("/profilePage");
      toast.success("Login successfully...");
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
          <h2 className="form-title" style={{ marginTop: "3rem" }}>
            LogIn
          </h2>

          <form method="post" action="" className="register-form">
            <div className="input-wrapper">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="Enter name"
              />
              <i class="fa-solid fa-user"></i>
            </div>

            <div className="input-wrapper">
              <input
                type={show ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="password"
              />
              <span onClick={handleClick}>
                {show ? (
                  <FaEye className="show-btn" style={{ marginTop: "-5px" }} />
                ) : (
                  <FaEyeSlash
                    className="show-btn"
                    style={{ marginTop: "-5px" }}
                  />
                )}
              </span>
              <i class="fa-solid fa-lock"></i>
            </div>

            <button className="register-btn" onClick={handleSubmit}>
              LogIN
            </button>
            <Link to="/forgotpassword">
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Forgot Password
              </p>
            </Link>
            <p className="singup-text">
              Don't have Account? <Link to="/register"> Register Now</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
