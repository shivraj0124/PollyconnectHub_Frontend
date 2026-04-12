import React, { useEffect } from "react";
import Navbar from "../Navbar";
import Sidebar from "./Sidebar";
import themeHook from "../Context";
import { Outlet, useNavigate } from "react-router-dom";

function AdminHome() {
  const { userDetails, theme } = themeHook();
  const navigate = useNavigate();

  useEffect(() => {
    if (userDetails?.userType !== "admin") navigate("/");
  }, [userDetails]);

  return (
    <div className={`w-full min-h-screen transition-colors duration-300
      ${theme === "dark" ? "bg-[#060d09] text-white" : "bg-[#f5faf6] text-slate-900"}`}>
      <Navbar />
      <div className="grid grid-cols-1 min-[900px]:grid-cols-[220px_1fr]">
        {/* Sidebar */}
        <div className={`hidden min-[900px]:block border-r h-[93vh] sticky top-[57px]
          ${theme === "dark" ? "border-white/[0.07] bg-[#060d09]" : "border-slate-200 bg-white"}`}>
          <Sidebar />
        </div>
        {/* Content */}
        <div className="min-w-0 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminHome;