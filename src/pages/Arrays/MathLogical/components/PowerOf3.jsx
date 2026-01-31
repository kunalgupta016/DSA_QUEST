import React, { useState } from "react";

const PowerOf3 = () => {
  const [number, setNumber] = useState(27);
  const [message, setMessage] = useState("");

  const check = async () => {
    setMessage("Checking...");
    await new Promise((r) => setTimeout(r, 500));

    let n = number;
    if (n <= 0) {
      setMessage("❌ Not a Power of 3");
      return;
    }
    while (n % 3 === 0) {
      n /= 3;
    }
    if (n === 1) setMessage(`✅ ${number} is a Power of 3!`);
    else setMessage(`❌ ${number} is NOT a Power of 3.`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-indigo-500">
        <h1 className="text-3xl font-bold text-indigo-400 text-center mb-6">
          ⚡ Check Power of 3
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
            className="bg-indigo-600 px-6 py-2 rounded font-bold"
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
export default PowerOf3;
