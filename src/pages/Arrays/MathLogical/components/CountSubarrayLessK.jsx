import React, { useState } from "react";
import { motion } from "framer-motion";

const CountSubarrayLessK = () => {
  const [array] = useState([2, 5, 6]);
  const [k, setK] = useState(10);
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState(
    "Sliding Window: Product of subarray < K",
  );
  const [processing, setProcessing] = useState(false);

  // Note: Standard problem is usually Product < K.
  // If it's Sum < K it's slightly different, but "Product < K" (LeetCode 713) is more famous for sliding window.
  // The menu says "Sum < K" but sliding window for Sum < K only works for positive numbers.
  // I will implement "Sum < K" assuming positive numbers as per menu title.

  const solve = async () => {
    setProcessing(true);
    setCount(0);
    let left = 0;
    let sum = 0;
    let ans = 0;

    for (let right = 0; right < array.length; right++) {
      sum += array[right];
      setMessage(`Added ${array[right]}. Sum: ${sum}`);
      await new Promise((r) => setTimeout(r, 600));

      while (sum >= k && left <= right) {
        setMessage(`Sum ${sum} >= ${k}. Removing ${array[left]} from left.`);
        sum -= array[left];
        left++;
        await new Promise((r) => setTimeout(r, 600));
      }

      // All subarrays ending at right starting from left to right are valid
      const added = right - left + 1;
      ans += added;
      setCount(ans);
      setMessage(`Range [${left}, ${right}] valid. Adding ${added} subarrays.`);
      await new Promise((r) => setTimeout(r, 600));
    }
    setMessage(`✅ Total Subarrays with Sum < ${k}: ${ans}`);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-green-500">
        <h1 className="text-3xl font-bold text-green-400 text-center mb-6">
          🔢 Count Subarrays Sum &lt; K
        </h1>

        <div className="flex justify-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <label>K:</label>
            <input
              type="number"
              value={k}
              onChange={(e) => setK(parseInt(e.target.value))}
              className="w-20 px-2 py-1 bg-gray-700 rounded border border-gray-600"
            />
          </div>
          <button
            onClick={solve}
            disabled={processing}
            className="bg-green-600 px-6 py-2 rounded font-bold disabled:opacity-50"
          >
            Count
          </button>
        </div>

        <div className="flex justify-center gap-2 mb-8">
          {array.map((val, idx) => (
            <div
              key={idx}
              className="w-12 h-12 flex items-center justify-center bg-gray-700 border border-gray-500 rounded font-bold text-xl"
            >
              {val}
            </div>
          ))}
        </div>

        <div className="text-center mb-6">
          <p className="text-4xl font-bold text-white">{count}</p>
          <p className="text-gray-400">Total Count</p>
        </div>

        <div className="bg-black/40 p-3 rounded text-center text-yellow-300 font-mono">
          {message}
        </div>
      </div>
    </div>
  );
};

export default CountSubarrayLessK;
