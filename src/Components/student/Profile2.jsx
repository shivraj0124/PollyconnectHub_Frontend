import React, { useEffect, useState } from "react";
import themeHook from "../Context";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import not_found from "./not_found.png";
import profileBanner from "./profilebanner.jpg";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import {
  MdOutlineEmail,
  MdOutlinePhone,
  MdOutlineSchool,
  MdOutlineAccountTree,
  MdOutlineVerified,
  MdOutlineCancel,
  MdOutlineCalendarToday,
  MdOutlineOpenInNew,
} from "react-icons/md";
import { GoProjectSymlink } from "react-icons/go";
import { TbUser } from "react-icons/tb";
import { HiArrowLeft } from "react-icons/hi";

function PublicProfile() {
  const { userDetails, theme } = themeHook();
  const [pr, setpr] = useState([]);
  const [data2, setData2] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const VITE_BACKEND_API = import.meta.env.VITE_BACKEND_API;

  useEffect(() => {
    const getuserproject = async () => {
      try {
        const { data } = await axios.post(`${VITE_BACKEND_API}/api/auth/viewProjects`, { user: id });
        const response = await axios.post(`${VITE_BACKEND_API}/api/auth/getSingleUser`, { user: id });
        setData2({
          collegeName: response?.data?.data?.allocated_college?.name,
          departmentName: response?.data?.data?.allocated_department?.name,
          userDetails: response?.data?.data,
        });
        setpr(data.data);
      } catch {
        toast.error("Failed to fetch user projects.");
      }
    };
    getuserproject();
  }, [id]);

  const u = data2?.userDetails;

  const infoFields = [
    { icon: TbUser,               label: "Full Name",   value: u?.fullName },
    { icon: MdOutlineEmail,       label: "Email",       value: u?.email },
    { icon: MdOutlinePhone,       label: "Mobile",      value: u?.mobileNo },
    { icon: MdOutlineSchool,      label: "College",     value: data2?.collegeName },
    { icon: MdOutlineAccountTree, label: "Department",  value: data2?.departmentName },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        .pp-root { font-family: 'Plus Jakarta Sans', sans-serif; }
        .syne { font-family: 'Syne', 'Plus Jakarta Sans', sans-serif; }
        .pp-scroll::-webkit-scrollbar { width: 4px; }
        .pp-scroll::-webkit-scrollbar-track { background: transparent; }
        .pp-scroll::-webkit-scrollbar-thumb { background: #22c55e44; border-radius: 99px; }
      `}</style>

      <div className={`pp-root pp-scroll md:h-[93vh] overflow-y-auto transition-colors duration-300
        ${theme === "dark" ? "bg-[#060d09] text-white" : "bg-[#f5faf6] text-slate-900"}`}>

        {/* Banner */}
        {/* <div className="relative">
          <img src={profileBanner} className="h-36 w-full object-cover" alt="banner" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div> */}

        <div className="max-w-6xl mx-auto px-4 mt-10 pb-8">
          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className={`flex items-center gap-1.5 text-sm font-semibold mb-5 transition-colors
              ${theme === "dark" ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}
          >
            <HiArrowLeft size={16} /> Back
          </button>

          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-5 items-start">

            {/* ── Left card ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className={`rounded-2xl border overflow-hidden
                ${theme === "dark" ? "bg-white/[0.03] border-white/[0.07]" : "bg-white border-slate-200 shadow-sm"}`}
            >
              <div className={`flex flex-col items-center pt-6 pb-5 px-5 border-b
                ${theme === "dark" ? "border-white/[0.07]" : "border-slate-100"}`}>
                <FaUserCircle size={72} className="text-emerald-500 mb-3" />
                <h2 className={`syne text-xl font-700 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  {u?.username}
                </h2>
                <span className={`mt-1 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full
                  ${theme === "dark"
                    ? "bg-emerald-900/40 text-emerald-400 border border-emerald-800/40"
                    : "bg-emerald-100 text-emerald-700 border border-emerald-200"}`}>
                  {u?.userType || "Student"}
                </span>
              </div>

              <div className="flex flex-col gap-2 p-4">
                {infoFields.map(({ icon: Icon, label, value }) =>
                  value ? (
                    <div key={label}
                      className={`flex items-start gap-3 rounded-xl px-3.5 py-3 border
                        ${theme === "dark" ? "bg-white/[0.03] border-white/[0.07]" : "bg-slate-50 border-slate-100"}`}>
                      <Icon size={15} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <p className={`text-[10px] font-bold uppercase tracking-wider mb-0.5
                          ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>{label}</p>
                        <p className={`text-sm font-semibold break-words
                          ${theme === "dark" ? "text-white" : "text-slate-800"}`}>{value}</p>
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            </motion.div>

            {/* ── Right: projects ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center
                  ${theme === "dark" ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-700"}`}>
                  <GoProjectSymlink size={17} />
                </div>
                <div>
                  <h2 className={`syne text-xl font-700 leading-tight ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    Projects
                  </h2>
                  {pr.length > 0 && (
                    <p className={`text-xs font-medium ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
                      {pr.length} project{pr.length !== 1 ? "s" : ""}
                    </p>
                  )}
                </div>
              </div>

              {pr.length === 0 ? (
                <div className={`flex flex-col items-center justify-center py-16 rounded-2xl border
                  ${theme === "dark" ? "bg-white/[0.02] border-white/[0.07]" : "bg-white border-slate-200 shadow-sm"}`}>
                  <img src={not_found} className="w-24 h-24 opacity-50 mb-3" alt="empty" />
                  <p className={`font-bold text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                    No Projects Found
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {pr.map((item, index) => (
                    <motion.div key={index}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.06 }}
                      className={`group rounded-2xl border overflow-hidden transition-all duration-200
                        ${theme === "dark"
                          ? "bg-white/[0.03] border-white/[0.07] hover:border-emerald-600/40"
                          : "bg-white border-slate-200 hover:border-emerald-400 shadow-sm hover:shadow-md hover:shadow-emerald-100/40"}`}
                    >
                      <div className="flex flex-col sm:flex-row">
                        <img src={item.multimedia?.[0]} className="sm:w-44 h-40 w-full object-cover flex-shrink-0" alt="project" />
                        <div className="flex flex-col justify-between gap-3 p-4 flex-1">
                          <div>
                            <h3 className={`font-bold text-base mb-1.5 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                              {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
                            </h3>
                            <p className={`text-xs leading-relaxed line-clamp-2 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                              {item.description.charAt(0).toUpperCase() + item.description.slice(1)}
                            </p>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            {item?.isActive === "true" ? (
                              <span className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full
                                ${theme === "dark" ? "bg-emerald-900/40 text-emerald-400 border border-emerald-800/40" : "bg-emerald-100 text-emerald-700 border border-emerald-200"}`}>
                                <MdOutlineVerified size={11} /> Verified
                              </span>
                            ) : (
                              <span className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full
                                ${theme === "dark" ? "bg-red-900/30 text-red-400 border border-red-800/40" : "bg-red-100 text-red-600 border border-red-200"}`}>
                                <MdOutlineCancel size={11} /> Not Verified
                              </span>
                            )}
                            {item.type && (
                              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border
                                ${theme === "dark" ? "bg-white/[0.04] border-white/[0.1] text-slate-300" : "bg-slate-100 border-slate-200 text-slate-600"}`}>
                                {item.type}
                              </span>
                            )}
                            <span className={`flex items-center gap-1 text-[11px] font-medium ml-auto
                              ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
                              <MdOutlineCalendarToday size={11} />
                              {new Date(item.createdAt).toISOString().split("T")[0]}
                            </span>
                            <button
                              onClick={() => navigate(`/project/${item._id}`)}
                              className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border transition-all
                                ${theme === "dark"
                                  ? "bg-emerald-600/20 border-emerald-700/50 text-emerald-400 hover:bg-emerald-600/30"
                                  : "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"}`}>
                              View <MdOutlineOpenInNew size={11} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PublicProfile;