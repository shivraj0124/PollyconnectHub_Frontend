import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdVerifiedUser,
  MdFilterList,
  MdCloudUpload,
  MdEmail,
} from "react-icons/md";
import {
  FaCode,
  FaMicrochip,
  FaBrain,
  FaWifi,
  FaUserCircle,
} from "react-icons/fa";
import { HiArrowRight, HiMenu, HiX } from "react-icons/hi";
import { TbHexagonLetterP } from "react-icons/tb";
import { BiSolidCircle } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Chatbot from "../Components/Chat/ChatBot";
import themeHook from "./Context";

/* ─── Ambient CSS Background ─────────────────────────── */
const AmbientBg = ({ theme }) => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div
      className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-[140px]"
      style={{
        background:
          theme === "dark"
            ? "radial-gradient(ellipse, rgba(34,197,94,0.18) 0%, transparent 70%)"
            : "radial-gradient(ellipse, rgba(34,197,94,0.13) 0%, transparent 70%)",
      }}
    />
    <div
      className="absolute -left-40 top-1/3 w-[400px] h-[400px] rounded-full blur-[100px]"
      style={{
        background:
          theme === "dark" ? "rgba(16,185,129,0.10)" : "rgba(16,185,129,0.07)",
      }}
    />
    <div
      className="absolute -right-40 bottom-0 w-[350px] h-[350px] rounded-full blur-[100px]"
      style={{
        background:
          theme === "dark" ? "rgba(5,150,105,0.12)" : "rgba(5,150,105,0.06)",
      }}
    />
    {/* Dot grid */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `radial-gradient(circle, ${
          theme === "dark" ? "rgba(255,255,255,0.055)" : "rgba(0,0,0,0.045)"
        } 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
      }}
    />
  </div>
);

/* ─── Badge ───────────────────────────────────────────── */
const Badge = ({ theme }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-1.5 rounded-full border tracking-widest uppercase
      ${
        theme === "dark"
          ? "bg-emerald-900/30 border-emerald-700/50 text-emerald-400"
          : "bg-emerald-50 border-emerald-300 text-emerald-700"
      }`}
  >
    <BiSolidCircle size={6} className="animate-pulse text-emerald-400" />
    Open Platform · Free for Students
  </motion.span>
);

/* ─── Stat ─────────────────────────────────────────────── */
const Stat = ({ value, label, theme }) => (
  <div className="text-center px-6 py-6">
    <div
      className={`text-3xl font-black tracking-tight ${
        theme === "dark" ? "text-white" : "text-slate-900"
      }`}
    >
      {value}
    </div>
    <div
      className={`text-xs mt-1 font-semibold uppercase tracking-wider ${
        theme === "dark" ? "text-slate-500" : "text-slate-400"
      }`}
    >
      {label}
    </div>
  </div>
);

/* ─── Feature Card ────────────────────────────────────── */
const FeatureCard = ({ icon: Icon, title, desc, accentColor, theme, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -6 }}
    className={`group relative rounded-2xl p-7 border overflow-hidden transition-all duration-300
      ${
        theme === "dark"
          ? "bg-white/[0.03] border-white/[0.08] hover:border-emerald-500/40"
          : "bg-white border-slate-200 hover:border-emerald-400 shadow-md hover:shadow-emerald-100/60"
      }`}
  >
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{
        background: `radial-gradient(circle at 20% 20%, ${accentColor}18, transparent 60%)`,
      }}
    />
    <div
      className="relative z-10 w-11 h-11 rounded-xl flex items-center justify-center mb-5"
      style={{ background: `${accentColor}22`, color: accentColor }}
    >
      <Icon size={20} />
    </div>
    <h3
      className={`relative z-10 font-bold text-lg mb-2 ${
        theme === "dark" ? "text-white" : "text-slate-900"
      }`}
    >
      {title}
    </h3>
    <p
      className={`relative z-10 text-sm leading-relaxed ${
        theme === "dark" ? "text-slate-400" : "text-slate-500"
      }`}
    >
      {desc}
    </p>
  </motion.div>
);

