import React, { useState } from "react";

const BinaryToDecimal = () => {
  const [binary, setBinary] = useState("1010");
  const [decimal, setDecimal] = useState(0);
  const [message, setMessage] = useState("");

  const convert = async () => {
    setDecimal(0);
    let dec = 0;
    let p = 0;
    for (let i = binary.length - 1; i >= 0; i--) {
      if (binary[i] === "1") {
        dec += Math.pow(2, p);
      }
      p++;
      setDecimal(dec);
      await new Promise((r) => setTimeout(r, 300));
    }
    setMessage(`✅ Decimal: ${dec}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-cyan-500">
        <h1 className="text-3xl font-bold text-cyan-400 text-center mb-6">
          0️⃣1️⃣ Binary to Decimal
        </h1>
        <div className="flex justify-center gap-4 mb-6">
          <input
            type="text"
            value={binary}
            onChange={(e) => setBinary(e.target.value)}
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
          <p className="text-4xl font-mono text-white">{decimal}</p>
          <p className="text-gray-400 mt-2">{message}</p>
        </div>
      </div>
    </div>
  );
};
export default BinaryToDecimal;
