import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { BiHome, BiUserCircle } from "react-icons/bi";
import { IoSchoolOutline } from "react-icons/io5";
import { GoProjectSymlink } from "react-icons/go";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import themeHook from "../Context";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { TbHexagonLetterP } from "react-icons/tb";

function Sidebar({ data }) {
  const {
    sidebarvalue,
    setsidebarvalue,
    userDetails,
    token,
    setToken,
    setUserDetails,
    loadingMain,
    setLoadingMain,
    theme,
  } = themeHook();

  const navigate = useNavigate();

  const handleItemClick = (e) => {
    const value = e.currentTarget.querySelector(".nav-label")?.textContent.trim();
    if (value) setsidebarvalue(value);
  };

  const handleLogOut = async () => {
    setLoadingMain(true);
    try {
      setUserDetails(null);
      localStorage.removeItem("userDetails");
      localStorage.removeItem("userType");
      if (token) {
        Cookies.remove("token");
        setToken("");
      }
      toast.success("Logout Successfully");
      window.location.reload();
    } catch (err) {
      toast.error("Something went wrong!");
    }
    setLoadingMain(false);
  };

  const navItems = [
    { label: "My Home", to: "/visit",           icon: BiHome,          show: true },
    { label: "College",  to: "/college",          icon: IoSchoolOutline, show: true },
    { label: "Projects", to: "/StudentProjects",  icon: GoProjectSymlink,show: userDetails?.userType === "student" },
    { label: "Profile",  to: "/profile",           icon: BiUserCircle,   show: userDetails?.userType === "student" },
  ];

  const isActive = (label) => sidebarvalue === label;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        .sidebar-root { font-family: 'Plus Jakarta Sans', sans-serif; }
        .syne { font-family: 'Syne', 'Plus Jakarta Sans', sans-serif; }
        .nav-glow { box-shadow: 0 0 18px rgba(34,197,94,0.25); }
        .logout-btn:hover { box-shadow: 0 0 14px rgba(239,68,68,0.3); }
      `}</style>

      <div
        className={`sidebar-root flex flex-col h-[93vh] max-sm:hidden w-full justify-between transition-colors border-r   duration-300
          ${theme === "dark" ? "bg-[#060d09] border-white/[0.07]" : "bg-[#f5faf6] border-slate-200"}`}
      >
        {/* ── Logo strip ── */}
        <div>
          {/* <div
            className={`flex items-center gap-2.5 px-5 py-5 border-b
              ${theme === "dark" ? "border-white/[0.07]" : "border-slate-200"}`}
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-900/30 flex-shrink-0">
              <TbHexagonLetterP size={18} className="text-white" />
            </div>
            <span className="syne text-base tracking-tight max-md:hidden">
              <span className={theme === "dark" ? "text-white" : "text-slate-900"}>Poly</span>
              <span className="text-emerald-500">Connect</span>
              <span className={theme === "dark" ? "text-white" : "text-slate-900"}>Hub</span>
            </span>
          </div> */}

          {/* ── Nav label ── */}
          <p
            className={`px-5 pt-5 pb-2 text-[10px] font-bold uppercase tracking-widest max-md:hidden
              ${theme === "dark" ? "text-slate-600" : "text-slate-400"}`}
          >
            Navigation
          </p>

          {/* ── Nav items ── */}
          <ul className="flex flex-col max-md:flex-row gap-1 px-3 max-md:px-2 max-md:py-2">
            {navItems.filter((n) => n.show).map(({ label, to, icon: Icon }) => (
              <Link
                key={label}
                to={to}
                onClick={handleItemClick}
                className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 overflow-hidden
                  ${isActive(label)
                    ? theme === "dark"
                      ? "bg-emerald-600/20 text-emerald-400 nav-glow"
                      : "bg-emerald-100 text-emerald-800"
                    : theme === "dark"
                    ? "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
              >
                {/* Active left bar */}
                {isActive(label) && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-emerald-500" />
                )}

                {/* Icon container */}
                <span
                  className={`flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0 transition-all duration-200
                    ${isActive(label)
                      ? theme === "dark"
                        ? "bg-emerald-500/25 text-emerald-400"
                        : "bg-emerald-200 text-emerald-700"
                      : theme === "dark"
                      ? "bg-white/[0.06] text-slate-400 group-hover:bg-white/10 group-hover:text-white"
                      : "bg-slate-200/70 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-700"
                    }`}
                >
                  <Icon size={17} />
                </span>

                <span className="nav-label max-md:hidden">{label}</span>
              </Link>
            ))}
          </ul>
        </div>

        {/* ── User card ── */}
        {userDetails && (
          <div className="px-3 pb-5">
            <div
              className={`rounded-2xl p-4 border transition-colors duration-300
                ${theme === "dark"
                  ? "bg-white/[0.03] border-white/[0.07]"
                  : "bg-white border-slate-200 shadow-sm"}`}
            >
              {/* Avatar + info */}
              <div className="flex items-center gap-3 mb-3">
                <div className="relative flex-shrink-0">
                  <FaUserCircle
                    size={38}
                    className={theme === "dark" ? "text-emerald-500" : "text-emerald-600"}
                  />
                  {/* Online dot */}
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#060d09]" />
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className={`font-bold text-sm leading-tight truncate cursor-pointer hover:text-emerald-500 transition-colors
                      ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                    onClick={() => navigate("/Profile")}
                  >
                    {userDetails?.username}
                  </p>
                  <p
                    className={`text-[11px] truncate mt-0.5 ${
                      theme === "dark" ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    {userDetails?.email}
                  </p>
                </div>
              </div>

              {/* Role badge */}
              <div className="mb-3">
                <span
                  className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full
                    ${theme === "dark"
                      ? "bg-emerald-900/40 text-emerald-400 border border-emerald-700/40"
                      : "bg-emerald-100 text-emerald-700 border border-emerald-200"}`}
                >
                  {userDetails?.userType || "Member"}
                </span>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogOut}
                className={`logout-btn group w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-200
                  ${theme === "dark"
                    ? "bg-red-900/20 border-red-800/40 text-red-400 hover:bg-red-900/30 hover:border-red-700/60"
                    : "bg-red-50 border-red-200 text-red-600 hover:bg-red-100 hover:border-red-300"}`}
              >
                <HiArrowRightOnRectangle size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Sidebar;