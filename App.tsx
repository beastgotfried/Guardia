
import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  MoreHorizontal,
  FileText,
  ArrowUpCircle,
  Eye,
  ChevronDown,
  LayoutGrid,
  FolderOpen,
  Menu,
  Bell,
  Search,
  LogOut,
  Settings,
  Users
} from 'lucide-react';

import { SCENARIOS_BY_REGION, MOCK_AUDIT_LOGS } from './constants';
import { RuleMatch, ComplianceCheckResult, CaseStatus, CaseData, AuditLogEntry } from './types';
import { analyzeCaseRules, validateAction } from './services/geminiService';
import { MagicRuleBook } from './components/MagicRuleBook';
import { MistakeStopperModal } from './components/MistakeStopperModal';
import { PDFViewer } from './components/PDFViewer';
import { OutcomeOverlay } from './components/OutcomeOverlay';
import { AuditTimeline } from './components/AuditTimeline';
import { RiskScoreCard } from './components/RiskScoreCard';
import { RiskHistoryChart } from './components/RiskHistoryChart';
import { LandingPage } from './components/LandingPage';
import { JurisdictionSelector } from './components/JurisdictionSelector';

type AppView = 'LOGIN' | 'JURISDICTION' | 'DASHBOARD';

const App: React.FC = () => {
  // Navigation State
  const [currentView, setCurrentView] = useState<AppView>('LOGIN');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>('');

  // App Data State
  const [regionCases, setRegionCases] = useState<CaseData[]>([]);
  const [activeCase, setActiveCase] = useState<CaseData | null>(null);
  const [activeRules, setActiveRules] = useState<RuleMatch[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  
  // UI States
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [viewingPdfRule, setViewingPdfRule] = useState<RuleMatch | null>(null);
  const [isDocsOpen, setIsDocsOpen] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  
  // Outcome States
  const [validationResult, setValidationResult] = useState<ComplianceCheckResult | null>(null);
  const [outcomeStatus, setOutcomeStatus] = useState<CaseStatus | null>(null);

  // Trigger Analysis and Load Logs when Case Changes (Only if in Dashboard)
  useEffect(() => {
    if (currentView !== 'DASHBOARD' || !activeCase) return;

    const initCase = async () => {
      setIsAnalyzing(true);
      setActiveRules([]); 
      setOutcomeStatus(null);
      setIsDocsOpen(true); 
      
      setAuditLogs(MOCK_AUDIT_LOGS[activeCase.id] || []);

      await new Promise(resolve => setTimeout(resolve, 600));
      
      const rules = await analyzeCaseRules(activeCase);
      setActiveRules(rules);
      setIsAnalyzing(false);
    };

    initCase();
  }, [activeCase, currentView]);

  const addAuditLog = (action: string, details: string, actor: 'Agent' | 'System' | 'AI' = 'Agent') => {
    const newLog: AuditLogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actor,
      action,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]); 
  };

  const handleAction = async (actionType: 'Approve' | 'Reject' | 'Escalate') => {
    if (!activeCase) return;
    setIsValidating(true);
    const result = await validateAction(actionType, activeCase, activeRules);
    setIsValidating(false);
    
    if (!result.allowed) {
      setValidationResult(result);
      addAuditLog(actionType + " Attempted", `Blocked by Compliance: ${result.reason}`, 'System');
    } else {
      let newStatus = CaseStatus.NEW;
      if (actionType === 'Approve') newStatus = CaseStatus.APPROVED;
      if (actionType === 'Reject') newStatus = CaseStatus.REJECTED;
      if (actionType === 'Escalate') newStatus = CaseStatus.ESCALATED;
      
      addAuditLog(actionType, "Action successfully verified and processed", 'Agent');
      setOutcomeStatus(newStatus);
    }
  };

  const closeMistakeStopper = () => {
    setValidationResult(null);
  };

  const handleAcknowledge = () => {
    addAuditLog("Compliance Override", "User manually acknowledged warning", 'Agent');
    setValidationResult(null);
  };

  const handleNextCase = () => {
    if (!activeCase) return;
    setOutcomeStatus(null);
    const currentIndex = regionCases.findIndex(c => c.id === activeCase.id);
    const nextIndex = (currentIndex + 1) % regionCases.length;
    setActiveCase(regionCases[nextIndex]);
    window.scrollTo(0,0);
  };

  const openProof = () => {
    if (validationResult?.violation) {
      setViewingPdfRule(validationResult.violation);
      setValidationResult(null); 
    }
  };

  // --- RENDER VIEWS ---

  if (currentView === 'LOGIN') {
    return <LandingPage onLogin={() => setCurrentView('JURISDICTION')} />;
  }

  if (currentView === 'JURISDICTION') {
    return (
      <JurisdictionSelector 
        onSelect={(region) => {
          setSelectedJurisdiction(region);
          // Load specific cases for this region
          const cases = SCENARIOS_BY_REGION[region] || SCENARIOS_BY_REGION["North America"];
          setRegionCases(cases);
          setActiveCase(cases[0]);
          setCurrentView('DASHBOARD');
        }} 
      />
    );
  }

  // --- DASHBOARD VIEW ---

  if (!activeCase) return <div className="flex items-center justify-center h-screen">Loading Case Data...</div>;

  return (
    <div className="min-h-screen flex font-sans text-slate-900 bg-slate-100 overflow-hidden">
      
      {/* Sidebar Navigation */}
      <aside className={`bg-slate-900 text-slate-400 flex flex-col transition-all duration-300 z-30 ${isSidebarCollapsed ? 'w-16' : 'w-64'}`}>
         <div className="h-16 flex items-center justify-center border-b border-slate-800">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-lg">G</div>
            {!isSidebarCollapsed && <span className="ml-3 font-bold text-white tracking-tight">Guardia</span>}
         </div>

         <div className="flex-1 py-6 flex flex-col gap-2">
            {[
              { icon: LayoutGrid, label: 'Dashboard', active: true },
              { icon: Briefcase, label: 'My Cases' },
              { icon: Users, label: 'Team' },
              { icon: FileText, label: 'Documents' },
              { icon: Settings, label: 'Settings' }
            ].map((item, i) => (
              <button 
                key={i}
                className={`flex items-center gap-4 px-4 py-3 mx-2 rounded-lg transition-colors ${item.active ? 'bg-blue-900/50 text-blue-400' : 'hover:bg-slate-800 hover:text-white'}`}
                title={item.label}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!isSidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            ))}
         </div>

         <button 
            onClick={() => setCurrentView('LOGIN')}
            className="p-4 flex items-center gap-4 hover:bg-slate-800 hover:text-white transition-colors border-t border-slate-800"
         >
           <LogOut className="w-5 h-5 shrink-0" />
           {!isSidebarCollapsed && <span className="text-sm font-medium">Sign Out</span>}
         </button>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-20">
          <div className="flex items-center gap-4">
             <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
               <Menu className="w-5 h-5" />
             </button>
             <div className="h-6 w-[1px] bg-slate-200"></div>
             <div className="flex items-center gap-2 text-sm text-slate-500">
               <MapPin className="w-4 h-4" />
               <span className="font-medium text-slate-900">{selectedJurisdiction}</span>
             </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex relative group">
              <select 
                className="appearance-none bg-slate-50 border border-slate-200 hover:border-blue-300 text-slate-700 pl-4 pr-10 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer min-w-[300px] outline-none focus:ring-2 focus:ring-blue-100"
                value={activeCase.id}
                onChange={(e) => {
                  const selected = regionCases.find(c => c.id === e.target.value);
                  if (selected) setActiveCase(selected);
                }}
              >
                {regionCases.map(c => (
                  <option key={c.id} value={c.id}>
                     {c.id} — {c.type} ({c.riskScore > 10 ? 'Review' : 'Auto'} | {c.fraudProbability})
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold border border-indigo-200">
                JD
              </div>
            </div>
          </div>
        </header>

        {/* Case Workspace Body */}
        <main className="flex flex-1 overflow-hidden">
          
          {/* Scrollable Center */}
          <div className="flex-1 flex flex-col relative overflow-y-auto">
            
            {/* Breadcrumbs & Title */}
            <div className="px-8 py-8">
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 uppercase tracking-wider font-bold">
                <span className="text-blue-600">Queue</span> / <span>{activeCase.type}</span> / <span>{activeCase.id}</span>
              </div>
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{activeCase.claimant}</h1>
                <span className={`px-4 py-1.5 rounded-full text-sm font-bold border shadow-sm ${
                  activeCase.status === CaseStatus.NEW ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}>
                  {activeCase.status}
                </span>
              </div>
            </div>

            <div className="px-8 mb-8 grid grid-cols-1 xl:grid-cols-2 gap-6">
              
              {/* Left Col */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                      <DollarSign className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase">Claim Amount</p>
                      <p className="text-xl font-bold text-slate-900 mt-1">
                        {activeCase.currency === 'INR' ? '₹' : (activeCase.currency === 'EUR' ? '€' : (activeCase.currency === 'GBP' ? '£' : (activeCase.currency === 'JPY' ? '¥' : '$')))} {activeCase.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase">Location</p>
                      <p className="text-xl font-bold text-slate-900 mt-1">{activeCase.region}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 col-span-2 pt-4 border-t border-slate-50">
                    <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase">Case Type</p>
                      <p className="text-xl font-bold text-slate-900 mt-1">{activeCase.type}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <RiskScoreCard score={activeCase.riskScore} probability={activeCase.fraudProbability} />
                  <RiskHistoryChart />
                </div>
              </div>

              {/* Right Col */}
              <div className="h-full min-h-[400px]">
                <AuditTimeline logs={auditLogs} />
              </div>
            </div>

            {/* Documents & Description */}
            <div className="px-8 flex-1 space-y-6 pb-32">
              <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4 border-b border-slate-100 pb-3">
                  Incident Description
                </h3>
                <p className="text-slate-600 leading-7 text-base">
                  {activeCase.description}
                </p>
              </div>

              {/* Enhanced Docs Section */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-300">
                <button 
                  onClick={() => setIsDocsOpen(!isDocsOpen)}
                  className="w-full flex items-center justify-between p-6 bg-slate-50/50 hover:bg-slate-50 transition-colors border-b border-slate-100 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-lg shadow-sm group-hover:bg-blue-200 transition-colors">
                      <FolderOpen className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                        Evidence & Documents
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">3 Verified Attachments</p>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isDocsOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isDocsOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-6 bg-slate-50/30">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['Damage_Report_v1.pdf', 'Site_Photos_HighRes.zip', 'Policy_Schedule_Signed.pdf'].map((doc, i) => (
                        <div key={i} className="group relative bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer">
                          <div className="flex justify-between items-start mb-3">
                            <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                               <FileText className="w-5 h-5 text-slate-500" />
                            </div>
                            <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-1 rounded font-bold">VERIFIED</span>
                          </div>
                          <p className="text-sm font-bold text-slate-800 truncate mb-1">{doc}</p>
                          <p className="text-xs text-slate-400">2.4 MB • 2 days ago</p>
                          
                          <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl backdrop-blur-[1px]">
                            <button className="flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 px-4 py-2 rounded-full border border-blue-200 shadow-sm hover:scale-105 transition-transform">
                              <Eye className="w-3 h-3" /> Preview
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4 px-8 flex justify-between items-center z-10 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
              <button className="text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition-colors">
                <MoreHorizontal className="w-6 h-6" />
              </button>
              
              <div className="flex gap-3">
                 <button 
                  onClick={() => handleAction('Reject')}
                  disabled={isValidating}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-all disabled:opacity-50"
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </button>

                <button 
                  onClick={() => handleAction('Escalate')}
                  disabled={isValidating}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 hover:text-indigo-700 hover:border-indigo-200 transition-all disabled:opacity-50"
                >
                  <ArrowUpCircle className="w-4 h-4" />
                  Escalate
                </button>

                <button 
                  onClick={() => handleAction('Approve')}
                  disabled={isValidating}
                  className={`
                    flex items-center gap-2 px-8 py-3 rounded-xl text-white font-bold shadow-lg transition-all
                    ${isValidating ? 'bg-slate-400' : 'bg-slate-900 hover:bg-slate-800 hover:shadow-xl hover:-translate-y-0.5'}
                  `}
                >
                  {isValidating ? (
                    <>Validating...</>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Approve Case
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT: Magic Rule Book Panel */}
          <div className="w-[400px] shrink-0 z-20 hidden xl:block border-l border-slate-200 bg-white shadow-xl">
             <MagicRuleBook 
               isLoading={isAnalyzing} 
               rules={activeRules}
               onViewSource={(rule) => setViewingPdfRule(rule)}
             />
          </div>

        </main>
      </div>

      {/* Overlays */}
      <MistakeStopperModal 
        isOpen={!!validationResult && !validationResult.allowed}
        reason={validationResult?.reason || ''}
        violation={validationResult?.violation}
        onClose={closeMistakeStopper}
        onViewProof={openProof}
        onAcknowledge={handleAcknowledge}
        onEscalate={() => {
          setValidationResult(null);
          handleAction('Escalate');
        }}
      />

      <OutcomeOverlay 
        isOpen={!!outcomeStatus}
        status={outcomeStatus || CaseStatus.NEW}
        caseId={activeCase.id}
        riskScore={activeCase.riskScore}
        onReset={handleNextCase}
      />

      <PDFViewer 
        isOpen={!!viewingPdfRule}
        snippet={viewingPdfRule ? viewingPdfRule.source : null}
        onClose={() => setViewingPdfRule(null)}
      />

    </div>
  );
};

export default App;
