import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import themeHook from "../Context";

const CustomTooltip = ({ active, payload, label, isDark }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`rounded-xl border px-3 py-2 text-xs font-semibold shadow-lg
        ${isDark ? "bg-[#0d1a10] border-white/[0.1] text-white" : "bg-white border-slate-200 text-slate-800"}`}>
        <p className={isDark ? "text-slate-400" : "text-slate-400"}>{label}</p>
        <p className="mt-0.5 text-sm font-bold" style={{ color: payload[0].fill }}>{payload[0].value ?? 0}</p>
      </div>
    );
  }
  return null;
};

/* Each bar gets its own accent color */
const BAR_COLORS = ["#22c55e", "#3b82f6", "#a855f7"];

export default function Chart({ clg, poc, hod }) {
  const { theme } = themeHook();
  const isDark = theme === "dark";

  const data = [
    { name: "Colleges", value: clg ?? 0 },
    { name: "POCs",     value: poc ?? 0 },
    { name: "HODs",     value: hod ?? 0 },
  ];

  const axisColor = isDark ? "#475569" : "#94a3b8";
  const gridColor = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";

  /* Custom bar shape with rounded top corners */
  const RoundedBar = (props) => {
    const { x, y, width, height, fill } = props;
    const radius = 6;
    if (!height || height <= 0) return null;
    return (
      <path
        d={`M${x},${y + radius}
           Q${x},${y} ${x + radius},${y}
           H${x + width - radius}
           Q${x + width},${y} ${x + width},${y + radius}
           V${y + height}
           H${x}
           Z`}
        fill={fill}
      />
    );
  };

  return (
    <div className="w-full">
     
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }} barCategoryGap="35%">
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
            cursor={{ fill: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)", radius: 8 }}
          />
          <Bar dataKey="value" shape={<RoundedBar />} maxBarSize={52}>
            {data.map((_, index) => (
              <Cell key={index} fill={BAR_COLORS[index % BAR_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center justify-center gap-5 mt-3">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: BAR_COLORS[i] }} />
            <span className={`text-xs font-semibold ${isDark ? "text-slate-400" : "text-slate-500"}`}>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}