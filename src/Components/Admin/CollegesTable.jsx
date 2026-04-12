import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import themeHook from "../Context";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiSearch, HiPencil, HiTrash,
  HiChevronLeft, HiChevronRight,
} from "react-icons/hi";
import { MdOutlineSchool, MdOutlineAdd, MdOutlineClose } from "react-icons/md";

const inputCls = (isDark) =>
  `w-full rounded-xl border px-3.5 py-2.5 text-sm font-medium outline-none transition-all duration-200
   focus:ring-2 focus:ring-emerald-500/40
   ${isDark
    ? "bg-white/[0.05] border-white/[0.1] text-white placeholder-slate-600 focus:border-emerald-600/50"
    : "bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-emerald-400 shadow-sm"}`;

const Field = ({ label, isDark, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className={`text-[11px] font-bold uppercase tracking-wider
      ${isDark ? "text-slate-500" : "text-slate-400"}`}>
      {label}
    </label>
    {children}
  </div>
);

const Modal = ({ title, onClose, onSubmit, isDark, children, submitLabel = "Submit", submitColor = "emerald", icon: Icon }) => (
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
      <div className={`flex items-center justify-between px-5 py-4 border-b
        ${isDark ? "border-white/[0.07]" : "border-slate-100"}`}>
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center
              ${isDark ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-700"}`}>
              <Icon size={15} />
            </div>
          )}
          <h3 className={`font-bold text-base ${isDark ? "text-white" : "text-slate-900"}`}>{title}</h3>
        </div>
        <button onClick={onClose}
          className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all
            ${isDark ? "bg-white/[0.05] text-slate-400 hover:bg-white/[0.1]" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
          <MdOutlineClose size={16} />
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <div className="p-5 flex flex-col gap-4">
          {children}
          <div className="flex gap-3 pt-2">
            <button type="submit"
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200
                ${submitColor === "red" ? "bg-red-600 hover:bg-red-500" : "bg-emerald-600 hover:bg-emerald-500"}`}
              style={submitColor === "emerald" ? { boxShadow: "0 0 16px rgba(34,197,94,0.25)" } : {}}>
              {submitLabel}
            </button>
            <button type="button" onClick={onClose}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all duration-200
                ${isDark ? "bg-white/[0.04] border-white/[0.1] text-slate-300 hover:bg-white/[0.08]" : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"}`}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  </motion.div>
);

