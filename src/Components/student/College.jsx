import React, { useEffect, useState } from "react";
import CollegeCard from "./CollegeCard";
import axios from "axios";
import themeHook from "../Context";
import not_found from "./not_found.png";
import { motion, AnimatePresence } from "framer-motion";
import { HiSearch } from "react-icons/hi";
import { IoSchoolOutline } from "react-icons/io5";

function College() {
  const [collegeData, setcollegeData] = useState([]);
  const [search, setsearch] = useState("");
  const VITE_BACKEND_API = import.meta.env.VITE_BACKEND_API;
  const [loading, setLoading] = useState(true);
  const { userDetails, theme } = themeHook();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${VITE_BACKEND_API}/api/college/search2`, {
        title: search,
        studentId: userDetails?._id,
      });
      setcollegeData(res.data.data.college);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const getdata = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${VITE_BACKEND_API}/api/college/getAllColleges2/${userDetails?._id}`
      );
      setcollegeData(res.data.data.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getdata();
  }, [search === ""]);

  /* ── Skeleton card ── */
  const SkeletonCard = () => (
    <div
      className={`rounded-2xl border p-5 animate-pulse
        ${theme === "dark"
          ? "bg-white/[0.03] border-white/[0.07]"
          : "bg-white border-slate-200"}`}
    >
      <div className={`h-32 rounded-xl mb-4 ${theme === "dark" ? "bg-white/[0.07]" : "bg-slate-100"}`} />
      <div className={`h-4 rounded-full mb-2 w-3/4 ${theme === "dark" ? "bg-white/10" : "bg-slate-200"}`} />
      <div className={`h-3 rounded-full w-1/2 ${theme === "dark" ? "bg-white/[0.07]" : "bg-slate-100"}`} />
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        .college-root { font-family: 'Plus Jakarta Sans', sans-serif; }
        .syne { font-family: 'Syne', 'Plus Jakarta Sans', sans-serif; }
        .college-scroll::-webkit-scrollbar { width: 4px; }
        .college-scroll::-webkit-scrollbar-track { background: transparent; }
        .college-scroll::-webkit-scrollbar-thumb { background: #22c55e44; border-radius: 99px; }
      `}</style>

      <div
        className={`college-root college-scroll w-full flex h-[93vh] overflow-y-auto transition-colors duration-300
          ${theme === "dark" ? "bg-[#060d09] text-white" : "bg-[#f5faf6] text-slate-900"}`}
      >
        <div className="flex flex-col gap-5 p-5 w-full max-w-4xl mx-auto">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            {/* Title */}
            <div className="flex items-center gap-2.5">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
                  ${theme === "dark"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-emerald-100 text-emerald-700"}`}
              >
                <IoSchoolOutline size={18} />
              </div>
              <div>
                <h1 className="syne text-xl font-700 leading-tight">Colleges</h1>
                {!loading && collegeData.length > 0 && (
                  <p className={`text-xs font-medium ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
                    {collegeData.length} college{collegeData.length !== 1 ? "s" : ""} found
                  </p>
                )}
              </div>
            </div>

            {/* Search */}
            <form onSubmit={handleSubmit}>
              <div
                className={`flex items-center gap-2 rounded-xl border px-3.5 py-2.5 transition-all duration-200
                  focus-within:ring-2 focus-within:ring-emerald-500/40
                  ${theme === "dark"
                    ? "bg-white/[0.04] border-white/[0.08] focus-within:border-emerald-600/50"
                    : "bg-white border-slate-200 focus-within:border-emerald-400 shadow-sm"}`}
              >
                <HiSearch
                  size={15}
                  className={theme === "dark" ? "text-slate-500 flex-shrink-0" : "text-slate-400 flex-shrink-0"}
                />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setsearch(e.target.value)}
                  className={`bg-transparent text-sm font-medium outline-none w-44 sm:w-56
                    ${theme === "dark"
                      ? "text-white placeholder-slate-600"
                      : "text-slate-800 placeholder-slate-400"}`}
                  placeholder="Search colleges…"
                />
              </div>
            </form>
          </motion.div>

          {/* ── Content ── */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="skeletons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 min-[550px]:grid-cols-2 gap-4"
              >
                {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
              </motion.div>

            ) : collegeData.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className={`flex flex-col items-center justify-center py-20 rounded-2xl border
                  ${theme === "dark"
                    ? "bg-white/[0.02] border-white/[0.07]"
                    : "bg-white border-slate-200 shadow-sm"}`}
              >
                <img src={not_found} className="w-28 h-28 mb-4 opacity-60" alt="not found" />
                <p className={`font-bold text-base mb-1 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                  No Colleges Found
                </p>
                <p className={`text-sm ${theme === "dark" ? "text-slate-600" : "text-slate-400"}`}>
                  Try a different search term
                </p>
              </motion.div>

            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 min-[550px]:grid-cols-2 gap-4"
              >
                {collegeData.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <CollegeCard data={item} call={getdata} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </>
  );
}

export default College;