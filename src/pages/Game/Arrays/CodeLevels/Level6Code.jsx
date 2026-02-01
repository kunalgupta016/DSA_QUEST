import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

const Level6Code = () => {
  // Binary Search
  const [array] = useState([10, 20, 30, 40, 50, 60, 70, 80]);
  // Code task: Implement binary search logic in loop
  const [code, setCode] = useState(
    `// Values: [10, 20, 30, 40, 50, 60, 70, 80]
// Target: 70
// Variables 'low' and 'high' are pre-declared.
// Task: Write the loop to update low/high and find 'mid'.
// If arr[mid] == target, set foundIndex = mid.

int low = 0;
int high = 7;
int foundIndex = -1;
int target = 70;

while(low <= high) {
    int mid = Math.floor((low + high) / 2);
    // Write your logic here...
    
    // Safety break for loop
    break; 
}
`,
  );

  const [completed, setCompleted] = useState(false);
  const [foundIndex, setFoundIndex] = useState(-1);

  const solution = `
while(low <= high) {
    int mid = Math.floor((low + high) / 2);
    if (arr[mid] == target) {
        foundIndex = mid;
        break;
    } else if (arr[mid] < target) {
        low = mid + 1;
    } else {
        high = mid - 1;
    }
}
`;

  useEffect(() => {
    try {
      let jsCode = code.replace(/\/\/.*$/gm, "");
      jsCode = jsCode.replace(/\bint\s+/g, "let ");

      // Loop guard against infinite while loops
      // We'll replace 'while' with a for loop limited to 20 iter
      jsCode = jsCode.replace(
        /while\s*\(([^)]+)\)/,
        "for(let _iter=0; _iter<20 && ($1); _iter++)",
      );

      const runLogic = new Function(`
                let arr = [10, 20, 30, 40, 50, 60, 70, 80];
                let low = 0, high = 7, foundIndex = -1, target = 70;
                ${jsCode}
                return foundIndex;
            `);

      const result = runLogic();
      setFoundIndex(result);
      if (result === 6) setCompleted(true);
      else setCompleted(false);
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
            Level 6: Binary Search (Code Mode)
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
          <h2 className="text-xl mb-8">Find 70 in Sorted Array</h2>

          {/* Visualization */}
          <div className="flex gap-2 mb-8">
            {array.map((val, i) => (
              <div
                key={i}
                className={`w-12 h-16 border-2 flex flex-col items-center justify-center rounded ${
                  i === foundIndex
                    ? "bg-green-600 border-green-400"
                    : "bg-gray-800 border-gray-600"
                }`}
              >
                <span className="text-lg font-bold">{val}</span>
                <span className="text-[10px] text-gray-500">{i}</span>
              </div>
            ))}
          </div>

          <div className="mb-8 font-mono text-2xl">
            Found Index:{" "}
            <span
              className={foundIndex === 6 ? "text-green-500" : "text-red-500"}
            >
              {foundIndex}
            </span>
          </div>
          {completed && (
            <Link
              to="/game/arrays/code/7"
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

export default Level6Code;
