import React, { useState } from "react";
import { motion } from "framer-motion";

const ContainerMostWater = () => {
  const [heights, setHeights] = useState([1, 8, 6, 2, 5, 4, 8, 3, 7]);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(heights.length - 1);
  const [maxArea, setMaxArea] = useState(0);
  const [currentArea, setCurrentArea] = useState(0);
  const [message, setMessage] = useState("Two Pointer Approach");
  const [processing, setProcessing] = useState(false);

  const solve = async () => {
    setProcessing(true);
    let l = 0;
    let r = heights.length - 1;
    let max = 0;

    while (l < r) {
      setLeft(l);
      setRight(r);

      const h = Math.min(heights[l], heights[r]);
      const w = r - l;
      const area = h * w;
      setCurrentArea(area);

      if (area > max) {
        max = area;
        setMessage(`New Max Area Found: ${area} (Height: ${h}, Width: ${w})`);
      } else {
        setMessage(`Current Area: ${area} (Height: ${h}, Width: ${w})`);
      }
      setMaxArea(max);

      await new Promise((res) => setTimeout(res, 800));

      if (heights[l] < heights[r]) {
        setMessage(
          `Left height ${heights[l]} < Right ${heights[r]}. Moving Left pointer.`,
        );
        l++;
      } else {
        setMessage(
          `Right height ${heights[r]} <= Left ${heights[l]}. Moving Right pointer.`,
        );
        r--;
      }
      await new Promise((res) => setTimeout(res, 400));
    }
    setMessage(`✅ Max Water Area: ${max}`);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-5xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-blue-400">
        <h1 className="text-3xl font-bold text-blue-300 text-center mb-6">
          💧 Container With Most Water
        </h1>

        <div className="flex justify-center mb-8 gap-4">
          <button
            onClick={solve}
            disabled={processing}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-md font-bold disabled:opacity-50"
          >
            Start Visualization
          </button>
          <button
            onClick={() => {
              setLeft(0);
              setRight(heights.length - 1);
              setMaxArea(0);
              setCurrentArea(0);
            }}
            className="bg-gray-600 px-4 py-2 rounded"
          >
            Reset
          </button>
        </div>

        <div className="h-64 flex items-end justify-center gap-2 mb-2 px-4 bg-gray-900/50 rounded-lg relative">
          {heights.map((h, idx) => {
            let isPointer = idx === left || idx === right;
            let isInside = idx > left && idx < right;

            // Calculate water level for visual between pointers
            let waterHeight = 0;
            if (isInside || isPointer) {
              waterHeight = Math.min(heights[left], heights[right]);
            }

            return (
              <div
                key={idx}
                className="relative w-8 mx-1 flex flex-col justify-end h-full"
              >
                {isInside && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${waterHeight * 20}px` }}
                    className="absolute bottom-0 w-full bg-blue-500/30 z-0"
                  />
                )}
                <motion.div
                  className={`w-full bg-gray-300 z-10 rounded-t ${isPointer ? "bg-yellow-400" : ""}`}
                  style={{ height: `${h * 20}px` }}
                >
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-400">
                    {h}
                  </span>
                </motion.div>
                <span className="text-center text-xs mt-1 text-gray-500">
                  {idx}
                </span>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-8 text-center mt-6">
          <div className="bg-gray-700 p-4 rounded">
            <h3 className="text-gray-400">Current Area</h3>
            <p className="text-3xl font-bold text-blue-300">{currentArea}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded border-2 border-blue-500/50">
            <h3 className="text-blue-300">Max Area</h3>
            <p className="text-3xl font-bold text-white">{maxArea}</p>
          </div>
        </div>

        <div className="mt-6 text-center text-yellow-300 font-mono bg-black/40 p-3 rounded">
          {message}
        </div>
      </div>
    </div>
  );
};

export default ContainerMostWater;
