
import React from 'react';
import { History, Bot, User, Globe } from 'lucide-react';
import { AuditLogEntry } from '../types';

interface AuditTimelineProps {
  logs: AuditLogEntry[];
}

export const AuditTimeline: React.FC<AuditTimelineProps> = ({ logs }) => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2 shrink-0">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2">
          <History className="w-4 h-4 text-slate-400" />
          Audit Log
        </h3>
      </div>

      <div className="overflow-y-auto pr-2 space-y-4 max-h-60">
        {logs.map((log, index) => {
          let Icon = Globe;
          let iconBg = "bg-slate-100 text-slate-500";
          
          if (log.actor === 'AI') { Icon = Bot; iconBg = "bg-purple-100 text-purple-600"; }
          if (log.actor === 'Agent') { Icon = User; iconBg = "bg-blue-100 text-blue-600"; }

          return (
            <div key={log.id} className="relative pl-6 pb-2 last:pb-0">
              {/* Timeline Line */}
              {index !== logs.length - 1 && (
                <div className="absolute left-[11px] top-6 bottom-[-16px] w-[2px] bg-slate-100"></div>
              )}
              
              <div className={`absolute left-0 top-0 w-6 h-6 rounded-full ${iconBg} flex items-center justify-center border-2 border-white shadow-sm z-10`}>
                <Icon className="w-3 h-3" />
              </div>

              <div className="flex flex-col">
                <div className="flex justify-between items-start">
                  <span className="text-sm font-semibold text-slate-700">{log.action}</span>
                  <span className="text-[10px] text-slate-400">{log.timestamp.split(' ')[1]}</span>
                </div>
                <span className="text-xs text-slate-500 mt-0.5">{log.details}</span>
                <span className="text-[10px] text-slate-400 font-medium mt-1 uppercase">{log.actor}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
