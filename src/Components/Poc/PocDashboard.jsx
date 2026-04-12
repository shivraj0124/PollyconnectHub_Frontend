import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { LiaUserEditSolid } from "react-icons/lia";
import { BsBuildings } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import {
  MdOutlineEmail, MdOutlinePhone, MdOutlineSchool,
  MdOutlineEdit, MdOutlineClose, MdOutlineBadge,
} from "react-icons/md";
import { TbActivityHeartbeat } from "react-icons/tb";
import themeHook from "../Context";
import { toast } from "react-hot-toast";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

/* ── Reusable Field ── */
const Field = ({ label, isDark, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className={`text-[11px] font-bold uppercase tracking-wider ${isDark ? "text-slate-500" : "text-slate-400"}`}>
      {label}
    </label>
    {children}
  </div>
);

const inputCls = (isDark) =>
  `w-full rounded-xl border px-3.5 py-2.5 text-sm font-medium outline-none transition-all duration-200
   focus:ring-2 focus:ring-emerald-500/40
   ${isDark
    ? "bg-white/[0.05] border-white/[0.1] text-white placeholder-slate-600 focus:border-emerald-600/50"
    : "bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-emerald-400 shadow-sm"}`;

function PocDashboard() {
  const [data, setData]       = useState();
  const [open, setOpen]       = useState(false);
  const { userDetails, setUserDetails, theme } = themeHook();
  const isDark = theme === "dark";
  const [formData, setFormData] = useState({ username: "", email: "", mobileNo: "" });
  const VITE_BACKEND_API = import.meta.env.VITE_BACKEND_API;

  const getAllCounts = async () => {
    try {
      const result = await axios.post(`${VITE_BACKEND_API}/api/poc/pocDashboardDetails`, {
        poc_id: userDetails._id,
        college_id: userDetails.College,
      });
      setData(result.data);
      setFormData({
        username: result.data?.pocData[0]?.username || "",
        email:    result.data?.pocData[0]?.email    || "",
        mobileNo: result.data?.pocData[0]?.mobileNo || "",
      });
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to fetch data");
    }
  };

  const getSinglePoc = async () => {
    try {
      const result2 = await axios.post(`${VITE_BACKEND_API}/api/poc/getonepoc`, { poc: userDetails._id });
      setUserDetails(result2?.data?.data?.data[0]);
      localStorage.setItem("userDetails", JSON.stringify(result2?.data?.data?.data[0]));
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to fetch data");
    }
  };

  useEffect(() => { getAllCounts(); getSinglePoc(); }, []);

  const handleUpdate = async () => {
    try {
      await axios.put(`${VITE_BACKEND_API}/api/poc/updateP/${userDetails._id}`, formData);
      toast.success("Profile updated successfully!");
      getAllCounts(); getSinglePoc();
      setOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to update profile");
    }
  };

  const poc = data?.pocData?.[0];

  const stats = [
    { count: data?.totalDepartments || 0, label: "Departments", icon: BsBuildings,      color: "#22c55e", bg: isDark ? "rgba(34,197,94,0.12)" : "rgba(34,197,94,0.1)" },
    { count: data?.totalHod         || 0, label: "HODs",        icon: LiaUserEditSolid, color: "#a855f7", bg: isDark ? "rgba(168,85,247,0.12)" : "rgba(168,85,247,0.1)" },
  ];

  const infoFields = [
    { icon: MdOutlineBadge,  label: "Username", value: poc?.username },
    { icon: MdOutlinePhone,  label: "Mobile",   value: poc?.mobileNo },
    { icon: MdOutlineEmail,  label: "Email",    value: poc?.email    },
    { icon: MdOutlineSchool, label: "College",  value: poc?.College?.name },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        .poc-dash { font-family: 'Plus Jakarta Sans', sans-serif; }
        .syne     { font-family: 'Syne', 'Plus Jakarta Sans', sans-serif; }
        .poc-dash *::-webkit-scrollbar       { width: 4px; }
        .poc-dash *::-webkit-scrollbar-track { background: transparent; }
        .poc-dash *::-webkit-scrollbar-thumb { background: #22c55e44; border-radius: 99px; }
      `}</style>

      <div className={`poc-dash flex flex-col w-full h-[93vh] overflow-y-auto p-5 gap-6 transition-colors duration-300
        ${isDark ? "bg-[#060d09] text-white" : "bg-[#f5faf6] text-slate-900"}`}>

        {/* ── Page header ── */}
        <div className="flex-shrink-0 flex items-center gap-2.5">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center
            ${isDark ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-700"}`}>
            <TbActivityHeartbeat size={18} />
          </div>
          <div>
            <h1 className={`syne text-xl font-700 leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>Dashboard</h1>
            <p className={`text-xs font-medium ${isDark ? "text-slate-500" : "text-slate-400"}`}>POC overview</p>
          </div>
        </div>

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`relative rounded-2xl border p-5 overflow-hidden
                ${isDark ? "bg-white/[0.03] border-white/[0.07]" : "bg-white border-slate-200 shadow-sm"}`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[40px] opacity-30 pointer-events-none"
                style={{ background: item.color, transform: "translate(30%, -30%)" }} />
              <div className="relative z-10 flex items-start justify-between gap-3">
                <div>
                  <p className={`text-xs font-bold uppercase tracking-widest mb-2
                    ${isDark ? "text-slate-500" : "text-slate-400"}`}>{item.label}</p>
                  <h2 className="text-4xl font-black tracking-tight" style={{ color: item.color }}>
                    <CountUp delay={0.5} end={item.count} duration={2} />
                  </h2>
                </div>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: item.bg, color: item.color }}>
                  <item.icon size={22} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Profile card ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className={`rounded-2xl border overflow-hidden
            ${isDark ? "bg-white/[0.03] border-white/[0.07]" : "bg-white border-slate-200 shadow-sm"}`}
        >
          {/* Card header */}
          <div className={`flex items-center justify-between px-5 py-4 border-b
            ${isDark ? "border-white/[0.07]" : "border-slate-100"}`}>
            <div className="flex items-center gap-2">
              <FaUserCircle size={20} className="text-emerald-500" />
              <h2 className={`syne text-base font-700 ${isDark ? "text-white" : "text-slate-900"}`}>Profile</h2>
            </div>
            <button
              onClick={() => setOpen(true)}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all
                ${isDark
                  ? "bg-emerald-600/20 border-emerald-700/50 text-emerald-400 hover:bg-emerald-600/30"
                  : "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"}`}>
              <MdOutlineEdit size={13} /> Edit
            </button>
          </div>

          {/* Info fields */}
          <div className="p-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative flex-shrink-0">
                <FaUserCircle size={52} className="text-emerald-500" />
                <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white dark:border-[#060d09]" />
              </div>
              <div>
                <h3 className={`syne text-xl font-700 ${isDark ? "text-white" : "text-slate-900"}`}>{poc?.username}</h3>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full
                  ${isDark ? "bg-emerald-900/40 text-emerald-400 border border-emerald-800/40" : "bg-emerald-100 text-emerald-700 border border-emerald-200"}`}>
                  Point of Contact
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {infoFields.map(({ icon: Icon, label, value }) =>
                value ? (
                  <div key={label}
                    className={`flex items-start gap-3 rounded-xl px-3.5 py-3 border
                      ${isDark ? "bg-white/[0.03] border-white/[0.07]" : "bg-slate-50 border-slate-100"}`}>
                    <Icon size={15} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className={`text-[10px] font-bold uppercase tracking-wider mb-0.5
                        ${isDark ? "text-slate-500" : "text-slate-400"}`}>{label}</p>
                      <p className={`text-sm font-semibold truncate ${isDark ? "text-white" : "text-slate-800"}`}>{value}</p>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Edit Profile Modal ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 14 }}
              transition={{ duration: 0.22 }}
              className={`w-full max-w-md rounded-2xl border overflow-hidden
                ${isDark ? "bg-[#0a1510] border-white/[0.1]" : "bg-white border-slate-200 shadow-2xl"}`}
            >
              {/* Modal header */}
              <div className={`flex items-center justify-between px-5 py-4 border-b
                ${isDark ? "border-white/[0.07]" : "border-slate-100"}`}>
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center
                    ${isDark ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-700"}`}>
                    <MdOutlineEdit size={15} />
                  </div>
                  <h3 className={`font-bold text-base ${isDark ? "text-white" : "text-slate-900"}`}>Edit Profile</h3>
                </div>
                <button onClick={() => setOpen(false)}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all
                    ${isDark ? "bg-white/[0.05] text-slate-400 hover:bg-white/[0.1]" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
                  <MdOutlineClose size={16} />
                </button>
              </div>

              {/* Modal body */}
              <div className="p-5 flex flex-col gap-4">
                <Field label="Username" isDark={isDark}>
                  <input type="text" value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className={inputCls(isDark)} placeholder="Your username" />
                </Field>
                <Field label="Email" isDark={isDark}>
                  <input type="email" value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputCls(isDark)} placeholder="you@email.com" />
                </Field>
                <Field label="Mobile No." isDark={isDark}>
                  <input type="tel" value={formData.mobileNo}
                    onChange={(e) => setFormData({ ...formData, mobileNo: e.target.value })}
                    className={inputCls(isDark)} placeholder="10-digit number" />
                </Field>

                <div className="flex gap-3 pt-2">
                  <button onClick={handleUpdate}
                    className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all"
                    style={{ boxShadow: "0 0 16px rgba(34,197,94,0.25)" }}>
                    Save Changes
                  </button>
                  <button onClick={() => setOpen(false)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all
                      ${isDark ? "bg-white/[0.04] border-white/[0.1] text-slate-300 hover:bg-white/[0.08]" : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"}`}>
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default PocDashboard;