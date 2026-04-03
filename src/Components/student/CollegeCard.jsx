import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import themeHook from "../Context";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineSchool, MdOutlineLocationOn } from "react-icons/md";
import { HiArrowRight } from "react-icons/hi";
import { IoCheckmarkCircle } from "react-icons/io5";

function CollegeCard({ data, call }) {
  const navigate = useNavigate();
  const { userDetails, theme } = themeHook();
  const VITE_BACKEND_API = import.meta.env.VITE_BACKEND_API;
  const [showModal, setShowModal] = useState(false);
  const [subLoading, setSubLoading] = useState(false);

  const subscribeToCollege = async () => {
    setSubLoading(true);
    try {
      await axios.post(`${VITE_BACKEND_API}/api/college/subscribe`, {
        studentId: userDetails?._id,
        collegeId: data._id,
      });
      toast.success("Subscribed successfully");
      call();
    } catch (error) {
      console.error("Subscription failed:", error.response?.data || error.message);
      toast.error("Subscription failed");
    }
    setSubLoading(false);
  };

  const unsubscribeFromCollege = async () => {
    setSubLoading(true);
    try {
      const response = await axios.post(`${VITE_BACKEND_API}/api/college/unsubscribe`, {
        studentId: userDetails?._id,
        collegeId: data._id,
      });
      toast.success(response.data.message);
      setShowModal(false);
      call();
    } catch (error) {
      console.error("Unsubscription failed:", error.response?.data || error.message);
      toast.error("Failed to unsubscribe");
    }
    setSubLoading(false);
  };

  const isStudent = userDetails?.userType === "student";

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25 }}
        className={`group relative flex flex-col rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300
          ${theme === "dark"
            ? "bg-white/[0.03] border-white/[0.07] hover:border-emerald-600/40"
            : "bg-white border-slate-200 hover:border-emerald-400 shadow-sm hover:shadow-md hover:shadow-emerald-100/50"}`}
      >
        {/* Subscribed ribbon */}
        {data?.isSubscribed && (
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-600/90 text-white backdrop-blur-sm">
            <IoCheckmarkCircle size={11} /> Following
          </div>
        )}

        {/* Cover image */}
        <div className="relative overflow-hidden h-40" onClick={() => navigate(`/collage/${data._id}`)}>
          <img
            src={data.photo || "https://www.festivalsfromindia.com/wp-content/uploads/2022/04/VJTI-Mumbai.-Photo-VJTI-Mumbai-1_11zon.jpg"}
            alt="college"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Body */}
        <div className="flex flex-col gap-3 p-4 flex-1">
          {/* Name + navigate */}
          <div
            className="flex items-start justify-between gap-2"
            onClick={() => navigate(`/collage/${data._id}`)}
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
                ${theme === "dark" ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-700"}`}>
                <MdOutlineSchool size={16} />
              </div>
              <h2 className={`font-bold text-sm leading-snug truncate
                ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                {data.name}
              </h2>
            </div>
            <HiArrowRight
              size={15}
              className={`flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5
                ${theme === "dark" ? "text-emerald-400" : "text-emerald-600"}`}
            />
          </div>

          {/* About */}
          {data.about && (
            <p
              className={`text-xs leading-relaxed line-clamp-2 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}
              onClick={() => navigate(`/collage/${data._id}`)}
            >
              {data.about}
            </p>
          )}

          {/* Address */}
          {data.address && (
            <div className={`flex items-start gap-1.5 text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
              <MdOutlineLocationOn size={13} className="flex-shrink-0 mt-0.5 text-emerald-500" />
              <span className="line-clamp-1">{data.address}</span>
            </div>
          )}

          {/* Subscribe button */}
          {isStudent && (
            <div className="mt-auto pt-1">
              {!data?.isSubscribed ? (
                <button
                  onClick={subscribeToCollege}
                  disabled={subLoading}
                  className="w-full text-xs font-bold py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all duration-200 disabled:opacity-60"
                  style={{ boxShadow: "0 0 14px rgba(34,197,94,0.25)" }}
                >
                  {subLoading ? "Subscribing…" : "Subscribe"}
                </button>
              ) : (
                <button
                  onClick={() => setShowModal(true)}
                  disabled={subLoading}
                  className={`w-full text-xs font-bold py-2 rounded-xl border transition-all duration-200 disabled:opacity-60
                    ${theme === "dark"
                      ? "bg-white/[0.04] border-white/[0.1] text-slate-300 hover:bg-white/[0.08]"
                      : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200"}`}
                >
                  Unsubscribe
                </button>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* ── Unsubscribe Modal ── */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 12 }}
              transition={{ duration: 0.22 }}
              className={`w-full max-w-sm rounded-2xl border p-6 text-center
                ${theme === "dark"
                  ? "bg-[#0d1a10] border-white/[0.1]"
                  : "bg-white border-slate-200 shadow-2xl"}`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4
                ${theme === "dark" ? "bg-red-900/30 text-red-400" : "bg-red-100 text-red-600"}`}>
                <MdOutlineSchool size={26} />
              </div>

              <h2 className={`font-bold text-lg mb-2 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                Unsubscribe?
              </h2>
              <p className={`text-sm mb-6 leading-relaxed ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                Are you sure you want to unsubscribe from{" "}
                <span className="font-bold text-emerald-500">{data?.name}</span>?
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all
                    ${theme === "dark"
                      ? "bg-white/[0.04] border-white/[0.1] text-white hover:bg-white/[0.08]"
                      : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"}`}
                >
                  Cancel
                </button>
                <button
                  onClick={unsubscribeFromCollege}
                  disabled={subLoading}
                  className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-red-600 hover:bg-red-500 text-white transition-all disabled:opacity-60"
                >
                  {subLoading ? "…" : "Yes, Unsubscribe"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default CollegeCard;