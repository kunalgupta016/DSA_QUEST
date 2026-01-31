import React, { useState } from "react";
import { motion } from "framer-motion";

const generateArray = (size = 8) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * 10) + 1);

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const SubarraySum = () => {
  const [array, setArray] = useState(generateArray());
  const [target, setTarget] = useState(15);
  const [highlight, setHighlight] = useState([]);
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubarraySum = async () => {
    setProcessing(true);
    setResult(null);

    for (let start = 0; start < array.length; start++) {
      let sum = 0;
      for (let end = start; end < array.length; end++) {
        sum += array[end];
        setHighlight([start, end]);
        await sleep(400);
        if (sum === parseInt(target)) {
          setResult({ start, end });
          setProcessing(false);
          return;
        }
      }
    }

    setResult("Not Found");
    setHighlight([]);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-16">
      <div className="max-w-5xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-pink-400">
        <h1 className="text-3xl font-bold text-pink-300 text-center mb-8">
          ➕ Subarray Sum Finder
        </h1>

        <div className="mb-8 text-center max-w-3xl mx-auto space-y-4">
          <p className="text-gray-300">
            <strong>English:</strong> Subarray Sum Finder looks for a continuous
            subarray whose elements sum up to a specific target value.
          </p>
          <p className="text-gray-400 italic">
            <strong>Hinglish:</strong> Subarray Sum ka matlab hai array ka ek
            continuous hissa dhundna jiska jod (sum) given target ke barabar ho.
          </p>
        </div>

        {/* 💻 Code Block */}
        <div className="bg-gray-900 text-green-300 text-sm p-4 rounded-md mb-8 overflow-x-auto">
          <pre>
            {`// Brute Force Subarray Sum
for i in 0 to n-1:
  sum = 0
  for j in i to n-1:
    sum += arr[j]
    if sum == target:
      return (i, j)`}
          </pre>
        </div>

        {/* 🎯 Input Field */}
        <div className="flex justify-center items-center gap-4 mb-6">
          <label className="text-white text-lg font-semibold">🎯 Target:</label>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded-md border border-pink-400 focus:outline-none"
          />
        </div>

        {/* 📊 Array Display */}
        <div className="flex justify-center gap-3 flex-wrap mb-10">
          {array.map((val, idx) => {
            let isHighlighted =
              result && idx >= result.start && idx <= result.end;
            let isCurrent =
              highlight.length && idx >= highlight[0] && idx <= highlight[1];

            return (
              <motion.div
                key={idx}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                className={`px-4 py-2 rounded-md text-lg font-bold border
                ${
                  isHighlighted
                    ? "bg-green-400 text-black border-green-300"
                    : isCurrent
                      ? "bg-yellow-400 text-black border-yellow-300"
                      : "bg-gray-700 border-gray-600"
                }`}
              >
                {val}
              </motion.div>
            );
          })}
        </div>

        {/* 📦 Result */}
        <div className="text-center mb-6">
          {result && result !== "Not Found" && (
            <p className="text-green-300 text-lg font-semibold">
              ✅ Subarray Found: Index {result.start} to {result.end}
            </p>
          )}
          {result === "Not Found" && (
            <p className="text-red-400 text-lg font-semibold">
              ❌ No matching subarray found
            </p>
          )}
        </div>

        {/* 🎛 Buttons */}
        <div className="flex justify-center gap-4 flex-wrap mb-6">
          <button
            onClick={handleSubarraySum}
            className="bg-pink-500 px-5 py-2 rounded-md font-semibold hover:bg-pink-600 transition disabled:opacity-50"
            disabled={processing}
          >
            Find Subarray
          </button>
          <button
            onClick={() => {
              setArray(generateArray());
              setHighlight([]);
              setResult(null);
              setProcessing(false);
            }}
            className="bg-blue-500 px-5 py-2 rounded-md font-semibold hover:bg-blue-600 transition"
            disabled={processing}
          >
            Reset Array
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubarraySum;
