import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Link } from "react-router";

const Level8Code = () => {
  // Two Sum: Find indices of 2 numbers summing to 9
  const [array] = useState([2, 7, 11, 15]);
  // Arr: [2, 7, 11, 15]
  const [code, setCode] = useState(
    `// Array: [2, 7, 11, 15]
// Target: 9
// Find 'idx1' and 'idx2' such that arr[idx1] + arr[idx2] == target

int idx1 = -1;
int idx2 = -1;
int target = 9;

for(int i=0; i<4; i++) {
    for(int j=i+1; j<4; j++) {
        // Check sum
    }
}
`,
  );

  const [result, setResult] = useState({ idx1: -1, idx2: -1 });
  const [completed, setCompleted] = useState(false);

  const solution = `
for(int i=0; i<4; i++) {
    for(int j=i+1; j<4; j++) {
        if(arr[i] + arr[j] == target) {
            idx1 = i;
            idx2 = j;
        }
    }
}
`;

  useEffect(() => {
    try {
      let jsCode = code.replace(/\/\/.*$/gm, "");
      jsCode = jsCode.replace(/\bint\s+/g, "let ");
      jsCode = jsCode.replace(/for\s*\(\s*int\s+/g, "for(let ");

      const runLogic = new Function(`
                let arr = [2, 7, 11, 15];
                let idx1 = -1, idx2 = -1, target = 9;
                ${jsCode}
                return { idx1, idx2 };
            `);

      const res = runLogic();
      setResult(res);
      if (
        (res.idx1 === 0 && res.idx2 === 1) ||
        (res.idx1 === 1 && res.idx2 === 0)
      )
        setCompleted(true);
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
            Level 8: Two Sum (Code Mode)
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
          <h2 className="text-xl mb-8">Target: 9 (Find Indices)</h2>

          <div className="flex gap-4 mb-8">
            {array.map((val, i) => (
              <div
                key={i}
                className={`w-16 h-16 rounded-full flex items-center justify-center border-2 text-xl font-bold ${
                  i === result.idx1 || i === result.idx2
                    ? "bg-green-600 border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                    : "bg-gray-800 border-gray-600"
                }`}
              >
                {val}
                <div className="absolute mt-20 text-xs text-gray-500">
                  idx:{i}
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-xl mb-8">
            Indices found: {result.idx1}, {result.idx2}
          </h2>
          {completed && (
            <Link
              to="/game/arrays/code/9"
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

export default Level8Code;
