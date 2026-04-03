import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import signUpImage from "./signupImage.png";
import axios from "axios";
import toast from "react-hot-toast";
import themeHook from "./Context";
import { motion } from "framer-motion";
import { TbHexagonLetterP } from "react-icons/tb";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import {
  MdOutlinePerson, MdOutlineLock, MdOutlineEmail, MdOutlinePhone,
  MdOutlineSchool, MdOutlineAccountTree, MdOutlineBadge,
} from "react-icons/md";

function SignUp() {
  const { findForm, setFindForm, theme } = themeHook();
  const [fullName, setFullName]         = useState("");
  const [mobile, setMobile]             = useState("");
  const [email, setEmail]               = useState("");
  const [selectedCollege, setSelectedCollege] = useState("");
  const [userName, setUserName]         = useState("");
  const [password, setPassword]         = useState("");
  const [showPass, setShowPass]         = useState(false);
  const [collegeList, setCollegeList]   = useState([]);
  const [showDept, setShowDept]         = useState(false);
  const [dept, setDept]                 = useState([]);
  const [selectedDep, setSelectedDep]   = useState("");
  const [submitting, setSubmitting]     = useState(false);
  const navigate = useNavigate();
  const VITE_BACKEND_API = import.meta.env.VITE_BACKEND_API;

  const inputCls = `w-full rounded-xl border px-4 py-2.5 text-sm font-medium outline-none transition-all duration-200
    focus:ring-2 focus:ring-emerald-500/40
    ${theme === "dark"
      ? "bg-white/[0.05] border-white/[0.1] text-white placeholder-slate-600 focus:border-emerald-600/50"
      : "bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-emerald-400 shadow-sm"}`;

  const selectCls = `w-full rounded-xl border px-4 py-2.5 text-sm font-medium outline-none transition-all duration-200
    focus:ring-2 focus:ring-emerald-500/40 cursor-pointer
    ${theme === "dark"
      ? "bg-[#0a1510] border-white/[0.1] text-white focus:border-emerald-600/50"
      : "bg-white border-slate-200 text-slate-800 focus:border-emerald-400 shadow-sm"}`;

  // const Field = ({ icon: Icon, label, children, half }) => (
  //   <div className={`flex flex-col gap-1.5 ${half ? "flex-1 min-w-0" : "w-full"}`}>
  //     <label className={`text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5
  //       ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
  //       <Icon size={12} className="text-emerald-500" />{label}
  //     </label>
  //     {children}
  //   </div>
  // );
const Field = ({ icon: Icon, label, children, half }) => (
  <div className={`flex flex-col gap-1.5 ${half ? "flex-1 min-w-0" : "w-full"}`}>
    
    <label
      className={`text-[11px] font-bold uppercase  flex items-center gap-1.5
        ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}
    >
      <Icon size={12} className="text-emerald-500" />
      {label}
    </label>

    {children}
  </div>
);
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!/^[a-zA-Z\s]*$/.test(fullName)) return toast.error("Enter a valid full name");
    if (!/^\d{10}$/.test(mobile)) return toast.error("Enter a valid 10-digit mobile number");
    if (password.length < 8) return toast.error("Password must be at least 8 characters");
    setSubmitting(true);
    try {
      const result = await axios.post(`${VITE_BACKEND_API}/api/auth/signup`, {
        username: userName, password, fullName, email,
        userType: "student", mobileNo: mobile,
        allocated_college: selectedCollege, allocated_department: selectedDep,
      });
      if (result.data.data.status === 200) {
        toast.success(result.data.data.msg);
        navigate("/Login");
      } else {
        toast(result.data.data.msg, { icon: "⚠", iconTheme: { primary: "#facc15", secondary: "#fff" } });
      }
    } catch (err) {
      toast.error(err.message);
    }
    setSubmitting(false);
  };

  useEffect(() => {
    const getAllColleges = async () => {
      try {
        const result = await axios.get(`${VITE_BACKEND_API}/api/college/getAllColleges`);
        setCollegeList(result.data.data.data);
      } catch (err) { toast.error(err.message); }
    };
    getAllColleges();
  }, [findForm]);

  const getdept = async (id) => {
    try {
      const result = await axios.post(`${VITE_BACKEND_API}/api/auth/getDepartment`, { college_id: id });
      setDept(result.data.data.data);
    } catch (err) { toast.error(err.message); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        .signup-root { font-family: 'Plus Jakarta Sans', sans-serif; }
        .syne { font-family: 'Syne', 'Plus Jakarta Sans', sans-serif; }
        .glow-green { box-shadow: 0 0 22px rgba(34,197,94,0.35); }
        .glow-green:hover { box-shadow: 0 0 34px rgba(34,197,94,0.5); }
        .form-scroll::-webkit-scrollbar { width: 3px; }
        .form-scroll::-webkit-scrollbar-track { background: transparent; }
        .form-scroll::-webkit-scrollbar-thumb { background: #22c55e33; border-radius: 99px; }
      `}</style>

      <div className={`signup-root h-screen flex transition-colors duration-300
        ${theme === "dark" ? "bg-[#060d09] text-white" : "bg-[#f5faf6] text-slate-900"}`}>

        {/* ── Left: illustration ── */}
        <div className={`hidden md:flex flex-col items-center justify-center w-[42%] relative overflow-hidden border-r
          ${theme === "dark" ? "border-white/[0.07] bg-white/[0.02]" : "border-slate-200 bg-white"}`}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full blur-[120px] opacity-20 bg-emerald-500" />
          </div>
          <img src={signUpImage} alt="Sign Up" className="relative z-10 w-[75%] max-w-xs object-contain" />
          <div className="relative z-10 mt-6 text-center px-10">
            <p className={`syne text-xl font-700 mb-2 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
              Join the community
            </p>
            <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
              Showcase your polytechnic projects and get them verified by your HOD.
            </p>
          </div>
        </div>

        {/* ── Right: form ── */}
        <div className="flex flex-col justify-center items-center w-full md:w-[58%] px-6 py-6 overflow-y-auto form-scroll">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-6">
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
              Student Registration
            </h1>
            <p className={`text-sm mb-6 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
              Create your account to get started
            </p>

           <form onSubmit={handleOnSubmit} className="flex flex-col gap-4 relative z-50">

  {/* Full Name + Mobile */}
  <div className="flex gap-3">

    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
      <label className={`text-[11px] font-bold uppercase flex items-center gap-1.5 ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
        <MdOutlinePerson size={12} className="text-emerald-500" />
        Full Name
      </label>
      <input
        type="text"
        value={fullName}
        placeholder="Your full name"
        onChange={(e) => setFullName(e.target.value)}
        required
        className={inputCls}
      />
    </div>

    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
      <label className={`text-[11px] font-bold uppercase flex items-center gap-1.5 ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
        <MdOutlinePhone size={12} className="text-emerald-500" />
        Mobile No.
      </label>
      <input
        type="tel"
        value={mobile}
        placeholder="10-digit number"
        onChange={(e) => setMobile(e.target.value)}
        required
        className={inputCls}
      />
    </div>

  </div>

  {/* Email */}
  <div className="flex flex-col gap-1.5">
    <label className={`text-[11px] font-bold uppercase flex items-center gap-1.5 ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
      <MdOutlineEmail size={12} className="text-emerald-500" />
      Email
    </label>
    <input
      type="email"
      value={email}
      placeholder="you@email.com"
      onChange={(e) => setEmail(e.target.value)}
      required
      className={inputCls}
    />
  </div>

  {/* College */}
  <div className="flex flex-col gap-1.5">
    <label className={`text-[11px] font-bold uppercase flex items-center gap-1.5 ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
      <MdOutlineSchool size={12} className="text-emerald-500" />
      College
    </label>
    <select
      value={selectedCollege}
      required
      className={selectCls}
      onChange={(e) => {
        setSelectedCollege(e.target.value);
        setShowDept(true);
        getdept(e.target.value);
      }}
    >
      <option value="">Select your college</option>
      {collegeList.map((item, idx) => (
        <option key={idx} value={item._id}>{item.name}</option>
      ))}
    </select>
  </div>

  {/* Department */}
  {showDept && (
    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.2 }}>
      <div className="flex flex-col gap-1.5">
        <label className={`text-[11px] font-bold uppercase flex items-center gap-1.5 ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
          <MdOutlineAccountTree size={12} className="text-emerald-500" />
          Department
        </label>
        <select
          value={selectedDep}
          className={selectCls}
          onChange={(e) => setSelectedDep(e.target.value)}
        >
          <option value="">Select your department</option>
          {dept.map((item, idx) => (
            <option key={idx} value={item._id}>{item.name}</option>
          ))}
        </select>
      </div>
    </motion.div>
  )}

  {/* Username */}
  <div className="flex flex-col gap-1.5">
    <label className={`text-[11px] font-bold uppercase flex items-center gap-1.5 ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
      <MdOutlineBadge size={12} className="text-emerald-500" />
      Username
    </label>
    <input
      type="text"
      value={userName}
      placeholder="Pick a username"
      onChange={(e) => setUserName(e.target.value)}
      required
      className={inputCls}
    />
  </div>

  {/* Password */}
  <div className="flex flex-col gap-1.5">
    <label className={`text-[11px] font-bold uppercase flex items-center gap-1.5 ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
      <MdOutlineLock size={12} className="text-emerald-500" />
      Password
    </label>
    <div className="relative">
      <input
        type={showPass ? "text" : "password"}
        value={password}
        placeholder="Min. 8 characters"
        onChange={(e) => setPassword(e.target.value)}
        required
        className={`${inputCls} pr-11`}
      />
      <button
        type="button"
        onClick={() => setShowPass(!showPass)}
        className={`absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors
          ${theme === "dark"
            ? "text-green-800 hover:text-green-700"
            : "text-green-800 hover:text-green-700"}`}
      >
        {showPass ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
      </button>
    </div>
  </div>

  {/* Submit */}
  <button
    type="submit"
    disabled={submitting}
    className="group w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-all duration-200 mt-2 glow-green"
  >
    {submitting ? "Creating account…" : "Create Account"}
    {!submitting && <HiArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />}
  </button>

</form>

            <p className={`text-center text-sm mt-5 ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
              Already have an account?{" "}
              <Link to="/Login" onClick={() => setFindForm("Student")}
                className="text-emerald-500 font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default SignUp;