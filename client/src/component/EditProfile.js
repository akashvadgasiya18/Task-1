import React, { useEffect, useState } from "react";
import "../styles/EditProfile.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";

const EditProfile = () => {
  const navigate = useNavigate("");

  const { id } = useParams("");

  const [values, setValues] = useState({
    username: "",
    dob: "",
    mobile_no: "",
    gender: "",
    address: "",
  });

  const setdata = (e) => {
    const { name, value } = e.target;
    setValues((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, dob, mobile_no, gender, address } = values;
    values.id = id;
    const res2 = await fetch(`http://localhost:8000/edit_detail/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        dob,
        mobile_no,
        gender,
        address,
      }),
    });

    const data2 = await res2.json();
    if (!data2) {
      toast.error("All fields are required.", {
        position: "top-center",
        theme: "colored",
        hideProgressBar: "false",
      });
    } else if (res2.status === 413) {
      toast.error("User Not Exist", {
        position: "top-center",
        theme: "colored",
        hideProgressBar: "false",
      });
    } else if (res2.status === 427) {
      toast.error("Phone number contains only 10 digit.", {
        position: "top-center",
        theme: "colored",
        hideProgressBar: "false",
      });
    } else if (res2.status === 201) {
      setValues(data2);
      toast.success("Data Updated successfully...");
      navigate("/profilePage");
    }
  };

  const getDatas = async (e) => {
    const res = await fetch(`http://localhost:8000/edituserdata/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 404 || !data) {
      console.log("error");
    } else {
      setValues(data);
    }
  };

  useEffect(() => {
    getDatas();
  }, []);

  return (
    <>
      <Navbar />
      <div className="edit-container">
        <div className="form-container">
          <h2 className="edit-title">Update Details</h2>

          <form method="post" action="" className="register-form">
            <div className="input-wrapper">
              <input
                type="text"
                name="username"
                className="input-field"
                placeholder={values.username}
                onChange={setdata}
                value={values.username}
              />
              <i class="fa-solid fa-user"></i>
            </div>

            <div className="input-wrapper">
              <input
                type="email"
                name="email"
                // onChange={handleChange}
                className="input-field"
                placeholder={values.email}
                value={values.email}
              />
              <i class="fa-solid fa-envelope"></i>
            </div>
            <p
              style={{ textAlign: "left", color: "red", marginBottom: "10px" }}
            >
              <b>[ Email can't be modified..]</b>
            </p>

            <div className="input-wrapper">
              <input
                type="text"
                name="dob"
                onChange={setdata}
                className="input-field"
                placeholder={values.dob}
                value={values.dob}
              />
              <i class="fa-solid fa-calendar-days"></i>
            </div>

            <div className="input-wrapper">
              <input
                type="text"
                name="mobile_no"
                onChange={setdata}
                className="input-field"
                placeholder={values.mobile_no}
                value={values.mobile_no}
              />
              <i class="fa-solid fa-phone"></i>
            </div>
            <div className="input-wrapper">
              <input
                type="text"
                name="gender"
                onChange={setdata}
                className="input-field"
                placeholder={values.gender}
                value={values.gender}
              />
              <i class="fa-solid fa-user"></i>
            </div>

            <div className="input-wrapper">
              <textarea
                cols={42}
                rows={5}
                style={{ borderRadius: "7px", paddingTop: "10px" }}
                name="address"
                placeholder={values.address}
                className="input-field"
                onChange={setdata}
                value={values.address}
              />
              <i class="fa-solid fa-address-card"></i>
            </div>
            <button className="register-btn" onClick={handleSubmit}>
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
