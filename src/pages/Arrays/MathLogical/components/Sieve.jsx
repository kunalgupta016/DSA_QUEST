import React, { useState } from "react";
import { motion } from "framer-motion";

const Sieve = () => {
  const [limit, setLimit] = useState(50);
  const [primes, setPrimes] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [currentNum, setCurrentNum] = useState(null);
  const [currentMultiple, setCurrentMultiple] = useState(null);

  const runSieve = async () => {
    setProcessing(true);
    let arr = Array(limit + 1).fill(true);
    arr[0] = false;
    arr[1] = false;
    setPrimes([...arr]);

    for (let p = 2; p * p <= limit; p++) {
      if (arr[p]) {
        setCurrentNum(p);
        await new Promise((r) => setTimeout(r, 500));

        for (let i = p * p; i <= limit; i += p) {
          setCurrentMultiple(i);
          arr[i] = false;
          setPrimes([...arr]);
          await new Promise((r) => setTimeout(r, 100)); // Faster for multiples
        }
      }
    }

    setCurrentNum(null);
    setCurrentMultiple(null);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-green-500">
        <h1 className="text-3xl font-bold text-green-400 text-center mb-6">
          🕸 Sieve of Eratosthenes
        </h1>

        <div className="mb-6 text-center space-y-2">
          <p className="text-gray-300">
            An efficient algorithm to find all prime numbers up to a specified
            integer.
          </p>
          <p className="text-gray-400 italic">
            Hinglish: Ek range tak saare prime numbers dhoondhne ka fast
            tareeka. Multiples ko cut karte jao.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value))}
            max="100"
            className="px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 w-32"
          />
          <button
            onClick={runSieve}
            disabled={processing}
            className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-md font-bold disabled:opacity-50"
          >
            Start Sieve
          </button>
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {primes.length > 0 &&
            Array.from({ length: limit }, (_, i) => i + 1).map((num) => {
              let statusClass = "bg-gray-600";
              if (num === 1)
                statusClass = "bg-red-900 text-gray-400"; // 1 is not prime
              else if (num === currentNum)
                statusClass = "bg-blue-500 ring-2 ring-white scale-110"; // Currently processing prime
              else if (num === currentMultiple)
                statusClass = "bg-red-500 scale-90"; // Marking as non-prime
              else if (primes[num] === false)
                statusClass = "bg-red-900/50 text-gray-500"; // Already marked
              else if (primes[num] === true) statusClass = "bg-green-600"; // Potential prime

              return (
                <motion.div
                  key={num}
                  layout
                  className={`w-10 h-10 flex items-center justify-center rounded font-bold transition-all duration-200 ${statusClass}`}
                >
                  {num}
                </motion.div>
              );
            })}
        </div>

        <div className="mt-8 flex justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-600 rounded"></div> Prime
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div> Current Prime
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div> Eliminating
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-900/50 rounded"></div> Not Prime
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sieve;
