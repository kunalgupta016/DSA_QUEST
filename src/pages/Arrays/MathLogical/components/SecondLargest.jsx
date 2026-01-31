import React, { useState } from "react";
import { motion } from "framer-motion";

const SecondLargest = () => {
  const [array, setArray] = useState([12, 35, 1, 10, 34, 1]);
  const [largest, setLargest] = useState(null);
  const [secondLargest, setSecondLargest] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(null);
  const [message, setMessage] = useState("");
  const [processing, setProcessing] = useState(false);

  const generateRandom = () => {
    const arr = Array.from(
      { length: 6 },
      () => Math.floor(Math.random() * 50) + 1,
    );
    setArray(arr);
    resetState();
  };

  const resetState = () => {
    setLargest(null);
    setSecondLargest(null);
    setCurrentIdx(null);
    setMessage("");
    setProcessing(false);
  };

  const findSecondLargest = async () => {
    setProcessing(true);
    resetState();

    let large = -Infinity;
    let second = -Infinity;

    for (let i = 0; i < array.length; i++) {
      setCurrentIdx(i);
      const val = array[i];

      if (val > large) {
        second = large;
        large = val;
        setMessage(
          `${val} > Largest (${large}). Update Largest to ${val}, Second Largest to ${second === -Infinity ? "None" : second}`,
        );
      } else if (val > second && val !== large) {
        second = val;
        setMessage(
          `${val} > Second Largest (${second}). Update Second Largest to ${val}`,
        );
      } else {
        setMessage(
          `${val} is not greater than Second Largest or is equal to Largest.`,
        );
      }

      setLargest(large);
      setSecondLargest(second);
      await new Promise((r) => setTimeout(r, 800));
    }

    setMessage(
      second === -Infinity
        ? "No Second Largest Element Found"
        : `Result: Second Largest is ${second}`,
    );
    setCurrentIdx(null);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-indigo-500">
        <h1 className="text-3xl font-bold text-indigo-400 text-center mb-6">
          🥈 Find Second Largest Element
        </h1>

        <div className="mb-6 text-center space-y-2">
          <p className="text-gray-300">
            Find the second largest element in an array in a single traversal.
          </p>
          <p className="text-gray-400 italic">
            Hinglish: Ek hi loop mein sabse bada aur dusra sabse bada number
            dhoondo.
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={generateRandom}
            disabled={processing}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
          >
            Random Array
          </button>
          <button
            onClick={findSecondLargest}
            disabled={processing}
            className="bg-indigo-500 hover:bg-indigo-600 px-6 py-2 rounded-md font-bold disabled:opacity-50"
          >
            Find Second Largest
          </button>
        </div>

        {/* Array Visual */}
        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {array.map((val, idx) => (
            <motion.div
              key={idx}
              animate={{
                scale: currentIdx === idx ? 1.1 : 1,
                borderColor:
                  val === largest
                    ? "#ef4444"
                    : val === secondLargest
                      ? "#3b82f6"
                      : "#4b5563",
              }}
              className={`w-14 h-14 flex items-center justify-center rounded-lg border-2 text-xl font-bold bg-gray-700
                    ${currentIdx === idx ? "bg-gray-600 shadow-white shadow-md" : ""}
                    `}
            >
              {val}
            </motion.div>
          ))}
        </div>

        {/* Status Board */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-red-900/30 p-4 rounded-lg border border-red-500/50 text-center">
            <h3 className="text-red-400 font-bold">🥇 Largest</h3>
            <p className="text-2xl">
              {largest === -Infinity || largest === null ? "-" : largest}
            </p>
          </div>
          <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/50 text-center">
            <h3 className="text-blue-400 font-bold">🥈 Second Largest</h3>
            <p className="text-2xl">
              {secondLargest === -Infinity || secondLargest === null
                ? "-"
                : secondLargest}
            </p>
          </div>
        </div>

        {/* Logs */}
        <div className="bg-black/40 p-4 rounded-lg h-24 flex items-center justify-center text-center text-lg font-mono text-yellow-300">
          {message || "Click 'Find Second Largest' to start..."}
        </div>

        {/* Code Block */}
        <div className="mt-8 bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-green-400 font-mono">
          <pre>{`int largest = -1, second = -1;
for(int i=0; i<n; i++) {
    if(arr[i] > largest) {
        second = largest;
        largest = arr[i];
    }
    else if(arr[i] > second && arr[i] != largest) {
        second = arr[i];
    }
}`}</pre>
        </div>
      </div>
    </div>
  );
};

export default SecondLargest;
