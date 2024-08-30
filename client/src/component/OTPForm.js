import React, { useState } from "react";
import i1 from "../assets/otp.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const OTPForm = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate("");

  const verification = async (e) => {
    e.preventDefault();

    const localData = JSON.parse(localStorage?.getItem("Authdata"));

    const { email } = localData;

    const verifyUser = { email: email, otp: otp };

    const response = await fetch("http://localhost:8000/verifyOTP", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(verifyUser),
    });
    const datas = await response.json();
    console.log(datas, 31);

    if (!otp) {
      toast.error("all the fields required..");
    } else if (response.status === 412) {
      toast.error("Invalid OTP...");
    } else if (response.status === 201) {
      navigate("/login");
      toast.success("Verify successfully...");
      toast.success("Register successfully...");
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
            Email Verification
          </h2>
          <p style={{ marginTop: "-15px", marginBottom: "20px" }}>
            Verify OTP which is send in your email address.
          </p>
          <form action="" method="post" className="register-form">
            <div className="input-wrapper">
              <input
                type="text"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                style={{ marginTop: "20px" }}
                className="input-field"
              />
            </div>
            <button className="register-btn" onClick={verification}>
              Verify
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default OTPForm;
