import React, { useState } from "react";
import themeHook from "./Context";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi";
import { TbHexagonLetterP } from "react-icons/tb";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const { userDetails, theme, setTheme } = themeHook();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleHashNavigation = (hash) => {
    setMenuOpen(false);
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(hash.replace("#", ""));
        el?.scrollIntoView({ behavior: "smooth" });
      }, 120);
    } else {
      const el = document.getElementById(hash.replace("#", ""));
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const profileLink =
    userDetails?.userType === "admin"
      ? "/Admin/Dashboard"
      : userDetails?.userType === "poc"
      ? "/Poc/Dashboard"
      : userDetails?.userType === "HOD"
      ? "/Hod/Dashboard"
      : "/Profile";

  const navItems = [
    { label: "Home",       action: () => { navigate("/"); setMenuOpen(false); } },
    { label: "Features",   action: () => handleHashNavigation("#features") },
    { label: "Categories", action: () => handleHashNavigation("#categories") },
    { label: "Contact",    action: () => handleHashNavigation("#contact") },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        .navbar-root { font-family: 'Plus Jakarta Sans', sans-serif; }
        .syne { font-family: 'Syne', 'Plus Jakarta Sans', sans-serif; }
        .nav-link { position: relative; padding-bottom: 2px; }
        .nav-link::after {
          content: '';
          display: block;
          height: 2px;
          border-radius: 999px;
          background: #22c55e;
          transform: scaleX(0);
          transition: transform 0.22s ease;
          transform-origin: left;
        }
        .nav-link:hover::after { transform: scaleX(1); }
        .glow-green { box-shadow: 0 0 20px rgba(34,197,94,0.35); }
        .glow-green:hover { box-shadow: 0 0 30px rgba(34,197,94,0.5); }
      `}</style>

      <div className="relative navbar-root w-full">
        {/* ── Main Bar ── */}
        <nav
          className={`flex justify-between items-center px-3 sm:px-6 py-2.5 sm:py-3.5 sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300
            ${
              theme === "dark"
                ? "bg-[#060d09]/90 border-white/[0.07]"
                : "bg-white/90 border-slate-200"
            }`}
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 flex-shrink-0"
            onClick={() => setMenuOpen(false)}
          >
            <div className="w-9 h-9 max-sm:w-7 max-sm:h-7 rounded-xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-900/30">
              <TbHexagonLetterP size={21} className="text-white" />
            </div>
            <span className="syne text-[17px] max-sm:text-sm tracking-tight  sm:block">
              <span className={theme === "dark" ? "text-white" : "text-slate-900"}>
                Poly
              </span>
              <span className="text-emerald-500">Connect</span>
              <span className={theme === "dark" ? "text-white" : "text-slate-900"}>
                Hub
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {navItems.map(({ label, action }) => (
              <button
                key={label}
                onClick={action}
                className={`nav-link text-sm font-semibold transition-colors duration-200
                  ${
                    theme === "dark"
                      ? "text-slate-300 hover:text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={handleTheme}
              className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-200
                ${
                  theme === "dark"
                    ? "bg-white/[0.05] border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
                    : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200"
                }`}
            >
              {theme === "light" ? (
                <MdOutlineDarkMode size={18} />
              ) : (
                <MdOutlineLightMode size={18} />
              )}
            </button>

            {/* Auth — desktop */}
            {userDetails ? (
              <Link to={profileLink} className="hidden md:flex items-center gap-2 group">
                <span
                  className={`text-sm font-semibold transition-colors group-hover:text-emerald-500 ${
                    theme === "dark" ? "text-white" : "text-slate-800"
                  }`}
                >
                  {userDetails.username}
                </span>
                <div className="relative">
                  <FaUserCircle size={32} className="text-emerald-500" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border-2 border-white dark:border-[#060d09]" />
                </div>
              </Link>
            ) : (
              <button
                onClick={() => navigate("/Login")}
                className="hidden md:flex bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold px-5 py-2 rounded-xl transition-all duration-200 glow-green"
              >
                Login
              </button>
            )}

            {/* Hamburger */}
            <button
              className={`md:hidden w-9 h-9 rounded-xl border flex items-center justify-center transition-all
                ${
                  theme === "dark"
                    ? "bg-white/[0.05] border-white/10 text-white hover:bg-white/10"
                    : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                }`}
              onClick={() => setMenuOpen((p) => !p)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <HiX size={18} /> : <HiMenu size={18} />}
            </button>
          </div>
        </nav>

        {/* ── Mobile Menu ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className={`md:hidden absolute top-full left-0 w-full z-40 border-b shadow-xl
                ${
                  theme === "dark"
                    ? "bg-[#060d09] border-white/[0.07]"
                    : "bg-white border-slate-200"
                }`}
            >
              <div className="px-3 sm:px-6 py-4 sm:py-5 flex flex-col gap-1">
                {/* Links */}
                {navItems.map(({ label, action }) => (
                  <button
                    key={label}
                    onClick={action}
                    className={`text-left w-full px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150
                      ${
                        theme === "dark"
                          ? "text-slate-300 hover:bg-white/[0.05] hover:text-white"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                  >
                    {label}
                  </button>
                ))}

                {/* Divider */}
                <div
                  className={`my-3 h-px ${
                    theme === "dark" ? "bg-white/[0.07]" : "bg-slate-200"
                  }`}
                />

                {/* Auth */}
                {userDetails ? (
                  <Link
                    to={profileLink}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150
                      ${
                        theme === "dark"
                          ? "hover:bg-white/[0.05]"
                          : "hover:bg-slate-100"
                      }`}
                  >
                    <div className="relative flex-shrink-0">
                      <FaUserCircle size={30} className="text-emerald-500" />
                      <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border-2 border-white dark:border-[#060d09]" />
                    </div>
                    <div>
                      <p
                        className={`text-sm font-bold ${
                          theme === "dark" ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {userDetails.username}
                      </p>
                      <p
                        className={`text-[11px] capitalize ${
                          theme === "dark" ? "text-slate-500" : "text-slate-400"
                        }`}
                      >
                        {userDetails.userType}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      navigate("/Login");
                      setMenuOpen(false);
                    }}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200 glow-green"
                  >
                    Login
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default Navbar;