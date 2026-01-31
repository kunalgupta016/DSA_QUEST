import React, { useState } from "react";
import { motion } from "framer-motion";

const ReverseNumber = () => {
  const [number, setNumber] = useState(12345);
  const [reversed, setReversed] = useState(0);
  const [currentDigit, setCurrentDigit] = useState(null);
  const [message, setMessage] = useState("Enter a number to reverse");
  const [processing, setProcessing] = useState(false);

  const runReverse = async () => {
    setProcessing(true);
    let n = number;
    let rev = 0;
    setReversed(0);

    while (n > 0) {
      const digit = n % 10;
      setCurrentDigit(digit);
      setMessage(`Extracted Digit: ${digit}`);
      await new Promise((r) => setTimeout(r, 600));

      const newRev = rev * 10 + digit;
      setMessage(`Update Reverse: ${rev} * 10 + ${digit} = ${newRev}`);
      rev = newRev;
      setReversed(rev);
      await new Promise((r) => setTimeout(r, 600));

      n = Math.floor(n / 10);
      setMessage(`Remaining Number: ${n}`);
      await new Promise((r) => setTimeout(r, 600));
    }
    setMessage(`✅ Reversed Number: ${rev}`);
    setCurrentDigit(null);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-pink-500">
        <h1 className="text-3xl font-bold text-pink-400 text-center mb-6">
          🔄 Reverse Number
        </h1>

        <div className="flex justify-center gap-4 mb-8">
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(parseInt(e.target.value))}
            className="w-32 px-2 py-1 bg-gray-700 rounded border border-gray-600"
          />
          <button
            onClick={runReverse}
            disabled={processing}
            className="bg-pink-600 px-6 py-2 rounded font-bold disabled:opacity-50"
          >
            Reverse
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8 text-center text-4xl font-mono font-bold mb-8">
          <div className="bg-gray-700 p-6 rounded">
            <div className="text-sm text-gray-400 mb-2">Original</div>
            {number}
          </div>
          <div className="bg-gray-700 p-6 rounded relative">
            <div className="text-sm text-gray-400 mb-2">Reversed</div>
            {reversed}
            {currentDigit !== null && (
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute -top-4 right-4 text-sm text-yellow-300 bg-black/60 px-2 rounded"
              >
                + {currentDigit}
              </motion.div>
            )}
          </div>
        </div>

        <div className="bg-black/40 p-3 rounded text-center text-green-300 font-mono">
          {message}
        </div>
      </div>
    </div>
  );
};

export default ReverseNumber;
