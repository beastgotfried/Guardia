
import React from 'react';
import { BookOpen, ShieldAlert, AlertTriangle, ExternalLink, Loader2 } from 'lucide-react';
import { RuleMatch } from '../types';

interface MagicRuleBookProps {
  isLoading: boolean;
  rules: RuleMatch[];
  onViewSource: (rule: RuleMatch) => void;
}

export const MagicRuleBook: React.FC<MagicRuleBookProps> = ({ isLoading, rules, onViewSource }) => {
  return (
    <div className="h-full flex flex-col bg-white border-l border-slate-200 shadow-sm">
      {/* Header */}
      <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <h2 className="font-bold text-slate-800">Magic Rule Book</h2>
        </div>
        <p className="text-xs text-slate-500">Proactive Compliance Intelligence</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400 space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
            <span className="text-sm font-medium">Scanning policy documents...</span>
          </div>
        ) : rules.length === 0 ? (
          <div className="text-center p-8 text-slate-400 text-sm">
            No specific high-priority restrictions found for this case context.
          </div>
        ) : (
          rules.map((rule) => (
            <div 
              key={rule.ruleId} 
              className={`
                group relative border rounded-lg p-4 transition-all duration-200 hover:shadow-md
                ${rule.severity === 'CRITICAL' ? 'border-red-100 bg-red-50/50' : 
                  rule.severity === 'WARNING' ? 'border-amber-100 bg-amber-50/50' : 
                  'border-slate-200 bg-white'}
              `}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  {rule.severity === 'CRITICAL' && <ShieldAlert className="w-4 h-4 text-red-600" />}
                  {rule.severity === 'WARNING' && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                  <h3 className={`text-sm font-semibold ${
                    rule.severity === 'CRITICAL' ? 'text-red-900' : 'text-slate-800'
                  }`}>
                    {rule.title}
                  </h3>
                </div>
              </div>
              
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {rule.explanation}
              </p>

              {/* Source Link */}
              <button 
                onClick={() => onViewSource(rule)}
                className="flex items-center gap-2 w-full p-2 rounded bg-white/60 hover:bg-white border border-transparent hover:border-slate-200 transition-all text-xs text-indigo-600 font-medium group-hover:translate-x-1 duration-300"
              >
                <span className="truncate flex-1 text-left">
                  {rule.source.documentName}
                </span>
                <span className="text-slate-400 font-normal">
                  Pg {rule.source.page} • Para {rule.source.paragraph}
                </span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">
          Verified by Guardia AI
        </p>
      </div>
    </div>
  );
};
