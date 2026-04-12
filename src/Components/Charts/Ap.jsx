import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import themeHook from "../Context";

const CustomTooltip = ({ active, payload, label, isDark }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`rounded-xl border px-3 py-2 text-xs font-semibold shadow-lg
        ${isDark ? "bg-[#0d1a10] border-white/[0.1] text-white" : "bg-white border-slate-200 text-slate-800"}`}>
        <p className={isDark ? "text-slate-400" : "text-slate-400"}>{label}</p>
        <p className="text-emerald-500 mt-0.5 text-sm font-bold">{payload[0].value ?? 0}</p>
      </div>
    );
  }
  return null;
};

export default function Ap({ hod, student, project }) {
  const { theme } = themeHook();
  const isDark = theme === "dark";

  const data = [
    { name: "HODs",     value: hod     ?? 0 },
    { name: "Students", value: student ?? 0 },
    { name: "Projects", value: project ?? 0 },
  ];

  const axisColor = isDark ? "#475569" : "#94a3b8";
  const gridColor = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";

  return (
    <div className="w-full">
      
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="apEmeraldGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.28} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0}    />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={gridColor} strokeDasharray="4 4" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: axisColor, fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: axisColor, fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip
            content={<CustomTooltip isDark={isDark} />}
            cursor={{ stroke: "#22c55e", strokeWidth: 1, strokeDasharray: "4 4" }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#22c55e"
            strokeWidth={2.5}
            fill="url(#apEmeraldGrad)"
            dot={{ r: 4, fill: "#22c55e", stroke: isDark ? "#060d09" : "#fff", strokeWidth: 2 }}
            activeDot={{ r: 6, fill: "#22c55e", stroke: isDark ? "#060d09" : "#fff", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}