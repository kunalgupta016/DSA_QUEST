import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

const Level2Code = () => {
  // Goal: Access array elements.
  // Task: "Create variables 'a' and 'b'. Assign arr[1] to 'a' and arr[3] to 'b'."
  const [code, setCode] = useState(
    `// Array is pre-loaded: [10, 20, 30, 40, 50]
// Task: 
// 1. Create int 'first' = value at index 0
// 2. Create int 'last' = value at index 4
// 3. Create int 'sum' = first + last

int first = 
int last = 
int sum = `,
  );

  const [memory, setMemory] = useState([10, 20, 30, 40, 50]);
  const [vars, setVars] = useState({});
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");

  const solution = `int first = arr[0];
int last = arr[4];
int sum = first + last;`;

  useEffect(() => {
    try {
      // Transpile
      let jsCode = code.replace(/\/\/.*$/gm, "");
      jsCode = jsCode.replace(/\bint\s+/g, "let ");

      // Context
      const arr = [10, 20, 30, 40, 50];

      const runLogic = new Function(
        "arr",
        `
                ${jsCode}
                return { first: typeof first !== 'undefined' ? first : null, 
                         last: typeof last !== 'undefined' ? last : null, 
                         sum: typeof sum !== 'undefined' ? sum : null };
            `,
      );

      const result = runLogic(arr);
      setVars(result);
      setError("");

      // Check Win
      if (result.first === 10 && result.last === 50 && result.sum === 60) {
        setCompleted(true);
      } else {
        setCompleted(false);
      }
    } catch (err) {
      setError(err.message.replace("is not defined", "is missing"));
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
            Level 2: Access (Code Mode)
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
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: "JetBrains Mono",
            }}
          />
        </div>

        <div className="w-full md:w-1/2 bg-[#1e1e1e] p-8 flex flex-col items-center">
          <h2 className="text-xl mb-8 text-gray-300 text-center">
            Task: Extract values from <span className="text-cyan-400">arr</span>{" "}
            (0-indexed)
          </h2>

          {/* Array Vis */}
          <div className="flex gap-2 mb-8">
            {memory.map((val, i) => (
              <div
                key={i}
                className="w-16 h-20 border-2 border-gray-600 rounded flex flex-col items-center justify-center bg-gray-800"
              >
                <span className="text-xl font-bold">{val}</span>
                <span className="text-xs text-gray-500 mt-1">{i}</span>
              </div>
            ))}
          </div>

          {/* Variables Vis */}
          <div className="w-full max-w-sm bg-gray-900 p-6 rounded-xl border border-gray-700">
            <h3 className="text-gray-400 text-sm mb-4 uppercase">
              Local Variables
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between border-b border-gray-800 pb-2">
                <span>first</span>
                <span
                  className={
                    vars.first === 10 ? "text-green-400" : "text-red-400"
                  }
                >
                  {vars.first ?? "?"}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-2">
                <span>last</span>
                <span
                  className={
                    vars.last === 50 ? "text-green-400" : "text-red-400"
                  }
                >
                  {vars.last ?? "?"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>sum</span>
                <span
                  className={
                    vars.sum === 60
                      ? "text-green-400 font-bold"
                      : "text-red-400"
                  }
                >
                  {vars.sum ?? "?"}
                </span>
              </div>
            </div>
          </div>

          {error && <div className="mt-4 text-red-400 text-sm">{error}</div>}

          <AnimatePresence>
            {completed && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mt-8"
              >
                <Link
                  to="/game/arrays/code/3"
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

export default Level2Code;
