import React, { useEffect, useState } from "react";
import { LuSchool2 } from "react-icons/lu";
import { FiUserCheck } from "react-icons/fi";
import { PiStudent } from "react-icons/pi";
import { LiaUserEditSolid } from "react-icons/lia";
import axios from "axios";
import CountUp from "react-countup";
import Bar from "../Charts/Chart";
import Ap from "../Charts/Ap";
import Select from "react-select";
import themeHook from "../Context";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { TbActivityHeartbeat } from "react-icons/tb";

function Dashboard() {
  const [data, setData] = useState();
  const [clg, setclg] = useState([]);
  const [bdata, setbdata] = useState("");
  const { theme } = themeHook();
  const VITE_BACKEND_API = import.meta.env.VITE_BACKEND_API;
  const isDark = theme === "dark";

  const getTotalCount = async () => {
    try {
      const result = await axios.get(`${VITE_BACKEND_API}/api/admin/getTotalCount`);
      setData(result.data);
    } catch (err) { toast.error(err.message); }
  };

  const getcollege = async () => {
    try {
      const result = await axios.get(`${VITE_BACKEND_API}/api/admin/getcolleges`);
      setclg(result.data.data);
    } catch (err) { toast.error(err.message); }
  };

  const getdata = async (id) => {
    try {
      const { data } = await axios.post(`${VITE_BACKEND_API}/api/college/getcount`, { college_id: id });
      setbdata(data);
    } catch {}
  };

  useEffect(() => { getTotalCount(); getcollege(); }, []);

  const stats = [
    { count: data?.totalCountCollege, label: "Colleges",  icon: LuSchool2,       color: "#22c55e", bg: isDark ? "rgba(34,197,94,0.12)" : "rgba(34,197,94,0.1)" },
    { count: data?.totalCountPoc,     label: "POCs",      icon: FiUserCheck,     color: "#3b82f6", bg: isDark ? "rgba(59,130,246,0.12)" : "rgba(59,130,246,0.1)" },
    { count: data?.totalCountHod,     label: "HODs",      icon: LiaUserEditSolid,color: "#a855f7", bg: isDark ? "rgba(168,85,247,0.12)" : "rgba(168,85,247,0.1)" },
    { count: data?.totalCountStudents,label: "Students",  icon: PiStudent,       color: "#f59e0b", bg: isDark ? "rgba(245,158,11,0.12)" : "rgba(245,158,11,0.1)" },
  ];

  const selectStyles = {
    control: (base) => ({
      ...base,
      background: isDark ? "rgba(255,255,255,0.04)" : "#fff",
      borderColor: isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0",
      borderRadius: "12px",
      padding: "2px 4px",
      boxShadow: "none",
      "&:hover": { borderColor: "#22c55e" },
    }),
    menu: (base) => ({
      ...base,
      background: isDark ? "#0d1a10" : "#fff",
      border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #e2e8f0",
      borderRadius: "12px",
      overflow: "hidden",
    }),
    option: (base, { isFocused }) => ({
      ...base,
      background: isFocused ? (isDark ? "rgba(34,197,94,0.12)" : "rgba(34,197,94,0.08)") : "transparent",
      color: isDark ? "#e2e8f0" : "#1e293b",
      fontSize: "13px",
      fontWeight: 500,
    }),
    singleValue: (base) => ({ ...base, color: isDark ? "#e2e8f0" : "#1e293b", fontSize: "13px", fontWeight: 500 }),
    placeholder: (base) => ({ ...base, color: isDark ? "#475569" : "#94a3b8", fontSize: "13px" }),
    input: (base) => ({ ...base, color: isDark ? "#e2e8f0" : "#1e293b" }),
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        .dash-root { font-family: 'Plus Jakarta Sans', sans-serif; }
        .syne { font-family: 'Syne', 'Plus Jakarta Sans', sans-serif; }
        .dash-scroll::-webkit-scrollbar { width: 4px; }
        .dash-scroll::-webkit-scrollbar-track { background: transparent; }
        .dash-scroll::-webkit-scrollbar-thumb { background: #22c55e44; border-radius: 99px; }
      `}</style>

      <div className={`dash-root dash-scroll flex flex-col w-full h-[93vh] overflow-y-auto p-5 gap-6 transition-colors duration-300
        ${isDark ? "bg-[#060d09] text-white" : "bg-[#f5faf6] text-slate-900"}`}>

        {/* ── Header ── */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center
              ${isDark ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-700"}`}>
              <TbActivityHeartbeat size={18} />
            </div>
            <div>
              <h1 className={`syne text-xl font-700 leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>Dashboard</h1>
              <p className={`text-xs font-medium ${isDark ? "text-slate-500" : "text-slate-400"}`}>Platform overview</p>
            </div>
          </div>
        </div>

        {/* ── Stat Cards ── */}
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
              {/* Icon bg glow */}
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[40px] opacity-30 pointer-events-none"
                style={{ background: item.color, transform: "translate(30%, -30%)" }} />

              <div className="relative z-10 flex items-start justify-between gap-3">
                <div>
                  <p className={`text-xs font-bold uppercase tracking-widest mb-2
                    ${isDark ? "text-slate-500" : "text-slate-400"}`}>{item.label}</p>
                  <h2 className="text-4xl font-black tracking-tight" style={{ color: item.color }}>
                    <CountUp delay={0.5} end={item.count || 0} duration={2} />
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

        {/* ── Charts ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className={`rounded-2xl border p-5
            ${isDark ? "bg-white/[0.03] border-white/[0.07]" : "bg-white border-slate-200 shadow-sm"}`}
        >
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Bar chart */}
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-bold uppercase tracking-widest mb-4
                ${isDark ? "text-slate-500" : "text-slate-400"}`}>Platform Overview</p>
              <Bar
                clg={data?.totalCountCollege}
                poc={data?.totalCountPoc}
                hod={data?.totalCountHod}
              />
            </div>

            {/* Divider */}
            <div className={`hidden lg:block w-px self-stretch ${isDark ? "bg-white/[0.07]" : "bg-slate-100"}`} />

            {/* College breakdown */}
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-bold uppercase tracking-widest mb-4
                ${isDark ? "text-slate-500" : "text-slate-400"}`}>College Breakdown</p>
              <div className="mb-4">
                <Select
                  placeholder="Select a college…"
                  styles={selectStyles}
                  options={clg.map((item) => ({ value: item._id, label: item.name }))}
                  onChange={(opt) => { getdata(opt.value); }}
                />
              </div>
              <Ap
                hod={bdata?.totalCountHod}
                student={bdata?.totalCountStudent}
                project={bdata?.totalcountProject}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default Dashboard;