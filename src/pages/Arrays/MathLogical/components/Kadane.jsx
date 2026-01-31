import React, { useState } from "react";
import { motion } from "framer-motion";

const Kadane = () => {
  const [array, setArray] = useState([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
  const [currentSum, setCurrentSum] = useState(0);
  const [maxSum, setMaxSum] = useState(-Infinity);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [history, setHistory] = useState([]); // To track sums for chart-like visual
  const [processing, setProcessing] = useState(false);

  const reset = () => {
    setArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
    setCurrentSum(0);
    setMaxSum(-Infinity);
    setCurrentIndex(null);
    setHistory([]);
    setProcessing(false);
  };

  const runKadane = async () => {
    setProcessing(true);
    let curr = 0;
    let max = -Infinity;
    let hist = [];

    for (let i = 0; i < array.length; i++) {
      setCurrentIndex(i);

      curr += array[i];

      let status = "neutral";
      if (curr > max) {
        max = curr;
        status = "peak"; // New max found
      }
      if (curr < 0) {
        curr = 0;
        status = "reset"; // Reset to 0
      }

      setCurrentSum(curr);
      setMaxSum(max);

      // For visual logging
      hist.push({ idx: i, val: array[i], sum: curr, max: max, status });
      setHistory([...hist]);

      await new Promise((r) => setTimeout(r, 700));
    }
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-5xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-teal-500">
        <h1 className="text-3xl font-bold text-teal-400 text-center mb-6">
          📈 Kadane's Algorithm (Max Subarray Sum)
        </h1>

        <div className="mb-6 text-center">
          <p className="text-gray-300">
            Efficiently find the contiguous subarray with the largest sum. O(n)
            Time.
          </p>
          <p className="text-gray-400 italic">
            Hinglish: Agar current sum negative ho jaye, toh use 0 kar do. Sath
            hi sath Max Sum update karte raho.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={runKadane}
            disabled={processing}
            className="bg-teal-500 hover:bg-teal-600 px-6 py-2 rounded-md font-bold disabled:opacity-50"
          >
            Find Max Sum
          </button>
          <button
            onClick={reset}
            disabled={processing}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
          >
            Reset
          </button>
        </div>

        {/* Main Visualizer */}
        <div className="flex justify-center items-end gap-2 h-64 border-b border-gray-600 pb-4 mb-6">
          {array.map((val, idx) => {
            let isCurr = idx === currentIndex;
            let height = Math.abs(val) * 10 + 20; // Scale height
            let color = val >= 0 ? "bg-green-500" : "bg-red-500";
            if (isCurr) color = "bg-yellow-400 scale-110";

            return (
              <div key={idx} className="flex flex-col items-center gap-2 group">
                <motion.div
                  className={`w-10 rounded-t-md ${color} transition-all duration-300 relative`}
                  style={{ height: `${height}px` }}
                >
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-white font-bold">
                    {val}
                  </span>
                </motion.div>
                <span className="text-gray-500 text-xs">{idx}</span>
              </div>
            );
          })}
        </div>

        {/* Dashboard */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <h3 className="text-gray-400">Current Sum</h3>
            <p
              className={`text-4xl font-bold ${currentSum < 0 ? "text-red-400" : "text-green-400"}`}
            >
              {currentSum}
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg text-center border-2 border-teal-500/50">
            <h3 className="text-teal-400">Max Sum So Far</h3>
            <p className="text-4xl font-bold text-white">
              {maxSum === -Infinity ? "-" : maxSum}
            </p>
          </div>
        </div>

        <div className="bg-black/40 p-4 rounded-lg h-32 overflow-y-auto font-mono text-sm">
          {history.map((h, i) => (
            <div
              key={i}
              className={`mb-1 ${h.status === "reset" ? "text-red-400" : h.status === "peak" ? "text-green-400 font-bold" : "text-gray-300"}`}
            >
              Idx {h.idx} (Val {h.val}): Sum becomes {h.sum}. Max is {h.max}.{" "}
              {h.status === "reset" ? "[RESET]" : ""}
            </div>
          ))}
          {history.length === 0 && (
            <span className="text-gray-500">Log will appear here...</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Kadane;
