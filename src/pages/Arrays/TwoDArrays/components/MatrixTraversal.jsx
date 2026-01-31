import React, { useState } from "react";
import { motion } from "framer-motion";

const MatrixTraversal = () => {
  const [matrix] = useState([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]);
  const [currentCell, setCurrentCell] = useState(null); // {r, c}
  const [traversal, setTraversal] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const traverse = async () => {
    setIsProcessing(true);
    setTraversal([]);
    const path = [];
    for (let r = 0; r < matrix.length; r++) {
      for (let c = 0; c < matrix[0].length; c++) {
        setCurrentCell({ r, c });
        path.push(matrix[r][c]);
        setTraversal([...path]);
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-blue-500">
        <h1 className="text-3xl font-bold text-blue-400 text-center mb-6">
          🔳 Standard Matrix Traversal
        </h1>
        <div className="flex justify-center mb-6">
          <button
            onClick={traverse}
            disabled={isProcessing}
            className="bg-blue-600 px-6 py-2 rounded font-bold disabled:opacity-50"
          >
            Traverse (Row-Major)
          </button>
        </div>

        <div className="flex flex-col items-center gap-2 mb-8">
          {matrix.map((row, rIdx) => (
            <div key={rIdx} className="flex gap-2">
              {row.map((val, cIdx) => (
                <motion.div
                  key={cIdx}
                  animate={{
                    scale:
                      currentCell?.r === rIdx && currentCell?.c === cIdx
                        ? 1.2
                        : 1,
                    backgroundColor:
                      currentCell?.r === rIdx && currentCell?.c === cIdx
                        ? "#3b82f6"
                        : "#1f2937",
                  }}
                  className="w-12 h-12 flex items-center justify-center border border-gray-600 rounded bg-gray-800 font-bold text-xl"
                >
                  {val}
                </motion.div>
              ))}
            </div>
          ))}
        </div>

        <div className="bg-gray-700 p-4 rounded min-h-[60px]">
          <h3 className="text-gray-400 text-sm mb-2">Traversal Output:</h3>
          <div className="flex flex-wrap gap-2">
            {traversal.map((val, idx) => (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={idx}
                className="text-lg font-mono"
              >
                {val} &rarr;
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatrixTraversal;
