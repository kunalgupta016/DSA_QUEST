import React, { useState } from "react";
import { motion } from "framer-motion";

const SearchMatrix2 = () => {
  // Problem: Integers in each row are sorted left to right.
  // Integers in each column are sorted top to bottom.
  // Method: Start from Top-Right corner.
  const [matrix] = useState([
    [1, 4, 7, 11, 15],
    [2, 5, 8, 12, 19],
    [3, 6, 9, 16, 22],
    [10, 13, 14, 17, 24],
  ]);
  const [target, setTarget] = useState(5);
  const [message, setMessage] = useState(
    "Sorted rows & cols. Start Top-Right.",
  );
  const [current, setCurrent] = useState(null); // {r, c}
  const [processing, setProcessing] = useState(false);

  const search = async () => {
    setProcessing(true);
    let r = 0;
    let c = matrix[0].length - 1;

    while (r < matrix.length && c >= 0) {
      const val = matrix[r][c];
      setCurrent({ r, c });
      setMessage(`Checking [${r}, ${c}] = ${val}`);
      await new Promise((res) => setTimeout(res, 600));

      if (val === parseInt(target)) {
        setMessage(`✅ Found ${target} at [${r}, ${c}]`);
        setProcessing(false);
        return;
      } else if (val > target) {
        setMessage(`${val} > ${target}. Move Left.`);
        c--;
      } else {
        setMessage(`${val} < ${target}. Move Down.`);
        r++;
      }
    }
    setMessage("❌ Not Found.");
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-5xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-green-500">
        <h1 className="text-3xl font-bold text-green-400 text-center mb-6">
          🔍 Search 2D Matrix II
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
            className="bg-green-600 px-6 py-2 rounded font-bold disabled:opacity-50"
          >
            Staircase Search
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
                          ? "#22c55e"
                          : "#1f2937",
                      scale: current?.r === r && current?.c === c ? 1.2 : 1,
                    }}
                    className="w-12 h-12 flex items-center justify-center border border-gray-600 rounded bg-gray-800 font-bold"
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

export default SearchMatrix2;
