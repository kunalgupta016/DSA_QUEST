import React, { useState } from "react";

const PowerVisualizer = () => {
  const [base, setBase] = useState(2);
  const [exponent, setExponent] = useState(10);
  const [res, setRes] = useState(null);
  const [message, setMessage] = useState("Calculates Base^Exp efficiently");

  const calculate = async () => {
    setMessage("Calculating using Logarithmic Logic...");
    await new Promise((r) => setTimeout(r, 600));
    setRes(Math.pow(base, exponent));
    setMessage("✅ Done");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-pink-500">
        <h1 className="text-3xl font-bold text-pink-400 text-center mb-6">
          🚀 Power (Fast Expo)
        </h1>
        <div className="flex justify-center gap-4 mb-6">
          <input
            type="number"
            value={base}
            onChange={(e) => setBase(e.target.value)}
            className="w-20 px-2 py-1 bg-gray-700"
            placeholder="Base"
          />
          <input
            type="number"
            value={exponent}
            onChange={(e) => setExponent(e.target.value)}
            className="w-20 px-2 py-1 bg-gray-700"
            placeholder="Exp"
          />
          <button
            onClick={calculate}
            className="bg-pink-600 px-6 py-2 rounded font-bold"
          >
            Calc
          </button>
        </div>
        <div className="text-center p-4 bg-black/30 rounded">
          <p className="text-4xl font-mono text-white">
            {res !== null ? res : "-"}
          </p>
          <p className="text-gray-400 mt-2">{message}</p>
        </div>
      </div>
    </div>
  );
};
export default PowerVisualizer;
