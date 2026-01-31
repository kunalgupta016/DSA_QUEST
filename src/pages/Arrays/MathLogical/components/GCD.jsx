import React, { useState } from "react";
import { motion } from "framer-motion";

const GCD = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [steps, setSteps] = useState([]);
  const [calculating, setCalculating] = useState(false);

  const calculateGCD = async () => {
    if (!num1 || !num2) return;
    setCalculating(true);
    setSteps([]);

    let a = parseInt(num1);
    let b = parseInt(num2);
    let logs = [];

    logs.push(`Starting Euclidean Algorithm for GCD(${a}, ${b})...`);

    while (b !== 0) {
      await new Promise((r) => setTimeout(r, 800));
      let remainder = a % b;
      logs.push(`➤ ${a} % ${b} = ${remainder}`);
      logs.push(`   Update: a = ${b}, b = ${remainder}`);
      setSteps([...logs]);
      a = b;
      b = remainder;
    }

    logs.push(`✅ GCD is ${a}`);
    setSteps([...logs]);
    setCalculating(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-purple-500">
        <h1 className="text-3xl font-bold text-purple-400 text-center mb-6">
          🧮 GCD (HCF) Visualizer
        </h1>

        <div className="mb-6 text-center space-y-2">
          <p className="text-gray-300">
            Greatest Common Divisor (GCD) is the largest positive integer that
            divides each of the integers.
          </p>
          <p className="text-gray-400 italic">
            Hinglish: Wo sabse bada number jo dono numbers ko poora divide
            karde.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <input
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            placeholder="Num 1"
            className="px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 w-24"
          />
          <input
            type="number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            placeholder="Num 2"
            className="px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 w-24"
          />
          <button
            onClick={calculateGCD}
            disabled={calculating}
            className="bg-purple-500 hover:bg-purple-600 px-6 py-2 rounded-md font-bold disabled:opacity-50"
          >
            Calculate
          </button>
        </div>

        <div className="bg-black/50 p-4 rounded-lg h-64 overflow-y-auto font-mono text-sm">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-2 border-b border-gray-800 pb-1"
            >
              {step}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GCD;
