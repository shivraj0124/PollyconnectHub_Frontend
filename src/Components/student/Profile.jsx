import React, { useEffect, useState } from "react";
import themeHook from "../Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import not_found from "./not_found.png";
import profileBanner from "./profilebanner.jpg";
import Cookies from "js-cookie";
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
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { GoProjectSymlink } from "react-icons/go";
import { TbUser } from "react-icons/tb";

function Profile() {
  const { userDetails, setLoadingMain, setUserDetails, setToken, theme } = themeHook();
  const [pr, setpr] = useState([]);
  const [data2, setData2] = useState();
  const navigate = useNavigate();
  const VITE_BACKEND_API = import.meta.env.VITE_BACKEND_API;

  const getuserproject = async () => {
    try {
      const { data } = await axios.post(`${VITE_BACKEND_API}/api/auth/getuprojects`, {
        user: userDetails._id,
      });
      const response = await axios.post(`${VITE_BACKEND_API}/api/auth/getSingleUser`, {
        user: userDetails._id,
      });
      setData2({
        collegeName: response?.data?.data?.allocated_college?.name,
        departmentName: response?.data?.data?.allocated_department?.name,
      });
      setpr(data.data);
    } catch (error) {}
  };

  const handleLogOut = async () => {
    setLoadingMain(true);
    try {
      setUserDetails(null);
      localStorage.removeItem("userDetails");
      localStorage.removeItem("userType");
      const token = Cookies.get("token");
      if (token) { Cookies.remove("token"); setToken(""); }
      toast.success("Logout Successfully");
      window.location.reload();
    } catch (err) {
      toast.error(err.message || "An error occurred");
    }
    setLoadingMain(false);
  };

  useEffect(() => { getuserproject(); }, []);

  const infoFields = [
    { icon: TbUser,             label: "Full Name",   value: userDetails?.fullName },
    { icon: MdOutlineEmail,     label: "Email",       value: userDetails?.email },
    { icon: MdOutlinePhone,     label: "Mobile",      value: userDetails?.mobileNo },
    { icon: MdOutlineSchool,    label: "College",     value: data2?.collegeName },
    { icon: MdOutlineAccountTree, label: "Department", value: data2?.departmentName },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        .profile-root { font-family: 'Plus Jakarta Sans', sans-serif; }
        .syne { font-family: 'Syne', 'Plus Jakarta Sans', sans-serif; }
        .prof-scroll::-webkit-scrollbar { width: 4px; }
        .prof-scroll::-webkit-scrollbar-track { background: transparent; }
        .prof-scroll::-webkit-scrollbar-thumb { background: #22c55e44; border-radius: 99px; }
      `}</style>

      <div className={`profile-root prof-scroll md:h-[93vh] overflow-y-auto transition-colors duration-300
        ${theme === "dark" ? "bg-[#060d09] text-white" : "bg-[#f5faf6] text-slate-900"}`}>

        {/* Banner */}
        {/* <div className="relative">
          <img src={profileBanner} className="h-28 w-full object-cover" alt="banner" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div> */}

        <div className="max-w-6xl mx-auto px-4 mt-10 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-5 items-start">

            {/* ── Left: Profile Card ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className={`rounded-2xl border overflow-hidden
                ${theme === "dark" ? "bg-white/[0.03] border-white/[0.07]" : "bg-white border-slate-200 shadow-sm"}`}
            >
              {/* Avatar section */}
              <div className={`flex flex-col items-center pt-6 pb-5 px-5 border-b
                ${theme === "dark" ? "border-white/[0.07]" : "border-slate-100"}`}>
                <div className="relative mb-3">
                  <FaUserCircle size={72} className="text-emerald-500" />
                  <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white dark:border-[#060d09]" />
                </div>
                <h2 className={`syne text-xl font-700 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  {userDetails?.username}
                </h2>
                <span className={`mt-1 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full
                  ${theme === "dark"
                    ? "bg-emerald-900/40 text-emerald-400 border border-emerald-800/40"
                    : "bg-emerald-100 text-emerald-700 border border-emerald-200"}`}>
                  {userDetails?.userType || "Student"}
                </span>
              </div>

              {/* Info fields */}
              <div className="flex flex-col gap-2 p-4">
                {infoFields.map(({ icon: Icon, label, value }) => (
                  value ? (
                    <div key={label}
                      className={`flex items-start gap-3 rounded-xl px-3.5 py-3 border
                        ${theme === "dark"
                          ? "bg-white/[0.03] border-white/[0.07]"
                          : "bg-slate-50 border-slate-100"}`}>
                      <Icon size={15} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <p className={`text-[10px] font-bold uppercase tracking-wider mb-0.5
                          ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
                          {label}
                        </p>
                        <p className={`text-sm font-semibold break-words ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
                          {value}
                        </p>
                      </div>
                    </div>
                  ) : null
                ))}

                {/* Logout */}
                <button
                                onClick={handleLogOut}
                                className={`logout-btn  lg:hidden group w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-200
                                  ${theme === "dark"
                                    ? "bg-red-900/20 border-red-800/40 text-red-400 hover:bg-red-900/30 hover:border-red-700/60"
                                    : "bg-red-50 border-red-200 text-red-600 hover:bg-red-100 hover:border-red-300"}`}
                              >
                                <HiArrowRightOnRectangle size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                                Logout
                              </button>
                
              </div>
            </motion.div>

            {/* ── Right: Projects ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              {/* Header */}
              <div className="flex items-center gap-2.5 mb-4">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center
                  ${theme === "dark" ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-700"}`}>
                  <GoProjectSymlink size={17} />
                </div>
                <div>
                  <h2 className={`syne text-xl font-700 leading-tight ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    Your Projects
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
                  <img src={not_found} className="w-24 h-24 opacity-50 mb-3" alt="no projects" />
                  <p className={`font-bold text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                    No Projects Found
                  </p>
                  <p className={`text-xs mt-1 ${theme === "dark" ? "text-slate-600" : "text-slate-400"}`}>
                    Start uploading to showcase your work
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {pr.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.06 }}
                      className={`group rounded-2xl border overflow-hidden transition-all duration-200
                        ${theme === "dark"
                          ? "bg-white/[0.03] border-white/[0.07] hover:border-emerald-600/40"
                          : "bg-white border-slate-200 hover:border-emerald-400 shadow-sm hover:shadow-md hover:shadow-emerald-100/40"}`}
                    >
                      <div className="flex flex-col sm:flex-row gap-0">
                        {/* Thumbnail */}
                        <div className="sm:w-44 sm:flex-shrink-0">
                          <img
                            src={item.multimedia?.[0]}
                            className="w-full sm:w-44 h-40 object-cover"
                            alt="project"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex flex-col justify-between gap-3 p-4 flex-1">
                          <div>
                            <h3 className={`font-bold text-base mb-1.5 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                              {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
                            </h3>
                            <p className={`text-xs leading-relaxed line-clamp-2 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                              {item.description.charAt(0).toUpperCase() + item.description.slice(1)}
                            </p>
                          </div>

                          {/* Tags row */}
                          <div className="flex flex-wrap items-center gap-2">
                            {/* Verified */}
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

                            {/* Type */}
                            {item.type && (
                              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border
                                ${theme === "dark" ? "bg-white/[0.04] border-white/[0.1] text-slate-300" : "bg-slate-100 border-slate-200 text-slate-600"}`}>
                                {item.type}
                              </span>
                            )}

                            {/* Date */}
                            <span className={`flex items-center gap-1 text-[11px] font-medium ml-auto
                              ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
                              <MdOutlineCalendarToday size={11} />
                              {new Date(item.createdAt).toISOString().split("T")[0]}
                            </span>

                            {/* View */}
                            <button
                              onClick={() => navigate(`/project/${item._id}`)}
                              className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border transition-all
                                ${theme === "dark"
                                  ? "bg-emerald-600/20 border-emerald-700/50 text-emerald-400 hover:bg-emerald-600/30"
                                  : "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"}`}
                            >
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

export default Profile;