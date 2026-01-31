import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { motion } from "framer-motion";
import { LANGUAGES, executeCode } from "../../services/CodeExecutionService";

const ChallengeLayout = ({
  title,
  description,
  visualizer: Visualizer,
  initialCode = {},
  expectedOutput,
}) => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(
    initialCode["javascript"] || LANGUAGES["javascript"].defaultCode,
  );
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState("problem"); // 'problem', 'visualizer'

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    setCode(initialCode[newLang] || LANGUAGES[newLang].defaultCode);
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput("Running...");
    const result = await executeCode(language, code);
    setIsRunning(false);

    if (result.run) {
      setOutput(result.run.output);
      // Simple check logic (can be expanded)
      if (
        expectedOutput &&
        result.run.output.trim() === expectedOutput.trim()
      ) {
        setOutput((prev) => prev + "\n\n✅ Test Passed!");
      }
    } else {
      setOutput("Error: " + (result.message || "Unknown error"));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20 flex flex-col md:flex-row h-screen">
      {/* Left Panel: Problem & Visualizer */}
      <div className="w-full md:w-1/2 flex flex-col border-r border-gray-800">
        <div className="flex border-b border-gray-800">
          <button
            onClick={() => setActiveTab("problem")}
            className={`px-6 py-3 font-bold ${activeTab === "problem" ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"}`}
          >
            📝 Problem
          </button>
          {Visualizer && (
            <button
              onClick={() => setActiveTab("visualizer")}
              className={`px-6 py-3 font-bold ${activeTab === "visualizer" ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"}`}
            >
              🎨 Visualizer
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-gray-900/50 relative">
          {activeTab === "problem" ? (
            <div className="prose prose-invert max-w-none">
              <h1 className="text-3xl font-bold mb-4 text-purple-400">
                {title}
              </h1>
              <div className="text-gray-300 whitespace-pre-wrap">
                {description}
              </div>
            </div>
          ) : (
            <div className="h-full">{Visualizer && <Visualizer />}</div>
          )}
        </div>
      </div>

      {/* Right Panel: Editor & Console */}
      <div className="w-full md:w-1/2 flex flex-col bg-[#1e1e1e]">
        {/* Editor Toolbar */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-black">
          <div className="flex items-center gap-4">
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="bg-[#3c3c3c] text-white px-3 py-1 rounded text-sm outline-none focus:ring-1 focus:ring-purple-500"
            >
              {Object.keys(LANGUAGES).map((lang) => (
                <option key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className={`flex items-center gap-2 px-4 py-1.5 rounded font-bold text-sm transition
                            ${isRunning ? "bg-gray-600 cursor-not-allowed" : "bg-green-600 hover:bg-green-500 text-white"}
                        `}
          >
            {isRunning ? "Running..." : "▶ Run Code"}
          </button>
        </div>

        {/* Monaco Editor */}
        <div className="flex-1">
          <Editor
            height="100%"
            theme="vs-dark"
            language={LANGUAGES[language].monacoLanguage}
            value={code}
            onChange={(value) => setCode(value)}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </div>

        {/* Console Output */}
        <div className="h-48 bg-[#1e1e1e] border-t border-gray-700 flex flex-col">
          <div className="px-4 py-2 bg-[#252526] text-xs font-bold text-gray-400 uppercase tracking-wider flex justify-between">
            <span>Console Output</span>
            {activeTab === "visualizer" && (
              <span className="text-yellow-500">
                Note: Visualization runs separately from code
              </span>
            )}
          </div>
          <div className="flex-1 p-4 font-mono text-sm overflow-auto whitespace-pre-wrap text-gray-300">
            {output || (
              <span className="text-gray-600 italic">
                Run your code to see output here...
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeLayout;
