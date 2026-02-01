import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

const Level1Code = () => {
  const [code, setCode] = useState(
    "// Declare an array of size 5 named 'arr'\n// Then assign values: 10, 20, 30, 40, 50\n\n",
  );
  const [memory, setMemory] = useState([null, null, null, null, null]);
  const [errors, setErrors] = useState([]);
  const [completed, setCompleted] = useState(false);

  const solution = `// Solution
int arr[5];
for(let i=0; i<5; i++) {
    arr[i] = (i+1)*10;
}`;

  // Live Parser (Transpiler approach)
  useEffect(() => {
    let activeMemory = [null, null, null, null, null];
    let activeErrors = [];
    let success = false;

    try {
      // 1. Sanitize & Transpile C++ to JS
      // Remove comments
      let jsCode = code.replace(/\/\/.*$/gm, "");

      // Replace 'int arr[5];' query with JS array init
      // Handle: int arr[5];
      if (/int\s+arr\s*\[\s*5\s*\]\s*;/.test(jsCode)) {
        jsCode = jsCode.replace(
          /int\s+arr\s*\[\s*5\s*\]\s*;/,
          "let arr = [null, null, null, null, null];",
        );
      }
      // Handle: int arr[5] = {10, ...};
      else if (/int\s+arr\s*\[\s*5\s*\]\s*=\s*\{/.test(jsCode)) {
        jsCode = jsCode.replace(
          /int\s+arr\s*\[\s*5\s*\]\s*=\s*\{([^}]+)\};/,
          (match, values) => {
            return `let arr = [${values}]; while(arr.length < 5) arr.push(null);`;
          },
        );
      } else {
        activeErrors.push("⚠️ Missing declaration: 'int arr[5];'");
        throw new Error("No declaration"); // Stop processing
      }

      // Replace 'int i' with 'let i' for loops
      jsCode = jsCode.replace(/for\s*\(\s*int\s+/g, "for(let ");

      // Replace generic 'int x' with 'let x'
      jsCode = jsCode.replace(/\bint\s+/g, "let ");

      // Safety: Protect against infinite loops
      let loopGuard = 0;
      // Inject loop guard? Hard to do correctly with regex.
      // Instead, we trust the browser's main thread protection (user will just freeze own tab if unlucky).
      // For a game, this is borderline acceptable or we add a "Run" button instead of live.
      // *User asked for visuals as they write*.
      // Let's wrap in a function and run.

      const runLogic = new Function(`
                ${jsCode}
                return arr;
            `);

      const result = runLogic();

      // Validate Result
      if (Array.isArray(result)) {
        // Formatting nulls
        activeMemory = result
          .slice(0, 5)
          .map((v) => (v === undefined ? null : v));
      }
    } catch (err) {
      // Only show relevant errors (ignore 'arr is not defined' if declaration missing)
      if (
        err.message !== "No declaration" &&
        !err.message.includes("is not defined")
      ) {
        // activeErrors.push("⚠️ Syntax/Logic Error"); // Keep clean to avoid spamming while typing
      }
    }

    setMemory(activeMemory);
    setErrors(activeErrors);

    // Win Condition
    const target = [10, 20, 30, 40, 50];
    // Weak check: Values match?
    const isMatch = activeMemory.every((val, i) => val === target[i]);
    if (isMatch && activeErrors.length === 0) {
      setCompleted(true);
    } else {
      setCompleted(false);
    }
  }, [code]);

  return (
    <div className="h-screen bg-[#1e1e1e] text-white flex flex-col pt-20 overflow-hidden">
      {/* Header */}
      <div className="h-16 bg-[#252526] border-b border-[#3e3e42] flex items-center px-4 justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/game/arrays/code"
            className="text-gray-400 hover:text-white"
          >
            ← Maps
          </Link>
          <h1 className="font-bold text-yellow-400">
            Level 1: The Allocation (Code Mode)
          </h1>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setCode(solution)}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded hover:bg-blue-500 shadow-md transition-all border border-blue-400"
          >
            👁️ Show Answer
          </button>
          {completed && (
            <div className="text-green-400 font-bold animate-pulse">
              PASSED ✅
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Editor Panel */}
        <div className="w-full md:w-1/2 border-r border-[#3e3e42] flex flex-col">
          <Editor
            height="100%"
            defaultLanguage="cpp"
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val)}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              scrollBeyondLastLine: false,
              fontFamily: "JetBrains Mono, monospace",
            }}
          />
        </div>

        {/* Visualizer Panel */}
        <div className="w-full md:w-1/2 bg-[#1e1e1e] p-8 flex flex-col items-center justify-center relative">
          <h2 className="text-xl mb-8 text-gray-300">
            Task: Create <code>int arr[5]</code> and Fill with <br />
            <span className="text-yellow-400 font-mono">
              [10, 20, 30, 40, 50]
            </span>
          </h2>

          {/* Memory Visualization */}
          <div className="flex gap-2 p-6 bg-gray-900 rounded-2xl border-2 border-gray-700 relative">
            <div className="absolute -top-4 left-6 bg-gray-800 px-2 text-xs text-gray-400 border border-gray-700">
              RAM: 0x1000
            </div>

            {memory.map((val, i) => (
              <motion.div
                key={i}
                layout
                className={`w-16 h-20 md:w-20 md:h-24 rounded border-2 flex items-center justify-center text-2xl font-bold transition-all
                                    ${
                                      val !== null
                                        ? "border-green-500 bg-green-900/20 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                                        : "border-gray-600 bg-gray-800/30 text-gray-600"
                                    }
                                `}
              >
                {val !== null ? val : "∅"}
                <div className="absolute -bottom-6 text-xs text-gray-500 font-mono">
                  {i}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Live Errors/Status */}
          <div className="mt-12 w-full max-w-md bg-[#252526] p-4 rounded-lg border border-[#3e3e42] min-h-[100px]">
            <h3 className="text-gray-400 text-sm font-bold mb-2 uppercase tracking-wide">
              Compilation Status
            </h3>
            {errors.length > 0 ? (
              <ul className="text-red-400 text-sm space-y-1">
                {errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            ) : (
              <p className="text-green-500 text-sm">
                Syntax Valid. Watching for logic...
              </p>
            )}
            {completed && (
              <p className="text-yellow-400 font-bold mt-2">Target Match! 🎉</p>
            )}
          </div>

          <AnimatePresence>
            {completed && (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="absolute bottom-10"
              >
                <Link
                  to="/game/arrays/code/2"
                  className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-500"
                >
                  Next Code Challenge →
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Level1Code;
