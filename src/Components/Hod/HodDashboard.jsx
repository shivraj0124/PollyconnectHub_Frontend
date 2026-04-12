import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { LiaUserEditSolid } from "react-icons/lia";
import { FaUserCircle } from "react-icons/fa";
import { GoProjectSymlink } from "react-icons/go";
import { MdOutlineVerifiedUser, MdOutlineCancel, MdOutlineEmail, MdOutlinePhone, MdOutlineSchool, MdOutlineAccountTree } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { TbActivityHeartbeat } from "react-icons/tb";
import themeHook from "../Context";
import { toast } from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion";

function HodDashboard() {
  const { userDetails, theme } = themeHook();
  const [data, setData] = useState();
  const isDark = theme === "dark";
  const VITE_BACKEND_API = import.meta.env.VITE_BACKEND_API;

  const getAllCounts = async () => {
    try {
      const result = await axios.post(`${VITE_BACKEND_API}/api/hod/hodDashboardDetails`, {
        department_id: userDetails?.allocated_department,
        college_id: userDetails?.allocated_college,
        hod_id: userDetails?._id,
      });
      setData(result?.data);
    } catch (err) { toast.error(err.message); }
  };

  useEffect(() => { getAllCounts(); }, []);

  const hod = data?.hodData?.[0];

  const stats = [
    { count: data?.totalProjects    ?? 0, label: "Projects",          icon: GoProjectSymlink,      color: "#22c55e", bg: isDark ? "rgba(34,197,94,0.12)"  : "rgba(34,197,94,0.1)"  },
    { count: data?.activeProjects   ?? 0, label: "Verified Projects", icon: MdOutlineVerifiedUser, color: "#3b82f6", bg: isDark ? "rgba(59,130,246,0.12)" : "rgba(59,130,246,0.1)" },
    { count: data?.inActiveProjects ?? 0, label: "Unverified Projects",        icon: MdOutlineCancel,       color: "#ef4444", bg: isDark ? "rgba(239,68,68,0.12)"  : "rgba(239,68,68,0.1)"  },
    { count: data?.students         ?? 0, label: "Students",          icon: FaRegUser,             color: "#a855f7", bg: isDark ? "rgba(168,85,247,0.12)" : "rgba(168,85,247,0.1)" },
  ];

  const infoFields = [
    { icon: MdOutlinePhone,       label: "Mobile",     value: hod?.mobileNo },
    { icon: MdOutlineEmail,       label: "Email",      value: hod?.email },
    { icon: MdOutlineSchool,      label: "College",    value: hod?.allocated_college?.name },
    { icon: MdOutlineAccountTree, label: "Department", value: hod?.allocated_department?.name },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        .hd-dash { font-family: 'Plus Jakarta Sans', sans-serif; }
        .syne    { font-family: 'Syne', 'Plus Jakarta Sans', sans-serif; }
        .hd-dash *::-webkit-scrollbar       { width: 4px; }
        .hd-dash *::-webkit-scrollbar-track { background: transparent; }
        .hd-dash *::-webkit-scrollbar-thumb { background: #22c55e44; border-radius: 99px; }
      `}</style>

      <div className={`hd-dash flex flex-col w-full h-[93vh] overflow-y-auto p-5 gap-6 transition-colors duration-300
        ${isDark ? "bg-[#060d09] text-white" : "bg-[#f5faf6] text-slate-900"}`}>

        {/* ── Page header ── */}
        <div className="flex-shrink-0 flex items-center gap-2.5">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center
            ${isDark ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-700"}`}>
            <TbActivityHeartbeat size={18} />
          </div>
          <div>
            <h1 className={`syne text-xl font-700 leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>Dashboard</h1>
            <p className={`text-xs font-medium ${isDark ? "text-slate-500" : "text-slate-400"}`}>HOD overview</p>
          </div>
        </div>

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`relative rounded-2xl border p-5 overflow-hidden
                ${isDark ? "bg-white/[0.03] border-white/[0.07]" : "bg-white border-slate-200 shadow-sm"}`}
            >
              <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-[40px] opacity-30 pointer-events-none"
                style={{ background: item.color, transform: "translate(30%, -30%)" }} />
              <div className="relative z-10 flex items-start justify-between gap-3">
                <div>
                  <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                    {item.label}
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-black tracking-tight" style={{ color: item.color }}>
                    <CountUp delay={0.5} end={item.count} duration={2} />
                  </h2>
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: item.bg, color: item.color }}>
                  <item.icon size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Profile card ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className={`rounded-2xl border h-max 
            ${isDark ? "bg-white/[0.03] border-white/[0.07]" : "bg-white border-slate-200 shadow-sm"}`}
        >
          {/* Card header */}
          <div className={`flex items-center gap-2 px-5 py-4 border-b ${isDark ? "border-white/[0.07]" : "border-slate-100"}`}>
            <FaUserCircle size={18} className="text-emerald-500" />
            <h2 className={`syne text-base font-700 ${isDark ? "text-white" : "text-slate-900"}`}>Profile</h2>
          </div>

          <div className="p-5">
            {/* Avatar + name + role */}
            <div className="flex items-center gap-3 mb-5">
              <div className="relative flex-shrink-0">
                <FaUserCircle size={52} className="text-emerald-500" />
                <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white dark:border-[#060d09]" />
              </div>
              <div>
                <h3 className={`syne text-xl font-700 ${isDark ? "text-white" : "text-slate-900"}`}>
                  {hod?.username}
                </h3>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full
                  ${isDark ? "bg-emerald-900/40 text-emerald-400 border border-emerald-800/40" : "bg-emerald-100 text-emerald-700 border border-emerald-200"}`}>
                  Head of Department
                </span>
              </div>
            </div>

            {/* Info fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ">
              {infoFields.map(({ icon: Icon, label, value }) =>
                value ? (
                  <div key={label}
                    className={`flex items-start gap-3 rounded-xl px-3.5 py-3 border
                      ${isDark ? "bg-white/[0.03] border-white/[0.07]" : "bg-slate-50 border-slate-100"}`}>
                    <Icon size={15} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className={`text-[10px] font-bold uppercase tracking-wider mb-0.5
                        ${isDark ? "text-slate-500" : "text-slate-400"}`}>{label}</p>
                      <p className={`text-sm font-semibold break-words ${isDark ? "text-white" : "text-slate-800"}`}>{value}</p>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default HodDashboard;