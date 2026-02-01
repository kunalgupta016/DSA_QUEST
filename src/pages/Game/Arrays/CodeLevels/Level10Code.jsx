import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Link } from "react-router";

const Level10Code = () => {
  // Max Subarray Sum
  const [array] = useState([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
  // [-2, 1, -3, 4, -1, 2, 1, -5, 4]
  // Max: 6
  const [code, setCode] = useState(
    `// Array: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
// Task: Find Maximum Subarray Sum (Kadane's Algo)
// Store result in 'maxSum'

int currSum = 0;
int maxSum = -999;

for(int i=0; i<9; i++) {
    // 1. Add arr[i] to currSum
    // 2. Update maxSum if currSum > maxSum
    // 3. If currSum < 0, reset it to 0
}
`,
  );

  const [maxResult, setMaxResult] = useState(-999);
  const [completed, setCompleted] = useState(false);

  const solution = `
for(int i=0; i<9; i++) {
    currSum += arr[i];
    if (currSum > maxSum) maxSum = currSum;
    if (currSum < 0) currSum = 0;
}
`;

  useEffect(() => {
    try {
      let jsCode = code.replace(/\/\/.*$/gm, "");
      jsCode = jsCode.replace(/\bint\s+/g, "let ");
      jsCode = jsCode.replace(/for\s*\(\s*int\s+/g, "for(let ");

      const runLogic = new Function(`
                let arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
                let currSum = 0;
                let maxSum = -999;
                ${jsCode}
                return maxSum;
            `);

      const res = runLogic();
      setMaxResult(res);
      if (res === 6) setCompleted(true);
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
          <h1 className="font-bold text-red-500">BOSS: Kadane (Code Mode)</h1>
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
          <h2 className="text-xl mb-8">Kadane's Algo (Max Subarray)</h2>

          <div className="flex flex-wrap gap-2 justify-center mb-8 max-w-sm">
            {array.map((val, i) => (
              <div
                key={i}
                className="w-10 h-10 bg-gray-800 border border-gray-600 flex items-center justify-center rounded font-bold"
              >
                {val}
              </div>
            ))}
          </div>

          <h2 className="text-xl mb-8">Max Sum Found: {maxResult}</h2>
          {completed && (
            <div className="flex flex-col items-center gap-4">
              <div className="text-5xl animate-bounce">🏆 VICTORY</div>
              <Link
                to="/game/arrays/code"
                className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg shadow-lg hover:bg-yellow-400"
              >
                Return to Kingdom Map
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Level10Code;