/* ─── Category Card ───────────────────────────────────── */
const CategoryCard = ({ icon: Icon, label, sub, color, theme, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.92 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
    whileHover={{ y: -8 }}
    className={`group relative rounded-2xl p-7 border cursor-pointer overflow-hidden transition-all duration-300
      ${
        theme === "dark"
          ? "bg-white/[0.03] border-white/[0.08] hover:border-white/20"
          : "bg-white border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md"
      }`}
  >
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{
        background: `radial-gradient(circle at 30% 30%, ${color}20, transparent 65%)`,
      }}
    />
    <div
      className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
      style={{ background: `${color}22`, color }}
    >
      <Icon size={26} />
    </div>
    <h3
      className={`relative z-10 text-xl font-extrabold mb-1 ${
        theme === "dark" ? "text-white" : "text-slate-900"
      }`}
    >
      {label}
    </h3>
    <p
      className={`relative z-10 text-sm ${
        theme === "dark" ? "text-slate-400" : "text-slate-500"
      }`}
    >
      {sub}
    </p>
    {/* <div
      className="relative z-10 mt-4 flex items-center gap-1 text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-300"
      style={{ color }}
    >
      Explore <HiArrowRight size={12} />
    </div> */}
  </motion.div>
);

/* ─── Main Component ──────────────────────────────────── */
function MyHome() {
  const { theme, setTheme, userDetails } = themeHook();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
  };

  const handleGetStarted = () => {
    const ud = JSON.parse(localStorage.getItem("userDetails"));
    navigate(ud ? "/visit" : "/login");
  };

  const profileLink =
    userDetails?.userType === "admin"
      ? "/Admin/Dashboard"
      : userDetails?.userType === "poc"
      ? "/Poc/Dashboard"
      : userDetails?.userType === "HOD"
      ? "/Hod/Dashboard"
      : "/Profile";

  const navLinks = ["Home", "Features", "Categories", "Contact"];

  const features = [
    {
      icon: MdCloudUpload,
      title: "Upload Projects",
      desc: "Showcase your work with rich project pages — images, live demos, and full team credits in minutes.",
      accentColor: "#22c55e",
    },
    {
      icon: MdVerifiedUser,
      title: "HOD Verification",
      desc: "Every submission is reviewed by your department head before going live — quality guaranteed.",
      accentColor: "#10b981",
    },
    {
      icon: MdFilterList,
      title: "Category Filtering",
      desc: "Discover projects by domain — Software, AI, IoT, Hardware, and more with instant filters.",
      accentColor: "#059669",
    },
  ];

  const categories = [
    { icon: FaCode,      label: "Software", sub: "Web, mobile & desktop",       color: "#6366f1" },
    { icon: FaMicrochip, label: "Hardware", sub: "Electronics & mechanical",    color: "#f59e0b" },
    { icon: FaBrain,     label: "AI / ML",  sub: "Machine learning & data",     color: "#22c55e" },
    { icon: FaWifi,      label: "IoT",      sub: "Embedded & connected systems",color: "#3b82f6" },
  ];

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-300 ${
        theme === "dark"
          ? "bg-[#060d09] text-white"
          : "bg-[#f5faf6] text-slate-900"
      }`}
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        .syne { font-family: 'Syne', 'Plus Jakarta Sans', sans-serif; }
        .green-text {
          background: linear-gradient(135deg, #22c55e 0%, #34d399 50%, #6ee7b7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
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
        .glow-green { box-shadow: 0 0 22px rgba(34,197,94,0.35); }
        .glow-green:hover { box-shadow: 0 0 34px rgba(34,197,94,0.5); }
      `}</style>

      {/* ════ NAV ════ */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`w-full sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300
          ${
            theme === "dark"
              ? "bg-[#060d09]/85 border-white/[0.07]"
              : "bg-white/85 border-slate-200"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-900/30">
              <TbHexagonLetterP size={22} className="text-white" />
            </div>
            <span className="syne text-xl tracking-tight">
              <span className={theme === "dark" ? "text-white" : "text-slate-900"}>Poly</span>
              <span className="text-emerald-500">Connect</span>
              <span className={theme === "dark" ? "text-white" : "text-slate-900"}>Hub</span>
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className={`nav-link text-sm font-semibold transition-colors ${
                  theme === "dark"
                    ? "text-slate-300 hover:text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {l}
              </a>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={handleTheme}
              className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-200
                ${
                  theme === "dark"
                    ? "bg-white/[0.05] border-white/10 text-slate-300 hover:bg-white/10"
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
            <div className="hidden md:block">
              {userDetails === null ? (
                <button
                  onClick={() => navigate("/Login")}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold px-5 py-2 rounded-xl transition-all duration-200 glow-green"
                >
                  Login
                </button>
              ) : (
                <Link to={profileLink} className="flex items-center gap-2">
                  <span
                    className={`text-sm font-semibold ${
                      theme === "dark" ? "text-white" : "text-slate-800"
                    }`}
                  >
                    {userDetails?.username}
                  </span>
                  <FaUserCircle size={32} className="text-emerald-500" />
                </Link>
              )}
            </div>

            {/* Hamburger */}
            <button
              className={`md:hidden w-9 h-9 rounded-xl border flex items-center justify-center transition-all
                ${
                  theme === "dark"
                    ? "bg-white/[0.05] border-white/10 text-white"
                    : "bg-slate-100 border-slate-200 text-slate-700"
                }`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <HiX size={18} /> : <HiMenu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className={`md:hidden border-t overflow-hidden ${
                theme === "dark"
                  ? "bg-[#060d09] border-white/[0.07]"
                  : "bg-white border-slate-200"
              }`}
            >
              <div className="px-6 py-5 flex flex-col gap-4">
                {navLinks.map((l) => (
                  <a
                    key={l}
                    href={`#${l.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className={`text-sm font-semibold ${
                      theme === "dark" ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    {l}
                  </a>
                ))}
                <div
                  className={`pt-4 border-t ${
                    theme === "dark" ? "border-white/[0.07]" : "border-slate-200"
                  }`}
                >
                  {userDetails === null ? (
                    <button
                      onClick={() => { navigate("/Login"); setMenuOpen(false); }}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all"
                    >
                      Login
                    </button>
                  ) : (
                    <Link
                      to={profileLink}
                      className="flex items-center gap-2"
                      onClick={() => setMenuOpen(false)}
                    >
                      <FaUserCircle size={28} className="text-emerald-500" />
                      <span
                        className={`font-semibold text-sm ${
                          theme === "dark" ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {userDetails?.username}
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ════ HERO ════ */}
      <section
        id="home"
        className="relative  pt-28 pb-32 text-center overflow-hidden"
      >
        <AmbientBg theme={theme} />
        <div className="relative z-10">
          <div className="mb-7">
            <Badge theme={theme} />
          </div>

          <motion.h1
            className="syne text-5xl md:text-6xl lg:text-7xl font-800 leading-[1.07] tracking-tight mb-6"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className={theme === "dark" ? "text-white" : "text-slate-900"}>
              Connect, Create,
            </span>
            <br />
            <span className="green-text">and Innovate</span>
          </motion.h1>

          <motion.p
            className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 ${
              theme === "dark" ? "text-slate-400" : "text-slate-500"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            A platform for polytechnic students to showcase their projects and
            get verified by HODs — turning academic work into lasting recognition.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <button
              onClick={handleGetStarted}
              className="group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 glow-green"
            >
              Get Started
              <HiArrowRight
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>
            <a
              href="#features"
              className={`flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm border transition-all duration-200
                ${
                  theme === "dark"
                    ? "bg-white/[0.04] border-white/[0.1] text-white hover:bg-white/[0.08]"
                    : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 shadow-sm"
                }`}
            >
              Explore Features
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className={`mt-20 inline-flex divide-x rounded-2xl border overflow-hidden
              ${
                theme === "dark"
                  ? "bg-white/[0.03] border-white/[0.07] divide-white/[0.07]"
                  : "bg-white border-slate-200 divide-slate-200 shadow-sm"
              }`}
          >
            {[["5+", "Colleges"], ["10+", "Projects"], ["100%", "Verified"]].map(
              ([val, lab]) => <Stat key={lab} value={val} label={lab} theme={theme} />
            )}
          </motion.div>
        </div>
      </section>

      {/* ════ FEATURES ════ */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-bold uppercase tracking-widest text-emerald-500 mb-3"
          >
            What we offer
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`syne text-4xl md:text-5xl ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            Built for students.{" "}
            <span className="green-text">Trusted by HODs.</span>
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} theme={theme} delay={i * 0.12} />
          ))}
        </div>
      </section>

      {/* Divider */}
      <div
        className={`max-w-7xl mx-auto px-6 h-px ${
          theme === "dark" ? "bg-white/[0.06]" : "bg-slate-200"
        }`}
      />

      {/* ════ CATEGORIES ════ */}
      <section id="categories" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-bold uppercase tracking-widest text-emerald-500 mb-3"
          >
            Explore by domain
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`syne text-4xl md:text-5xl ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            Project Categories
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((c, i) => (
            <CategoryCard key={c.label} {...c} theme={theme} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* Divider */}
      <div
        className={`max-w-7xl mx-auto px-6 h-px ${
          theme === "dark" ? "bg-white/[0.06]" : "bg-slate-200"
        }`}
      />

      {/* ════ CONTACT ════ */}
      <section id="contact" className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`relative overflow-hidden rounded-3xl border p-12 text-center
            ${
              theme === "dark"
                ? "bg-white/[0.03] border-white/[0.07]"
                : "bg-white border-slate-200 shadow-sm"
            }`}
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[100px] opacity-20 bg-emerald-500 pointer-events-none" />
          <div className="relative z-10">
            <div
              className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6
                ${
                  theme === "dark"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-emerald-100 text-emerald-600"
                }`}
            >
              <MdEmail size={26} />
            </div>
            <h2
              className={`syne text-3xl md:text-4xl mb-4 ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              Let's get in touch
            </h2>
            <p
              className={`text-base max-w-xl mx-auto mb-8 ${
                theme === "dark" ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Want to register your college or learn more about the platform?
              We're here and respond fast.
            </p>
            <a
              href="mailto:polyconnecthub@gmail.com"
              className="inline-flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 glow-green"
            >
              <MdEmail size={18} />
              polyconnecthub@gmail.com
            </a>
          </div>
        </motion.div>
      </section>

      {/* ════ FOOTER ════ */}
      <footer
        className={`border-t ${
          theme === "dark"
            ? "border-white/[0.07] bg-[#060d09]"
            : "border-slate-200 bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center">
              <TbHexagonLetterP size={16} className="text-white" />
            </div>
            <span
              className={`syne text-sm ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              PolyConnectHub
            </span>
          </div>

          <div className="flex items-center gap-6">
            {navLinks.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className={`text-xs font-semibold transition-colors hover:text-emerald-500 ${
                  theme === "dark" ? "text-slate-500" : "text-slate-400"
                }`}
              >
                {l}
              </a>
            ))}
          </div>

          <p
            className={`text-xs ${
              theme === "dark" ? "text-slate-600" : "text-slate-400"
            }`}
          >
            © {new Date().getFullYear()} PolyConnectHub. All rights reserved.
          </p>
        </div>
      </footer>

      {/* ════ CHATBOT ════ */}
      <div className="fixed bottom-5 right-5 z-50">
        <Chatbot />
      </div>
    </div>
  );
}

export default MyHome;
