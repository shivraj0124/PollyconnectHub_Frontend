import React, { useState, useEffect } from "react";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-hot-toast";
import themeHook from "../Context";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiSearch, HiTrash, HiChevronLeft, HiChevronRight, HiExternalLink } from "react-icons/hi";
import { GoProjectSymlink } from "react-icons/go";
import { MdOutlineClose, MdOutlineOpenInNew, MdOutlineVerified, MdOutlineCancel } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

/* ── Modal ── */
const ConfirmModal = ({ title, message, onClose, onConfirm, isDark, confirmLabel = "Confirm", confirmColor = "red" }) => (
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
      className={`w-full max-w-sm rounded-2xl border overflow-hidden
        ${isDark ? "bg-[#0a1510] border-white/[0.1]" : "bg-white border-slate-200 shadow-2xl"}`}
    >
      <div className={`flex items-center justify-between px-5 py-4 border-b ${isDark ? "border-white/[0.07]" : "border-slate-100"}`}>
        <h3 className={`font-bold text-base ${isDark ? "text-white" : "text-slate-900"}`}>{title}</h3>
        <button onClick={onClose}
          className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${isDark ? "bg-white/[0.05] text-slate-400 hover:bg-white/[0.1]" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
          <MdOutlineClose size={16} />
        </button>
      </div>
      <div className="p-5 flex flex-col gap-4">
        <div className={`rounded-xl border p-4 text-sm ${isDark ? "bg-red-900/15 border-red-800/30 text-red-300" : "bg-red-50 border-red-200 text-red-700"}`}>
          {message}
        </div>
        <div className="flex gap-3">
          <button onClick={onConfirm}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all ${confirmColor === "red" ? "bg-red-600 hover:bg-red-500" : "bg-emerald-600 hover:bg-emerald-500"}`}>
            {confirmLabel}
          </button>
          <button onClick={onClose}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all ${isDark ? "bg-white/[0.04] border-white/[0.1] text-slate-300 hover:bg-white/[0.08]" : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"}`}>
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

/* ── Detail Modal ── */
const DetailModal = ({ item, onClose, isDark }) => (
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
      className={`w-full max-w-lg rounded-2xl border overflow-hidden flex flex-col max-h-[85vh]
        ${isDark ? "bg-[#0a1510] border-white/[0.1]" : "bg-white border-slate-200 shadow-2xl"}`}
    >
      {/* Header */}
      <div className={`flex items-center justify-between px-5 py-4 border-b flex-shrink-0 ${isDark ? "border-white/[0.07]" : "border-slate-100"}`}>
        <div className="flex items-center gap-2">
          <GoProjectSymlink size={16} className="text-emerald-500" />
          <h3 className={`font-bold text-base truncate max-w-[280px] ${isDark ? "text-white" : "text-slate-900"}`}>{item?.title}</h3>
        </div>
        <button onClick={onClose}
          className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${isDark ? "bg-white/[0.05] text-slate-400 hover:bg-white/[0.1]" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
          <MdOutlineClose size={16} />
        </button>
      </div>

      {/* Scrollable body */}
      <div className="overflow-y-auto flex-1 p-5 flex flex-col gap-4"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#22c55e44 transparent" }}>
        {/* Image */}
        {item?.multimedia && (
          <a href={item.multimedia} target="_blank" rel="noreferrer">
            <img src={item.multimedia} alt="project" className="w-full h-48 object-cover rounded-xl" />
          </a>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {item?.isActive === "true" ? (
            <span className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${isDark ? "bg-emerald-900/40 text-emerald-400 border border-emerald-800/40" : "bg-emerald-100 text-emerald-700 border border-emerald-200"}`}>
              <MdOutlineVerified size={11} /> Verified
            </span>
          ) : (
            <span className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${isDark ? "bg-red-900/30 text-red-400 border border-red-800/40" : "bg-red-100 text-red-600 border border-red-200"}`}>
              <MdOutlineCancel size={11} /> Unverified
            </span>
          )}
          {item?.type && (
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${isDark ? "bg-white/[0.04] border-white/[0.1] text-slate-300" : "bg-slate-100 border-slate-200 text-slate-600"}`}>
              {item.type}
            </span>
          )}
        </div>

        {/* Detail rows */}
        {[
          { label: "Description", value: item?.description },
          { label: "Created By", value: item?.created_By ? <a href={`/profile/${item.created_By._id}`} className="text-emerald-500 hover:underline">@{item.created_By.username}</a> : null },
          { label: "Contributors", value: item?.contributers?.length > 0
            ? <div className="flex flex-wrap gap-2">
                {item.contributers.map((c, i) => (
                  <a key={i} href={`/profile/${c._id}`} className={`text-xs font-bold px-2.5 py-1 rounded-full border ${isDark ? "bg-emerald-900/30 text-emerald-400 border-emerald-800/40" : "bg-emerald-50 text-emerald-700 border-emerald-200"}`}>
                    @{c.username}
                  </a>
                ))}
              </div> : null
          },
          { label: "Live Demo", value: item?.live_demo
            ? <a href={item.live_demo} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-emerald-500 hover:underline text-sm">
                Open link <MdOutlineOpenInNew size={13} />
              </a> : null
          },
        ].map(({ label, value }) => value ? (
          <div key={label} className={`rounded-xl border p-3.5 ${isDark ? "bg-white/[0.03] border-white/[0.07]" : "bg-slate-50 border-slate-100"}`}>
            <p className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>{label}</p>
            <div className={`text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}>{value}</div>
          </div>
        ) : null)}
      </div>
    </motion.div>
  </motion.div>
);

function ProjectDetails() {
  const { token, userDetails, theme } = themeHook();
  const isDark = theme === "dark";
  const [loading, setLoading]           = useState(true);
  const [page, setPage]                 = useState(0);
  const [rowsPerPage, setRowsPerPage]   = useState(10);
  const [projectList, setProjectList]   = useState([]);
  const [allProjects, setAllProjects]   = useState([]); // for client-side search
  const [projectCount, setProjectCount] = useState(0);
  const [currentRow, setCurrentRow]     = useState();
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [deleteProject, setDeleteProject] = useState();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const VITE_BACKEND_API = import.meta.env.VITE_BACKEND_API;

  const getAllProjects = async () => {
    setLoading(true);
    try {
      const result = await axios.post(`${VITE_BACKEND_API}/api/hod/getProjects`, {
        allocated_college: userDetails.allocated_college,
        allocated_department: userDetails.allocated_department,
      });
      const list = result?.data?.data?.data || [];
      setAllProjects(list);
      setProjectList(list);
      setProjectCount(result?.data?.data?.projectCount || list.length);
    } catch (err) { toast.error(err.message); }
    setLoading(false);
  };

  const handleSearch = (val) => {
    if (!val.trim()) { setProjectList(allProjects); return; }
    const lower = val.toLowerCase();
    setProjectList(allProjects.filter((p) =>
      p?.title?.toLowerCase().includes(lower) ||
      p?.description?.toLowerCase().includes(lower)
    ));
    setPage(0);
  };

  const handleDeleteProject = async () => {
    try {
      const result = await axios.post(`${VITE_BACKEND_API}/api/hod/deleteProject`,
        { project_id: deleteProject.id },
        { headers: { authentication: `Bearer ${token}` } });
      result?.data?.data?.status ? toast.success(result.data.data.msg) : toast.error(result.data.data.msg);
    } catch (err) { toast.error(err.message); }
    setIsDeleteOpen(false);
    getAllProjects();
  };

  const handleStatus = async (id, s) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${VITE_BACKEND_API}/api/hod/handleStatus`, { project_id: id, active: s });
      if (data.data.status) getAllProjects();
    } catch { setLoading(false); }
  };

  useEffect(() => { getAllProjects(); }, [page, rowsPerPage]);

  const totalPages = Math.ceil(projectList.length / rowsPerPage);
  const paginated = projectList.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  const theadBg = isDark ? "bg-[#0d1a10]" : "bg-slate-50";
  const paginBg = isDark ? "bg-[#0d1a10]" : "bg-slate-50";
  const thCls = `px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest whitespace-nowrap ${isDark ? "text-slate-500" : "text-slate-400"}`;
  const tdCls = `px-4 py-3.5 text-sm font-medium border-b whitespace-nowrap ${isDark ? "border-white/[0.05] text-slate-300" : "border-slate-100 text-slate-700"}`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        .pd-root { font-family: 'Plus Jakarta Sans', sans-serif; }
        .syne    { font-family: 'Syne', 'Plus Jakarta Sans', sans-serif; }
        .pd-root *::-webkit-scrollbar       { width: 4px; height: 4px; }
        .pd-root *::-webkit-scrollbar-track { background: transparent; }
        .pd-root *::-webkit-scrollbar-thumb { background: #22c55e55; border-radius: 99px; }
      `}</style>

      <div className={`pd-root flex flex-col h-[93vh] p-4 sm:p-5 gap-5 transition-colors duration-300
        ${isDark ? "bg-[#060d09] text-white" : "bg-[#f5faf6] text-slate-900"}`}>

        {/* ── Header ── */}
        <div className="flex-shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
              ${isDark ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-700"}`}>
              <GoProjectSymlink size={17} />
            </div>
            <div>
              <h1 className={`syne text-xl leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>Projects</h1>
              <p className={`text-xs font-medium ${isDark ? "text-slate-500" : "text-slate-400"}`}>{projectList.length} total</p>
            </div>
          </div>
          <div className={`flex items-center gap-2 rounded-xl border px-3 py-2 w-full sm:w-auto
            focus-within:ring-2 focus-within:ring-emerald-500/40 transition-all
            ${isDark ? "bg-white/[0.04] border-white/[0.08] focus-within:border-emerald-600/50" : "bg-white border-slate-200 shadow-sm focus-within:border-emerald-400"}`}>
            <HiSearch size={14} className={isDark ? "text-slate-500" : "text-slate-400"} />
            <input type="search" placeholder="Search projects…" onChange={(e) => handleSearch(e.target.value)}
              className={`bg-transparent text-sm font-medium outline-none w-full sm:w-44
                ${isDark ? "text-white placeholder-slate-600" : "text-slate-800 placeholder-slate-400"}`} />
          </div>
        </div>

        {/* ── Table card ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className={`flex-1 min-h-0 flex flex-col rounded-2xl border overflow-hidden
            ${isDark ? "bg-white/[0.02] border-white/[0.07]" : "bg-white border-slate-200 shadow-sm"}`}
        >
          {/* scroll area */}
          <div className="flex-1 min-h-0 overflow-auto">
            <table className="w-full border-collapse" style={{ minWidth: "780px" }}>
              <thead className={`sticky top-0 z-10 ${theadBg}`}>
                <tr className={`border-b ${isDark ? "border-white/[0.08]" : "border-slate-200"}`}>
                  <th className={`${thCls} w-12`}>#</th>
                  <th className={thCls}>Title</th>
                  <th className={thCls}>Description</th>
                  <th className={thCls}>Preview</th>
                  <th className={thCls}>Created By</th>
                  <th className={thCls}>Demo</th>
                  <th className={thCls}>Status</th>
                  <th className={thCls}>Type</th>
                  <th className={`${thCls} text-center w-20`}>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className={`border-b ${isDark ? "border-white/[0.05]" : "border-slate-100"}`}>
                      {[...Array(9)].map((__, j) => (
                        <td key={j} className="px-4 py-4">
                          <div className={`h-3 rounded-full animate-pulse ${isDark ? "bg-white/[0.07]" : "bg-slate-100"}`}
                            style={{ width: j === 0 ? "24px" : j === 3 ? "40px" : j === 8 ? "60px" : "100%" }} />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : paginated?.length === 0 ? (
                  <tr>
                    <td colSpan={9} className={`px-4 py-20 text-center text-sm font-semibold ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                      No projects found
                    </td>
                  </tr>
                ) : (
                  paginated.map((item, index) => (
                    <tr key={index} className={`transition-colors ${isDark ? "hover:bg-white/[0.03]" : "hover:bg-slate-50/60"}`}>
                      <td className={tdCls}>{page * rowsPerPage + index + 1}</td>
                      <td className={`${tdCls} font-semibold cursor-pointer ${isDark ? "text-emerald-400 hover:text-emerald-300" : "text-emerald-700 hover:text-emerald-800"}`}
                        onClick={() => { setCurrentRow(item); setIsDetailOpen(true); }}>
                        <span className="max-w-[140px] block truncate">{item?.title}</span>
                      </td>
                      <td className={tdCls}>
                        <span className="max-w-[160px] block" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", whiteSpace: "normal" }}>
                          {item?.description}
                        </span>
                      </td>
                      <td className={tdCls}>
                        {item?.multimedia && (
                          <a href={item.multimedia} target="_blank" rel="noreferrer">
                            <img src={item.multimedia} className="w-10 h-10 rounded-lg object-cover border border-white/10" alt="thumb" />
                          </a>
                        )}
                      </td>
                      <td className={tdCls}>
                        <a href={`/profile/${item?.created_By?._id}`} className="text-emerald-500 hover:underline">
                          @{item?.created_By?.username}
                        </a>
                      </td>
                      <td className={tdCls}>
                        {item?.live_demo ? (
                          <a href={item.live_demo} target="_blank" rel="noreferrer"
                            className="flex items-center gap-1 text-xs font-bold text-blue-500 hover:underline">
                            Open <HiExternalLink size={11} />
                          </a>
                        ) : <span className={isDark ? "text-slate-600" : "text-slate-300"}>—</span>}
                      </td>
                      <td className={tdCls}>
                        <button
                          onClick={() => handleStatus(item?._id, item?.isActive === "true" ? "false" : "true")}
                          className="flex items-center gap-1.5 text-xs font-bold transition-all"
                          title={item?.isActive === "true" ? "Click to unverify" : "Click to verify"}
                        >
                          {item?.isActive === "true" ? (
                            <FaToggleOn size={22} className="text-emerald-500" />
                          ) : (
                            <FaToggleOff size={22} className="text-red-400" />
                          )}
                        </button>
                      </td>
                      <td className={tdCls}>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full border
                          ${isDark ? "bg-white/[0.04] border-white/[0.08] text-slate-300" : "bg-slate-100 border-slate-200 text-slate-600"}`}>
                          {item?.type}
                        </span>
                      </td>
                      <td className={`${tdCls} text-center`}>
                        <button
                          onClick={() => { setDeleteProject({ id: item?._id, name: item?.title }); setIsDeleteOpen(true); }}
                          className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-lg border transition-all
                            ${isDark ? "bg-red-500/15 border-red-500/30 text-red-400 hover:bg-red-500/25" : "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"}`}>
                          <HiTrash size={11} /> Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
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
                {projectList.length === 0 ? "0" : page * rowsPerPage + 1}–{Math.min((page + 1) * rowsPerPage, projectList.length)} of {projectList.length}
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
        {isDetailOpen && currentRow && (
          <DetailModal item={currentRow} onClose={() => setIsDetailOpen(false)} isDark={isDark} />
        )}
        {isDeleteOpen && (
          <ConfirmModal
            title="Delete Project"
            message={<>Are you sure you want to delete <strong>{deleteProject?.name}</strong>? This cannot be undone.</>}
            onClose={() => setIsDeleteOpen(false)}
            onConfirm={handleDeleteProject}
            isDark={isDark}
            confirmLabel="Yes, Delete"
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default ProjectDetails;