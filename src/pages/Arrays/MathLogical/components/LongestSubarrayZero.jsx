import React, { useState } from "react";
import { motion } from "framer-motion";

const LongestSubarrayZero = () => {
  const [array] = useState([15, -2, 2, -8, 1, 7, 10, 23]);
  const [mapState, setMapState] = useState({}); // sum -> index
  const [currentIdx, setCurrentIdx] = useState(null);
  const [maxLen, setMaxLen] = useState(0);
  const [foundRange, setFoundRange] = useState(null);
  const [message, setMessage] = useState("Prefix Sum HashMap Approach");
  const [processing, setProcessing] = useState(false);

  const solve = async () => {
    setProcessing(true);
    setMapState({ 0: -1 }); // Initial prefix sum 0 at index -1
    let sum = 0;
    let mLen = 0;
    let range = null;
    let map = { 0: -1 };

    for (let i = 0; i < array.length; i++) {
      setCurrentIdx(i);
      sum += array[i];

      setMessage(`Index ${i}, Value ${array[i]}. Current Prefix Sum: ${sum}`);
      await new Promise((r) => setTimeout(r, 600));

      if (map.hasOwnProperty(sum)) {
        let len = i - map[sum];
        setMessage(
          `Sum ${sum} seen before at index ${map[sum]}. Subarray Length: ${i} - ${map[sum]} = ${len}`,
        );
        await new Promise((r) => setTimeout(r, 600));

        if (len > mLen) {
          mLen = len;
          range = [map[sum] + 1, i];
          setMessage(`New Max Length Found! Range: [${map[sum] + 1}, ${i}]`);
        }
      } else {
        map[sum] = i;
        setMapState({ ...map });
        setMessage(`Sum ${sum} is new. Storing in Map.`);
      }

      setMaxLen(mLen);
      setFoundRange(range);
      await new Promise((r) => setTimeout(r, 400));
    }
    setMessage(`✅ Algorithm Finished. Max Length: ${mLen}`);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-teal-500">
        <h1 className="text-3xl font-bold text-teal-400 text-center mb-6">
          📏 Longest Subarray with Sum 0
        </h1>

        <div className="flex justify-center mb-6">
          <button
            onClick={solve}
            disabled={processing}
            className="bg-teal-600 px-6 py-2 rounded font-bold disabled:opacity-50"
          >
            Find Longest Subarray
          </button>
        </div>

        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {array.map((val, idx) => {
            let isRange =
              foundRange && idx >= foundRange[0] && idx <= foundRange[1];
            return (
              <div key={idx} className="flex flex-col items-center">
                <motion.div
                  animate={{
                    scale: currentIdx === idx ? 1.2 : 1,
                    backgroundColor: isRange ? "#14b8a6" : "#374151",
                    borderColor: currentIdx === idx ? "#facc15" : "#4b5563",
                  }}
                  className="w-12 h-12 flex items-center justify-center rounded border-2 font-bold transition-colors"
                >
                  {val}
                </motion.div>
                <span className="text-xs text-gray-500 mt-1">{idx}</span>
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-700 p-4 rounded h-48 overflow-y-auto">
            <h3 className="font-bold text-teal-300 mb-2">Prefix Sum Map</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {Object.entries(mapState).map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between bg-gray-800 p-1 px-2 rounded"
                >
                  <span>Sum: {k}</span>
                  <span className="text-gray-400">Idx: {v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-700 p-4 rounded flex flex-col justify-center items-center">
            <h3 className="text-gray-300 mb-2">Max Length</h3>
            <p className="text-5xl font-bold text-teal-400">{maxLen}</p>
          </div>
        </div>

        <div className="bg-black/40 p-3 rounded text-center text-yellow-300 font-mono">
          {message}
        </div>
      </div>
    </div>
  );
};

export default LongestSubarrayZero;
