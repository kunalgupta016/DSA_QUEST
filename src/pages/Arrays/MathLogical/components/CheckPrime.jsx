import React, { useState } from "react";
import { motion } from "framer-motion";

const CheckPrime = () => {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);
  const [checking, setChecking] = useState(false);

  const checkPrime = async () => {
    if (!number || number < 0) return;
    setChecking(true);
    setSteps([]);
    setResult(null);

    const n = parseInt(number);
    let logs = [];

    if (n < 2) {
      logs.push(`${n} is less than 2, so it is NOT Prime.`);
      setSteps(logs);
      setResult("Not Prime");
      setChecking(false);
      return;
    }

    logs.push(
      `Check if ${n} is divisible by any number from 2 to √${n} (${Math.floor(Math.sqrt(n))}).`,
    );

    let isPrime = true;
    for (let i = 2; i * i <= n; i++) {
      logs.push(`Checking divisibility by ${i}...`);
      await new Promise((r) => setTimeout(r, 600)); // Simulating delay
      setSteps([...logs]);

      if (n % i === 0) {
        logs.push(`❌ ${n} is divisible by ${i}. So it is NOT Prime.`);
        isPrime = false;
        break;
      } else {
        logs.push(`✅ ${n} is not divisible by ${i}.`);
      }
    }

    if (isPrime) {
      logs.push(`🎉 No divisors found. ${n} is a PRIME number!`);
    }

    setSteps([...logs]);
    setResult(isPrime ? "Prime" : "Not Prime");
    setChecking(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-pink-500">
        <h1 className="text-3xl font-bold text-pink-400 text-center mb-6">
          🔢 Check Prime Number
        </h1>

        <div className="mb-6 text-center space-y-2">
          <p className="text-gray-300">
            A Prime Number is defined as a natural number greater than 1 that
            has no positive divisors other than 1 and itself.
          </p>
          <p className="text-gray-400 italic">
            Hinglish: Prime number wo number hota hai jo sirf 1 aur khud se
            divide hota hai (jaise 2, 3, 5, 7...).
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Enter Number"
            className="px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-pink-500"
          />
          <button
            onClick={checkPrime}
            disabled={checking}
            className="bg-pink-500 hover:bg-pink-600 px-6 py-2 rounded-md font-bold disabled:opacity-50"
          >
            Check
          </button>
        </div>

        <div className="bg-black/50 p-4 rounded-lg h-64 overflow-y-auto font-mono text-sm">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-2"
            >
              {step}
            </motion.div>
          ))}
          {result && (
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className={`mt-4 text-xl font-bold text-center ${result === "Prime" ? "text-green-400" : "text-red-400"}`}
            >
              Result: {result}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckPrime;
