import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import bannerimg from "./CollegeBanner.jpg";
import photo from "./not_found.png";
import { motion, AnimatePresence } from "framer-motion";
import themeHook from "../Context";
import {
  MdOutlineLocationOn,
  MdOutlineSchool,
  MdOutlineOpenInNew,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { GoProjectSymlink } from "react-icons/go";
import { LuSchool } from "react-icons/lu";
import { HiArrowLeft } from "react-icons/hi";

function OneCollege() {
  const [collegedata, setcollegedata] = useState({});
  const [dpt, setdpt] = useState([]);
  const [project, setproject] = useState([]);
  const { id } = useParams();
  const VITE_BACKEND_API = import.meta.env.VITE_BACKEND_API;
  const [expanded, setExpanded] = useState(false);
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const navigate = useNavigate();
  const { theme } = themeHook();

  const toggleExpand = (index) =>
    setExpandedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );

  useEffect(() => {
    const getdata = async () => {
      const res = await axios.post(`${VITE_BACKEND_API}/api/college/onecollge`, { college: id });
      setcollegedata(res.data.data);
    };
    const getdptdata = async () => {
      const data = await axios.post(`${VITE_BACKEND_API}/api/auth/getDepartment`, { college_id: id });
      setdpt(data.data.data.data);
    };
    const getprojectdata = async () => {
      const data = await axios.post(`${VITE_BACKEND_API}/api/project/getAllProjectsByCollege`, { college_id: id });
      setproject(data.data.data.data);
    };
    getdata();
    getdptdata();
    getprojectdata();
  }, []);

  const EmptyState = ({ label }) => (
    <div className={`flex flex-col items-center justify-center py-10 rounded-2xl border
      ${theme === "dark" ? "bg-white/[0.02] border-white/[0.07]" : "bg-white border-slate-200 shadow-sm"}`}>
      <img src={photo} className="w-20 h-20 opacity-50 mb-3" alt="empty" />
      <p className={`text-sm font-semibold ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>{label}</p>
    </div>
  );

  const SectionHeader = ({ icon: Icon, title, count }) => (
    <div className="flex items-center gap-2 mb-3">
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0
        ${theme === "dark" ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-700"}`}>
        <Icon size={16} />
      </div>
      <h2 className={`syne text-lg font-700 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{title}</h2>
      {count > 0 && (
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full
          ${theme === "dark" ? "bg-emerald-900/40 text-emerald-400 border border-emerald-800/40" : "bg-emerald-100 text-emerald-700 border border-emerald-200"}`}>
          {count}
        </span>
      )}
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        .oc-root { font-family: 'Plus Jakarta Sans', sans-serif; }
        .syne { font-family: 'Syne', 'Plus Jakarta Sans', sans-serif; }
        .oc-scroll::-webkit-scrollbar { width: 4px; }
        .oc-scroll::-webkit-scrollbar-track { background: transparent; }
        .oc-scroll::-webkit-scrollbar-thumb { background: #22c55e44; border-radius: 99px; }
        .col-scroll::-webkit-scrollbar { width: 3px; }
        .col-scroll::-webkit-scrollbar-track { background: transparent; }
        .col-scroll::-webkit-scrollbar-thumb { background: #22c55e33; border-radius: 99px; }
      `}</style>

      <div className={`oc-root oc-scroll w-full flex flex-col h-[93vh] overflow-y-auto transition-colors duration-300
        ${theme === "dark" ? "bg-[#060d09] text-white" : "bg-[#f5faf6] text-slate-900"}`}>
        <div className="flex flex-col gap-5 p-5 max-w-5xl mx-auto w-full">

          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className={`self-start flex items-center gap-1.5 text-sm font-semibold transition-colors
              ${theme === "dark" ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}
          >
            <HiArrowLeft size={16} /> Back
          </button>

          {/* ── College Hero Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className={`rounded-2xl border overflow-hidden
              ${theme === "dark" ? "bg-white/[0.03] border-white/[0.07]" : "bg-white border-slate-200 shadow-sm"}`}
          >
            {/* Banner */}
            <div className="relative">
              <img src={bannerimg} alt="banner" className="h-36 w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              {/* Logo */}
              <div className="absolute -bottom-10 left-6">
                <div className={`w-20 h-20 rounded-2xl border-4 overflow-hidden shadow-lg
                  ${theme === "dark" ? "border-[#060d09]" : "border-white"}`}>
                  <img
                    className="w-full h-full object-cover"
                    src={collegedata?.photo || "https://www.festivalsfromindia.com/wp-content/uploads/2022/04/VJTI-Mumbai.-Photo-VJTI-Mumbai-1_11zon.jpg"}
                    alt="college"
                  />
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="pt-14 px-6 pb-5 flex flex-col gap-3">
              <h1 className={`syne text-2xl font-700 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                {collegedata.name}
              </h1>

              {collegedata.address && (
                <div className={`flex items-center gap-1.5 text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                  <MdOutlineLocationOn size={15} className="text-emerald-500 flex-shrink-0" />
                  {collegedata.address}
                </div>
              )}

              {collegedata.about && (
                <div>
                  <p className={`text-sm leading-relaxed transition-all ${expanded ? "" : "line-clamp-3"}
                    ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                    {collegedata.about}
                  </p>
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="mt-1.5 flex items-center gap-1 text-xs font-bold text-emerald-500 hover:text-emerald-400 transition-colors"
                  >
                    {expanded ? <><MdOutlineKeyboardArrowUp size={15} /> Read less</> : <><MdOutlineKeyboardArrowDown size={15} /> Read more</>}
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* ── Departments + Projects Grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Departments */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              <SectionHeader icon={LuSchool} title="Departments" count={dpt.length} />
              <div className={`col-scroll flex flex-col gap-3 md:max-h-[50vh] md:overflow-y-auto pr-1`}>
                {dpt.length === 0 ? (
                  <EmptyState label="No departments added yet" />
                ) : (
                  dpt.map((item, index) => {
                    const isExp = expandedIndexes.includes(index);
                    return (
                      <div key={index}
                        className={`rounded-2xl border p-4 transition-all duration-200
                          ${theme === "dark"
                            ? "bg-white/[0.03] border-white/[0.07]"
                            : "bg-white border-slate-200 shadow-sm"}`}>
                        <div className="flex items-start gap-3">
                          <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center mt-0.5
                            ${theme === "dark" ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-700"}`}>
                            <MdOutlineSchool size={17} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className={`font-bold text-sm mb-1 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                              {item.name}
                            </h3>
                            <p className={`text-xs leading-relaxed ${isExp ? "" : "line-clamp-2"}
                              ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                              {item.about}
                            </p>
                            {item.about && (
                              <button
                                onClick={() => toggleExpand(index)}
                                className="mt-1 flex items-center gap-0.5 text-[11px] font-bold text-emerald-500 hover:text-emerald-400"
                              >
                                {isExp ? <><MdOutlineKeyboardArrowUp size={13} /> Less</> : <><MdOutlineKeyboardArrowDown size={13} /> More</>}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>

            {/* Projects */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.18 }}
            >
              <SectionHeader icon={GoProjectSymlink} title="Projects" count={project.length} />
              <div className={`col-scroll flex flex-col gap-3 md:max-h-[50vh] md:overflow-y-auto pr-1`}>
                {project.length === 0 ? (
                  <EmptyState label="No projects found" />
                ) : (
                  project.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => navigate(`/project/${item?._id}`)}
                      className={`group rounded-2xl border p-4 cursor-pointer transition-all duration-200
                        ${theme === "dark"
                          ? "bg-white/[0.03] border-white/[0.07] hover:border-emerald-600/40"
                          : "bg-white border-slate-200 hover:border-emerald-400 shadow-sm hover:shadow-md hover:shadow-emerald-100/40"}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center mt-0.5
                          ${theme === "dark" ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-700"}`}>
                          <GoProjectSymlink size={15} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h3 className={`font-bold text-sm truncate ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                              {item.title}
                            </h3>
                            <MdOutlineOpenInNew
                              size={13}
                              className={`flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ${theme === "dark" ? "text-emerald-400" : "text-emerald-600"}`}
                            />
                          </div>
                          <p className={`text-xs leading-relaxed line-clamp-2
                            ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OneCollege;