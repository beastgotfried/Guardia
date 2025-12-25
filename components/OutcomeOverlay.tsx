
import React from 'react';
import { CheckCircle, XCircle, ArrowUpCircle, RefreshCw, FileText, Shield, Clock } from 'lucide-react';
import { CaseStatus } from '../types';

interface OutcomeOverlayProps {
  isOpen: boolean;
  status: CaseStatus;
  caseId: string;
  riskScore: number;
  onReset: () => void;
}

export const OutcomeOverlay: React.FC<OutcomeOverlayProps> = ({ isOpen, status, caseId, riskScore, onReset }) => {
  if (!isOpen) return null;

  let title = "";
  let subtext = "";
  let icon = null;
  let bgClass = "";
  let textClass = "";
  let borderClass = "";

  switch (status) {
    case CaseStatus.APPROVED:
      title = "Payment Authorized";
      subtext = "Transaction scheduled for immediate clearing.";
      icon = <CheckCircle className="w-16 h-16 text-emerald-600" />;
      bgClass = "bg-emerald-50";
      textClass = "text-emerald-800";
      borderClass = "border-emerald-200";
      break;
    case CaseStatus.REJECTED:
      title = "Claim Denied";
      subtext = "Rejection notice generated and queued for review.";
      icon = <XCircle className="w-16 h-16 text-red-600" />;
      bgClass = "bg-red-50";
      textClass = "text-red-800";
      borderClass = "border-red-200";
      break;
    case CaseStatus.ESCALATED:
      title = "Escalated to Senior Desk";
      subtext = "Case transferred to Priority Queue (Level 3).";
      icon = <ArrowUpCircle className="w-16 h-16 text-indigo-600" />;
      bgClass = "bg-indigo-50";
      textClass = "text-indigo-800";
      borderClass = "border-indigo-200";
      break;
    default:
      return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header - Invoice Style */}
        <div className="bg-slate-50 border-b border-slate-200 p-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-slate-400" />
            <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Final Report</span>
          </div>
          <span className="font-mono text-xs text-slate-400">{new Date().toLocaleDateString()}</span>
        </div>

        {/* Main Result */}
        <div className="p-8 text-center">
          <div className={`mx-auto w-24 h-24 rounded-full ${bgClass} flex items-center justify-center mb-6`}>
            {icon}
          </div>
          
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
          <p className="text-slate-500 mb-8">{subtext}</p>
          
          {/* Data Grid */}
          <div className="grid grid-cols-2 gap-4 text-left mb-8">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <p className="text-xs text-slate-400 uppercase font-bold mb-1">Risk Score Analysis</p>
              <div className="flex items-center gap-2">
                <span className={`text-2xl font-bold ${riskScore > 50 ? 'text-red-600' : 'text-emerald-600'}`}>
                  {riskScore}/100
                </span>
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-white border border-slate-200">
                  {riskScore > 80 ? 'CRITICAL' : riskScore > 40 ? 'MODERATE' : 'SAFE'}
                </span>
              </div>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <p className="text-xs text-slate-400 uppercase font-bold mb-1">Processing Time</p>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-slate-400" />
                <span className="text-xl font-bold text-slate-700">0.8s</span>
              </div>
            </div>

            <div className="col-span-2 bg-slate-50 p-4 rounded-lg border border-slate-100 flex justify-between items-center">
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold mb-1">Transaction Ref</p>
                <p className="font-mono text-sm text-slate-700">{caseId}-ACT-8821</p>
              </div>
              <FileText className="w-8 h-8 text-slate-300" />
            </div>
          </div>

          <button 
            onClick={onReset}
            className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            <RefreshCw className="w-4 h-4" />
            Process Next Case
          </button>
        </div>
        
        {/* Footer */}
        <div className={`h-2 w-full ${bgClass.replace('bg-', 'bg-gradient-to-r from-transparent via-')}${textClass.replace('text-', 'to-')}`}></div>
      </div>
    </div>
  );
};
