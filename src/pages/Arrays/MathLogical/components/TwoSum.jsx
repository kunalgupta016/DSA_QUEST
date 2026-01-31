import React, { useState } from "react";
import { motion } from "framer-motion";

const TwoSum = () => {
  const [array] = useState([2, 11, 7, 15, 3, 8]);
  const [target, setTarget] = useState(9); // 2 + 7 = 9
  const [mapState, setMapState] = useState({});
  const [currentIdx, setCurrentIdx] = useState(null);
  const [foundIndices, setFoundIndices] = useState(null);
  const [message, setMessage] = useState("Ready to search...");
  const [processing, setProcessing] = useState(false);

  const reset = () => {
    setMapState({});
    setCurrentIdx(null);
    setFoundIndices(null);
    setMessage("Ready to search...");
    setProcessing(false);
  };

  const solveTwoSum = async () => {
    setProcessing(true);
    setMapState({});
    setFoundIndices(null);

    let map = {};

    for (let i = 0; i < array.length; i++) {
      setCurrentIdx(i);
      const val = array[i];
      const needed = target - val;

      setMessage(`Index ${i}: Value ${val}. Need ${needed}. Check Map.`);
      await new Promise((r) => setTimeout(r, 800));

      if (map.hasOwnProperty(needed)) {
        setMessage(
          `✅ Found ${needed} in Map at index ${map[needed]}! Pair: (${needed}, ${val})`,
        );
        setFoundIndices([map[needed], i]);
        setProcessing(false);
        return;
      } else {
        setMessage(
          `❌ ${needed} not in map. Adding ${val} -> index ${i} to map.`,
        );
        map[val] = i;
        setMapState({ ...map });
      }
      await new Promise((r) => setTimeout(r, 500));
    }

    setMessage("❌ No pair found.");
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-5xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-purple-600">
        <h1 className="text-3xl font-bold text-purple-400 text-center mb-6">
          🎯 Two Sum (HashMap)
        </h1>

        <div className="mb-6 text-center">
          <p className="text-gray-300">
            Find indices of two numbers that add up to Target.
          </p>
          <p className="text-gray-400 italic">
            Hinglish: Ek map use karke check karo ki "Target - CurrentValue"
            pehle dekha hai ya nahi.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <label>Target:</label>
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(parseInt(e.target.value))}
              className="w-20 px-2 py-1 rounded bg-gray-700 border border-gray-600 center"
            />
          </div>
          <button
            onClick={solveTwoSum}
            disabled={processing}
            className="bg-purple-500 hover:bg-purple-600 px-6 py-2 rounded-md font-bold disabled:opacity-50"
          >
            Find Pair
          </button>
          <button
            onClick={reset}
            disabled={processing}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
          >
            Reset
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Array Visualization */}
          <div className="bg-gray-700/50 p-6 rounded-lg min-h-[300px]">
            <h3 className="text-center font-bold mb-4">Array</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {array.map((val, idx) => (
                <motion.div
                  key={idx}
                  animate={{
                    scale: currentIdx === idx ? 1.2 : 1,
                    backgroundColor: foundIndices?.includes(idx)
                      ? "#22c55e"
                      : "#374151",
                  }}
                  className="w-12 h-12 flex items-center justify-center rounded-lg border border-gray-500 text-lg font-bold bg-gray-700"
                >
                  {val}
                </motion.div>
              ))}
            </div>
            <div className="mt-8 text-center text-yellow-300 font-mono">
              {message}
            </div>
          </div>

          {/* Right: Map Visualization */}
          <div className="bg-gray-700/50 p-6 rounded-lg min-h-[300px]">
            <h3 className="text-center font-bold mb-4">
              Hash Map (Value &rarr; Index)
            </h3>
            <div className="grid grid-cols-2 gap-2 max-h-[250px] overflow-y-auto">
              {Object.entries(mapState).map(([key, val]) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={key}
                  className="flex justify-between bg-gray-800 p-2 rounded border border-gray-600"
                >
                  <span className="text-blue-300">{key}</span>
                  <span className="text-gray-400">Idx: {val}</span>
                </motion.div>
              ))}
              {Object.keys(mapState).length === 0 && (
                <span className="text-gray-500 text-sm p-2">Map is empty</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoSum;
