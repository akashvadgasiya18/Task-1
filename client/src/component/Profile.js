import React, { useEffect, useState } from "react";
import "../styles/Profile.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Profile = () => {
  const localData = JSON.parse(localStorage?.getItem("Authdata"));
  // console.log({ localData });

  const { _id } = localData;
  // console.log(_id);

  const token = JSON.parse(localStorage.getItem("RToken"));
  console.log("RTOKEN - ", token);

  const [values, setValues] = useState("");

  // const { id } = useParams("");
  // console.log(id);

  const navigate = useNavigate("");
  const getDatas = async (e) => {
    const res = await fetch("http://localhost:8000/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    console.log(res, 30);
    const data = await res.json();
    console.log(data);

    if (res.status === 404 || !data) {
      console.log("error");
    } else {
      setValues(data);
      console.log("Get data");
    }
  };

  useEffect(() => {
    getDatas();
  }, []);
  return (
    <>
      <Navbar />
      <div class="pro-container">
        <div class="title">Profile</div>
        <div class="content">
          <form action="#">
            <div class="user-details">
              <div class="input-box">
                <input type="" value={values.username} />
              </div>
              <div class="input-box">
                <input type="" value={values.email} />
              </div>

              <div class="input-box">
                <input type="text" value={values.password} />
              </div>
              <div class="input-box">
                <input type="text" value={values.mobile_no} />
              </div>
              <div class="input-box">
                <input type="" placeholder="Enter DOB" value={values.dob} />
              </div>
              <div class="input-box">
                <input
                  type="text"
                  placeholder="Enter DOB"
                  value={values.gender}
                />
              </div>
              <div class="input-box">
                <textarea
                  name=""
                  id=""
                  cols={42}
                  value={values.address}
                  rows={3}
                  style={{ borderRadius: "7px" }}
                ></textarea>
              </div>
            </div>

            <Link to={`/editUserDetailsPage/${_id}`}>
              <button className="profile-btn" type="submit">
                Edit Details
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
