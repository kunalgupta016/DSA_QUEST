import React, { useState } from "react";
import { motion } from "framer-motion";

const ArmstrongNumber = () => {
  const [number, setNumber] = useState(153);
  const [sum, setSum] = useState(0);
  const [currentDigit, setCurrentDigit] = useState(null);
  const [message, setMessage] = useState(
    "Check if Sum of (digits ^ K) == Number",
  );
  const [processing, setProcessing] = useState(false);

  const checkArmstrong = async () => {
    setProcessing(true);
    setSum(0);
    let n = number;
    let temp = number;
    const digits = n.toString().length;
    let s = 0;

    setMessage(`Number of digits (K) = ${digits}`);
    await new Promise((r) => setTimeout(r, 1000));

    while (temp > 0) {
      const d = temp % 10;
      setCurrentDigit(d);
      const power = Math.pow(d, digits);

      setMessage(`Digit: ${d}. ${d}^${digits} = ${power}. Adding to Sum.`);
      await new Promise((r) => setTimeout(r, 800));

      s += power;
      setSum(s);
      temp = Math.floor(temp / 10);
      await new Promise((r) => setTimeout(r, 500));
    }

    if (s === number) {
      setMessage(`✅ ${s} === ${number}. It IS an Armstrong Number!`);
    } else {
      setMessage(`❌ ${s} !== ${number}. It is NOT an Armstrong Number.`);
    }
    setCurrentDigit(null);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-red-500">
        <h1 className="text-3xl font-bold text-red-400 text-center mb-6">
          💪 Armstrong Number
        </h1>

        <div className="flex justify-center gap-4 mb-8">
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(parseInt(e.target.value))}
            className="w-32 px-2 py-1 bg-gray-700 rounded border border-gray-600"
          />
          <button
            onClick={checkArmstrong}
            disabled={processing}
            className="bg-red-600 px-6 py-2 rounded font-bold disabled:opacity-50"
          >
            Check
          </button>
        </div>

        <div className="flex flex-col items-center justify-center mb-8">
          <p className="text-6xl font-bold mb-4">{number}</p>
          <p className="text-gray-400 text-xl font-mono">Sum = {sum}</p>
        </div>

        <div className="bg-black/40 p-3 rounded text-center text-yellow-300 font-mono">
          {message}
        </div>
      </div>
    </div>
  );
};

export default ArmstrongNumber;
