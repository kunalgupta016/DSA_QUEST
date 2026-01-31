import React, { useState } from "react";
import { motion } from "framer-motion";

const CountDigits = () => {
  const [number, setNumber] = useState(12345);
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("Enter a number");
  const [processing, setProcessing] = useState(false);

  const run = async () => {
    setProcessing(true);
    setCount(0);
    let n = Math.abs(number);
    if (n === 0) {
      setCount(1);
      setMessage("0 has 1 digit.");
      setProcessing(false);
      return;
    }

    let c = 0;
    while (n > 0) {
      c++;
      setCount(c);
      setMessage(`Count: ${c}. Remaining: ${n}`);
      await new Promise((r) => setTimeout(r, 400));
      n = Math.floor(n / 10);
    }
    setMessage(`✅ Total Digits: ${c}`);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-blue-500">
        <h1 className="text-3xl font-bold text-blue-400 text-center mb-6">
          🔢 Count Digits
        </h1>
        <div className="flex justify-center gap-4 mb-6">
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(parseInt(e.target.value))}
            className="w-32 px-2 py-1 bg-gray-700 rounded border border-gray-600"
          />
          <button
            onClick={run}
            disabled={processing}
            className="bg-blue-600 px-6 py-2 rounded font-bold disabled:opacity-50"
          >
            Count
          </button>
        </div>
        <div className="text-center">
          <p className="text-6xl font-bold mb-4">{count}</p>
          <p className="text-gray-400">{message}</p>
        </div>
      </div>
    </div>
  );
};
export default CountDigits;
