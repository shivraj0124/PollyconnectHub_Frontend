import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import themeHook from "../Context";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  MdOutlineVerified,
  MdOutlineCancel,
  MdOutlineCalendarToday,
  MdOutlineSchool,
  MdOutlineAccountTree,
  MdOutlineOpenInNew,
  MdBookmarkBorder,
} from "react-icons/md";
import { FaCode, FaUserCircle } from "react-icons/fa";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function OneProject() {
  const [projectdata, setProjectdata] = useState(null);
  const { token, userDetails, theme } = themeHook();
  const VITE_BACKEND_API = import.meta.env.VITE_BACKEND_API;
  const { id } = useParams();
  const navigate = useNavigate();

  const getProjectdata = async () => {
    const res = await axios.post(
      `${VITE_BACKEND_API}/api/project/getoneproject`,
      { project_id: id }
    );
    setProjectdata(res?.data?.data?.data[0]);
  };

  const save = async () => {
    const { data } = await axios.post(
      `${VITE_BACKEND_API}/api/save/add`,
      { project_id: id, user_id: userDetails._id },
      { headers: { authentication: `Bearer ${token}` } }
    );
    if (data.data.status) toast.success("Saved successfully");
  };

  useEffect(() => {
    getProjectdata();
  }, []);

  const isOwner = userDetails?._id === projectdata?.created_By?._id;
  const profileHref = isOwner
    ? "/profile"
    : `/profile/${projectdata?.created_By?._id}`;

  const MetaChip = ({ icon: Icon, label, value, href, color }) => (
    <div
      className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm
        ${theme === "dark"
          ? "bg-white/[0.03] border-white/[0.07]"
          : "bg-white border-slate-200 shadow-sm"}`}
    >
      <Icon size={15} className={color || "text-emerald-500"} />
      <span className={`font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
        {label}:
      </span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-emerald-500 hover:underline truncate"
        >
          {value}
        </a>
      ) : (
        <span className={`font-semibold truncate ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
          {value}
        </span>
      )}
    </div>
  );

  const Section = ({ title, children }) => (
    <div>
      <h2 className={`text-xs font-bold uppercase tracking-widest mb-2
        ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
        {title}
      </h2>
      {children}
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        .op-root { font-family: 'Plus Jakarta Sans', sans-serif; }
        .syne { font-family: 'Syne', 'Plus Jakarta Sans', sans-serif; }
        .op-scroll::-webkit-scrollbar { width: 4px; }
        .op-scroll::-webkit-scrollbar-track { background: transparent; }
        .op-scroll::-webkit-scrollbar-thumb { background: #22c55e44; border-radius: 99px; }
      `}</style>

      <div className={`op-root op-scroll sm:h-[93vh] overflow-y-auto flex justify-center transition-colors  duration-300
        ${theme === "dark" ? "bg-[#060d09]" : "bg-[#f5faf6]"}`}>
        <div className="w-full max-w-3xl px-4 py-8 ">

          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className={`flex items-center gap-1.5 text-sm font-semibold mb-5 transition-colors
              ${theme === "dark"
                ? "text-slate-400 hover:text-white"
                : "text-slate-500 hover:text-slate-900"}`}
          >
            <HiArrowLeft size={16} /> Back
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`rounded-2xl border  overflow-hidden
              ${theme === "dark"
                ? "bg-white/[0.03] border-white/[0.07]"
                : "bg-white border-slate-200 shadow-sm"}`}
          >
            {/* Hero image */}
            {projectdata?.multimedia && (
              <div className="relative">
                <img
                  src={projectdata.multimedia}
                  alt="Project"
                  className="w-full h-64 sm:h-80 object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Verified badge on image */}
                <div className="absolute bottom-4 left-4">
                  {projectdata?.isActive === "true" ? (
                    <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-600/90 text-white backdrop-blur-sm">
                      <MdOutlineVerified size={13} /> Verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-red-600/90 text-white backdrop-blur-sm">
                      <MdOutlineCancel size={13} /> Not Verified
                    </span>
                  )}
                </div>

                {/* Type badge */}
                {projectdata?.type && (
                  <div className="absolute bottom-4 right-4">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm border
                      ${theme === "dark"
                        ? "bg-white/10 border-white/20 text-white"
                        : "bg-white/80 border-white/60 text-slate-700"}`}>
                      {projectdata.type}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Body */}
            <div className="p-6 flex flex-col gap-6">

              {/* Title + author row */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <h1 className={`syne text-2xl sm:text-3xl font-700 capitalize leading-tight
                  ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  {projectdata?.title}
                </h1>

                <a
                  href={profileHref}
                  className={`flex items-center gap-2 w-max flex-shrink-0 rounded-xl border px-3 py-2 transition-all
                    ${theme === "dark"
                      ? "bg-white/[0.04] border-white/[0.08] hover:border-emerald-600/40"
                      : "bg-slate-50 border-slate-200 hover:border-emerald-300 shadow-sm"}`}
                >
                  <FaUserCircle size={22} className="text-emerald-500" />
                  <div>
                    <p className={`text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
                      Created by
                    </p>
                    <p className={`text-sm font-bold leading-none ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                      {isOwner ? "You" : projectdata?.created_By?.username}
                    </p>
                  </div>
                </a>
              </div>

              {/* Meta chips */}
              <div className="flex flex-wrap gap-2">
                <MetaChip
                  icon={MdOutlineCalendarToday}
                  label="Posted"
                  value={projectdata?.createdAt
                    ? new Date(projectdata.createdAt).toISOString().split("T")[0]
                    : "N/A"}
                />
                {projectdata?.allocated_college?.name && (
                  <MetaChip
                    icon={MdOutlineSchool}
                    label="College"
                    value={projectdata.allocated_college.name}
                  />
                )}
                {projectdata?.allocated_department?.name && (
                  <MetaChip
                    icon={MdOutlineAccountTree}
                    label="Dept"
                    value={projectdata.allocated_department.name}
                  />
                )}
              </div>

              {/* Divider */}
              <div className={`h-px ${theme === "dark" ? "bg-white/[0.07]" : "bg-slate-100"}`} />

              {/* Description */}
              <Section title="Description">
                <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                  {projectdata?.description}
                </p>
              </Section>

              {/* Contributors */}
              {projectdata?.contributers?.length > 0 && (
                <Section title="Contributors">
                  <div className="flex flex-wrap gap-2">
                    {projectdata.contributers.map((item, index) => (
                      <a
                        key={index}
                        href={`/profile/${item?._id}`}
                        className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border transition-all
                          ${theme === "dark"
                            ? "bg-white/[0.04] border-white/[0.08] text-emerald-400 hover:border-emerald-600/40"
                            : "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"}`}
                      >
                        <FaUserCircle size={11} />
                        @{item?.username}
                      </a>
                    ))}
                  </div>
                </Section>
              )}

              {/* Links */}
              <Section title="Links">
                <div className="flex flex-wrap gap-3">
                  {projectdata?.live_demo && (
                    <a
                      href={projectdata.live_demo}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all duration-200"
                      style={{ boxShadow: "0 0 18px rgba(34,197,94,0.3)" }}
                    >
                      <MdOutlineOpenInNew size={15} />
                      Live Demo
                    </a>
                  )}
                  {projectdata?.codeLink && (
                    <a
                      href={projectdata.codeLink}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl border transition-all duration-200
                        ${theme === "dark"
                          ? "bg-white/[0.04] border-white/[0.1] text-white hover:bg-white/[0.08]"
                          : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 shadow-sm"}`}
                    >
                      <FaCode size={13} />
                      Source Code
                    </a>
                  )}
                </div>
              </Section>

              {/* Save button */}
              {/* {userDetails && (
                <button
                  onClick={save}
                  className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl border text-sm font-bold transition-all duration-200
                    ${theme === "dark"
                      ? "bg-white/[0.03] border-white/[0.08] text-slate-300 hover:bg-emerald-600/20 hover:border-emerald-600/40 hover:text-emerald-400"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700"}`}
                >
                  <MdBookmarkBorder size={17} />
                  Save Project
                </button>
              )} */}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default OneProject;