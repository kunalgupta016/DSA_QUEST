import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PointerBasics = () => {
  const [code, setCode] = useState(`int a = 10;
int* p = &a;

// Try changing the value of 'a' above!
// e.g., int a = 50;`);

  const [variableValue, setVariableValue] = useState(10);
  const [highlight, setHighlight] = useState(false);

  // Simple regex parser to update state based on code
  useEffect(() => {
    const lines = code.split("\n");
    let newVal = 10; // Default

    // Look for assignments like "int a = X;" or "*p = X;"
    // We scan top to bottom, so later assignments override earlier ones.
    lines.forEach((line) => {
      // Match "int a = <digits>;"
      const initMatch = line.match(/int\s+a\s*=\s*(\d+)/);
      if (initMatch) {
        newVal = parseInt(initMatch[1], 10);
      }

      // Match "*p = <digits>;" or "a = <digits>;"
      const assignMatch = line.match(/(\*p|a)\s*=\s*(\d+)/);
      if (assignMatch) {
        newVal = parseInt(assignMatch[2], 10);
      }
    });

    if (newVal !== variableValue) {
      setVariableValue(newVal);
      // Trigger highlight animation
      setHighlight(true);
      setTimeout(() => setHighlight(false), 500);
    }
  }, [code, variableValue]);

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 px-8 pb-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-cyan-400">Pointer Basics</h1>

      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">
        {/* Left Side: Code Editor */}
        <div className="flex-1 bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700">
          <h3 className="text-xl font-semibold mb-4 text-yellow-400">
            📝 C++ Code Editor
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Edit the code to see how it affects memory! <br />
            Allowed patterns:{" "}
            <code className="bg-gray-700 px-1 rounded">
              int a = 10;
            </code> or{" "}
            <code className="bg-gray-700 px-1 rounded">*p = 20;</code>
          </p>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 bg-black font-mono text-green-400 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-lg resize-none"
            spellCheck="false"
          />
        </div>

        {/* Right Side: Memory Visualizer */}
        <div className="flex-1 bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700 relative overflow-hidden flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold mb-8 text-cyan-400">
            🧠 Memory Visualizer
          </h3>

          <div className="flex items-center gap-12 sm:gap-20 relative">
            {/* Variable block */}
            <div className="flex flex-col items-center z-10">
              <span className="text-gray-400 mb-2 font-mono">
                Address: 0x100
              </span>
              <motion.div
                animate={{
                  backgroundColor: highlight ? "#F59E0B" : "#1F2937", // Amber when changing, else Gray-800
                  scale: highlight ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="w-32 h-32 border-4 border-cyan-500 rounded-lg flex items-center justify-center text-3xl font-bold text-white bg-gray-900 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
              >
                {variableValue}
              </motion.div>
              <span className="mt-2 font-bold text-xl text-yellow-400">
                int a
              </span>
            </div>

            {/* Pointer block */}
            <div className="flex flex-col items-center z-10">
              <span className="text-gray-400 mb-2 font-mono">
                Address: 0x200
              </span>
              <div className="w-32 h-32 border-4 border-purple-500 rounded-lg flex items-center justify-center text-xl font-bold text-white bg-gray-900 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                0x100
              </div>
              <span className="mt-2 font-bold text-xl text-purple-400">
                int* p
              </span>
            </div>

            {/* Arrow connecting P to A */}
            <svg
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none"
              style={{ zIndex: 1 }}
            >
              {/* 
                        Drawing an arrow from Pointer (Right) to Variable (Left).
                        Assuming flex layout centers them. We can absolutely position an SVG line.
                        However, with flex gap, we can just draw a reliable arrow in the gap.
                        
                        Better approach: Arrow from left side of P to right side of A.
                     */}
            </svg>

            {/* Simplified Arrow using absolute div for the gap */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/4 w-16 h-1 bg-purple-500 hidden sm:block"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-[calc(50%+2rem)] -translate-y-[calc(75%+4px)] w-0 h-0 border-t-8 border-t-transparent border-r-[16px] border-r-purple-500 border-b-8 border-b-transparent hidden sm:block"></div>
          </div>

          <div className="mt-12 p-4 bg-gray-900 rounded-lg border border-gray-600 max-w-md">
            <p className="text-gray-300">
              <span className="text-purple-400 font-bold">p</span> stores the
              address of <span className="text-yellow-400 font-bold">a</span>.
              <br />
              So, <span className="font-mono bg-gray-800 px-1 rounded">
                *p
              </span>{" "}
              (dereferencing p) accesses the value at that address (
              <span className="text-cyan-400 font-bold">{variableValue}</span>).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointerBasics;
