import React, { useState } from "react";
import { motion } from "framer-motion";

const FirstNonRepeating = () => {
  const [array] = useState([4, 5, 1, 2, 0, 4, 1, 2]);
  const [mapState, setMapState] = useState({});
  const [currentIdx, setCurrentIdx] = useState(null);
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("Using HashMap for Frequency");
  const [processing, setProcessing] = useState(false);
  const [phase, setPhase] = useState("count"); // 'count' or 'find'

  const solve = async () => {
    setProcessing(true);
    setResult(null);
    setMapState({});
    let map = {};

    // Phase 1: Count Frequencies
    setPhase("count");
    setMessage("Phase 1: Count Frequencies");
    for (let i = 0; i < array.length; i++) {
      setCurrentIdx(i);
      const val = array[i];
      map[val] = (map[val] || 0) + 1;
      setMapState({ ...map });
      await new Promise((r) => setTimeout(r, 400));
    }

    // Phase 2: Find First Unique
    setPhase("find");
    setMessage("Phase 2: Check for count == 1");
    await new Promise((r) => setTimeout(r, 600));

    for (let i = 0; i < array.length; i++) {
      setCurrentIdx(i);
      const val = array[i];

      if (map[val] === 1) {
        setMessage(`✅ Found ${val} with count 1 at index ${i}`);
        setResult(val);
        setProcessing(false);
        return;
      } else {
        setMessage(`Element ${val} has count ${map[val]}. Skipping.`);
      }
      await new Promise((r) => setTimeout(r, 600));
    }

    setMessage("❌ All elements repeat.");
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-orange-500">
        <h1 className="text-3xl font-bold text-orange-400 text-center mb-6">
          🦄 First Non-Repeating Element
        </h1>

        <div className="flex justify-center mb-8">
          <button
            onClick={solve}
            disabled={processing}
            className="bg-orange-600 px-6 py-2 rounded font-bold disabled:opacity-50"
          >
            Find Unique
          </button>
        </div>

        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {array.map((val, idx) => (
            <motion.div
              key={idx}
              animate={{
                scale: currentIdx === idx ? 1.2 : 1,
                backgroundColor:
                  currentIdx === idx && phase === "find" && mapState[val] === 1
                    ? "#22c55e"
                    : "#374151",
              }}
              className="w-12 h-12 flex items-center justify-center rounded border border-gray-500 font-bold text-xl"
            >
              {val}
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {Object.entries(mapState).map(([k, v]) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={k}
              className="bg-gray-700 p-2 rounded text-center"
            >
              <span className="text-orange-300 font-bold">{k}</span>
              <span className="mx-2 text-gray-500">:</span>
              <span className="text-white">{v}</span>
            </motion.div>
          ))}
        </div>

        {result !== null && (
          <div className="text-center mb-4">
            <p className="text-2xl font-bold text-green-400">
              Result: {result}
            </p>
          </div>
        )}

        <div className="bg-black/40 p-3 rounded text-center text-yellow-300 font-mono">
          {message}
        </div>
      </div>
    </div>
  );
};

export default FirstNonRepeating;
