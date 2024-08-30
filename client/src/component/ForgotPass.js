import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";

const ForgotPass = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/forgot_password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
      }),
    });
    if (response.status === 429) {
      toast.error("All fields are required.", {
        position: "top-center",
        theme: "colored",
        hideProgressBar: "false",
      });
    } else if (response.status === 413) {
      toast.error("User not exists.", {
        position: "top-center",
        theme: "colored",
        hideProgressBar: "false",
      });
    } else if (response.status === 201) {
      // navigate("/login");
      toast.success("Successfully email sent.", {
        position: "top-left",
        theme: "colored",
        hideProgressBar: "false",
      });
    }
  };
  return (
    <>
      <Navbar />
      <div
        className="register-container"
        style={{ maxWidth: "450px", }}
      >
        <div className="form-container">
          <h2 className="form-title" style={{ marginTop: "1rem" }}>
            Forgot Password
          </h2>
          <p
            style={{
              marginTop: "-10px",
              fontSize: "14px",
              marginBottom: "40px",
            }}
          >
            Enter mail address and recieve link for Reset password
          </p>

          <form method="post" action="" className="register-form">
            <div className="input-wrapper">
              <input
                type="email"
                name="email"
                // value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="Enter your email"
              />
            </div>

            <button
              className="register-btn"
              onClick={handleSubmit}
              style={{ marginBottom: "1rem" }}
            >
              SEND
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPass;
