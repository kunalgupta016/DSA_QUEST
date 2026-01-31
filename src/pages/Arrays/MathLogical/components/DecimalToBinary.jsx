import React, { useState } from "react";

const DecimalToBinary = () => {
  const [decimal, setDecimal] = useState(10);
  const [binary, setBinary] = useState("");
  const [message, setMessage] = useState("");

  const convert = async () => {
    setBinary("");
    let n = parseInt(decimal);
    let bin = "";
    while (n > 0) {
      bin = (n % 2) + bin;
      n = Math.floor(n / 2);
      setBinary(bin);
      await new Promise((r) => setTimeout(r, 300));
    }
    setMessage(`✅ Binary: ${bin}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-cyan-500">
        <h1 className="text-3xl font-bold text-cyan-400 text-center mb-6">
          1️⃣0️⃣ Decimal to Binary
        </h1>
        <div className="flex justify-center gap-4 mb-6">
          <input
            type="number"
            value={decimal}
            onChange={(e) => setDecimal(e.target.value)}
            className="w-32 px-2 py-1 bg-gray-700 rounded border border-gray-600"
          />
          <button
            onClick={convert}
            className="bg-cyan-600 px-6 py-2 rounded font-bold"
          >
            Convert
          </button>
        </div>
        <div className="text-center p-4 bg-black/30 rounded">
          <p className="text-4xl font-mono text-white">{binary}</p>
          <p className="text-gray-400 mt-2">{message}</p>
        </div>
      </div>
    </div>
  );
};
export default DecimalToBinary;
