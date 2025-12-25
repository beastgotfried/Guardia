
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const RiskHistoryChart: React.FC = () => {
  // Simulated data for a sparkline chart
  const dataPoints = [40, 25, 45, 30, 60, 20, 15, 50, 65, 45, 55, 30];
  const max = Math.max(...dataPoints);
  const min = Math.min(...dataPoints);
  
  // Create SVG path
  const width = 300;
  const height = 60;
  const stepX = width / (dataPoints.length - 1);
  
  const points = dataPoints.map((val, i) => {
    const x = i * stepX;
    const y = height - ((val - min) / (max - min)) * height; // Normalize to height
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
          Risk Trend (6 Months)
        </h3>
        <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
          <TrendingDown className="w-3 h-3" />
          <span>-12% vs avg</span>
        </div>
      </div>

      <div className="relative h-20 w-full overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Area under the curve */}
          <path 
            d={`M0,${height} ${points} V${height} H0Z`} 
            fill="url(#gradient)" 
          />
          
          {/* The Line */}
          <polyline 
            fill="none" 
            stroke="#6366f1" 
            strokeWidth="2" 
            points={points} 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          
          {/* Dots on points */}
          {dataPoints.map((val, i) => {
             const x = i * stepX;
             const y = height - ((val - min) / (max - min)) * height;
             return (
               <circle key={i} cx={x} cy={y} r="2" fill="white" stroke="#6366f1" strokeWidth="2" />
             );
          })}
        </svg>
      </div>

      <div className="flex justify-between text-[10px] text-slate-400 mt-2 uppercase font-medium">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
      </div>
    </div>
  );
};
