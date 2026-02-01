import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Link } from "react-router";

const Level9Code = () => {
  // [16, 17, 4, 3, 5, 2]
  // Leaders: 17, 5, 2
  // Task: Find max form right.
  const [code, setCode] = useState(
    `// Array: [16, 17, 4, 3, 5, 2]
// Find leaders (elements > all right-side elements)
// Hint: Iterate from right to left. Keep track of 'maxSoFar'.
int maxSoFar = -1;
// Create an array 'leaders' to store them
// Use 'leaders.push(val)' (simplified JS/C++ mix for this game)

`,
  );

  const [array] = useState([16, 17, 4, 3, 5, 2]);
  const [output, setOutput] = useState([]);
  const [completed, setCompleted] = useState(false);

  const solution = `
let maxSoFar = -1;
let leaders = [];
for(let i=5; i>=0; i--) {
    if(arr[i] > maxSoFar) {
        maxSoFar = arr[i];
        leaders.push(arr[i]);
    }
}
// leaders will be [2, 5, 17]
`;

  useEffect(() => {
    try {
      let jsCode = code.replace(/\/\/.*$/gm, "");
      jsCode = jsCode.replace(/\bint\s+/g, "let ");
      jsCode = jsCode.replace(/for\s*\(\s*int\s+/g, "for(let ");

      const runLogic = new Function(`
                let arr = [16, 17, 4, 3, 5, 2];
                let leaders = [];
                ${jsCode}
                return leaders;
            `);

      const res = runLogic();
      if (Array.isArray(res)) {
        setOutput(res);
        // Expect [2, 5, 17] or [17, 5, 2]
        const sorted = [...res].sort((a, b) => a - b);
        if (JSON.stringify(sorted) === JSON.stringify([2, 5, 17]))
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
            Level 9: Leaders (Code Mode)
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
          <h2 className="text-xl mb-8">Find Leaders (Right Max)</h2>

          <div className="flex gap-2 mb-8">
            {array.map((val, i) => (
              <div
                key={i}
                className={`w-14 h-16 border-2 flex flex-col items-center justify-center rounded ${
                  output.includes(val)
                    ? "bg-purple-600 border-purple-400"
                    : "bg-gray-800 border-gray-600"
                }`}
              >
                <span className="text-lg font-bold">{val}</span>
              </div>
            ))}
          </div>

          <h2 className="text-xl mb-8">Leaders Found: {output.join(", ")}</h2>
          {completed && (
            <Link
              to="/game/arrays/code/10"
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

export default Level9Code;
