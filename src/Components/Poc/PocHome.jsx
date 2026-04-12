import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "./Sidebar";
import themeHook from "../Context";
import { Outlet, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";

function PocHome() {
  const { userDetails, theme } = themeHook();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isDark = theme === "dark";

  useEffect(() => {
    if (userDetails?.userType !== "poc") navigate("/");
  }, [userDetails]);

  /* close sidebar on route change */
  const handleOverlayClick = () => setSidebarOpen(false);

  return (
    <div className={`w-full h-screen flex flex-col overflow-hidden transition-colors duration-300
      ${isDark ? "bg-[#060d09]" : "bg-[#f5faf6]"}`}>

      {/* ── Navbar (with mobile hamburger injected via prop) ── */}
      <div className="flex-shrink-0 relative z-40">
        <Navbar />
        {/* Mobile sidebar toggle — sits on top of navbar row */}
        <button
          onClick={() => setSidebarOpen((p) => !p)}
          className={`min-[900px]:hidden absolute right-16 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl border
            flex items-center justify-center transition-all
            ${isDark
              ? "bg-white/[0.05] border-white/10 text-white hover:bg-white/10"
              : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"}`}
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <HiX size={18} /> : <HiMenu size={18} />}
        </button>
      </div>

      <div className="flex flex-1 min-h-0 relative">

        {/* ── Desktop sidebar ── */}
        <div className={`hidden min-[900px]:flex flex-col w-[220px] flex-shrink-0 border-r h-full
          ${isDark ? "border-white/[0.07] bg-[#060d09]" : "border-slate-200 bg-white"}`}>
          <Sidebar onNavigate={() => {}} />
        </div>

        {/* ── Mobile sidebar overlay ── */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={handleOverlayClick}
                className="min-[900px]:hidden fixed inset-0 z-30"
                style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(3px)" }}
              />

              {/* Drawer */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 28, stiffness: 260 }}
                className={`min-[900px]:hidden fixed top-0 left-0 z-40 w-[260px] h-full border-r
                  ${isDark ? "border-white/[0.07] bg-[#060d09]" : "border-slate-200 bg-white shadow-2xl"}`}
              >
                {/* Close button inside drawer */}
                <div className={`flex items-center justify-end px-4 py-3 border-b
                  ${isDark ? "border-white/[0.07]" : "border-slate-100"}`}>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all
                      ${isDark ? "bg-white/[0.05] text-slate-400 hover:bg-white/10" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
                    <HiX size={16} />
                  </button>
                </div>
                <Sidebar onNavigate={() => setSidebarOpen(false)} />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ── Main content ── */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default PocHome;