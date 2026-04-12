import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import themeHook from "../Context";
import { Outlet, useNavigate } from "react-router-dom";
import HodSidebar from "./HodSidebar";
import { AnimatePresence, motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { FaArrowRight } from "react-icons/fa6";

function HodHome() {
  const { userDetails, theme } = themeHook();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isDark = theme === "dark";

  useEffect(() => {
    if (userDetails?.userType !== "HOD") navigate("/");
  }, [userDetails]);

  return (
    <div className={`w-full h-screen flex flex-col overflow-hidden transition-colors duration-300
      ${isDark ? "bg-[#060d09]" : "bg-[#f5faf6]"}`}>

      {/* Navbar row with mobile hamburger */}
      <div className="flex-shrink-0 relative z-40">
        <Navbar />
        <button
          onClick={() => setSidebarOpen((p) => !p)}
          className={`min-[900px]:hidden w-max flex absolute right-0 top-24 -translate-y-1/2 
  px-3 py-2 h-9 rounded-l-md
  items-center justify-center gap-2 transition-all
  ${isDark
    ? "bg-white/[0.05] hover:bg-white/10 text-white"
    : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <HiX size={18} /> : <FaArrowRight size={18} />}
          <span>Open Sidebar</span>
        </button>
      </div>

      <div className="flex flex-1 min-h-0 relative">
        {/* Desktop sidebar */}
        <div className={`hidden min-[900px]:flex flex-col w-[220px] flex-shrink-0 border-r h-full
          ${isDark ? "border-white/[0.07] bg-[#060d09]" : "border-slate-200 bg-white"}`}>
          <HodSidebar onNavigate={() => {}} />
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSidebarOpen(false)}
                className="min-[900px]:hidden fixed inset-0 z-30"
                style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(3px)" }}
              />
              <motion.div
                initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 28, stiffness: 260 }}
                className={`min-[900px]:hidden fixed top-0 left-0 z-40 w-[260px] h-full border-r
                  ${isDark ? "border-white/[0.07] bg-[#060d09]" : "border-slate-200 bg-white shadow-2xl"}`}
              >
                <div className={`flex items-center justify-end px-4 py-3  border-b
                  ${isDark ? "border-white/[0.07]" : "border-slate-100"}`}>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all
                      ${isDark ? "bg-white/[0.05] text-slate-400 hover:bg-white/10" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
                    <HiX size={16} />
                  </button>
                </div>
                <HodSidebar onNavigate={() => setSidebarOpen(false)} />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main content */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default HodHome;