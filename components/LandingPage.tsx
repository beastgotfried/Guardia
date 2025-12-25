
import React, { useState } from 'react';
import { ShieldCheck, Lock, ChevronRight, Activity, Globe, FileCheck } from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('agent@guardia-ai.com');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate auth delay
    setTimeout(() => {
      onLogin();
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col md:flex-row font-sans text-white overflow-hidden">
      
      {/* Left: Brand & Value Prop */}
      <div className="flex-1 p-12 flex flex-col justify-between relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
           <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600 rounded-full blur-[120px]"></div>
           <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">Guardia</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Compliance <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              Intelligence
            </span>
            <br/> for the Enterprise.
          </h1>
          
          <p className="text-slate-400 text-lg max-w-md leading-relaxed mb-8">
            Don't replace human judgment. Protect it with verified intelligence at the exact moment of decision.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
            <div className="bg-white/5 border border-white/10 p-4 rounded-lg backdrop-blur-sm">
              <Activity className="w-6 h-6 text-emerald-400 mb-2" />
              <h3 className="font-semibold text-sm">Mistake Stopper</h3>
              <p className="text-xs text-slate-400 mt-1">Real-time guardrails prevent costly policy violations.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-lg backdrop-blur-sm">
              <FileCheck className="w-6 h-6 text-amber-400 mb-2" />
              <h3 className="font-semibold text-sm">Magic Rule Book</h3>
              <p className="text-xs text-slate-400 mt-1">Context-aware policy retrieval without keyword search.</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-xs text-slate-500 mt-12">
          <span>© 2024 Guardia AI Systems</span>
          <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
          <span>SOC2 Compliant</span>
          <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
          <span>v2.4.0-stable</span>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="w-full md:w-[480px] bg-white text-slate-900 p-12 flex flex-col justify-center shadow-2xl z-20">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome back</h2>
          <p className="text-slate-500">Please access the secure case management portal.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Enterprise ID / Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
            <div className="relative">
              <input 
                type="password" 
                defaultValue="password123"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
              <Lock className="absolute right-3 top-3.5 w-4 h-4 text-slate-400" />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" defaultChecked />
              <span className="text-slate-600">Remember device</span>
            </label>
            <a href="#" className="text-blue-600 font-medium hover:underline">SSO Login</a>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                Access Workspace <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-center gap-2 text-slate-400 text-sm">
           <Globe className="w-4 h-4" />
           <span>Secure Connection • 256-bit Encryption</span>
        </div>
      </div>
    </div>
  );
};
