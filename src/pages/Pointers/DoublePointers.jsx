import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const DoublePointers = () => {
  // Default code showing int a, int* p, int** q
  const [code, setCode] = useState(`int a = 10;
int* p = &a;
int** q = &p;

// Try changing value via double pointer!
**q = 50;`);

  const [valueA, setValueA] = useState(10);
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    const lines = code.split("\n");
    let newVal = 10;

    lines.forEach((line) => {
      // Direct assignment: int a = X;
      const matchA = line.match(/int\s+a\s*=\s*(\d+)/);
      if (matchA) newVal = parseInt(matchA[1]);

      // Single pointer assignment: *p = X;
      const matchP = line.match(/\*p\s*=\s*(\d+)/);
      if (matchP) newVal = parseInt(matchP[1]);

      // Double pointer assignment: **q = X;
      const matchQ = line.match(/\*\*q\s*=\s*(\d+)/);
      if (matchQ) newVal = parseInt(matchQ[1]);
    });

    if (newVal !== valueA) {
      setValueA(newVal);
      setHighlight(true);
      setTimeout(() => setHighlight(false), 500);
    }
  }, [code, valueA]);

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 px-8 pb-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-cyan-400">
        Level 2: Double Pointers (int**)
      </h1>

      <div className="flex flex-col xl:flex-row gap-8 w-full max-w-7xl">
        {/* Left: Code */}
        <div className="flex-1 bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700 h-fit">
          <h3 className="text-xl font-semibold mb-4 text-yellow-400">
            📝 C++ Code Editor
          </h3>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 bg-black font-mono text-green-400 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-lg resize-none"
            spellCheck="false"
          />
          <div className="mt-4 text-gray-400 text-sm">
            <p>
              <strong>Code Analysis:</strong>
            </p>
            <ul className="list-disc list-inside ml-2 space-y-1">
              <li>
                <span className="text-pink-400">int* p</span> holds address of{" "}
                <span className="text-yellow-400">a</span>.
              </li>
              <li>
                <span className="text-orange-400">int** q</span> holds address
                of <span className="text-pink-400">p</span>.
              </li>
              <li>
                <span className="text-cyan-400">**q</span> means: Go to address
                in q (p's loc) &rarr; Go to address in p (a's loc) &rarr; Access
                value.
              </li>
            </ul>
          </div>
        </div>

        {/* Right: Visualization */}
        <div className="flex-[2] bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700 relative flex flex-col items-center justify-center min-h-[400px]">
          <h3 className="text-xl font-semibold mb-12 text-cyan-400">
            🧠 Memory Map
          </h3>

          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-8 lg:gap-16">
            {/* Box Q */}
            <div className="flex flex-col items-center relative group">
              <span className="text-gray-500 font-mono mb-2">Addr: 0x300</span>
              <div className="w-28 h-28 border-4 border-orange-500 rounded-lg flex items-center justify-center text-lg font-bold bg-gray-900 text-white shadow-[0_0_10px_rgba(249,115,22,0.5)]">
                0x200
              </div>
              <span className="text-orange-400 font-bold mt-2 text-lg">
                int** q
              </span>

              {/* Arrow Q -> P */}
              <div className="hidden md:block absolute top-1/2 -right-8 w-8 h-1 bg-orange-500"></div>
              <div className="hidden md:block absolute top-1/2 -right-[40px] -translate-y-[4px] w-0 h-0 border-t-8 border-t-transparent border-l-[16px] border-l-orange-500 border-b-8 border-b-transparent"></div>

              {/* Mobile Arrow (Down) */}
              <div className="md:hidden absolute -bottom-8 left-1/2 w-1 h-8 bg-orange-500"></div>
              <div className="md:hidden absolute -bottom-[40px] left-1/2 -translate-x-[4px] w-0 h-0 border-l-8 border-l-transparent border-t-[16px] border-t-orange-500 border-r-8 border-r-transparent"></div>
            </div>

            {/* Box P */}
            <div className="flex flex-col items-center relative group">
              <span className="text-gray-500 font-mono mb-2">Addr: 0x200</span>
              <div className="w-28 h-28 border-4 border-pink-500 rounded-lg flex items-center justify-center text-lg font-bold bg-gray-900 text-white shadow-[0_0_10px_rgba(236,72,153,0.5)]">
                0x100
              </div>
              <span className="text-pink-400 font-bold mt-2 text-lg">
                int* p
              </span>

              {/* Arrow P -> A */}
              <div className="hidden md:block absolute top-1/2 -right-8 w-8 h-1 bg-pink-500"></div>
              <div className="hidden md:block absolute top-1/2 -right-[40px] -translate-y-[4px] w-0 h-0 border-t-8 border-t-transparent border-l-[16px] border-l-pink-500 border-b-8 border-b-transparent"></div>

              {/* Mobile Arrow (Down) */}
              <div className="md:hidden absolute -bottom-8 left-1/2 w-1 h-8 bg-pink-500"></div>
              <div className="md:hidden absolute -bottom-[40px] left-1/2 -translate-x-[4px] w-0 h-0 border-l-8 border-l-transparent border-t-[16px] border-t-pink-500 border-r-8 border-r-transparent"></div>
            </div>

            {/* Box A */}
            <div className="flex flex-col items-center relative">
              <span className="text-gray-500 font-mono mb-2">Addr: 0x100</span>
              <motion.div
                animate={{
                  backgroundColor: highlight ? "#F59E0B" : "#1F2937",
                  scale: highlight ? 1.1 : 1,
                }}
                className="w-28 h-28 border-4 border-yellow-500 rounded-lg flex items-center justify-center text-3xl font-bold bg-gray-900 text-white shadow-[0_0_10px_rgba(234,179,8,0.5)]"
              >
                {valueA}
              </motion.div>
              <span className="text-yellow-400 font-bold mt-2 text-lg">
                int a
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoublePointers;
