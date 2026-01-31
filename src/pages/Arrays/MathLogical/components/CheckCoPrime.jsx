import React, { useState } from "react";

const CheckCoPrime = () => {
  const [a, setA] = useState(8);
  const [b, setB] = useState(15);
  const [message, setMessage] = useState("");

  const gcd = (x, y) => (!y ? x : gcd(y, x % y));

  const check = () => {
    const hcf = gcd(a, b);
    if (hcf === 1) setMessage(`✅ GCD is 1. ${a} and ${b} ARE Co-Prime.`);
    else setMessage(`❌ GCD is ${hcf}. ${a} and ${b} are NOT Co-Prime.`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-orange-500">
        <h1 className="text-3xl font-bold text-orange-400 text-center mb-6">
          🤝 Check Co-Prime
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
            onClick={check}
            className="bg-orange-600 px-6 py-2 rounded font-bold"
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
export default CheckCoPrime;
