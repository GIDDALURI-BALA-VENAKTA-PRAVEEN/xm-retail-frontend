import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AdminLogin from "../Admin/AdminLogin";
import App from "../../App";
import CardDetails from "../Cards/CardDetails";
import DashBoard from "../Admin/DashBoard";
import Home from '../Login/Home';
import Login from "../Login/Login";
import Profile from "../Profile/Profile";

function Routess() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}  />

        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        
        <Route path="/card/:id" element={<CardDetails />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<DashBoard />} />
      </Routes>
    </Router>
  );
}

export default Routess;