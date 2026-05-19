import React, { useState, useMemo } from "react";
import { BookOpen, FileCode, CheckCircle, Play, Cpu, Layers, Activity, Search } from "lucide-react";
import { PRACTICALS, PracticalItem } from "./practicalsData";
import { LabDashboardPanel } from "./LabDashboardPanel";

export default function App() {
  const [activeTabId, setActiveTabId] = useState<string>("1a-matrix-ops");
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const activePractical = useMemo(() => {
    return PRACTICALS.find(p => p.id === activeTabId) || PRACTICALS[0];
  }, [activeTabId]);

  const categories = useMemo(() => [
    "All", 
    "Linear Algebra", 
    "Probability Distributions", 
    "Hypothesis Testing", 
    "Stochastic Processes", 
    "Correlation & Regression", 
    "Numerical Methods"
  ], []);

  const filteredPracticals = useMemo(() => {
    return PRACTICALS.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.practicalNum.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.aim.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = activeCategory === "All" || p.category === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchQuery, activeCategory]);

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedStates(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      
      {/* HEADER SECTION (LIGHT THEME MINIMAL) */}
      <header className="bg-white border-b border-slate-200/80 px-6 py-4 sticky top-0 z-40 shadow-sm shadow-slate-100/50">
        <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-mono flex items-center justify-center text-lg font-black shadow-md shadow-indigo-600/15">
              π
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                MathPy Solutions
                <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full uppercase tracking-wider">
                  Academic Lab Companion
                </span>
              </h1>
              <p className="text-xs text-slate-500">
                Simulated execution environment and conceptual guides for Python scientific computations and numerical analysis.
              </p>
            </div>
          </div>
          
          {/* SEARCH & ACCESSIBILITY FILTERS */}
          <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
            <div className="relative flex-1 md:flex-initial">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input 
                id="search-input"
                type="text"
                placeholder="Search practical tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-2 text-xs bg-slate-50/80 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 min-w-[200px] w-full"
              />
            </div>
            <select
              id="category-select"
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50/80 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium text-slate-705 cursor-pointer"
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* DETAILED DUAL-COLUMN LAYOUT */}
      <main className="max-w-7xl w-full mx-auto px-4 md:px-6 py-6 flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* LEFT COLUMN: PRACTICALS LIST SIDEBAR */}
        <aside className="lg:col-span-1 flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col gap-3 shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
              <span>Practicals Index</span>
              <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-bold font-mono">
                {filteredPracticals.length} / {PRACTICALS.length}
              </span>
            </h2>

            <div className="flex flex-col gap-1 max-h-[580px] overflow-y-auto pr-1" id="sidebar-practicals-list">
              {filteredPracticals.map((p) => {
                const isActive = p.id === activeTabId;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setActiveTabId(p.id);
                    }}
                    className={`w-full text-left p-3 rounded-xl transition-all flex flex-col gap-1 cursor-pointer hover:translate-x-0.5 active:scale-[0.98] select-none ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                        : "hover:bg-slate-50 border border-transparent text-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded ${
                        isActive ? "bg-indigo-500 text-white font-extrabold" : "bg-slate-100 text-slate-500 font-bold"
                      }`}>
                        PRACTICAL {p.practicalNum}
                      </span>
                    </div>
                    <span className="text-xs font-bold leading-normal mt-0.5">{p.title}</span>
                  </button>
                );
              })}
              {filteredPracticals.length === 0 && (
                <div className="text-center py-8 text-xs text-slate-400 font-medium">
                  No matching tasks found.
                </div>
              )}
            </div>
          </div>

          {/* ACADEMIC ENVIRONMENT GUIDELINES CARD */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <Activity className="w-3.5 h-3.5 text-indigo-500" />
              Environment Specs
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Programs are fully formatted with Python 3 syntax using raw computations, and 
              importing certified frameworks: <code className="bg-slate-100 px-1 py-0.2 rounded font-mono text-[10px] text-indigo-650 font-bold">numpy</code>, <code className="bg-slate-100 px-1 py-0.2 rounded font-mono text-[10px] text-indigo-650 font-bold font-semibold">scipy.stats</code>, and <code className="bg-slate-100 px-1 py-0.2 rounded font-mono text-[10px] text-indigo-650 font-bold font-semibold">matplotlib</code>.
            </p>
          </div>
        </aside>

        {/* RIGHT COLUMN: ACTIVE EDUCATIONAL LAB WORKSPACE PANEL */}
        <section className="lg:col-span-3 flex flex-col gap-6" id="playground-viewport">
          <LabDashboardPanel 
            activePractical={activePractical}
            copiedStates={copiedStates}
            handleCopyCode={handleCopyCode}
          />
        </section>

      </main>

      {/* FOOTER ACADEMIC CREDITS */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-6 px-6 mt-12 text-center text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-medium text-slate-500">
            &copy; 2026 PyPrac Lab Companion. All math modules calculated locally in Sandbox.
          </p>
          <div className="flex gap-3 text-slate-500">
            <span>NumPy</span> &bull; <span>SciPy Stats</span> &bull; <span>Matplotlib Profiles</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
