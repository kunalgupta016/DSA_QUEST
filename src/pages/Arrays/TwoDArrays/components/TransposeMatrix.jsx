import React, { useState } from "react";
import { motion } from "framer-motion";

const TransposeMatrix = () => {
  // Start with a non-square matrix to clearly show transpose (Swap Rows <-> Cols)
  const [matrix, setMatrix] = useState([
    [1, 2, 3],
    [4, 5, 6],
  ]);
  const [transposed, setTransposed] = useState([]); // Will be 3x2
  const [current, setCurrent] = useState(null);
  const [processing, setProcessing] = useState(false);

  const runTranspose = async () => {
    setProcessing(true);
    const R = matrix.length;
    const C = matrix[0].length;

    // Initialize Empty Transpose Matrix
    const temp = Array(C)
      .fill(0)
      .map(() => Array(R).fill(0));
    setTransposed(temp);
    await new Promise((r) => setTimeout(r, 600));

    for (let r = 0; r < R; r++) {
      for (let c = 0; c < C; c++) {
        setCurrent({ r, c });
        temp[c][r] = matrix[r][c];
        setTransposed([...temp]); // Trigger re-render

        // Highlight swap
        await new Promise((res) => setTimeout(res, 400));
      }
    }
    setCurrent(null);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-5xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-purple-500">
        <h1 className="text-3xl font-bold text-purple-400 text-center mb-6">
          🔄 Transpose Matrix
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Flip matrix over its main diagonal. A[i][j] &rarr; A[j][i]
        </p>

        <div className="flex justify-center mb-10">
          <button
            onClick={runTranspose}
            disabled={processing}
            className="bg-purple-600 px-6 py-2 rounded font-bold disabled:opacity-50"
          >
            Transpose
          </button>
          <button
            onClick={() => {
              setMatrix([
                [1, 2, 3],
                [4, 5, 6],
              ]);
              setTransposed([]);
            }}
            className="ml-4 bg-gray-600 px-4 py-2 rounded"
          >
            Reset
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start justify-center">
          {/* Original */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold mb-4">Original (2x3)</h3>
            <div className="flex flex-col gap-2">
              {matrix.map((row, r) => (
                <div key={r} className="flex gap-2">
                  {row.map((val, c) => (
                    <div
                      key={c}
                      className={`w-12 h-12 flex items-center justify-center border transition duration-300 rounded font-bold text-lg
                                            ${current?.r === r && current?.c === c ? "bg-purple-500 border-purple-300" : "bg-gray-700 border-gray-600"}
                                         `}
                    >
                      {val}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex items-center justify-center h-full">
            <span className="text-4xl">👉</span>
          </div>

          {/* Transposed */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold mb-4">Transposed (3x2)</h3>
            {transposed.length === 0 ? (
              <div className="w-32 h-32 flex items-center justify-center border-2 border-dashed border-gray-600 rounded text-gray-500">
                ?
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {transposed.map((row, r) => (
                  <div key={r} className="flex gap-2">
                    {row.map((val, c) => (
                      <motion.div
                        key={c}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`w-12 h-12 flex items-center justify-center border rounded font-bold text-lg
                                                     ${current?.r === c && current?.c === r ? "bg-purple-500 border-purple-300" : "bg-indigo-900 border-indigo-700"}
                                                `}
                      >
                        {val}
                      </motion.div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransposeMatrix;
