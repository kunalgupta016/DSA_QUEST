import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

const Level3Code = () => {
  // Goal: Insert 30 at Index 2.
  // Initial: [10, 20, 40, 50, 0]
  // Final: [10, 20, 30, 40, 50]
  const [code, setCode] = useState(
    `// Array: [10, 20, 40, 50, 0]
// Task: Insert 30 at index 2.
// Hint: You must shift elements right (from end) before inserting!

// 1. Shift 50 (at idx 3) to idx 4
// 2. Shift 40 (at idx 2) to idx 3
// 3. Insert 30 at idx 2

`,
  );

  const [memory, setMemory] = useState([10, 20, 40, 50, 0]);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");

  const solution = `
arr[4] = arr[3]; // Move 50
arr[3] = arr[2]; // Move 40
arr[2] = 30;     // Insert 30
`;

  useEffect(() => {
    try {
      let jsCode = code.replace(/\/\/.*$/gm, "");
      jsCode = jsCode.replace(/\bint\s+/g, "let ");
      jsCode = jsCode.replace(/for\s*\(\s*int\s+/g, "for(let "); // loop support

      const runLogic = new Function(`
                let arr = [10, 20, 40, 50, 0];
                ${jsCode}
                return arr;
            `);

      const result = runLogic();

      if (Array.isArray(result) && result.length === 5) {
        setMemory(result);
        // Check exact match
        if (JSON.stringify(result) === JSON.stringify([10, 20, 30, 40, 50])) {
          setCompleted(true);
        } else {
          setCompleted(false);
        }
      }
      setError("");
    } catch (err) {
      // setError(err.message);
    }
  }, [code]);

  return (
    <div className="h-screen bg-[#1e1e1e] text-white flex flex-col pt-20 overflow-hidden">
      <div className="h-16 bg-[#252526] border-b border-[#3e3e42] flex items-center px-4 justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/game/arrays/code"
            className="text-gray-400 hover:text-white"
          >
            ← Maps
          </Link>
          <h1 className="font-bold text-yellow-400">
            Level 3: Insertion (Code Mode)
          </h1>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setCode(solution)}
            className="px-3 py-1 bg-gray-700 text-xs rounded hover:bg-gray-600 border border-gray-600"
          >
            Show Answer
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-1/2 border-r border-[#3e3e42]">
          <Editor
            height="100%"
            defaultLanguage="cpp"
            theme="vs-dark"
            value={code}
            onChange={setCode}
            options={{ fontSize: 14 }}
          />
        </div>

        <div className="w-full md:w-1/2 bg-[#1e1e1e] p-8 flex flex-col items-center">
          <h2 className="text-xl mb-4 text-gray-300">
            Target: <span className="text-green-500">[10, 20, 30, 40, 50]</span>
          </h2>

          <div className="flex gap-2 mb-8">
            {memory.map((val, i) => (
              <motion.div
                layout
                key={i}
                className={`w-16 h-20 border-2 rounded flex flex-col items-center justify-center
                                ${val === 30 && i === 2 ? "bg-green-900 border-green-500" : "bg-gray-800 border-gray-600"}
                            `}
              >
                <span className="text-xl font-bold">{val}</span>
                <span className="text-xs text-gray-500 mt-1">{i}</span>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {completed && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <Link
                  to="/game/arrays/code/4"
                  className="px-8 py-3 bg-green-600 rounded-lg font-bold shadow-lg hover:bg-green-500"
                >
                  Next Challenge →
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Level3Code;
