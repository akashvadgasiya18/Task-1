import React from "react";
import Navbar from "./Navbar";
import "../styles/Home.css";

const Home = () => {
  return (
    <>
      <Navbar />
      <div id="title-body">
        <div className="title-body">
          <div className="title-body-task">
            <h1>#_Task-1</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
