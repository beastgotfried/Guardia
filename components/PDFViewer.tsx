import React from 'react';
import { X, FileText } from 'lucide-react';
import { PolicySnippet } from '../types';

interface PDFViewerProps {
  isOpen: boolean;
  onClose: () => void;
  snippet: PolicySnippet | null;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ isOpen, onClose, snippet }) => {
  if (!isOpen || !snippet) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl h-[85vh] rounded-lg shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-800 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-blue-300" />
            <div>
              <h3 className="font-semibold text-sm tracking-wide">{snippet.documentName}</h3>
              <p className="text-xs text-slate-400">Page {snippet.page} • Official Policy Document</p>
            </div>
          </div>
          <button onClick={onClose} className="hover:bg-slate-700 p-2 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PDF Content Simulation */}
        <div className="flex-1 overflow-y-auto bg-slate-100 p-8 relative">
          <div className="max-w-3xl mx-auto bg-white shadow-lg min-h-full p-12 text-slate-800 font-serif leading-relaxed">
            {/* Header of Page */}
            <div className="border-b-2 border-slate-200 mb-8 pb-4 flex justify-between items-end text-slate-400 font-sans text-xs uppercase tracking-widest">
              <span>Enterprise Claims Standard</span>
              <span>Page {snippet.page}</span>
            </div>

            {/* Simulated Previous Paragraphs */}
            <div className="opacity-40 blur-[1px] select-none mb-6">
              <p className="mb-4">12.2. In the event of catastrophic loss, primary agents are authorized to disburse emergency funds up to the limit defined in Section 4.1, provided the claimant has passed identity verification.</p>
              <p className="mb-4">12.3. Documentation requirements for standard claims include photos of damage, proof of ownership, and police reports where applicable.</p>
            </div>

            {/* TARGET PARAGRAPH - HIGHLIGHTED */}
            <div className="relative group">
              <div className="absolute -left-6 top-0 bottom-0 w-1 bg-yellow-400 rounded-full"></div>
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md shadow-sm transition-all">
                <span className="font-bold text-slate-900 mr-2">{snippet.paragraph}</span>
                <span className="text-slate-900">{snippet.text}</span>
              </div>
              <div className="absolute -right-24 top-2 bg-blue-600 text-white text-[10px] px-2 py-1 rounded shadow animate-pulse">
                Current Reference
              </div>
            </div>

            {/* Simulated Next Paragraphs */}
            <div className="opacity-40 blur-[1px] select-none mt-6">
              <p className="mb-4">12.5. Exception handling for VIP clients must be routed through the Regional Director's office. Standard SLAs do not apply to Executive Platinum accounts.</p>
              <p>13.1. Fraud detection algorithms are run automatically on all submissions. A score above 75 triggers an immediate freeze.</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
