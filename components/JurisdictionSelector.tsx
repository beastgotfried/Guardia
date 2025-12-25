
import React, { useState } from 'react';
import { Globe2, MapPin, TrendingUp, AlertCircle, ArrowRight } from 'lucide-react';

interface JurisdictionSelectorProps {
  onSelect: (region: string) => void;
}

export const JurisdictionSelector: React.FC<JurisdictionSelectorProps> = ({ onSelect }) => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const regions = [
    {
      id: 'NA',
      name: 'North America',
      status: 'Active',
      cases: 124,
      risk: 'Medium',
      color: 'blue'
    },
    {
      id: 'EMEA',
      name: 'EMEA',
      status: 'Critical Load',
      cases: 89,
      risk: 'High',
      color: 'indigo'
    },
    {
      id: 'APAC',
      name: 'Asia Pacific',
      status: 'Stable',
      cases: 204,
      risk: 'Low',
      color: 'emerald'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-5xl w-full">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <Globe2 className="w-3 h-3" />
            Global Command Center
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Select Operation Jurisdiction</h1>
          <p className="text-slate-500">Access local policy frameworks and active case queues.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => onSelect(region.name)}
              onMouseEnter={() => setHoveredRegion(region.id)}
              onMouseLeave={() => setHoveredRegion(null)}
              className={`
                relative group overflow-hidden rounded-2xl border-2 transition-all duration-300 text-left
                ${hoveredRegion === region.id 
                  ? 'border-slate-900 shadow-xl -translate-y-1' 
                  : 'border-slate-200 bg-white shadow-sm hover:border-slate-300'}
              `}
            >
              {/* Map/Bg Pattern */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-${region.color}-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-50`}></div>
              
              <div className="p-8 relative z-10 h-full flex flex-col">
                <div className="flex justify-between items-start mb-6">
                   <div className={`p-3 rounded-lg bg-${region.color}-100 text-${region.color}-700`}>
                     <MapPin className="w-6 h-6" />
                   </div>
                   <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5
                     ${region.risk === 'High' ? 'bg-red-100 text-red-700' : 
                       region.risk === 'Medium' ? 'bg-amber-100 text-amber-700' : 
                       'bg-emerald-100 text-emerald-700'}
                   `}>
                     {region.risk === 'High' && <AlertCircle className="w-3 h-3" />}
                     {region.risk} Risk
                   </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-1">{region.name}</h3>
                <p className="text-sm text-slate-500 mb-6">{region.status}</p>

                <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="block text-2xl font-bold text-slate-900">{region.cases}</span>
                    <span className="text-xs text-slate-500 font-medium uppercase">Active Cases</span>
                  </div>
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                    ${hoveredRegion === region.id ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-400'}
                  `}>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-8 text-slate-400 text-sm font-medium">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                 Global Policy Sync: Active
               </div>
               <div className="flex items-center gap-2">
                 <TrendingUp className="w-4 h-4" />
                 Compliance Rate: 99.4%
               </div>
            </div>
        </div>

      </div>
    </div>
  );
};
