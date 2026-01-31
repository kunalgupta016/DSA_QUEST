import React, { useState } from "react";
import { motion } from "framer-motion";

const DuplicateNumber = () => {
  const [array] = useState([1, 3, 4, 2, 2]); // Array Size N+1, Elements 1..N
  const [slow, setSlow] = useState(0);
  const [fast, setFast] = useState(0);
  const [message, setMessage] = useState(
    "Floyd Cycle Detection (Tortoise & Hare)",
  );
  const [processing, setProcessing] = useState(false);
  const [phase, setPhase] = useState(""); // 'intersection', 'start'

  const solve = async () => {
    setProcessing(true);
    setPhase("intersection");
    setMessage("Phase 1: Finding Intersection Point");

    // Initial Step
    let s = array[0];
    let f = array[0];
    setSlow(s);
    setFast(f);
    await new Promise((r) => setTimeout(r, 800));

    // Move first step manually to enter loop
    s = array[s];
    f = array[array[f]];
    setSlow(s);
    setFast(f);
    setMessage(`Slow -> ${s}, Fast -> ${f}`);
    await new Promise((r) => setTimeout(r, 800));

    while (s !== f) {
      s = array[s];
      f = array[array[f]];
      setSlow(s);
      setFast(f);
      setMessage(`Slow moves 1 step to ${s}. Fast moves 2 steps to ${f}.`);
      await new Promise((r) => setTimeout(r, 800));
    }

    setMessage(`✅ Intersection found at ${s}`);
    await new Promise((r) => setTimeout(r, 1000));

    // Phase 2
    setPhase("start");
    setMessage("Phase 2: Find Entry Point of Cycle");
    f = 0; // Reset fast to head (but treat as slow pointer now)
    setFast(f);
    // Note: In visualizer, we just move both one step at a time
    while (s !== f) {
      s = array[s];
      f = array[f]; // Moving 'fast' pointer 1 step now effectively
      setSlow(s);
      setFast(f);
      setMessage(`Both move 1 step. Slow: ${s}, Fast(Head): ${f}`);
      await new Promise((r) => setTimeout(r, 800));
    }

    setMessage(`✅ Duplicate Found: ${s}`);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-purple-500">
        <h1 className="text-3xl font-bold text-purple-400 text-center mb-6">
          🐢🐇 Find Duplicate Number
        </h1>

        <div className="flex justify-center mb-6">
          <button
            onClick={solve}
            disabled={processing}
            className="bg-purple-600 px-6 py-2 rounded font-bold disabled:opacity-50"
          >
            Start Cycle Detection
          </button>
        </div>

        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {array.map((val, idx) => (
            <div key={idx} className="relative">
              <div className="w-12 h-12 flex items-center justify-center bg-gray-700 border border-gray-500 rounded font-bold text-xl">
                {val}
              </div>
              <div className="text-xs text-center text-gray-500 mt-1">
                {idx}
              </div>

              {/* Pointers */}
              <AnimatePointers
                idx={idx}
                val={val}
                slow={slow}
                fast={fast}
                phase={phase}
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-6 p-4 bg-black/30 rounded text-yellow-300 font-mono">
          {message}
        </div>
      </div>
    </div>
  );
};

const AnimatePointers = ({ idx, val, slow, fast, phase }) => {
  // Only verify if valid pointers for visual simplicity (values are indices)
  return (
    <>
      {
        /* We are visualizing pointers on VALUES as indices, but the array elements map index -> value. 
                Wait, the algorithm moves indices. array[slow]. So slow IS the value/index.
                If slow === idx, we show Tortoise here.
             */
        slow === idx && (
          <motion.div
            layoutId="slow"
            className="absolute -top-8 left-0 w-full flex justify-center text-2xl"
          >
            🐢
          </motion.div>
        )
      }
      {fast === idx && (
        <motion.div
          layoutId="fast"
          className="absolute -bottom-8 left-0 w-full flex justify-center text-2xl"
        >
          🐇
        </motion.div>
      )}
    </>
  );
};

export default DuplicateNumber;
