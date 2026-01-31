import React, { useState } from "react";

const LCM = () => {
  const [a, setA] = useState(12);
  const [b, setB] = useState(15);
  const [res, setRes] = useState(null);

  const gcd = (x, y) => (!y ? x : gcd(y, x % y));

  const solve = () => {
    const hcf = gcd(a, b);
    const l = (a * b) / hcf;
    setRes(l);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-teal-500">
        <h1 className="text-3xl font-bold text-teal-400 text-center mb-6">
          🔢 LCM of Two Numbers
        </h1>
        <div className="flex justify-center gap-4 mb-6">
          <input
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
            className="w-20 px-2 py-1 bg-gray-700"
          />
          <input
            type="number"
            value={b}
            onChange={(e) => setB(e.target.value)}
            className="w-20 px-2 py-1 bg-gray-700"
          />
          <button
            onClick={solve}
            className="bg-teal-600 px-6 py-2 rounded font-bold"
          >
            LCM
          </button>
        </div>
        <div className="text-center p-4 bg-black/30 rounded">
          <p className="text-4xl font-mono text-white">
            {res !== null ? res : "-"}
          </p>
          <p className="text-gray-400 mt-2">Formula: (a * b) / GCD(a, b)</p>
        </div>
      </div>
    </div>
  );
};
export default LCM;
