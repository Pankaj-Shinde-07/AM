import React, { useState } from "react";
import { BookOpen, FileCode, CheckCircle, Play, Cpu, HelpCircle, Binary, GraduationCap, AlertTriangle, Check, Copy } from "lucide-react";
import { PracticalItem } from "./practicalsData";
import { EXTRA_PRACTICALS_INFO } from "./extraPracticalsData";

interface LabDashboardPanelProps {
  activePractical: PracticalItem;
  copiedStates: Record<string, boolean>;
  handleCopyCode: (id: string, code: string) => void;
}

// --- PYTHON CODE SYNTAX HIGHLIGHTER UTILITY ---
const PythonLineHighlight: React.FC<{ line: string }> = ({ line }) => {
  if (line.trim().startsWith("#")) {
    return <span className="text-emerald-400 font-normal">{line}</span>;
  }
  
  let text = line;
  let comment = "";
  const commentIdx = line.indexOf("#");
  if (commentIdx !== -1) {
    text = line.substring(0, commentIdx);
    comment = line.substring(commentIdx);
  }

  const tokenRegex = /(".*?"|'.*?'|\b(?:def|import|from|return|if|else|elif|for|in|while|try|except|and|or|not|print|lambda|float|int|len|sum|dtype)\b|\b\d+(?:\.\d+)?\b)/g;
  const parts = text.split(tokenRegex);
  
  if (parts.length === 1) {
    return (
      <span>
        <span>{text}</span>
        {comment && <span className="text-emerald-500 font-normal italic">{comment}</span>}
      </span>
    );
  }

  return (
    <span>
      {parts.map((part, index) => {
        if (/^(".*?"|'.*?')$/.test(part)) {
          return <span key={index} className="text-amber-300 font-medium">{part}</span>;
        }
        if (/^(def|import|from|return|if|else|elif|for|in|while|try|except|and|or|not|print|lambda|float|int|len|sum|dtype)$/.test(part)) {
          return <span key={index} className="text-indigo-400 font-semibold">{part}</span>;
        }
        if (/^\d+(?:\.\d+)?$/.test(part)) {
          return <span key={index} className="text-orange-400 font-mono">{part}</span>;
        }
        return <span key={index}>{part}</span>;
      })}
      {comment && <span className="text-emerald-500 font-normal italic">{comment}</span>}
    </span>
  );
};

