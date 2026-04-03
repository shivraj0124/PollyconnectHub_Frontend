import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import { MdOutlineCalendarToday, MdOutlineSchool } from 'react-icons/md';
import themeHook from '../Context';

function ProjectCard({ data }) {
  const navigate = useNavigate();
  const [college_name, setcollege_name] = useState('');
  const VITE_BACKEND_API = import.meta.env.VITE_BACKEND_API;
  const { theme } = themeHook();

  const getcollege = async () => {
    const col = await axios.post(`${VITE_BACKEND_API}/api/college/onecollge`, {
      college: data.allocated_college,
    });
    setcollege_name(col.data.data);
  };

  useEffect(() => {
    getcollege();
  }, []);

  return (
    <div
      onClick={() => navigate(`/project/${data?._id}`)}
      className={`group relative flex flex-col sm:flex-row gap-5 rounded-2xl border p-5 cursor-pointer
        overflow-hidden transition-all duration-300
        ${theme === 'dark'
          ? 'bg-white/[0.03] border-white/[0.07] hover:border-emerald-600/40'
          : 'bg-white border-slate-200 hover:border-emerald-400 shadow-sm hover:shadow-md hover:shadow-emerald-100/50'
        }`}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: theme === 'dark'
          ? 'radial-gradient(circle at 0% 0%, rgba(34,197,94,0.07), transparent 60%)'
          : 'radial-gradient(circle at 0% 0%, rgba(34,197,94,0.05), transparent 60%)' }}
      />

      {/* Thumbnail */}
      <div className="relative flex-shrink-0">
        <img
          // src="https://i0.wp.com/technologysalon.org/wp-content/uploads/2019/04/artificial-intelligence.jpg?resize=640%2C429"
          src={data?.multimedia?.[0] || 'https://via.placeholder.com/150?text=No+Image'}
          className="w-full sm:w-36 h-36 rounded-xl object-cover"
          alt="Project"
        />
        {/* Category tag overlay */}
        <span className={`absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full
          ${theme === 'dark'
            ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-700/50'
            : 'bg-emerald-100/90 text-emerald-700 border border-emerald-200'
          }`}>
          {data?.category || 'Project'}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 min-w-0 gap-3 relative z-10">
        <div>
          <h3 className={`font-bold text-lg leading-snug mb-1.5 line-clamp-1
            ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            {data?.title}
          </h3>
          <p className={`text-sm line-clamp-2 leading-relaxed
            ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            {data?.description}
          </p>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            {/* College */}
            {college_name?.name && (
              <div className={`flex items-center gap-1.5 text-xs font-medium
                ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                <MdOutlineSchool size={13} className="text-emerald-500 flex-shrink-0" />
                <span className="truncate max-w-[140px]">{college_name.name}</span>
              </div>
            )}
            {/* Date */}
            <div className={`flex items-center gap-1.5 text-xs font-medium
              ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
              <MdOutlineCalendarToday size={12} className="flex-shrink-0" />
              {moment(data?.time).format('DD MMM YYYY')}
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/project/${data?._id}`); }}
            className={`group/btn flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-xl border
              transition-all duration-200
              ${theme === 'dark'
                ? 'bg-emerald-600/20 border-emerald-700/50 text-emerald-400 hover:bg-emerald-600/30'
                : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
              }`}
          >
            View Project
            <HiArrowRight size={12} className="transition-transform duration-200 group-hover/btn:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;