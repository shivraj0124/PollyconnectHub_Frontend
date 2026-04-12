import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { LiaUserEditSolid } from "react-icons/lia";
import { BsBuildings } from "react-icons/bs";
import { LuSchool2 } from "react-icons/lu";
import { TbHexagonLetterP } from "react-icons/tb";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import themeHook from "../Context";

function Sidebar({ onNavigate }) {
  const { userDetails, setUserDetails, token, setToken, theme } = themeHook();
  const [active, setActive] = useState("Dashboard");
  const navigate = useNavigate();
  const isDark = theme === "dark";

  const handleLogOut = () => {
    setUserDetails(null);
    localStorage.removeItem("userDetails");
    if (token) { Cookies.remove("token"); setToken(""); }
    toast.success("Logout Successfully");
    navigate("/");
  };

  const navItems = [
    { label: "Dashboard",           to: "/POC/Dashboard",         icon: RxDashboard      },
    { label: "Departments Details", to: "/POC/DepartmentDetails", icon: BsBuildings      },
    { label: "Hod Details",         to: "/POC/HodDetails",        icon: LiaUserEditSolid },
    { label: "College Details",     to: "/POC/CollegeInfo",       icon: LuSchool2        },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        .poc-sb { font-family: 'Plus Jakarta Sans', sans-serif; }
        .syne   { font-family: 'Syne', 'Plus Jakarta Sans', sans-serif; }
      `}</style>

      <div className={`poc-sb flex flex-col h-full w-full justify-between transition-colors duration-300
        ${isDark ? "bg-[#060d09]" : "bg-white"}`}>

        {/* Top */}
        <div>
          

          {/* Section label */}
          <p className={`px-5 pt-5 pb-2 text-[10px] font-bold uppercase tracking-widest
            ${isDark ? "text-slate-600" : "text-slate-400"}`}>POC Panel</p>

          {/* Nav items */}
          <ul className="flex flex-col gap-1 px-3">
            {navItems.map(({ label, to, icon: Icon }) => {
              const isActive = active === label;
              return (
                <Link
                  key={label}
                  to={to}
                  onClick={() => { setActive(label); onNavigate?.(); }}
                  className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 overflow-hidden
                    ${isActive
                      ? isDark
                        ? "bg-emerald-600/20 text-emerald-400"
                        : "bg-emerald-100 text-emerald-800"
                      : isDark
                      ? "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-emerald-500" />
                  )}
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all
                    ${isActive
                      ? isDark
                        ? "bg-emerald-500/25 text-emerald-400"
                        : "bg-emerald-200 text-emerald-700"
                      : isDark
                      ? "bg-white/[0.06] text-slate-400 group-hover:bg-white/10 group-hover:text-white"
                      : "bg-slate-100 text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-600"}`}>
                    <Icon size={16} />
                  </span>
                  <span className="truncate">{label}</span>
                </Link>
              );
            })}
          </ul>
        </div>

        {/* Bottom: user card */}
        <div className="px-3 pb-5">
          <div className={`rounded-2xl border p-4
            ${isDark ? "bg-white/[0.03] border-white/[0.07]" : "bg-white border-slate-200 shadow-sm"}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="relative flex-shrink-0">
                <FaUserCircle size={36} className="text-emerald-500" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white dark:border-[#060d09]" />
              </div>
              <div className="min-w-0">
                <p className={`font-bold text-sm truncate ${isDark ? "text-white" : "text-slate-900"}`}>
                  {userDetails?.username}
                </p>
                <p className={`text-[11px] truncate ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                  {userDetails?.email}
                </p>
              </div>
            </div>
            <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full mb-3
              ${isDark
                ? "bg-emerald-900/40 text-emerald-400 border border-emerald-800/40"
                : "bg-emerald-100 text-emerald-700 border border-emerald-200"}`}>
              POC
            </span>
            <button
              onClick={handleLogOut}
              className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold border transition-all duration-200
                ${isDark
                  ? "bg-red-900/20 border-red-800/40 text-red-400 hover:bg-red-900/30"
                  : "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"}`}
            >
              <HiArrowRightOnRectangle size={14} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;