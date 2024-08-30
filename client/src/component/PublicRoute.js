import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("RToken");
  return !token ? children : <Navigate to="/profilepage" />;
};

export default PublicRoute;
