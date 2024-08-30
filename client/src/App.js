import React, { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./component/Register";
import Login from "./component/Login";
import OTPForm from "./component/OTPForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./component/Profile";
import EditProfile from "./component/EditProfile";
// import ResetPassword from "./component/ResetPassword";
import ForgotPass from "./component/ForgotPass";
import PagenotFound from "./component/PagenotFound";
import Home from "./component/Home";
import PublicRoute from "./component/PublicRoute";
import PrivateRoute from "./component/PrivateRoute";

const App = () => {
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("Authdata"));
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route path="/otppage" element={<OTPForm />} />
          <Route
            path="/profilePage"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/forgotpassword"
            element={
              <PublicRoute>
                <ForgotPass />
              </PublicRoute>
            }
          />
          <Route
            path="/editUserDetailsPage/:id"
            element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<PagenotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