function CollegesTable() {
  const { token, theme } = themeHook();
  const isDark = theme === "dark";
  const [loading, setLoading]               = useState(true);
  const [page, setPage]                     = useState(0);
  const [rowsPerPage, setRowsPerPage]       = useState(10);
  const [collegeList, setCollegeList]       = useState([]);
  const [collegeListCount, setCollegeListCount] = useState(0);
  const [isModelOpen,  setIsModelOpen]      = useState(false);
  const [isModelOpen2, setIsModelOpen2]     = useState(false);
  const [isModelOpen3, setIsModelOpen3]     = useState(false);
  const [collegeName, setCollegeName]       = useState("");
  const [about, setAbout]                   = useState("");
  const [address, setAddress]               = useState("");
  const [collegeId, setCollegeId]           = useState();
  const [editCollege, setEditCollege]       = useState();
  const VITE_BACKEND_API = import.meta.env.VITE_BACKEND_API;

  const getAllColleges = async () => {
    setLoading(true);
    try {
      const r = await axios.post(`${VITE_BACKEND_API}/api/admin/getAllCollegesAdmin`, { page, rows: rowsPerPage });
      setCollegeList(r.data.data.data);
      setCollegeListCount(r.data.data.totalColleges);
    } catch (err) { toast.error(err.message); }
    setLoading(false);
  };

  const handleSearch = async (val) => {
    setLoading(true);
    try {
      const r = await axios.get(`${VITE_BACKEND_API}/api/admin/searchCollege`, { params: { search: val } });
      setCollegeList(r.data.faculties);
    } catch {}
    setLoading(false);
  };

  const handleAddCollege = async (e) => {
    e.preventDefault();
    try {
      const r = await axios.post(`${VITE_BACKEND_API}/api/admin/addCollege`,
        { name: collegeName, about, address, userType: "admin" },
        { headers: { authentication: `Bearer ${token}` } });
      r.data.data.status ? toast.success(r.data.data.msg) : toast.error(r.data.data.msg);
    } catch (err) { toast.error(err.message); }
    setIsModelOpen(false);
  };

  const handleDeleteCollege = async (e) => {
    e.preventDefault();
    try {
      const r = await axios.post(`${VITE_BACKEND_API}/api/admin/deleteCollege`,
        { college_id: collegeId.id, userType: "admin" },
        { headers: { authentication: `Bearer ${token}` } });
      r.data.data.status ? toast.success(r.data.data.msg) : toast.error(r.data.data.msg);
    } catch (err) { toast.error(err.message); }
    setIsModelOpen2(false);
  };

  const handleEditCollege = async (e) => {
    e.preventDefault();
    try {
      const r = await axios.post(`${VITE_BACKEND_API}/api/admin/editCollege`,
        { id: editCollege.id, name: collegeName, about, address, userType: "admin" },
        { headers: { authentication: `Bearer ${token}` } });
      r.data.data.status ? toast.success(r.data.data.msg) : toast.error(r.data.data.msg);
    } catch (err) { toast.error(err.message); }
    setIsModelOpen3(false);
  };

  useEffect(() => { getAllColleges(); }, [page, rowsPerPage, isModelOpen, isModelOpen2, isModelOpen3]);

  const totalPages = Math.ceil(collegeListCount / rowsPerPage);

  /* thead bg must match card bg exactly so sticky header looks clean */
  const theadBg = isDark ? "bg-[#0d1a10]" : "bg-slate-50";
  const paginBg = isDark ? "bg-[#0d1a10]" : "bg-slate-50";

  const thCls = `px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest whitespace-nowrap
    ${isDark ? "text-slate-500" : "text-slate-400"}`;
  const tdCls = `px-4 py-3.5 text-sm font-medium border-b
    ${isDark ? "border-white/[0.05] text-slate-300" : "border-slate-100 text-slate-700"}`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        .ct-root { font-family: 'Plus Jakarta Sans', sans-serif; }
        .syne    { font-family: 'Syne', 'Plus Jakarta Sans', sans-serif; }
        .ct-root *::-webkit-scrollbar       { width: 4px; height: 4px; }
        .ct-root *::-webkit-scrollbar-track { background: transparent; }
        .ct-root *::-webkit-scrollbar-thumb { background: #22c55e55; border-radius: 99px; }
      `}</style>

      {/*
        KEY LAYOUT STRATEGY
        ───────────────────
        Outer div  → h-[93vh], flex-col, NO overflow (it is the viewport)
        Header row → flex-shrink-0  (fixed height)
        Table card → flex-1 min-h-0 flex-col  (fills remaining height)
          ├─ scroll area → flex-1 min-h-0 overflow-auto  (scrolls both axes)
          └─ pagination  → flex-shrink-0  (always visible at bottom)
      */}
      <div className={`ct-root flex flex-col h-[93vh] p-4 sm:p-5 gap-5 transition-colors duration-300
        ${isDark ? "bg-[#060d09] text-white" : "bg-[#f5faf6] text-slate-900"}`}>

        {/* ── Header ── */}
        <div className="flex-shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
              ${isDark ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-700"}`}>
              <MdOutlineSchool size={18} />
            </div>
            <div>
              <h1 className={`syne text-xl leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>College List</h1>
              <p className={`text-xs font-medium ${isDark ? "text-slate-500" : "text-slate-400"}`}>{collegeListCount} total</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className={`flex items-center gap-2 rounded-xl border px-3 py-2 flex-1 sm:flex-none
              focus-within:ring-2 focus-within:ring-emerald-500/40 transition-all
              ${isDark ? "bg-white/[0.04] border-white/[0.08] focus-within:border-emerald-600/50" : "bg-white border-slate-200 shadow-sm focus-within:border-emerald-400"}`}>
              <HiSearch size={14} className={isDark ? "text-slate-500" : "text-slate-400"} />
              <input type="search" placeholder="Search colleges…" onChange={(e) => handleSearch(e.target.value)}
                className={`bg-transparent text-sm font-medium outline-none w-full sm:w-40
                  ${isDark ? "text-white placeholder-slate-600" : "text-slate-800 placeholder-slate-400"}`} />
            </div>
            <button onClick={() => setIsModelOpen(true)}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white
                text-sm font-bold px-3 sm:px-4 py-2 rounded-xl transition-all flex-shrink-0"
              style={{ boxShadow: "0 0 16px rgba(34,197,94,0.3)" }}>
              <MdOutlineAdd size={17} />
              <span className="hidden sm:inline">Add College</span>
            </button>
          </div>
        </div>

        {/* ── Table card ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className={`flex-1 min-h-0 flex flex-col rounded-2xl border overflow-hidden
            ${isDark ? "bg-white/[0.02] border-white/[0.07]" : "bg-white border-slate-200 shadow-sm"}`}
        >
          {/* scrollable area — both axes */}
          <div className="flex-1 min-h-0 overflow-auto">
            <table className="w-full border-collapse" style={{ minWidth: "580px" }}>
              <thead className={`sticky top-0 z-10 ${theadBg}`}>
                <tr className={`border-b ${isDark ? "border-white/[0.08]" : "border-slate-200"}`}>
                  <th className={`${thCls} w-12`}>#</th>
                  <th className={thCls}>Name</th>
                  {/* <th className={thCls}>About</th> */}
                  {/* <th className={thCls}>Address</th> */}
                  <th className={`${thCls} text-center w-36`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(6)].map((_, i) => (
                    <tr key={i} className={`border-b ${isDark ? "border-white/[0.05]" : "border-slate-100"}`}>
                      {[...Array(5)].map((__, j) => (
                        <td key={j} className="px-4 py-4">
                          <div className={`h-3 rounded-full animate-pulse ${isDark ? "bg-white/[0.07]" : "bg-slate-100"}`}
                            style={{ width: j === 0 ? "24px" : j === 4 ? "84px" : "100%" }} />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : collegeList?.length === 0 ? (
                  <tr>
                    <td colSpan={5} className={`px-4 py-20 text-center text-sm font-semibold
                      ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                      No colleges found
                    </td>
                  </tr>
                ) : (
                  collegeList.map((item, index) => (
                    <tr key={index}
                      className={`transition-colors ${isDark ? "hover:bg-white/[0.03]" : "hover:bg-slate-50/60"}`}>
                      <td className={tdCls}>{page * rowsPerPage + index + 1}</td>
                      <td className={`${tdCls} font-semibold whitespace-nowrap ${isDark ? "text-white" : "text-slate-900"}`}>
                        {item.name}
                      </td>
                      {/* <td className={tdCls}>
                        <span className="line-clamp-2 max-w-[200px] block" style={{ whiteSpace: "normal" }}>
                          {item.about}
                        </span>
                      </td> */}
                      {/* <td className={`${tdCls} whitespace-nowrap`}>{item.address}</td> */}
                      <td className={`${tdCls} text-center`}>
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => { setEditCollege({ id: item._id }); setCollegeName(item.name); setAbout(item.about); setAddress(item.address); setIsModelOpen3(true); }}
                            className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-lg border transition-all
                              ${isDark ? "bg-blue-500/15 border-blue-500/30 text-blue-400 hover:bg-blue-500/25" : "bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100"}`}>
                            <HiPencil size={11} /> Edit
                          </button>
                          <button
                            onClick={() => { setCollegeId({ id: item._id, name: item.name }); setIsModelOpen2(true); }}
                            className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-lg border transition-all
                              ${isDark ? "bg-red-500/15 border-red-500/30 text-red-400 hover:bg-red-500/25" : "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"}`}>
                            <HiTrash size={11} /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* ── Pagination (never scrolls away) ── */}
          <div className={`flex-shrink-0 flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t
            ${isDark ? `border-white/[0.07] ${paginBg}` : `border-slate-100 ${paginBg}`}`}>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium ${isDark ? "text-slate-500" : "text-slate-400"}`}>Rows per page:</span>
              <select value={rowsPerPage} onChange={(e) => { setRowsPerPage(+e.target.value); setPage(0); }}
                className={`text-xs font-bold rounded-lg border px-2 py-1 outline-none cursor-pointer
                  ${isDark ? "bg-white/[0.05] border-white/[0.1] text-white" : "bg-white border-slate-200 text-slate-700"}`}>
                {[10, 25, 50, 100].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs font-medium ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                {collegeListCount === 0 ? "0" : page * rowsPerPage + 1}–{Math.min((page + 1) * rowsPerPage, collegeListCount)} of {collegeListCount}
              </span>
              <div className="flex gap-1">
                <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-all disabled:opacity-40
                    ${isDark ? "bg-white/[0.04] border-white/[0.08] text-white hover:bg-white/[0.08]" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"}`}>
                  <HiChevronLeft size={14} />
                </button>
                <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-all disabled:opacity-40
                    ${isDark ? "bg-white/[0.04] border-white/[0.08] text-white hover:bg-white/[0.08]" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"}`}>
                  <HiChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {isModelOpen && (
          <Modal title="Add College" onClose={() => setIsModelOpen(false)} onSubmit={handleAddCollege}
            isDark={isDark} submitLabel="Add College" icon={MdOutlineSchool}>
            <Field label="College Name" isDark={isDark}>
              <input type="text" placeholder="Enter college name" required onChange={(e) => setCollegeName(e.target.value)} className={inputCls(isDark)} />
            </Field>
            <Field label="About" isDark={isDark}>
              <textarea placeholder="About the college" required rows={3} onChange={(e) => setAbout(e.target.value)} className={`${inputCls(isDark)} resize-none`} />
            </Field>
            <Field label="Address" isDark={isDark}>
              <input type="text" placeholder="Enter college address" required onChange={(e) => setAddress(e.target.value)} className={inputCls(isDark)} />
            </Field>
          </Modal>
        )}
        {isModelOpen2 && (
          <Modal title="Delete College" onClose={() => setIsModelOpen2(false)} onSubmit={handleDeleteCollege}
            isDark={isDark} submitLabel="Yes, Delete" submitColor="red" icon={HiTrash}>
            <div className={`rounded-xl border p-4 text-sm ${isDark ? "bg-red-900/15 border-red-800/30 text-red-300" : "bg-red-50 border-red-200 text-red-700"}`}>
              Are you sure you want to delete <strong>{collegeId?.name}</strong>? This action cannot be undone.
            </div>
          </Modal>
        )}
        {isModelOpen3 && (
          <Modal title="Edit College" onClose={() => setIsModelOpen3(false)} onSubmit={handleEditCollege}
            isDark={isDark} submitLabel="Save Changes" icon={HiPencil}>
            <Field label="College Name" isDark={isDark}>
              <input type="text" value={collegeName} required onChange={(e) => setCollegeName(e.target.value)} className={inputCls(isDark)} />
            </Field>
            <Field label="About" isDark={isDark}>
              <textarea value={about} required rows={3} onChange={(e) => setAbout(e.target.value)} className={`${inputCls(isDark)} resize-none`} />
            </Field>
            <Field label="Address" isDark={isDark}>
              <input type="text" value={address} required onChange={(e) => setAddress(e.target.value)} className={inputCls(isDark)} />
            </Field>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}

export default CollegesTable;