
import React from 'react';
import { ShieldBan, AlertTriangle, FileText, ArrowRight, CheckSquare } from 'lucide-react';
import { RuleMatch } from '../types';

interface MistakeStopperModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewProof: () => void;
  onAcknowledge?: () => void;
  onEscalate?: () => void;
  reason: string;
  violation?: RuleMatch;
}

export const MistakeStopperModal: React.FC<MistakeStopperModalProps> = ({ 
  isOpen, 
  onClose, 
  onViewProof,
  onAcknowledge,
  onEscalate,
  reason, 
  violation 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden border-t-8 border-red-500 animate-in zoom-in-95 duration-200">
        
        {/* Header Area */}
        <div className="p-6 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-red-100 rounded-full">
              <ShieldBan className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Action Blocked</h2>
              <p className="text-sm text-red-600 font-medium">Compliance Violation Detected</p>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="px-6 py-2">
          <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-4">
            <p className="text-slate-800 font-medium text-sm leading-relaxed">
              {reason}
            </p>
          </div>

          {violation && (
            <div className="mb-6">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">
                Violated Policy Rule
              </p>
              <div className="flex items-start gap-3 bg-slate-50 p-3 rounded border border-slate-200">
                <FileText className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-slate-700">{violation.source.documentName}</div>
                  <div className="text-xs text-slate-500 mt-1">
                    Page {violation.source.page}, Paragraph {violation.source.paragraph}
                  </div>
                </div>
                <button 
                  onClick={onViewProof}
                  className="ml-auto text-xs bg-white border border-slate-300 px-3 py-1.5 rounded text-indigo-600 font-medium hover:bg-indigo-50 transition-colors"
                >
                  View Proof
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="bg-slate-50 px-6 py-4 flex flex-col sm:flex-row justify-end gap-3 border-t border-slate-100">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors shadow-sm order-3 sm:order-1 mr-auto"
          >
            Go Back & Fix
          </button>
          
          {onAcknowledge && (
            <button 
              onClick={onAcknowledge}
              className="px-4 py-2 bg-amber-50 border border-amber-200 text-amber-900 rounded-md text-sm font-medium hover:bg-amber-100 transition-colors shadow-sm flex items-center justify-center gap-2 order-2"
            >
              <CheckSquare className="w-4 h-4" />
              Mark as Reviewed
            </button>
          )}

          <button 
            onClick={onEscalate}
            className="px-4 py-2 bg-slate-800 text-white rounded-md text-sm font-medium hover:bg-slate-700 transition-colors shadow-sm flex items-center justify-center gap-2 order-1 sm:order-3"
          >
            Submit for Escalation <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
