import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

const Level5Code = () => {
  // Goal: Find index of 42.
  // Array: [15, 8, 42, 99, 4]

  const [code, setCode] = useState(
    `// Array: [15, 8, 42, 99, 4]
// Task: Find the index of value 42.
// Store result in variable 'foundIndex'.

int foundIndex = -1;
int target = 42;

for(int i=0; i<5; i++) {
    // Check if arr[i] is target
    // If yes, update foundIndex
}
`,
  );

  const [foundIndex, setFoundIndex] = useState(-1);
  const [completed, setCompleted] = useState(false);

  const solution = `
for(int i=0; i<5; i++) {
    if(arr[i] == target) {
        foundIndex = i;
        break;
    }
}
`;

  useEffect(() => {
    try {
      let jsCode = code.replace(/\/\/.*$/gm, "");
      jsCode = jsCode.replace(/\bint\s+/g, "let ");
      jsCode = jsCode.replace(/for\s*\(\s*int\s+/g, "for(let ");

      const runLogic = new Function(`
                let arr = [15, 8, 42, 99, 4];
                let foundIndex = -1;
                let target = 42;
                ${jsCode}
                return foundIndex;
            `);

      const result = runLogic();
      setFoundIndex(result);

      if (result === 2) {
        setCompleted(true);
      } else {
        setCompleted(false);
      }
    } catch (err) {}
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
            Level 5: Search (Code Mode)
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
          <h2 className="text-xl mb-8 text-gray-300">
            Find Index of <span className="text-yellow-400 font-bold">42</span>
          </h2>

          <div className="flex gap-2 mb-12">
            {[15, 8, 42, 99, 4].map((val, i) => (
              <div
                key={i}
                className={`w-16 h-20 border-2 rounded flex flex-col items-center justify-center
                                ${i === foundIndex ? "bg-green-900 border-green-500 shadow-[0_0_20px_lime]" : "bg-gray-800 border-gray-600"}
                            `}
              >
                <span className="text-xl font-bold">{val}</span>
                <span className="text-xs text-gray-500 mt-1">{i}</span>
              </div>
            ))}
          </div>

          <div className="mb-8 p-4 bg-gray-900 border border-gray-700 rounded-lg">
            <span className="text-gray-400 mr-2">foundIndex =</span>
            <span
              className={`font-mono font-bold ${foundIndex === 2 ? "text-green-400" : "text-red-400"}`}
            >
              {foundIndex}
            </span>
          </div>

          <AnimatePresence>
            {completed && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <Link
                  to="/game/arrays/code/6"
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

export default Level5Code;
