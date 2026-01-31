import React, { useState } from "react";
import { motion } from "framer-motion";

const RotateArrayK = () => {
  const [array, setArray] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [k, setK] = useState(3);
  const [highlightRange, setHighlightRange] = useState(null); // [start, end]
  const [message, setMessage] = useState("");
  const [processing, setProcessing] = useState(false);

  const resetArray = () => {
    setArray([1, 2, 3, 4, 5, 6, 7]);
    setHighlightRange(null);
    setMessage("");
    setProcessing(false);
  };

  const reverse = async (arr, start, end) => {
    setHighlightRange([start, end]);
    setMessage(`Reversing from index ${start} to ${end}`);
    await new Promise((r) => setTimeout(r, 800));

    let left = start,
      right = end;
    while (left < right) {
      let temp = arr[left];
      arr[left] = arr[right];
      arr[right] = temp;
      left++;
      right--;
      setArray([...arr]);
      await new Promise((r) => setTimeout(r, 300));
    }
  };

  const rotateRight = async () => {
    setProcessing(true);
    let arr = [...array];
    let n = arr.length;
    let kMod = k % n;

    setMessage(`Rotate Right by K=${k} (Effective K=${kMod})`);
    await new Promise((r) => setTimeout(r, 1000));

    // Step 1: Reverse Whole Array
    await reverse(arr, 0, n - 1);

    // Step 2: Reverse First K elements
    await reverse(arr, 0, kMod - 1);

    // Step 3: Reverse Remaining elements
    await reverse(arr, kMod, n - 1);

    setHighlightRange(null);
    setMessage("✅ Rotation Complete!");
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-pink-500">
        <h1 className="text-3xl font-bold text-pink-400 text-center mb-6">
          🔄 Rotate Array by K (Reversal Algo)
        </h1>

        <div className="mb-6 text-center">
          <p className="text-gray-300">
            Optimized Rotation using Reversal Algorithm. Space Complexity: O(1).
          </p>
          <p className="text-gray-400 italic">
            Hinglish: Teen steps mein reverse karo: Poora array, fir pehle K
            elements, fir baaki elements.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <label>K:</label>
            <input
              type="number"
              value={k}
              onChange={(e) => setK(parseInt(e.target.value))}
              className="w-16 px-2 py-1 rounded bg-gray-700 border border-gray-600"
            />
          </div>
          <button
            onClick={rotateRight}
            disabled={processing}
            className="bg-pink-500 hover:bg-pink-600 px-6 py-2 rounded-md font-bold disabled:opacity-50"
          >
            Rotate Right
          </button>
          <button
            onClick={resetArray}
            disabled={processing}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
          >
            Reset
          </button>
        </div>

        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {array.map((val, idx) => {
            let isHighlighted =
              highlightRange &&
              idx >= highlightRange[0] &&
              idx <= highlightRange[1];
            return (
              <motion.div
                key={idx}
                layout
                className={`w-12 h-12 flex items-center justify-center rounded-lg border-2 text-lg font-bold
                                ${isHighlighted ? "bg-yellow-500 text-black border-yellow-300 scale-110" : "bg-gray-700 border-gray-500"}
                                `}
              >
                {val}
              </motion.div>
            );
          })}
        </div>

        <div className="bg-black/40 p-4 rounded-lg text-center font-mono text-yellow-300 min-h-[60px]">
          {message}
        </div>

        <div className="mt-8 bg-gray-900 p-4 rounded-lg text-sm text-green-400 font-mono">
          <pre>{`// Algorithm
reverse(arr, 0, n-1);
reverse(arr, 0, k-1);
reverse(arr, k, n-1);`}</pre>
        </div>
      </div>
    </div>
  );
};

export default RotateArrayK;
