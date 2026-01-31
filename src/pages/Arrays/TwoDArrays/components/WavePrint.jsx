import React, { useState } from "react";
import { motion } from "framer-motion";

const WavePrint = () => {
  const [matrix] = useState([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
  ]);
  const [currentCell, setCurrentCell] = useState(null);
  const [output, setOutput] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const traverseWave = async () => {
    setIsProcessing(true);
    setOutput([]);
    const path = [];
    const rows = matrix.length;
    const cols = matrix[0].length;

    for (let c = 0; c < cols; c++) {
      if (c % 2 === 0) {
        // Top to Bottom
        for (let r = 0; r < rows; r++) {
          setCurrentCell({ r, c });
          path.push(matrix[r][c]);
          setOutput([...path]);
          await new Promise((r) => setTimeout(r, 400));
        }
      } else {
        // Bottom to Top
        for (let r = rows - 1; r >= 0; r--) {
          setCurrentCell({ r, c });
          path.push(matrix[r][c]);
          setOutput([...path]);
          await new Promise((r) => setTimeout(r, 400));
        }
      }
    }
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-5xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-teal-500">
        <h1 className="text-3xl font-bold text-teal-400 text-center mb-6">
          🌊 Print Like a Wave
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Column-wise: Even Cols &darr;, Odd Cols &uarr;
        </p>

        <div className="flex justify-center mb-8">
          <button
            onClick={traverseWave}
            disabled={isProcessing}
            className="bg-teal-600 px-6 py-2 rounded font-bold disabled:opacity-50"
          >
            Start Wave
          </button>
        </div>

        <div className="flex justify-center gap-12 mb-8">
          <div className="flex flex-col items-center gap-2">
            {matrix.map((row, rIdx) => (
              <div key={rIdx} className="flex gap-2">
                {row.map((val, cIdx) => (
                  <motion.div
                    key={cIdx}
                    animate={{
                      backgroundColor:
                        currentCell?.r === rIdx && currentCell?.c === cIdx
                          ? "#14b8a6"
                          : "#1f2937",
                      scale:
                        currentCell?.r === rIdx && currentCell?.c === cIdx
                          ? 1.1
                          : 1,
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

        <div className="bg-black/30 p-4 rounded overflow-auto">
          <h3 className="text-teal-500 mb-2 font-bold">Output:</h3>
          <div className="flex gap-2 flex-wrap font-mono">
            {output.map((v, i) => (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={i}
                className="bg-gray-700 px-2 py-1 rounded"
              >
                {v}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WavePrint;
