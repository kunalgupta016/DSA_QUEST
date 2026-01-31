import React, { useState } from "react";
import { motion } from "framer-motion";

const SearchMatrix1 = () => {
  // Problem: Matrix is sorted linearly. First integer of each row > last of previous.
  // We can treat it as a flattened sorted array or use binary search on rows then cols.
  // Or just treat as 1D array of size m*n with mapping: row = idx // n, col = idx % n
  const [matrix] = useState([
    [1, 3, 5, 7],
    [10, 11, 16, 20],
    [23, 30, 34, 60],
  ]);
  const [target, setTarget] = useState(3);
  const [message, setMessage] = useState(
    "Integers sorted from left to right, top to bottom.",
  );
  const [current, setCurrent] = useState(null);
  const [processing, setProcessing] = useState(false);

  const search = async () => {
    setProcessing(true);
    const rows = matrix.length;
    const cols = matrix[0].length;
    let l = 0;
    let h = rows * cols - 1;

    while (l <= h) {
      let mid = Math.floor((l + h) / 2);
      let r = Math.floor(mid / cols);
      let c = mid % cols;
      let val = matrix[r][c];

      setCurrent({ r, c });
      setMessage(`Checking Mid Index ${mid} -> Matrix[${r}][${c}] = ${val}`);
      await new Promise((r) => setTimeout(r, 800));

      if (val === parseInt(target)) {
        setMessage(`✅ Found ${target} at [${r}, ${c}]`);
        setProcessing(false);
        return;
      } else if (val < target) {
        l = mid + 1;
        setMessage(`${val} < ${target}. Moving Right/Down.`);
      } else {
        h = mid - 1;
        setMessage(`${val} > ${target}. Moving Left/Up.`);
      }
    }
    setMessage("❌ Not Found.");
    setCurrent(null);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-red-500">
        <h1 className="text-3xl font-bold text-red-400 text-center mb-6">
          🔍 Search 2D Matrix I
        </h1>

        <div className="flex justify-center gap-4 mb-8">
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-20 px-2 py-1 bg-gray-700 rounded border border-gray-600"
          />
          <button
            onClick={search}
            disabled={processing}
            className="bg-red-600 px-6 py-2 rounded font-bold disabled:opacity-50"
          >
            Binary Search
          </button>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex flex-col gap-2">
            {matrix.map((row, r) => (
              <div key={r} className="flex gap-2">
                {row.map((val, c) => (
                  <motion.div
                    key={c}
                    animate={{
                      backgroundColor:
                        current?.r === r && current?.c === c
                          ? "#ef4444"
                          : "#1f2937",
                      scale: current?.r === r && current?.c === c ? 1.2 : 1,
                    }}
                    className="w-14 h-14 flex items-center justify-center border border-gray-600 rounded bg-gray-800 font-bold text-xl"
                  >
                    {val}
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center bg-black/40 p-3 rounded text-yellow-300 font-mono">
          {message}
        </div>
      </div>
    </div>
  );
};

export default SearchMatrix1;
