import React, { useState } from "react";
import { motion } from "framer-motion";

const OddOccurrence = () => {
  const [array] = useState([4, 3, 6, 2, 6, 4, 3]); // 2 occurs once (odd), others twice (even)
  const [xorResult, setXorResult] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(null);
  const [message, setMessage] = useState("Using XOR Property");
  const [processing, setProcessing] = useState(false);
  const [steps, setSteps] = useState([]);

  const solve = async () => {
    setProcessing(true);
    setXorResult(0);
    setSteps([]);
    let res = 0;
    let logs = [];

    setMessage("XORing all elements...");
    for (let i = 0; i < array.length; i++) {
      setCurrentIdx(i);
      const val = array[i];
      const prev = res;
      res = res ^ val;

      logs.push(`${prev} ^ ${val} = ${res}`);
      setSteps([...logs]);
      setXorResult(res);

      setMessage(`Current XOR: ${res}`);
      await new Promise((r) => setTimeout(r, 600));
    }

    setMessage(`✅ Result: ${res} (Occurs Odd Times)`);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-purple-500">
        <h1 className="text-3xl font-bold text-purple-400 text-center mb-6">
          🔢 Find Element Appearing Odd Times
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Property: A ^ A = 0. All pairs cancel out.
        </p>

        <div className="flex justify-center mb-8">
          <button
            onClick={solve}
            disabled={processing}
            className="bg-purple-600 px-6 py-2 rounded font-bold disabled:opacity-50"
          >
            Find Odd Occurrence
          </button>
          <button
            onClick={() => {
              setXorResult(0);
              setSteps([]);
              setMessage("");
            }}
            className="ml-4 bg-gray-600 px-4 py-2 rounded"
          >
            Reset
          </button>
        </div>

        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {array.map((val, idx) => (
            <motion.div
              key={idx}
              animate={{
                scale: currentIdx === idx ? 1.2 : 1,
                borderColor: currentIdx === idx ? "#d8b4fe" : "#4b5563",
              }}
              className="w-12 h-12 flex items-center justify-center rounded-full border-2 bg-gray-700 font-bold"
            >
              {val}
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-700 p-4 rounded h-64 overflow-y-auto font-mono text-sm">
            {steps.map((s, i) => (
              <div key={i} className="mb-1 text-gray-300">
                {s}
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center bg-gray-700 rounded p-6">
            <h3 className="text-gray-400 mb-2">Final XOR Result</h3>
            <div className="text-6xl font-bold text-purple-400">
              {xorResult}
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-yellow-300 font-mono">
          {message}
        </div>
      </div>
    </div>
  );
};

export default OddOccurrence;
