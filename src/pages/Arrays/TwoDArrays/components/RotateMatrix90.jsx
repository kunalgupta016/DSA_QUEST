import React, { useState } from "react";
import { motion } from "framer-motion";

const RotateMatrix90 = () => {
  const initialMatrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  const [matrix, setMatrix] = useState(initialMatrix);
  const [message, setMessage] = useState(
    "Step 1: Transpose, Step 2: Reverse Rows",
  );
  const [processing, setProcessing] = useState(false);

  const rotate = async () => {
    setProcessing(true);
    let M = JSON.parse(JSON.stringify(matrix)); // Deep copy

    // 1. Transpose
    setMessage("Step 1: Transpose Matrix (Swap A[i][j] with A[j][i])");
    for (let i = 0; i < M.length; i++) {
      for (let j = i + 1; j < M[0].length; j++) {
        [M[i][j], M[j][i]] = [M[j][i], M[i][j]];
        setMatrix([...M]); // Trigger update
        await new Promise((r) => setTimeout(r, 200));
      }
    }
    await new Promise((r) => setTimeout(r, 500));

    // 2. Reverse Rows
    setMessage("Step 2: Reverse Each Row");
    for (let i = 0; i < M.length; i++) {
      // Basic two pointer reverse for visual effect
      let l = 0,
        r = M.length - 1;
      while (l < r) {
        [M[i][l], M[i][r]] = [M[i][r], M[i][l]];
        l++;
        r--;
      }
      setMatrix([...M]);
      await new Promise((r) => setTimeout(r, 300));
    }

    setMessage("✅ Rotated 90 Degrees Clockwise!");
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-pink-500">
        <h1 className="text-3xl font-bold text-pink-400 text-center mb-6">
          🔃 Rotate Matrix 90°
        </h1>

        <div className="flex justify-center mb-8">
          <button
            onClick={rotate}
            disabled={processing}
            className="bg-pink-600 px-6 py-2 rounded font-bold disabled:opacity-50"
          >
            Rotate
          </button>
          <button
            onClick={() => {
              setMatrix(initialMatrix);
              setMessage("");
            }}
            className="ml-4 bg-gray-600 px-4 py-2 rounded"
          >
            Reset
          </button>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex flex-col gap-2">
            {matrix.map((row, r) => (
              <div key={r} className="flex gap-2">
                {row.map((val, c) => (
                  <motion.div
                    layout
                    key={`${r}-${c}-${val}`} // Key helps animation
                    className="w-16 h-16 flex items-center justify-center bg-gray-700 border border-gray-500 rounded text-2xl font-bold"
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

export default RotateMatrix90;
