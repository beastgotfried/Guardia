
import React from 'react';
import { Activity, ShieldCheck, AlertOctagon } from 'lucide-react';

interface RiskScoreCardProps {
  score: number; // 0-100
  probability: 'LOW' | 'MEDIUM' | 'HIGH';
}

export const RiskScoreCard: React.FC<RiskScoreCardProps> = ({ score, probability }) => {
  // Determine colors based on score
  let colorClass = "bg-emerald-500";
  let textColor = "text-emerald-700";
  let bgColor = "bg-emerald-50";
  let label = "Safe";
  
  if (score > 40) {
    colorClass = "bg-amber-500";
    textColor = "text-amber-700";
    bgColor = "bg-amber-50";
    label = "Caution";
  }
  if (score > 75) {
    colorClass = "bg-red-500";
    textColor = "text-red-700";
    bgColor = "bg-red-50";
    label = "High Risk";
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2">
          <Activity className="w-4 h-4 text-slate-400" />
          AI Risk Analytics
        </h3>
        <span className={`text-xs font-bold px-2 py-0.5 rounded ${bgColor} ${textColor}`}>
          {probability} PROBABILITY
        </span>
      </div>

      <div className="flex items-end gap-2 mb-2">
        <span className="text-4xl font-bold text-slate-800">{score}</span>
        <span className="text-sm text-slate-400 font-medium mb-1">/ 100</span>
      </div>

      {/* Progress Bar */}
      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden mb-4 relative">
        <div 
          className={`h-full ${colorClass} transition-all duration-1000 ease-out`} 
          style={{ width: `${score}%` }}
        ></div>
        {/* Markers */}
        <div className="absolute top-0 bottom-0 left-1/3 w-0.5 bg-white/50"></div>
        <div className="absolute top-0 bottom-0 left-2/3 w-0.5 bg-white/50"></div>
      </div>

      <div className="flex items-center gap-3 text-xs text-slate-500">
        {score < 50 ? (
           <ShieldCheck className="w-4 h-4 text-emerald-500" />
        ) : (
           <AlertOctagon className="w-4 h-4 text-red-500" />
        )}
        <p>
          {score < 50 
            ? "Standard automated processing allowed." 
            : "Enhanced due diligence recommended."}
        </p>
      </div>
    </div>
  );
};
