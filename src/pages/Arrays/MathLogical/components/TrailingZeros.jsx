import React, { useState } from "react";

const TrailingZeros = () => {
  const [n, setN] = useState(100);
  const [zeros, setZeros] = useState(null);
  const [message, setMessage] = useState("Count Pairs of (2*5)");

  const count = () => {
    let count = 0;
    let num = n;
    while (num >= 5) {
      count += Math.floor(num / 5);
      num /= 5;
    }
    setZeros(count);
    setMessage(`✅ ${n}! has ${count} trailing zeros.`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-green-500">
        <h1 className="text-3xl font-bold text-green-400 text-center mb-6">
          0️⃣ Trailing Zeros in Factorial
        </h1>
        <div className="flex justify-center gap-4 mb-6">
          <input
            type="number"
            value={n}
            onChange={(e) => setN(e.target.value)}
            className="w-32 px-2 py-1 bg-gray-700 rounded border border-gray-600"
          />
          <button
            onClick={count}
            className="bg-green-600 px-6 py-2 rounded font-bold"
          >
            Count
          </button>
        </div>
        <div className="text-center p-4 bg-black/30 rounded">
          <p className="text-6xl font-mono text-white">
            {zeros !== null ? zeros : "-"}
          </p>
          <p className="text-gray-400 mt-2">{message}</p>
        </div>
      </div>
    </div>
  );
};
export default TrailingZeros;