export const LabDashboardPanel: React.FC<LabDashboardPanelProps> = ({
  activePractical,
  copiedStates,
  handleCopyCode
}) => {
  const [activeDetailTab, setActiveDetailTab] = useState<"theory" | "code" | "quiz" | "terminal">("theory");
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [terminalStatus, setTerminalStatus] = useState<Record<string, "idle" | "loading" | "completed">>({});

  const extraInfo = EXTRA_PRACTICALS_INFO[activePractical.id] || {
    detailedTheory: activePractical.theory,
    realWorldApplication: "Standard mathematical programming model context.",
    stepByStepAlgorithm: ["Step 1: Set up input parameters.", "Step 2: Process using appropriate algorithms.", "Step 3: Print solved logs."],
    homeworkQuestions: ["Develop a flowchart for this practical.", "Explain the mathematical edge cases of this algorithm."],
    interactiveQuiz: [
      {
        question: "What is the primary library used to execute this practical solution?",
        options: ["NumPy", "Tkinter", "Requests", "Django"],
        correctIndex: 0,
        explanation: "This solution utilizes NumPy for clean, high-performance mathematical modeling structures."
      }
    ],
    simulatedTerminalOutput: ">>> Process finished with code 0"
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col" id="master-lab-dashboard">
      
      {/* COMPACT ACTIVE META SECTION */}
      <div className="bg-slate-50/50 p-6 border-b border-slate-100 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="bg-indigo-600 text-white font-mono text-[10px] font-extrabold px-3 py-1 rounded-md tracking-wider shadow-sm" id="master-practical-badge">
              PRACTICAL {activePractical.practicalNum}
            </span>
            <span className="text-[9px] bg-slate-200/70 text-slate-600 font-bold px-2 py-1 rounded uppercase tracking-wider">
              {activePractical.category || "General"}
            </span>
          </div>
          <div className="text-[10px] font-mono text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1.5 bg-slate-100/50 px-2.5 py-1 rounded-md">
            <Cpu className="w-3.5 h-3.5 text-indigo-500" /> python 3.x execution compliant
          </div>
        </div>

        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight" id="master-practical-title">
            {activePractical.title}
          </h1>
          <div className="mt-2 text-xs text-slate-600 bg-white border border-slate-150 p-3 rounded-lg italic flex gap-2 items-start shadow-sm shadow-slate-100/30">
            <span className="text-indigo-500 font-bold font-serif text-lg leading-none">“</span>
            <span className="font-medium leading-relaxed">Aim: {activePractical.aim}</span>
          </div>
        </div>

        {/* DASHBOARD TAB CONTAINER SELECTORS */}
        <div className="flex items-center gap-1 border-b border-slate-200 pt-2 -mb-6 overflow-x-auto" id="dashboard-nav-tabs">
          {[
            { id: "theory", label: "Foundations & Theory", icon: BookOpen },
            { id: "code", label: "Verified Python Script", icon: FileCode },
            { id: "quiz", label: "Self-Test Checkpoints", icon: CheckCircle },
            { id: "terminal", label: "Simulated Shell Output", icon: Play }
          ].map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeDetailTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveDetailTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 border-b-2 text-xs font-semibold select-none transition-all cursor-pointer whitespace-nowrap ${
                  isCurrent
                    ? "border-indigo-600 text-indigo-750 font-bold"
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
                }`}
              >
                <Icon className={`w-4 h-4 ${isCurrent ? "text-indigo-600" : "text-slate-400"}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB PANES */}
      <div className="p-6 flex-1 bg-white">
        
        {/* ---> TAB 1: FOUNDATIONS & THEORY */}
        {activeDetailTab === "theory" && (
          <div className="flex flex-col gap-6 animate-fade-in" id="pane-theory">
            
            {/* Detailed Theory block */}
            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
                Theoretical Framework
              </h3>
              <p className="text-xs text-slate-650 leading-relaxed text-justify bg-slate-50/30 p-3.5 rounded-xl border border-slate-100">
                {extraInfo.detailedTheory}
              </p>
            </div>

            {/* Real World Impact callout */}
            {extraInfo.realWorldApplication && (
              <div className="bg-indigo-50/40 border border-indigo-100 p-4 rounded-xl flex items-start gap-3">
                <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600 self-start mt-0.5">
                  <Cpu className="w-4 h-4" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-indigo-850 uppercase tracking-wide">Industry & Engineering Impact</span>
                  <p className="text-xs text-indigo-900 font-medium leading-relaxed">
                    {extraInfo.realWorldApplication}
                  </p>
                </div>
              </div>
            )}

            {/* Formulas & Params panel */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 flex flex-col gap-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1">
                  <Binary className="w-3.5 h-3.5 text-indigo-500" /> Core Mathematical Formulas & Logic
                </span>
                <pre className="font-mono text-[11px] text-slate-700 bg-white border border-slate-200/60 p-3 rounded-lg whitespace-pre-wrap leading-normal font-semibold shadow-inner">
                  {activePractical.formula}
                </pre>
              </div>

              <div className="bg-slate-50 border border-slate-155 rounded-xl p-4 flex flex-col gap-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  Algorithm Inputs & Outputs Specifications
                </span>
                <div className="flex flex-col gap-2 text-xs text-slate-600">
                  <div className="bg-white border border-slate-250/50 p-2.5 rounded-lg flex flex-col gap-1 text-[11px]">
                    <span className="font-bold text-indigo-700 font-sans tracking-wide uppercase text-[9px]">Input Parameters (Variables)</span>
                    <span className="font-mono leading-normal">{activePractical.inputsDesc}</span>
                  </div>
                  <div className="bg-white border border-slate-250/50 p-2.5 rounded-lg flex flex-col gap-1 text-[11px]">
                    <span className="font-bold text-indigo-700 font-sans tracking-wide uppercase text-[9px]">Output Resulting Properties</span>
                    <span className="font-mono leading-normal">{activePractical.outputsDesc}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Step-by-step algorithms */}
            {extraInfo.stepByStepAlgorithm && (
              <div className="flex flex-col gap-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Programmatic & Computational Steps
                </h3>
                <div className="grid grid-cols-1 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-150">
                  {extraInfo.stepByStepAlgorithm.map((step, sIdx) => (
                    <div key={sIdx} className="bg-white px-3.5 py-2.5 rounded-lg border border-slate-200/65 text-xs flex items-start gap-3 shadow-sm">
                      <span className="w-5 h-5 bg-indigo-50 text-indigo-700 border border-indigo-100 font-mono text-[9px] font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        {sIdx + 1}
                      </span>
                      <span className="text-slate-600 leading-relaxed font-normal">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Practice Homework Exercises */}
            {extraInfo.homeworkQuestions && (
              <div className="border-t border-slate-150 pt-5 flex flex-col gap-3">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-indigo-650" />
                  Academic & Practice Exercises
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {extraInfo.homeworkQuestions.map((q, qIndex) => (
                    <div key={qIndex} className="bg-slate-50 border border-slate-200 border-l-4 border-l-indigo-500 p-3.5 rounded-r-xl flex flex-col gap-1.5 shadow-sm">
                      <span className="text-[9px] font-bold text-slate-400 uppercase font-mono">Exercise {qIndex + 1}</span>
                      <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                        {q}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* ---> TAB 2: VERIFIED PYTHON SCRIPT */}
        {activeDetailTab === "code" && (
          <div className="flex flex-col gap-4 animate-fade-in" id="pane-code">
            <div className="flex items-center justify-between bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-lg text-xs">
              <div className="flex items-center gap-2 font-mono">
                <span className="font-semibold text-slate-700">solution.py</span>
                <span className="text-[10px] text-slate-400">| Standard executable python block</span>
              </div>
              <button
                onClick={() => handleCopyCode(activePractical.id, activePractical.code)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 rounded-md text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                {copiedStates[activePractical.id] ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-indigo-600" />
                    <span className="text-indigo-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Script</span>
                  </>
                )}
              </button>
            </div>

            {/* Core Highlighted Area */}
            <div className="bg-slate-900 text-slate-200 rounded-xl overflow-hidden font-mono text-[11px] leading-relaxed select-text shadow-md flex flex-col max-h-[500px]">
              <div className="bg-slate-800/80 px-4 py-2 border-b border-slate-700/60 flex justify-between items-center text-[10px] text-slate-400 font-semibold select-none">
                <span>Python 3 Source Code Representation</span>
                <span className="text-[9px] bg-indigo-950/50 text-indigo-300 font-mono px-1.5 py-0.2 rounded">UTF-8 File</span>
              </div>
              <div className="overflow-auto flex flex-1 p-4">
                {/* Left side code line indexes */}
                <div className="text-slate-500 text-right pr-4 border-r border-slate-800 mr-4 select-none flex flex-col gap-0.5">
                  {activePractical.code.split("\n").map((_, lineIdx) => (
                    <div key={lineIdx} className="h-4 leading-4 font-mono text-[10px] text-slate-600">{lineIdx + 1}</div>
                  ))}
                </div>
                {/* Highlighted text line-by-line */}
                <div className="flex-1 whitespace-pre flex flex-col gap-0.5">
                  {activePractical.code.split("\n").map((line, lineIdx) => {
                    const isEmpty = line.trim() === "";
                    return (
                      <div key={lineIdx} className="min-h-4 leading-4 font-mono">
                        {isEmpty ? <span>&nbsp;</span> : <PythonLineHighlight line={line} />}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Complexity reference analysis card */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Algorithmic Complexity & Environment Specs</span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                <div className="bg-white border border-slate-150 p-2.5 rounded-lg flex flex-col">
                  <span className="text-[9px] text-slate-400 font-semibold uppercase">Execution Standard</span>
                  <span className="text-xs font-bold text-indigo-700 font-mono mt-0.5">Python 3.8+</span>
                </div>
                <div className="bg-white border border-slate-150 p-2.5 rounded-lg flex flex-col">
                  <span className="text-[9px] text-slate-400 font-semibold uppercase">Primary Dependency</span>
                  <span className="text-xs font-bold text-indigo-700 font-mono mt-0.5">NumPy / SciPy</span>
                </div>
                <div className="bg-white border border-slate-150 p-2.5 rounded-lg flex flex-col">
                  <span className="text-[9px] text-slate-400 font-semibold uppercase">Expected Time Complexity</span>
                  <span className="text-xs font-bold text-indigo-700 font-mono mt-0.5">
                    {activePractical.id.includes("matrix-ops") || activePractical.id.includes("eigen") || activePractical.id.includes("gaussian") ? "O(n³)" : "O(n)"}
                  </span>
                </div>
                <div className="bg-white border border-slate-150 p-2.5 rounded-lg flex flex-col">
                  <span className="text-[9px] text-slate-400 font-semibold uppercase">Auxiliary Space Complexity</span>
                  <span className="text-xs font-bold text-indigo-700 font-mono mt-0.5">O(n²)</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ---> TAB 3: SELF-TEST CHECKPOINTS */}
        {activeDetailTab === "quiz" && (
          <div className="flex flex-col gap-6 animate-fade-in" id="pane-quiz">
            <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-indigo-100/80 p-2 rounded-lg text-indigo-750">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Conceptual Assessment & Self-Verification</h4>
                  <p className="text-[10px] text-slate-500">Solve multiple choice questions to verify your theoretical understanding of the practical.</p>
                </div>
              </div>
              <span className="text-xs font-bold font-mono bg-white border border-indigo-100 text-indigo-700 px-3 py-1 rounded-full shadow-sm">
                Checkpoints
              </span>
            </div>

            <div className="flex flex-col gap-6">
              {extraInfo.interactiveQuiz.map((q, qIndex) => {
                const questionKey = `${activePractical.id}-${qIndex}`;
                const selectedIndex = quizAnswers[questionKey];
                const isCorrect = selectedIndex === q.correctIndex;
                const hasAnswered = selectedIndex !== undefined;

                return (
                  <div key={qIndex} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col gap-3.5">
                    <div className="flex items-start gap-3">
                      <span className="bg-slate-100 text-slate-705 text-slate-700 font-mono font-bold text-xs px-2.5 py-1 rounded flex-shrink-0 mt-0.5">
                        Checkpoint {qIndex + 1}
                      </span>
                      <span className="text-xs font-semibold text-slate-800 leading-relaxed pt-0.5">{q.question}</span>
                    </div>

                    <div className="grid grid-cols-1 gap-2 pl-0 sm:pl-8">
                      {q.options.map((opt, optIndex) => {
                        const isSelected = selectedIndex === optIndex;
                        let borderStyle = "border-slate-200 hover:bg-slate-50 hover:border-slate-300";
                        let dotStyle = "border-slate-300";

                        if (hasAnswered) {
                          if (isSelected) {
                            if (isCorrect) {
                              borderStyle = "border-emerald-500 bg-emerald-50 text-emerald-950 border-2";
                              dotStyle = "bg-emerald-500 border-emerald-600";
                            } else {
                              borderStyle = "border-rose-500 bg-rose-50 text-rose-950 border-2";
                              dotStyle = "bg-rose-500 border-rose-600";
                            }
                          } else if (optIndex === q.correctIndex) {
                            borderStyle = "border-emerald-400 bg-emerald-50/50 text-emerald-950 border";
                            dotStyle = "bg-emerald-500 border-emerald-600";
                          } else {
                            borderStyle = "opacity-55 border-slate-100";
                          }
                        }

                        return (
                          <button
                            key={optIndex}
                            disabled={hasAnswered}
                            onClick={() => setQuizAnswers(prev => ({ ...prev, [questionKey]: optIndex }))}
                            className={`w-full text-left p-3.5 rounded-lg border text-xs leading-relaxed flex items-center gap-3 transition-all cursor-pointer ${borderStyle}`}
                          >
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${dotStyle}`}>
                              {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                            </div>
                            <span className="font-medium">{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation alert box */}
                    {hasAnswered && (
                      <div className="mt-2 pl-0 sm:pl-8 animate-fade-in">
                        <div className={`p-4 rounded-xl border text-xs flex flex-col gap-1.5 shadow-sm ${
                          isCorrect 
                            ? "bg-emerald-50/75 border-emerald-200 text-emerald-950" 
                            : "bg-rose-50/75 border-rose-200 text-rose-950"
                        }`}>
                          <div className="flex items-center gap-1.5 font-bold">
                            {isCorrect ? (
                              <div className="flex items-center gap-1.5">
                                <CheckCircle className="w-4 h-4 text-emerald-650 flex-shrink-0" />
                                <span>Correct Answer achieved!</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5">
                                <AlertTriangle className="w-4 h-4 text-rose-650 flex-shrink-0" />
                                <span>Incorrect. Let's learn!</span>
                              </div>
                            )}
                          </div>
                          <p className="font-semibold leading-relaxed mt-0.5">
                            {q.explanation}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ---> TAB 4: SIMULATED SHELL OUTPUT */}
        {activeDetailTab === "terminal" && (
          <div className="flex flex-col gap-5 animate-fade-in" id="pane-terminal">
            
            {/* Explanatory callout for Sandbox execution */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex gap-3 text-xs leading-relaxed shadow-sm">
              <div className="text-indigo-600 bg-indigo-50 p-1.5 rounded-lg h-fit">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-slate-800">Academic Environment Output Emulator</span>
                <p className="text-slate-500">
                  Compile and execute the Python code on our sandbox terminal. This simulates a live terminal output from a university computer running the complete script using proper numerical values.
                </p>
              </div>
            </div>

            {/* The actual styled terminal widget */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col min-h-[350px]" id="sandbox-shell-simulation">
              
              {/* Header chrome shell */}
              <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-800 select-none">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 font-semibold ml-2">bash - sandbox@pyprac-ubuntu:~</span>
                </div>
                <div className="text-[9px] font-mono text-slate-500">
                  active: python3
                </div>
              </div>

              {/* Terminal viewport shell */}
              <div className="p-4 flex-1 font-mono text-[11px] leading-relaxed text-slate-355 space-y-3.5 overflow-y-auto select-text bg-slate-950 max-h-[400px]">
                
                <div className="text-slate-500 select-none leading-normal">
                  Last login: Tuesday May 19 19:10:04 on ttys001<br />
                  pyprac@academic-sandbox:~$ python3 --version<br />
                  Python 3.9.12 (NumPy 1.21.5, SciPy 1.7.3) Included.
                </div>

                <div className="flex gap-1.5 items-center">
                  <span className="text-indigo-400 select-none">pyprac@academic-sandbox:~$</span>
                  <span className="text-slate-100 font-bold">python3 solution.py</span>
                </div>

                {/* Execution Output content based on Terminal status */}
                {(terminalStatus[activePractical.id] || "idle") === "idle" && (
                  <div className="py-12 flex flex-col items-center justify-center text-center gap-4 select-none">
                    <div className="bg-indigo-950/40 text-indigo-400 p-3.5 rounded-full border border-indigo-900/60 animate-pulse">
                      <Play className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-slate-300">Sandbox Python Environment Is Ready.</span>
                      <span className="text-[10.5px] text-slate-500">Press the execution button below to run the verified script and inspect output logs.</span>
                    </div>
                  </div>
                )}

                {(terminalStatus[activePractical.id] || "idle") === "loading" && (
                  <div className="py-12 flex flex-col items-center justify-center text-center gap-3 select-none">
                    <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    <div className="flex flex-col gap-1 mt-2">
                      <span className="text-xs font-bold text-indigo-400 font-mono">[Compiling Python Abstract Syntax Trees]</span>
                      <span className="text-[10px] text-slate-500">Initializing NumPy arrays and probability vectors...</span>
                    </div>
                  </div>
                )}

                {(terminalStatus[activePractical.id] || "idle") === "completed" && (
                  <div className="text-slate-200 whitespace-pre pr-2 leading-relaxed animate-fade-in select-text border-l-2 border-slate-800 pl-3">
                    {extraInfo.simulatedTerminalOutput}
                  </div>
                )}
              </div>
            </div>

            {/* Terminal Action Button Row */}
            <div className="flex items-center gap-3">
              <button
                disabled={(terminalStatus[activePractical.id] || "idle") === "loading"}
                onClick={() => {
                  setTerminalStatus(prev => ({ ...prev, [activePractical.id]: "loading" }));
                  setTimeout(() => {
                    setTerminalStatus(prev => ({ ...prev, [activePractical.id]: "completed" }));
                  }, 600);
                }}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer text-xs shadow-md disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5" />
                {(terminalStatus[activePractical.id] || "idle") === "completed" ? "Restart Execution Stream" : "Run Script in Sandbox Terminal"}
              </button>

              {(terminalStatus[activePractical.id] || "idle") === "completed" && (
                <button
                  onClick={() => {
                    setTerminalStatus(prev => ({ ...prev, [activePractical.id]: "idle" }));
                  }}
                  className="px-3.5 py-2.5 text-xs bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer transition-colors whitespace-nowrap"
                >
                  Reset Terminal
                </button>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
