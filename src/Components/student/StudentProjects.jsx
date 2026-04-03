import React, { useEffect, useState } from "react";
import axios from "axios";
import themeHook from "../Context";
import { toast } from "react-hot-toast";
import ProjectCard2 from "./ProjectCard2";
import photo from "./not_found.png";
import { motion, AnimatePresence } from "framer-motion";
import { HiSearch, HiX } from "react-icons/hi";
import { GoProjectSymlink } from "react-icons/go";
import { MdOutlineAdd, MdOutlineClose, MdOutlineCloudUpload } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

const projectTypes = [
  { id: 1, value: "Software" },
  { id: 2, value: "Hardware" },
  { id: 3, value: "AI/Ml" },
  { id: 4, value: "IOT" },
];

/* ── Reusable form field ── */
const Field = ({ label, required, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
      {label}{required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    {children}
  </div>
);

const inputCls = (theme) =>
  `w-full rounded-xl border px-3.5 py-2.5 text-sm font-medium outline-none transition-all duration-200
   focus:ring-2 focus:ring-emerald-500/40
   ${theme === "dark"
    ? "bg-white/[0.04] border-white/[0.1] text-white placeholder-slate-600 focus:border-emerald-600/50"
    : "bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-emerald-400 shadow-sm"}`;

function StudentProjects() {
  const { userDetails, theme } = themeHook();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [multimedia, setMultimedia] = useState([]);
  const [liveDemo, setLiveDemo] = useState("");
  const [codeLink, setCodeLink] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const VITE_BACKEND_API = import.meta.env.VITE_BACKEND_API;

  const setbase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setMultimedia(reader.result);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setbase(file);
  };

  const handleSearchC = async (e) => {
    const value = e.target.value;
    setSearchText(value);
    if (value.length === 0) { setSuggestions([]); return; }
    try {
      const res = await axios.get(`${VITE_BACKEND_API}/api/project/searchContributor/${value}`);
      setSuggestions(res.data.users);
    } catch { setSuggestions([]); }
  };

  const handleSelectUser = (user) => {
    if (user._id === userDetails._id) return;
    if (!selectedUsers.some((u) => u._id === user._id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
    setSearchText("");
    setSuggestions([]);
  };

  const removeUser = (id) => setSelectedUsers(selectedUsers.filter((u) => u._id !== id));

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(`${VITE_BACKEND_API}/api/project/addProjectByStudent`, {
        title, description, multimedia,
        contributors: selectedUsers,
        liveDemo, codeLink, type: selectedType,
        allocated_college: userDetails.allocated_college,
        created_By: userDetails._id,
        allocated_department: userDetails.allocated_department,
      });
      if (result?.data?.data?.status) {
        toast.success("Project added — awaiting HOD approval");
      } else {
        toast.error(result?.data?.data?.err);
      }
      closeModal();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const closeModal = () => {
    setIsModelOpen(false);
    setSuggestions([]);
    setSelectedUsers([]);
    setTitle(""); setDescription(""); setLiveDemo("");
    setCodeLink(""); setSelectedType(""); setMultimedia([]);
    setSearchText("");
  };

  const getAllProjects = async () => {
    setLoading(true);
    try {
      const result = await axios.get(`${VITE_BACKEND_API}/api/auth/getAllProjects`);
      setProjectList(result.data.data.data);
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${VITE_BACKEND_API}/api/project/searchStudentsProj`, { title: search });
      setProjectList(res.data.data.projects);
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  useEffect(() => { getAllProjects(); }, [userDetails, search === ""]);

  const SkeletonCard = () => (
    <div className={`rounded-2xl border p-5 animate-pulse flex gap-5
      ${theme === "dark" ? "bg-white/[0.03] border-white/[0.07]" : "bg-white border-slate-200"}`}>
      <div className={`w-36 h-36 rounded-xl flex-shrink-0 ${theme === "dark" ? "bg-white/[0.07]" : "bg-slate-100"}`} />
      <div className="flex-1 flex flex-col gap-3 py-1">
        <div className={`h-4 rounded-full w-3/4 ${theme === "dark" ? "bg-white/10" : "bg-slate-200"}`} />
        <div className={`h-3 rounded-full w-full ${theme === "dark" ? "bg-white/[0.07]" : "bg-slate-100"}`} />
        <div className={`h-3 rounded-full w-2/3 ${theme === "dark" ? "bg-white/[0.07]" : "bg-slate-100"}`} />
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        .sp-root { font-family: 'Plus Jakarta Sans', sans-serif; }
        .syne { font-family: 'Syne', 'Plus Jakarta Sans', sans-serif; }
        .sp-scroll::-webkit-scrollbar { width: 4px; }
        .sp-scroll::-webkit-scrollbar-track { background: transparent; }
        .sp-scroll::-webkit-scrollbar-thumb { background: #22c55e44; border-radius: 99px; }
        .modal-scroll::-webkit-scrollbar { width: 3px; }
        .modal-scroll::-webkit-scrollbar-track { background: transparent; }
        .modal-scroll::-webkit-scrollbar-thumb { background: #22c55e33; border-radius: 99px; }
      `}</style>

      <div className={`sp-root sp-scroll w-full flex h-[93vh] overflow-y-auto transition-colors duration-300
        ${theme === "dark" ? "bg-[#060d09] text-white" : "bg-[#f5faf6] text-slate-900"}`}>
        <div className="flex flex-col gap-4 sm:gap-5 p-3 sm:p-5 w-full max-w-4xl mx-auto">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            {/* Title */}
            <div className="flex items-center gap-2.5">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
                ${theme === "dark" ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-700"}`}>
                <GoProjectSymlink size={17} />
              </div>
              <div>
                <h1 className="syne text-xl font-700 leading-tight">Student Projects</h1>
                {!loading && projectList.length > 0 && (
                  <p className={`text-xs font-medium ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
                    {projectList.length} project{projectList.length !== 1 ? "s" : ""} found
                  </p>
                )}
              </div>
            </div>

            {/* Search + Add */}
            <div className="flex items-center gap-2 sm:gap-3 w-full max-sm:w-[100%]">
              <form onSubmit={handleSearch} className="flex-1 sm:flex-none">
                <div className={`flex items-center gap-1.5 sm:gap-2 rounded-xl border px-2 sm:px-3 py-1.5 sm:py-2 transition-all duration-200
                  focus-within:ring-2 focus-within:ring-emerald-500/40
                  ${theme === "dark"
                    ? "bg-white/[0.04] border-white/[0.08] focus-within:border-emerald-600/50"
                    : "bg-white border-slate-200 focus-within:border-emerald-400 shadow-sm"}`}>
                  <HiSearch size={14} className={theme === "dark" ? "text-slate-500" : "text-slate-400"} />
                  <input
                    type="search"
                    placeholder="Search…"
                    onChange={(e) => setSearch(e.target.value)}
                    className={`bg-transparent text-xs sm:text-sm font-medium outline-none w-full
                      ${theme === "dark" ? "text-white placeholder-slate-600" : "text-slate-800 placeholder-slate-400"}`}
                  />
                </div>
              </form>

              <button
                onClick={() => setIsModelOpen(true)}
                className="flex items-center gap-1 sm:gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all duration-200 flex-shrink-0"
                style={{ boxShadow: "0 0 18px rgba(34,197,94,0.3)" }}
              >
                <MdOutlineAdd size={16} />
                <span className="hidden sm:inline">Add Project</span>
              </button>
            </div>
          </motion.div>

          {/* ── Project List ── */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div key="skeletons" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col gap-4">
                {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
              </motion.div>
            ) : projectList.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className={`flex flex-col items-center justify-center py-20 rounded-2xl border
                  ${theme === "dark" ? "bg-white/[0.02] border-white/[0.07]" : "bg-white border-slate-200 shadow-sm"}`}>
                <img src={photo} className="w-24 h-24 opacity-50 mb-4" alt="not found" />
                <p className={`font-bold text-sm mb-1 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                  No Projects Found
                </p>
                <p className={`text-xs ${theme === "dark" ? "text-slate-600" : "text-slate-400"}`}>
                  Be the first to add a project
                </p>
              </motion.div>
            ) : (
              <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col gap-4 pb-5">
                {projectList.map((item, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}>
                    <ProjectCard2 data={item} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Add Project Modal ── */}
      <AnimatePresence>
        {isModelOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.25 }}
              className={`relative w-full max-w-lg rounded-2xl border overflow-hidden
                ${theme === "dark" ? "bg-[#0a1510] border-white/[0.1]" : "bg-white border-slate-200 shadow-2xl"}`}
            >
              {/* Modal header */}
              <div className={`flex items-center justify-between px-5 py-4 border-b sticky top-0 z-10
                ${theme === "dark" ? "bg-[#0a1510] border-white/[0.07]" : "bg-white border-slate-100"}`}>
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center
                    ${theme === "dark" ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-700"}`}>
                    <MdOutlineCloudUpload size={16} />
                  </div>
                  <h3 className={`syne text-lg font-700 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    Add Project
                  </h3>
                </div>
                <button
                  onClick={closeModal}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all
                    ${theme === "dark" ? "bg-white/[0.05] text-slate-400 hover:bg-white/[0.1] hover:text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
                >
                  <MdOutlineClose size={17} />
                </button>
              </div>

              {/* Modal body */}
              <div className="modal-scroll overflow-y-auto max-h-[75vh]">
                <form onSubmit={handleAddProject}>
                  <div className="flex flex-col gap-4 p-5">

                    <Field label="Project Title" required>
                      <input type="text" placeholder="Enter project title"
                        onChange={(e) => setTitle(e.target.value)}
                        required className={inputCls(theme)} />
                    </Field>

                    <Field label="Project Type">
                      <select onChange={(e) => setSelectedType(e.target.value)}
                        className={inputCls(theme)}>
                        <option value="">Select project type</option>
                        {projectTypes.map((item) => (
                          <option key={item.id} value={item.value} className="text-black">{item.value}</option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Description" required>
                      <textarea
                        placeholder="Describe your project…"
                        onChange={(e) => setDescription(e.target.value)}
                        required rows={3}
                        className={`${inputCls(theme)} resize-none`}
                      />
                    </Field>

                    {/* File upload */}
                    <Field label="Multimedia" required>
                      <label className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed py-6 cursor-pointer transition-all
                        ${theme === "dark"
                          ? "border-white/[0.1] hover:border-emerald-600/50 bg-white/[0.02]"
                          : "border-slate-200 hover:border-emerald-400 bg-slate-50"}`}>
                        <MdOutlineCloudUpload size={24} className={theme === "dark" ? "text-slate-500" : "text-slate-400"} />
                        <span className={`text-xs font-medium ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
                          {multimedia.length > 0 ? "File selected ✓" : "Click to upload image"}
                        </span>
                        <input type="file" className="hidden" onChange={handleImageUpload} required={multimedia.length === 0} />
                      </label>
                    </Field>

                    {/* Contributors */}
                    <Field label="Contributors">
                      <div className="relative">
                        <input
                          type="text"
                          value={searchText}
                          onChange={handleSearchC}
                          placeholder="Search by username…"
                          className={inputCls(theme)}
                        />
                        <AnimatePresence>
                          {suggestions.length > 0 && (
                            <motion.ul
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              className={`absolute left-0 right-0 top-full mt-1 z-20 rounded-xl border overflow-hidden shadow-lg
                                ${theme === "dark" ? "bg-[#0d1a10] border-white/[0.1]" : "bg-white border-slate-200"}`}>
                              {suggestions.map((user) => (
                                <li
                                  key={user._id}
                                  onClick={() => handleSelectUser(user)}
                                  className={`flex items-center gap-2.5 px-4 py-2.5 cursor-pointer text-sm font-medium transition-colors
                                    ${theme === "dark" ? "hover:bg-white/[0.05] text-slate-200" : "hover:bg-emerald-50 text-slate-700"}`}
                                >
                                  <FaUserCircle size={16} className="text-emerald-500 flex-shrink-0" />
                                  {user.username}
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Selected users */}
                      {selectedUsers.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedUsers.map((user) => (
                            <span key={user._id}
                              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border
                                ${theme === "dark"
                                  ? "bg-emerald-900/30 border-emerald-800/40 text-emerald-400"
                                  : "bg-emerald-100 border-emerald-200 text-emerald-700"}`}>
                              @{user.username}
                              <button type="button" onClick={() => removeUser(user._id)}
                                className="opacity-60 hover:opacity-100 transition-opacity">
                                <HiX size={10} />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </Field>

                    <Field label="Live Demo URL">
                      <input type="url" placeholder="https://your-demo.com"
                        onChange={(e) => setLiveDemo(e.target.value)}
                        className={inputCls(theme)} />
                    </Field>

                    <Field label="Code Repository URL" required>
                      <input type="url" placeholder="https://github.com/…"
                        onChange={(e) => setCodeLink(e.target.value)}
                        required className={inputCls(theme)} />
                    </Field>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-2">
                      <button type="submit"
                        className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold py-2.5 rounded-xl transition-all duration-200"
                        style={{ boxShadow: "0 0 18px rgba(34,197,94,0.25)" }}>
                        Submit Project
                      </button>
                      <button type="button" onClick={closeModal}
                        className={`flex-1 text-sm font-bold py-2.5 rounded-xl border transition-all duration-200
                          ${theme === "dark"
                            ? "bg-white/[0.04] border-white/[0.1] text-slate-300 hover:bg-white/[0.08]"
                            : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"}`}>
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

export default StudentProjects;