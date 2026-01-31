import React, { useState } from "react";

const PowerOfTwo = () => {
  const [number, setNumber] = useState(16);
  const [message, setMessage] = useState("");

  const check = async () => {
    setMessage("Checking...");
    await new Promise((r) => setTimeout(r, 500));

    // Bitwise trick: n & (n-1) == 0
    if (number > 0 && (number & (number - 1)) === 0) {
      setMessage(
        `✅ ${number} is a Power of 2! (Binary: ${number.toString(2)})`,
      );
    } else {
      setMessage(
        `❌ ${number} is NOT a Power of 2. (Binary: ${number.toString(2)})`,
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-yellow-500">
        <h1 className="text-3xl font-bold text-yellow-400 text-center mb-6">
          ⚡ Check Power of 2
        </h1>
        <div className="flex justify-center gap-4 mb-6">
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(parseInt(e.target.value))}
            className="w-32 px-2 py-1 bg-gray-700 rounded border border-gray-600"
          />
          <button
            onClick={check}
            className="bg-yellow-600 px-6 py-2 rounded font-bold"
          >
            Check
          </button>
        </div>
        <div className="text-center p-4 bg-black/30 rounded">
          <p className="text-xl font-mono text-white">{message}</p>
        </div>
      </div>
    </div>
  );
};
export default PowerOfTwo;
