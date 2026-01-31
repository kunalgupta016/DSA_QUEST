import React, { useState } from "react";

const SumDigits = () => {
  const [number, setNumber] = useState(12345);
  const [sum, setSum] = useState(0);
  const [message, setMessage] = useState("Enter a number");
  const [processing, setProcessing] = useState(false);

  const run = async () => {
    setProcessing(true);
    setSum(0);
    let n = Math.abs(number);
    let s = 0;

    while (n > 0) {
      let d = n % 10;
      s += d;
      setSum(s);
      setMessage(`Adding ${d}. Current Sum: ${s}`);
      await new Promise((r) => setTimeout(r, 500));
      n = Math.floor(n / 10);
    }
    setMessage(`✅ Total Sum: ${s}`);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-green-500">
        <h1 className="text-3xl font-bold text-green-400 text-center mb-6">
          ➕ Sum of Digits
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
            className="bg-green-600 px-6 py-2 rounded font-bold disabled:opacity-50"
          >
            Msg
          </button>
        </div>
        <div className="text-center">
          <p className="text-6xl font-bold mb-4 text-green-300">{sum}</p>
          <p className="text-gray-400">{message}</p>
        </div>
      </div>
    </div>
  );
};
export default SumDigits;
