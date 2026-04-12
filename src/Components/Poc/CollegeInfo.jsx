import React, { useEffect, useState } from "react";
import themeHook from "../Context";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdOutlineEdit, MdOutlineClose, MdOutlineLocationOn,
  MdOutlineSchool, MdOutlineCloudUpload,
} from "react-icons/md";
import { LuSchool2 } from "react-icons/lu";
import { HiArrowLeft } from "react-icons/hi";

const inputCls = (isDark) =>
  `w-full rounded-xl border px-3.5 py-2.5 text-sm font-medium outline-none transition-all duration-200
   focus:ring-2 focus:ring-emerald-500/40
   ${isDark
    ? "bg-white/[0.05] border-white/[0.1] text-white placeholder-slate-600 focus:border-emerald-600/50"
    : "bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-emerald-400 shadow-sm"}`;

const Field = ({ label, isDark, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className={`text-[11px] font-bold uppercase tracking-wider ${isDark ? "text-slate-500" : "text-slate-400"}`}>
      {label}
    </label>
    {children}
  </div>
);

function CollegeInfo() {
  const { token, userDetails, theme } = themeHook();
  const isDark = theme === "dark";
  const [loading, setLoading]     = useState(true);
  const [college, setCollege]     = useState();
  const [collegeName, setCollegeName] = useState("");
  const [about, setAbout]         = useState("");
  const [address, setAddress]     = useState("");
  const [photo, setPhoto]         = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [isModelOpen, setIsModelOpen] = useState(false);
  const VITE_BACKEND_API = import.meta.env.VITE_BACKEND_API;

  const getCollege = async () => {
    setLoading(true);
    try {
      const r = await axios.post(`${VITE_BACKEND_API}/api/poc/getOneCollege`, { college_id: userDetails.College });
      setCollege(r.data.data.data[0]);
    } catch (err) { toast.error(err.message); }
    setLoading(false);
  };

  const setbase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => { setPhoto(reader.result); setPhotoPreview(reader.result); };
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setbase(file);
  };

  const openEdit = () => {
    setCollegeName(college?.name || "");
    setAbout(college?.about || "");
    setAddress(college?.address || "");
    setPhotoPreview("");
    setPhoto("");
    setIsModelOpen(true);
  };

  const handleEditCollege = async (e) => {
    e.preventDefault();
    try {
      const r = await axios.post(`${VITE_BACKEND_API}/api/poc/editCollegeInfo`,
        { id: college._id, name: collegeName, about, address, photo, userType: "poc" },
        { headers: { authentication: `Bearer ${token}` } });
      r.data?.data?.status ? toast.success(r.data.data.msg) : toast.error(r.data.data.msg);
      setIsModelOpen(false);
    } catch (err) { toast.error(err.message); }
  };

  useEffect(() => { getCollege(); }, [isModelOpen]);

  const SkeletonLine = ({ w = "100%" }) => (
    <div className={`h-3 rounded-full animate-pulse ${isDark ? "bg-white/[0.07]" : "bg-slate-100"}`} style={{ width: w }} />
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        .ci-root { font-family: 'Plus Jakarta Sans', sans-serif; }
        .syne    { font-family: 'Syne', 'Plus Jakarta Sans', sans-serif; }
        .ci-root *::-webkit-scrollbar       { width: 4px; }
        .ci-root *::-webkit-scrollbar-track { background: transparent; }
        .ci-root *::-webkit-scrollbar-thumb { background: #22c55e44; border-radius: 99px; }
      `}</style>

      <div className={`ci-root flex flex-col h-[93vh] overflow-y-auto p-4 sm:p-5 gap-5 transition-colors duration-300
        ${isDark ? "bg-[#060d09] text-white" : "bg-[#f5faf6] text-slate-900"}`}>

        {/* ── Header ── */}
        <div className="flex-shrink-0 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
              ${isDark ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-700"}`}>
              <LuSchool2 size={18} />
            </div>
            <div>
              <h1 className={`syne text-xl leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>College Information</h1>
              <p className={`text-xs font-medium ${isDark ? "text-slate-500" : "text-slate-400"}`}>Your college profile</p>
            </div>
          </div>
          <button
            onClick={openEdit}
            className={`flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-xl border transition-all
              ${isDark
                ? "bg-emerald-600/20 border-emerald-700/50 text-emerald-400 hover:bg-emerald-600/30"
                : "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"}`}>
            <MdOutlineEdit size={15} /> Edit
          </button>
        </div>

        {/* ── College card ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
          className={`rounded-2xl border overflow-hidden max-w-2xl w-full mx-auto
            ${isDark ? "bg-white/[0.03] border-white/[0.07]" : "bg-white border-slate-200 shadow-sm"}`}
        >
          {/* College photo */}
          {loading ? (
            <div className={`w-full h-52 animate-pulse ${isDark ? "bg-white/[0.07]" : "bg-slate-100"}`} />
          ) : college?.photo ? (
            <div className="relative">
              <img src={college.photo} alt="college" className="w-full h-52 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          ) : (
            <div className={`w-full h-52 flex items-center justify-center ${isDark ? "bg-white/[0.04]" : "bg-slate-100"}`}>
              <LuSchool2 size={48} className={isDark ? "text-slate-600" : "text-slate-300"} />
            </div>
          )}

          {/* Info */}
          <div className="p-6 flex flex-col gap-4">
            {loading ? (
              <div className="flex flex-col gap-3">
                <SkeletonLine w="60%" />
                <SkeletonLine />
                <SkeletonLine w="80%" />
              </div>
            ) : (
              <>
                <h2 className={`syne text-2xl font-700 ${isDark ? "text-white" : "text-slate-900"}`}>
                  {college?.name}
                </h2>

                <div className={`h-px ${isDark ? "bg-white/[0.07]" : "bg-slate-100"}`} />

                <div className="flex flex-col gap-3">
                  {college?.about && (
                    <div className={`flex items-start gap-3 rounded-xl px-4 py-3 border
                      ${isDark ? "bg-white/[0.03] border-white/[0.07]" : "bg-slate-50 border-slate-100"}`}>
                      <MdOutlineSchool size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>About</p>
                        <p className={`text-sm leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>{college.about}</p>
                      </div>
                    </div>
                  )}
                  {college?.address && (
                    <div className={`flex mb-10 items-start gap-3 rounded-xl px-4 py-2 border
                      ${isDark ? "bg-white/[0.03] border-white/[0.07]" : "bg-slate-50 border-slate-100"}`}>
                      <MdOutlineLocationOn size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>Address</p>
                        <p className={`text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>{college.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* ── Edit Modal ── */}
      <AnimatePresence>
        {isModelOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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
              {/* Header */}
              <div className={`flex items-center justify-between px-5 py-4 border-b ${isDark ? "border-white/[0.07]" : "border-slate-100"}`}>
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isDark ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-700"}`}>
                    <MdOutlineEdit size={15} />
                  </div>
                  <h3 className={`font-bold text-base ${isDark ? "text-white" : "text-slate-900"}`}>Edit College Info</h3>
                </div>
                <button onClick={() => setIsModelOpen(false)}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${isDark ? "bg-white/[0.05] text-slate-400 hover:bg-white/[0.1]" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
                  <MdOutlineClose size={16} />
                </button>
              </div>

              {/* Body */}
              <div className={`overflow-y-auto max-h-[75vh] ${isDark ? "" : ""}`}
                style={{ scrollbarWidth: "thin" }}>
                <form onSubmit={handleEditCollege}>
                  <div className="p-5 flex flex-col gap-4">
                    <Field label="College Name" isDark={isDark}>
                      <input type="text" value={collegeName} required
                        onChange={(e) => setCollegeName(e.target.value)} className={inputCls(isDark)} />
                    </Field>
                    <Field label="About" isDark={isDark}>
                      <textarea value={about} required rows={3}
                        onChange={(e) => setAbout(e.target.value)} className={`${inputCls(isDark)} resize-none`} />
                    </Field>
                    <Field label="Address" isDark={isDark}>
                      <input type="text" value={address} required
                        onChange={(e) => setAddress(e.target.value)} className={inputCls(isDark)} />
                    </Field>
                    <Field label="College Photo" isDark={isDark}>
                      <label className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed py-5 cursor-pointer transition-all
                        ${isDark ? "border-white/[0.1] hover:border-emerald-600/50 bg-white/[0.02]" : "border-slate-200 hover:border-emerald-400 bg-slate-50"}`}>
                        {photoPreview ? (
                          <img src={photoPreview} alt="preview" className="w-full h-28 object-cover rounded-lg" />
                        ) : (
                          <>
                            <MdOutlineCloudUpload size={22} className={isDark ? "text-slate-500" : "text-slate-400"} />
                            <span className={`text-xs font-medium ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                              Click to upload photo (optional)
                            </span>
                          </>
                        )}
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                      </label>
                    </Field>

                    <div className="flex gap-3 pt-2">
                      <button type="submit"
                        className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all"
                        style={{ boxShadow: "0 0 16px rgba(34,197,94,0.25)" }}>
                        Save Changes
                      </button>
                      <button type="button" onClick={() => setIsModelOpen(false)}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all
                          ${isDark ? "bg-white/[0.04] border-white/[0.1] text-slate-300 hover:bg-white/[0.08]" : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"}`}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default CollegeInfo;