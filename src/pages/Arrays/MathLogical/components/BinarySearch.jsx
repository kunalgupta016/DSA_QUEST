import React, { useState } from "react";
import { motion } from "framer-motion";

const BinarySearch = () => {
  const [array] = useState([2, 5, 8, 12, 16, 23, 38, 56, 72, 91]);
  const [target, setTarget] = useState(23);
  const [low, setLow] = useState(null);
  const [high, setHigh] = useState(null);
  const [mid, setMid] = useState(null);
  const [message, setMessage] = useState("");
  const [processing, setProcessing] = useState(false);

  const runBinarySearch = async () => {
    setProcessing(true);
    let l = 0,
      h = array.length - 1;
    setLow(l);
    setHigh(h);

    while (l <= h) {
      let m = Math.floor((l + h) / 2);
      setMid(m);
      setLow(l);
      setHigh(h);

      setMessage(`Checking Middle Index ${m} (Value: ${array[m]})`);
      await new Promise((r) => setTimeout(r, 1000));

      if (array[m] === parseInt(target)) {
        setMessage(`✅ Target ${target} Found at Index ${m}`);
        setProcessing(false);
        return;
      } else if (array[m] < target) {
        setMessage(`${array[m]} < ${target}. Ignoring Left Half.`);
        l = m + 1;
      } else {
        setMessage(`${array[m]} > ${target}. Ignoring Right Half.`);
        h = m - 1;
      }
      await new Promise((r) => setTimeout(r, 1000));
    }

    setMessage(`❌ Target ${target} Not Found.`);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-blue-500">
        <h1 className="text-3xl font-bold text-blue-400 text-center mb-6">
          🔍 Binary Search
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Divide and Conquer. O(log n) Time.
        </p>

        <div className="flex justify-center gap-4 mb-8">
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-20 px-2 py-1 bg-gray-700 rounded border border-gray-600"
          />
          <button
            onClick={runBinarySearch}
            disabled={processing}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-md font-bold disabled:opacity-50"
          >
            Search
          </button>
        </div>

        <div className="flex justify-center gap-2 flex-wrap mb-10">
          {array.map((val, idx) => {
            let style = "bg-gray-700 border-gray-500";
            if (idx === mid)
              style = "bg-yellow-500 text-black border-yellow-300 scale-110";
            else if (idx >= low && idx <= high && low !== null)
              style = "bg-blue-900 border-blue-400";
            else if (low !== null) style = "opacity-30 bg-gray-800"; // dim out ignored parts

            return (
              <motion.div
                key={idx}
                layout
                className={`w-12 h-12 flex flex-col items-center justify-center rounded border-2 transition-all ${style}`}
              >
                <span className="text-lg font-bold">{val}</span>
                <span className="text-[10px] absolute -bottom-4 text-gray-400">
                  {idx}
                </span>
              </motion.div>
            );
          })}
        </div>

        <div className="bg-black/40 p-4 rounded text-center text-xl font-mono text-yellow-300">
          {message || "Enter target and click Search"}
        </div>
      </div>
    </div>
  );
};

export default BinarySearch;
