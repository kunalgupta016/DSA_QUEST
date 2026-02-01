import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

const Level7Code = () => {
  // Rotate Right by 1
  // [1, 2, 3, 4, 5] -> [5, 1, 2, 3, 4]
  const [code, setCode] = useState(
    `// Array: [1, 2, 3, 4, 5]
// Task: Rotate array right by 1 position.
// 1. Save last element
// 2. Shift others right
// 3. Put last at front

int last = arr[4];
// ... shift loop ...
arr[0] = last;
`,
  );

  const [memory, setMemory] = useState([1, 2, 3, 4, 5]);
  const [completed, setCompleted] = useState(false);

  const solution = `
int last = arr[4];
for(int i=4; i>0; i--) {
    arr[i] = arr[i-1];
}
arr[0] = last;
`;

  useEffect(() => {
    try {
      let jsCode = code.replace(/\/\/.*$/gm, "");
      jsCode = jsCode.replace(/\bint\s+/g, "let ");
      jsCode = jsCode.replace(/for\s*\(\s*int\s+/g, "for(let ");

      const runLogic = new Function(`
                let arr = [1, 2, 3, 4, 5];
                ${jsCode}
                return arr;
            `);

      const result = runLogic();
      if (Array.isArray(result)) {
        setMemory(result);
        if (JSON.stringify(result) === JSON.stringify([5, 1, 2, 3, 4]))
          setCompleted(true);
        else setCompleted(false);
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
            Level 7: Rotate (Code Mode)
          </h1>
        </div>
        <button
          onClick={() => setCode(solution)}
          className="px-3 py-1 bg-gray-700 text-xs rounded hover:bg-gray-600 border border-gray-600"
        >
          Show Answer
        </button>
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
          <h2 className="text-xl mb-8">Target: [5, 1, 2, 3, 4]</h2>
          <div className="flex gap-2 mb-8">
            {memory.map((val, i) => (
              <div
                key={i}
                className="w-16 h-20 border-2 border-gray-600 bg-gray-800 rounded flex flex-col items-center justify-center"
              >
                <span className="text-xl font-bold">{val}</span>
              </div>
            ))}
          </div>
          {completed && (
            <Link
              to="/game/arrays/code/8"
              className="px-8 py-3 bg-green-600 rounded"
            >
              Next
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Level7Code;
