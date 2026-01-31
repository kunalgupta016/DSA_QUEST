import React, { useState } from "react";
import { motion } from "framer-motion";

const RemoveDuplicatesUnsorted = () => {
  const [array, setArray] = useState([4, 2, 6, 2, 4, 1, 6]);
  const [unique, setUnique] = useState([]);
  const [message, setMessage] = useState("Using Hash Set");
  const [processing, setProcessing] = useState(false);
  const [seen, setSeen] = useState(new Set());
  const [currentIdx, setCurrentIdx] = useState(null);

  const solve = async () => {
    setProcessing(true);
    setUnique([]);
    setSeen(new Set());
    const s = new Set();
    const res = [];

    for (let i = 0; i < array.length; i++) {
      setCurrentIdx(i);
      const val = array[i];

      if (s.has(val)) {
        setMessage(`Element ${val} seen before. Skipping.`);
      } else {
        setMessage(`Element ${val} is new. Adding to output.`);
        s.add(val);
        res.push(val);
        setUnique([...res]);
        setSeen(new Set(s));
      }
      await new Promise((r) => setTimeout(r, 800));
    }
    setMessage(`✅ Done. Unique Elements: [${res.join(", ")}]`);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-red-500">
        <h1 className="text-3xl font-bold text-red-400 text-center mb-6">
          🗑 Remove Duplicates (Unsorted)
        </h1>

        <div className="flex justify-center mb-6">
          <button
            onClick={solve}
            disabled={processing}
            className="bg-red-600 px-6 py-2 rounded font-bold disabled:opacity-50"
          >
            Filter Duplicates
          </button>
          <button
            onClick={() => {
              setArray([2, 5, 2, 1, 5, 8]);
              setUnique([]);
              setMessage("");
            }}
            className="ml-4 bg-gray-600 px-4 py-2 rounded"
          >
            Reset
          </button>
        </div>

        <div className="flex justify-center gap-2 mb-8">
          {array.map((val, idx) => (
            <motion.div
              key={idx}
              animate={{
                scale: currentIdx === idx ? 1.2 : 1,
                opacity: currentIdx === idx || currentIdx === null ? 1 : 0.5,
                borderColor: currentIdx === idx ? "#f87171" : "#4b5563",
              }}
              className="w-12 h-12 flex items-center justify-center bg-gray-700 border-2 rounded font-bold text-xl transition"
            >
              {val}
            </motion.div>
          ))}
        </div>

        <div className="min-h-[100px] border-t border-gray-700 pt-6">
          <h3 className="text-center text-gray-400 mb-4">
            Unique Elements (Output)
          </h3>
          <div className="flex justify-center gap-2">
            {unique.map((val, idx) => (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={idx}
                className="w-12 h-12 flex items-center justify-center bg-green-900 border border-green-500 rounded font-bold"
              >
                {val}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center mt-6 p-4 bg-black/30 rounded text-yellow-300 font-mono">
          {message}
        </div>
      </div>
    </div>
  );
};
export default RemoveDuplicatesUnsorted;
