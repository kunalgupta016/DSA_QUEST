import React, { useState } from "react";
import { motion } from "framer-motion";

const SpiralMatrix = () => {
  const [matrix] = useState([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ]);
  const [currentCell, setCurrentCell] = useState(null);
  const [output, setOutput] = useState([]);
  const [visited, setVisited] = useState(new Set());
  const [isProcessing, setIsProcessing] = useState(false);

  const spiralOrder = async () => {
    setIsProcessing(true);
    setOutput([]);
    setVisited(new Set());
    const visitedSet = new Set();
    const res = [];

    let top = 0,
      bottom = matrix.length - 1;
    let left = 0,
      right = matrix[0].length - 1;

    while (top <= bottom && left <= right) {
      // Left to Right
      for (let i = left; i <= right; i++) {
        setCurrentCell({ r: top, c: i });
        visitedSet.add(`${top},${i}`);
        setVisited(new Set(visitedSet));
        res.push(matrix[top][i]);
        setOutput([...res]);
        await new Promise((r) => setTimeout(r, 300));
      }
      top++;

      // Top to Bottom
      for (let i = top; i <= bottom; i++) {
        setCurrentCell({ r: i, c: right });
        visitedSet.add(`${i},${right}`);
        setVisited(new Set(visitedSet));
        res.push(matrix[i][right]);
        setOutput([...res]);
        await new Promise((r) => setTimeout(r, 300));
      }
      right--;

      if (top <= bottom) {
        // Right to Left
        for (let i = right; i >= left; i--) {
          setCurrentCell({ r: bottom, c: i });
          visitedSet.add(`${bottom},${i}`);
          setVisited(new Set(visitedSet));
          res.push(matrix[bottom][i]);
          setOutput([...res]);
          await new Promise((r) => setTimeout(r, 300));
        }
        bottom--;
      }

      if (left <= right) {
        // Bottom to Top
        for (let i = bottom; i >= top; i--) {
          setCurrentCell({ r: i, c: left });
          visitedSet.add(`${i},${left}`);
          setVisited(new Set(visitedSet));
          res.push(matrix[i][left]);
          setOutput([...res]);
          await new Promise((r) => setTimeout(r, 300));
        }
        left++;
      }
    }
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-orange-500">
        <h1 className="text-3xl font-bold text-orange-400 text-center mb-6">
          🐌 Spiral Matrix
        </h1>

        <div className="flex justify-center mb-8">
          <button
            onClick={spiralOrder}
            disabled={isProcessing}
            className="bg-orange-600 px-6 py-2 rounded font-bold disabled:opacity-50"
          >
            Traverse Spiral
          </button>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex flex-col gap-2">
            {matrix.map((row, rIdx) => (
              <div key={rIdx} className="flex gap-2">
                {row.map((val, cIdx) => {
                  const isVis = visited.has(`${rIdx},${cIdx}`);
                  return (
                    <motion.div
                      key={cIdx}
                      animate={{
                        backgroundColor:
                          currentCell?.r === rIdx && currentCell?.c === cIdx
                            ? "#f97316"
                            : isVis
                              ? "#431407"
                              : "#1f2937",
                        borderColor: isVis ? "#ea580c" : "#4b5563",
                      }}
                      className="w-12 h-12 flex items-center justify-center border-2 rounded font-bold"
                    >
                      {val}
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-black/30 p-4 rounded overflow-auto">
          <h3 className="text-orange-500 mb-2 font-bold">Output:</h3>
          <div className="flex gap-2 flex-wrap font-mono text-sm">
            {output.map((v, i) => (
              <span key={i}>{v}, </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpiralMatrix;
