import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import themeHook from "../Context";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiSearch, HiPencil, HiTrash,
  HiChevronLeft, HiChevronRight,
} from "react-icons/hi";
import { FiUserCheck } from "react-icons/fi";
import { MdOutlineAdd, MdOutlineClose } from "react-icons/md";

const inputCls = (isDark) =>
  `w-full rounded-xl border px-3.5 py-2.5 text-sm font-medium outline-none transition-all duration-200
   focus:ring-2 focus:ring-emerald-500/40
   ${isDark
    ? "bg-white/[0.05] border-white/[0.1] text-white placeholder-slate-600 focus:border-emerald-600/50"
    : "bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-emerald-400 shadow-sm"}`;

const selectCls = (isDark) =>
  `w-full rounded-xl border px-3.5 py-2.5 text-sm font-medium outline-none transition-all duration-200 cursor-pointer
   focus:ring-2 focus:ring-emerald-500/40
   ${isDark
    ? "bg-[#0a1510] border-white/[0.1] text-white focus:border-emerald-600/50"
    : "bg-white border-slate-200 text-slate-800 focus:border-emerald-400 shadow-sm"}`;

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

function PocTable() {
  const { token, theme } = themeHook();
  const isDark = theme === "dark";
  const [loading, setLoading]           = useState(true);
  const [page, setPage]                 = useState(0);
  const [rowsPerPage, setRowsPerPage]   = useState(10);
  const [pocList, setPocList]           = useState([]);
  const [pocListCount, setPocListCount] = useState(0);
  const [isModelOpen,  setIsModelOpen]  = useState(false);
  const [isModelOpen2, setIsModelOpen2] = useState(false);
  const [isModelOpen3, setIsModelOpen3] = useState(false);
  const [email, setEmail]               = useState("");
  const [mobileNo, setMobileNo]         = useState("");
  const [college, setCollege]           = useState("");
  const [collegeList, setCollegeList]   = useState([]);
  const [deletePoc, setDeletePoc]       = useState();
  const [editPoc, setEditPoc]           = useState();
  const [changeState, setChangeState]   = useState(false);
  const VITE_BACKEND_API = import.meta.env.VITE_BACKEND_API;

  const getAllPoc = async () => {
    setLoading(true); setChangeState(false);
    try {
      const r = await axios.post(`${VITE_BACKEND_API}/api/admin/getPocAdmin`, { page, rows: rowsPerPage });
      setPocList(r.data.data.data);
      setPocListCount(r.data.data.totalColleges);
    } catch (err) { toast.error(err.message); }
    setLoading(false);
  };

  const getAllColleges = async () => {
    try {
      const r = await axios.get(`${VITE_BACKEND_API}/api/college/getAllColleges`);
      setCollegeList(r.data.data.data);
    } catch (err) { toast.error(err.message); }
  };

  const handleSearch = async (val) => {
    setLoading(true);
    try {
      const r = await axios.get(`${VITE_BACKEND_API}/api/admin/searchPoc`, { params: { search: val } });
      setPocList(r.data.poc);
    } catch {}
    setLoading(false);
  };

  const handleAddPoc = async (e) => {
    e.preventDefault();
    try {
      const r = await axios.post(`${VITE_BACKEND_API}/api/admin/addPoc`,
        { email, mobileNo, college, userType: "admin" },
        { headers: { authentication: `Bearer ${token}` } });
      r.data.data.status ? toast.success(r.data.data.msg) : toast.error(r.data.data.msg);
    } catch (err) { toast.error(err.message); }
    setIsModelOpen(false); setChangeState(true);
  };

  const handleDeletePoc = async (e) => {
    e.preventDefault();
    try {
      const r = await axios.post(`${VITE_BACKEND_API}/api/admin/deletePOC`,
        { poc_id: deletePoc.id, userType: "admin" },
        { headers: { authentication: `Bearer ${token}` } });
      r.data.data.status ? toast.success(r.data.data.msg) : toast.error(r.data.data.msg);
    } catch (err) { toast.error(err.message); }
    setIsModelOpen2(false); setChangeState(true);
  };

  const handleEditPoc = async (e) => {
    e.preventDefault();
    try {
      const r = await axios.post(`${VITE_BACKEND_API}/api/admin/editPoc`,
        { id: editPoc.id, email, phone: mobileNo, college: college || editPoc.collegeId, userType: "admin" },
        { headers: { authentication: `Bearer ${token}` } });
      r.data.data.status ? toast.success(r.data.data.msg) : toast.error(r.data.data.msg);
    } catch (err) { toast.error(err.message); }
    setIsModelOpen3(false); setChangeState(true);
  };

  useEffect(() => { getAllPoc(); }, [page, rowsPerPage, changeState]);

  const totalPages = Math.ceil(pocListCount / rowsPerPage);
  const theadBg = isDark ? "bg-[#0d1a10]" : "bg-slate-50";
  const paginBg = isDark ? "bg-[#0d1a10]" : "bg-slate-50";

  const thCls = `px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest whitespace-nowrap
    ${isDark ? "text-slate-500" : "text-slate-400"}`;
  const tdCls = `px-4 py-3.5 text-sm font-medium border-b whitespace-nowrap
    ${isDark ? "border-white/[0.05] text-slate-300" : "border-slate-100 text-slate-700"}`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        .poc-root { font-family: 'Plus Jakarta Sans', sans-serif; }
        .syne     { font-family: 'Syne', 'Plus Jakarta Sans', sans-serif; }
        .poc-root *::-webkit-scrollbar       { width: 4px; height: 4px; }
        .poc-root *::-webkit-scrollbar-track { background: transparent; }
        .poc-root *::-webkit-scrollbar-thumb { background: #22c55e55; border-radius: 99px; }
      `}</style>

      {/*
        Same layout strategy as CollegesTable:
        outer = h-[93vh] flex-col no-overflow
        header = flex-shrink-0
        card   = flex-1 min-h-0 flex-col
          scroll area = flex-1 min-h-0 overflow-auto
          pagination  = flex-shrink-0
      */}
      <div className={`poc-root flex flex-col h-[93vh] p-4 sm:p-5 gap-5 transition-colors duration-300
        ${isDark ? "bg-[#060d09] text-white" : "bg-[#f5faf6] text-slate-900"}`}>

        {/* ── Header ── */}
        <div className="flex-shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
              ${isDark ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-700"}`}>
              <FiUserCheck size={17} />
            </div>
            <div>
              <h1 className={`syne text-xl leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>POC List</h1>
              <p className={`text-xs font-medium ${isDark ? "text-slate-500" : "text-slate-400"}`}>{pocListCount} total</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className={`flex items-center gap-2 rounded-xl border px-3 py-2 flex-1 sm:flex-none
              focus-within:ring-2 focus-within:ring-emerald-500/40 transition-all
              ${isDark ? "bg-white/[0.04] border-white/[0.08] focus-within:border-emerald-600/50" : "bg-white border-slate-200 shadow-sm focus-within:border-emerald-400"}`}>
              <HiSearch size={14} className={isDark ? "text-slate-500" : "text-slate-400"} />
              <input type="search" placeholder="Search POCs…" onChange={(e) => handleSearch(e.target.value)}
                className={`bg-transparent text-sm font-medium outline-none w-full sm:w-40
                  ${isDark ? "text-white placeholder-slate-600" : "text-slate-800 placeholder-slate-400"}`} />
            </div>
            <button
              onClick={() => { setIsModelOpen(true); getAllColleges(); }}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white
                text-sm font-bold px-3 sm:px-4 py-2 rounded-xl transition-all flex-shrink-0"
              style={{ boxShadow: "0 0 16px rgba(34,197,94,0.3)" }}>
              <MdOutlineAdd size={17} />
              <span className="hidden sm:inline">Add POC</span>
            </button>
          </div>
        </div>

        {/* ── Table card ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className={`flex-1 min-h-0 flex flex-col rounded-2xl border overflow-hidden
            ${isDark ? "bg-white/[0.02] border-white/[0.07]" : "bg-white border-slate-200 shadow-sm"}`}
        >
          {/* scroll area — both axes */}
          <div className="flex-1 min-h-0 overflow-auto">
            <table className="w-full border-collapse" style={{ minWidth: "640px" }}>
              <thead className={`sticky top-0 z-10 ${theadBg}`}>
                <tr className={`border-b ${isDark ? "border-white/[0.08]" : "border-slate-200"}`}>
                  <th className={`${thCls} w-12`}>#</th>
                  <th className={thCls}>Username</th>
                  <th className={thCls}>Email</th>
                  <th className={thCls}>Mobile</th>
                  <th className={thCls}>College</th>
                  <th className={`${thCls} text-center w-36`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(6)].map((_, i) => (
                    <tr key={i} className={`border-b ${isDark ? "border-white/[0.05]" : "border-slate-100"}`}>
                      {[...Array(6)].map((__, j) => (
                        <td key={j} className="px-4 py-4">
                          <div className={`h-3 rounded-full animate-pulse ${isDark ? "bg-white/[0.07]" : "bg-slate-100"}`}
                            style={{ width: j === 0 ? "24px" : j === 5 ? "84px" : "100%" }} />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : pocList?.length === 0 ? (
                  <tr>
                    <td colSpan={6} className={`px-4 py-20 text-center text-sm font-semibold
                      ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                      No POCs found
                    </td>
                  </tr>
                ) : (
                  pocList.map((item, index) => (
                    <tr key={index}
                      className={`transition-colors ${isDark ? "hover:bg-white/[0.03]" : "hover:bg-slate-50/60"}`}>
                      <td className={tdCls}>{page * rowsPerPage + index + 1}</td>
                      <td className={`${tdCls} font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{item?.username}</td>
                      <td className={tdCls}>{item?.email}</td>
                      <td className={tdCls}>{item?.mobileNo}</td>
                      <td className={tdCls}>{item?.College?.name}</td>
                      <td className={`${tdCls} text-center`}>
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => {
                              getAllColleges();
                              setEditPoc({ id: item._id, collegeId: item.College?._id, collegeName: item.College?.name });
                              setEmail(item.email); setMobileNo(item.mobileNo);
                              setIsModelOpen3(true);
                            }}
                            className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-lg border transition-all
                              ${isDark ? "bg-blue-500/15 border-blue-500/30 text-blue-400 hover:bg-blue-500/25" : "bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100"}`}>
                            <HiPencil size={11} /> Edit
                          </button>
                          <button
                            onClick={() => { setDeletePoc({ id: item._id, name: item.username }); setIsModelOpen2(true); }}
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
              <span className={`text-xs font-medium ${isDark ? "text-slate-500" : "text-slate-400"}`}>Rows:</span>
              <select value={rowsPerPage} onChange={(e) => { setRowsPerPage(+e.target.value); setPage(0); }}
                className={`text-xs font-bold rounded-lg border px-2 py-1 outline-none cursor-pointer
                  ${isDark ? "bg-white/[0.05] border-white/[0.1] text-white" : "bg-white border-slate-200 text-slate-700"}`}>
                {[10, 25, 50, 100].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs font-medium ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                {pocListCount === 0 ? "0" : page * rowsPerPage + 1}–{Math.min((page + 1) * rowsPerPage, pocListCount)} of {pocListCount}
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
          <Modal title="Add POC" onClose={() => setIsModelOpen(false)} onSubmit={handleAddPoc}
            isDark={isDark} submitLabel="Add POC" icon={FiUserCheck}>
            <Field label="Email" isDark={isDark}>
              <input type="email" placeholder="poc@email.com" required onChange={(e) => setEmail(e.target.value)} className={inputCls(isDark)} />
            </Field>
            <Field label="Mobile No." isDark={isDark}>
              <input type="tel" placeholder="10-digit number" required onChange={(e) => setMobileNo(e.target.value)} className={inputCls(isDark)} />
            </Field>
            <Field label="College" isDark={isDark}>
              <select onChange={(e) => setCollege(e.target.value)} className={selectCls(isDark)}>
                <option value="">Select college</option>
                {collegeList?.map((item, idx) => <option key={idx} value={item._id}>{item.name}</option>)}
              </select>
            </Field>
          </Modal>
        )}
        {isModelOpen2 && (
          <Modal title="Delete POC" onClose={() => setIsModelOpen2(false)} onSubmit={handleDeletePoc}
            isDark={isDark} submitLabel="Yes, Delete" submitColor="red" icon={HiTrash}>
            <div className={`rounded-xl border p-4 text-sm
              ${isDark ? "bg-red-900/15 border-red-800/30 text-red-300" : "bg-red-50 border-red-200 text-red-700"}`}>
              Are you sure you want to delete POC <strong>{deletePoc?.name}</strong>? This action cannot be undone.
            </div>
          </Modal>
        )}
        {isModelOpen3 && (
          <Modal title="Edit POC" onClose={() => setIsModelOpen3(false)} onSubmit={handleEditPoc}
            isDark={isDark} submitLabel="Save Changes" icon={HiPencil}>
            <Field label="Email" isDark={isDark}>
              <input type="email" value={email} required onChange={(e) => setEmail(e.target.value)} className={inputCls(isDark)} />
            </Field>
            <Field label="Mobile No." isDark={isDark}>
              <input type="tel" value={mobileNo} required onChange={(e) => setMobileNo(e.target.value)} className={inputCls(isDark)} />
            </Field>
            <Field label="College" isDark={isDark}>
              <select onChange={(e) => setCollege(e.target.value)} className={selectCls(isDark)}>
                <option value="">{editPoc?.collegeName || "Current college"}</option>
                {collegeList?.map((item, idx) => <option key={idx} value={item._id}>{item.name}</option>)}
              </select>
            </Field>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}

export default PocTable;