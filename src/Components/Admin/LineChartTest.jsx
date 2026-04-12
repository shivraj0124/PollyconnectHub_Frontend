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

/* Sample data — replace with real API data as needed */
const sampleData = [
  { name: "Jan", projects: 12 },
  { name: "Feb", projects: 19 },
  { name: "Mar", projects: 14 },
  { name: "Apr", projects: 28 },
  { name: "May", projects: 22 },
  { name: "Jun", projects: 35 },
  { name: "Jul", projects: 30 },
];

/* Custom tooltip */
const CustomTooltip = ({ active, payload, label, isDark }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`rounded-xl border px-3 py-2 text-xs font-semibold shadow-lg
        ${isDark ? "bg-[#0d1a10] border-white/[0.1] text-white" : "bg-white border-slate-200 text-slate-800"}`}>
        <p className={isDark ? "text-slate-400" : "text-slate-400"}>{label}</p>
        <p className="text-emerald-500 mt-0.5">{payload[0].value} projects</p>
      </div>
    );
  }
  return null;
};

function LineChartTest({ data = sampleData }) {
  const { theme } = themeHook();
  const isDark = theme === "dark";

  const axisColor   = isDark ? "#475569" : "#94a3b8";
  const gridColor   = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";

  return (
    <div className="w-full">
      <p className={`text-xs font-bold uppercase tracking-widest mb-4
        ${isDark ? "text-slate-500" : "text-slate-400"}`}>
        Project Activity
      </p>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0}   />
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
          />
          <Tooltip content={<CustomTooltip isDark={isDark} />} cursor={{ stroke: "#22c55e", strokeWidth: 1, strokeDasharray: "4 4" }} />
          <Area
            type="monotone"
            dataKey="projects"
            stroke="#22c55e"
            strokeWidth={2.5}
            fill="url(#emeraldGrad)"
            dot={false}
            activeDot={{ r: 5, fill: "#22c55e", stroke: isDark ? "#060d09" : "#fff", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChartTest;