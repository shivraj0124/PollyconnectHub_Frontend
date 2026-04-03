import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "./loginImage.png";
import axios from "axios";
import themeHook from "../Context";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { TbHexagonLetterP } from "react-icons/tb";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import { MdOutlinePerson, MdOutlineLock } from "react-icons/md";

function New_login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { setUserDetails, setToken, theme } = themeHook();
  const navigate = useNavigate();
  const VITE_BACKEND_API = import.meta.env.VITE_BACKEND_API;

  const inputCls = `w-full rounded-xl border px-4 py-3 text-sm font-medium outline-none transition-all duration-200
    focus:ring-2 focus:ring-emerald-500/40
    ${theme === "dark"
      ? "bg-white/[0.05] border-white/[0.1] text-white placeholder-slate-600 focus:border-emerald-600/50"
      : "bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-emerald-400 shadow-sm"}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await axios.post(`${VITE_BACKEND_API}/api/auth/login`, { username, password });
      if (response.data.data.status) {
        const { existuser, token } = response.data.data;
        setUserDetails(existuser);
        Cookies.set("token", token);
        localStorage.setItem("userDetails", JSON.stringify(existuser));
        setToken(token);
        const routes = { student: "/visit", admin: "/Admin/Dashboard", poc: "/Poc/Dashboard", HOD: "/Hod/Dashboard" };
        navigate(routes[existuser.userType] || "/visit");
      } else {
        toast.error(response.data.data.msg);
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
    setusername(""); setpassword(""); setSubmitting(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        .login-root { font-family: 'Plus Jakarta Sans', sans-serif; }
        .syne { font-family: 'Syne', 'Plus Jakarta Sans', sans-serif; }
        .glow-green { box-shadow: 0 0 22px rgba(34,197,94,0.35); }
        .glow-green:hover { box-shadow: 0 0 34px rgba(34,197,94,0.5); }
      `}</style>

      <div className={`login-root h-screen flex transition-colors duration-300
        ${theme === "dark" ? "bg-[#060d09] text-white" : "bg-[#f5faf6] text-slate-900"}`}>

        {/* ── Left panel: illustration ── */}
        <div className={`hidden md:flex flex-col items-center justify-center w-1/2 relative overflow-hidden border-r
          ${theme === "dark" ? "border-white/[0.07] bg-white/[0.02]" : "border-slate-200 bg-white"}`}>
          {/* Ambient orb */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 bg-emerald-500" />
          </div>
          <img src={loginImage} alt="Login" className="relative z-10 w-[80%] max-w-sm object-contain" />
          <div className="relative z-10 mt-8 text-center px-10">
            <p className={`syne text-2xl font-700 mb-2 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
              Welcome back
            </p>
            <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
              Sign in to access your polytechnic project dashboard and connect with your community.
            </p>
          </div>
        </div>

        {/* ── Right panel: form ── */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-sm"
          >
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-8">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-900/30">
                <TbHexagonLetterP size={24} className="text-white" />
              </div>
              <span className="syne text-xl tracking-tight">
                <span className={theme === "dark" ? "text-white" : "text-slate-900"}>Poly</span>
                <span className="text-emerald-500">Connect</span>
                <span className={theme === "dark" ? "text-white" : "text-slate-900"}>Hub</span>
              </span>
            </div>

            <h1 className={`syne text-3xl font-700 mb-1 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
              Sign in
            </h1>
            <p className={`text-sm mb-8 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
              Enter your credentials to continue
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Username */}
              <div className="relative">
                <MdOutlinePerson size={17} className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none
                  ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`} />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  required
                  className={`${inputCls} pl-10`}
                />
              </div>

              {/* Password */}
              <div className="relative">
                <MdOutlineLock size={17} className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none
                  ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`} />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  required
                  className={`${inputCls} pl-10 pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className={`absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors
                    ${theme === "dark" ? "text-slate-500 hover:text-black" : "text-slate-400 hover:text-slate-700"}`}
                >
                  {showPass ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="group w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-all duration-200 mt-2 glow-green"
              >
                {submitting ? "Signing in…" : "Sign In"}
                {!submitting && (
                  <HiArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                )}
              </button>
            </form>

            {/* Footer */}
            <p className={`text-center text-sm mt-6 ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
              Don't have an account?{" "}
              <Link to="/SignUp" className="text-emerald-500 font-semibold hover:underline">
                Register
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default New_login;