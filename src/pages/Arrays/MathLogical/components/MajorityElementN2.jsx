import React, { useState } from "react";
import { motion } from "framer-motion";

const MajorityElementN2 = () => {
  const [array, setArray] = useState([2, 2, 1, 1, 1, 2, 2]);
  const [candidate, setCandidate] = useState(null);
  const [count, setCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [message, setMessage] = useState("Moore’s Voting Algorithm");
  const [processing, setProcessing] = useState(false);

  const findMajority = async () => {
    setProcessing(true);
    let cand = null;
    let cnt = 0;

    for (let i = 0; i < array.length; i++) {
      setCurrentIndex(i);
      const val = array[i];

      if (cnt === 0) {
        cand = val;
        cnt = 1;
        setMessage(`Count is 0. New Candidate: ${val}`);
      } else if (val === cand) {
        cnt++;
        setMessage(
          `Value matches Candidate ${cand}. Count incremented to ${cnt}`,
        );
      } else {
        cnt--;
        setMessage(
          `Value ${val} != Candidate ${cand}. Count decremented to ${cnt}`,
        );
      }

      setCandidate(cand);
      setCount(cnt);
      await new Promise((r) => setTimeout(r, 800));
    }

    // Verification phase (usually needed, but guaranteed in some problem statements)
    setMessage(`Candidate is ${cand}. Checking if it appears > N/2 times...`);
    let actualCount = 0;
    for (let x of array) {
      if (x === cand) actualCount++;
    }

    if (actualCount > array.length / 2) {
      setMessage(`✅ Majority Element is ${cand} (Count: ${actualCount})`);
    } else {
      setMessage(`❌ No Majority Element found.`);
    }
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-purple-500">
        <h1 className="text-3xl font-bold text-purple-400 text-center mb-6">
          👑 Majority Element (&gt; N/2)
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Moore's Voting Algorithm. Time: O(n), Space: O(1).
        </p>

        <div className="flex justify-center mb-6">
          <button
            onClick={findMajority}
            disabled={processing}
            className="bg-purple-600 px-6 py-2 rounded-lg font-bold"
          >
            Find Majority
          </button>
          <button
            onClick={() => {
              setArray([3, 3, 4, 2, 4, 4, 2, 4, 4]);
              setCandidate(null);
              setCount(0);
              setMessage("");
            }}
            className="ml-4 bg-gray-600 px-6 py-2 rounded-lg"
          >
            Reset
          </button>
        </div>

        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {array.map((val, idx) => (
            <motion.div
              key={idx}
              animate={{
                scale: currentIndex === idx ? 1.2 : 1,
                backgroundColor: currentIndex === idx ? "#fbbf24" : "#374151",
              }}
              className="w-12 h-12 flex items-center justify-center rounded-lg border border-gray-500 font-bold text-xl text-white"
            >
              {val}
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-8 mb-6">
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <h3>Current Candidate</h3>
            <p className="text-3xl font-bold text-yellow-400">
              {candidate !== null ? candidate : "-"}
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <h3>Vote Count</h3>
            <p className="text-3xl font-bold text-blue-400">{count}</p>
          </div>
        </div>

        <div className="bg-black/40 p-4 rounded text-center font-mono text-green-300">
          {message}
        </div>
      </div>
    </div>
  );
};

export default MajorityElementN2;
