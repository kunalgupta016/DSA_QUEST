import React, { useState } from "react";
import { motion } from "framer-motion";

const TrappingRainWater = () => {
  const [heights] = useState([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]);
  const [leftMax, setLeftMax] = useState([]);
  const [rightMax, setRightMax] = useState([]);
  const [totalWater, setTotalWater] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [message, setMessage] = useState("Please start calculation");
  const [processing, setProcessing] = useState(false);
  const [waterLevels, setWaterLevels] = useState(Array(12).fill(0));

  const calculate = async () => {
    setProcessing(true);
    const n = heights.length;
    let lMax = Array(n).fill(0);
    let rMax = Array(n).fill(0);
    let water = Array(n).fill(0);

    setMessage("Precomputing Left Max Array...");
    lMax[0] = heights[0];
    for (let i = 1; i < n; i++) {
      lMax[i] = Math.max(heights[i], lMax[i - 1]);
      setLeftMax([...lMax]); // visual update
      setCurrentIndex(i);
      await new Promise((r) => setTimeout(r, 200));
    }

    setMessage("Precomputing Right Max Array...");
    rMax[n - 1] = heights[n - 1];
    for (let i = n - 2; i >= 0; i--) {
      rMax[i] = Math.max(heights[i], rMax[i + 1]);
      setRightMax([...rMax]); // visual update
      setCurrentIndex(i);
      await new Promise((r) => setTimeout(r, 200));
    }

    setMessage("Calculating Trapped Water: Min(L, R) - Height");
    let total = 0;
    for (let i = 0; i < n; i++) {
      setCurrentIndex(i);
      const level = Math.min(lMax[i], rMax[i]);
      const trapped = Math.max(0, level - heights[i]);
      total += trapped;
      water[i] = trapped;
      setWaterLevels([...water]);
      setTotalWater(total);

      setMessage(
        `Index ${i}: Min(${lMax[i]}, ${rMax[i]}) - ${heights[i]} = ${trapped} units`,
      );
      await new Promise((r) => setTimeout(r, 600));
    }

    setMessage(`✅ Total Water Trapped: ${total} units`);
    setCurrentIndex(null);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-5xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-cyan-500">
        <h1 className="text-3xl font-bold text-cyan-400 text-center mb-6">
          🌧 Trapping Rain Water
        </h1>

        <div className="flex justify-center mb-8">
          <button
            onClick={calculate}
            disabled={processing}
            className="bg-cyan-600 hover:bg-cyan-700 px-6 py-2 rounded-md font-bold disabled:opacity-50"
          >
            Calculate Water
          </button>
        </div>

        <div className="h-64 flex items-end justify-center gap-0 mb-6 px-4 bg-gray-900/50 rounded-lg pt-10">
          {heights.map((h, idx) => {
            let w = waterLevels[idx];
            return (
              <div
                key={idx}
                className="relative w-10 flex flex-col justify-end h-full border-b border-gray-600"
              >
                {/* Water Block */}
                {w > 0 && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${w * 20}px` }}
                    className="w-full bg-blue-500/80 absolute bottom-0 mb-[1px]"
                    style={{ bottom: `${h * 20}px` }}
                  />
                )}
                {/* Building Block */}
                <div
                  className={`w-full bg-gray-400 border-r border-gray-800 ${currentIndex === idx ? "bg-yellow-200" : ""}`}
                  style={{ height: `${h * 20}px` }}
                />
                <span className="text-center text-[10px] mt-1 text-gray-500 absolute -bottom-5 left-1/2 -translate-x-1/2">
                  {idx}
                </span>
              </div>
            );
          })}
        </div>

        <div className="bg-gray-700 p-4 rounded text-center mb-6">
          <h3 className="text-gray-300">Total Trapped Water</h3>
          <p className="text-4xl font-bold text-cyan-300">{totalWater}</p>
        </div>

        <div className="bg-black/40 p-2 rounded text-center font-mono text-yellow-300 text-sm">
          {message}
        </div>
      </div>
    </div>
  );
};

export default TrappingRainWater;
