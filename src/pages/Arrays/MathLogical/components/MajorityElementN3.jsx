import React, { useState } from "react";
import { motion } from "framer-motion";

const MajorityElementN3 = () => {
  const [array] = useState([1, 2, 2, 3, 2, 1, 1, 3]);
  const [cand1, setCand1] = useState(null);
  const [cand2, setCand2] = useState(null);
  const [cnt1, setCnt1] = useState(0);
  const [cnt2, setCnt2] = useState(0);
  const [message, setMessage] = useState("Boyer-Moore Voting Algo (Extended)");
  const [processing, setProcessing] = useState(false);

  const findMajority = async () => {
    setProcessing(true);
    let c1 = null,
      c2 = null;
    let count1 = 0,
      count2 = 0;

    for (let x of array) {
      setMessage(`Processing ${x}...`);
      await new Promise((r) => setTimeout(r, 600));

      if (x === c1) {
        count1++;
        setMessage(`${x} matches Candidate 1. Count1: ${count1}`);
      } else if (x === c2) {
        count2++;
        setMessage(`${x} matches Candidate 2. Count2: ${count2}`);
      } else if (count1 === 0) {
        c1 = x;
        count1 = 1;
        setMessage(`Count1 is 0. New Candidate 1: ${x}`);
      } else if (count2 === 0) {
        c2 = x;
        count2 = 1;
        setMessage(`Count2 is 0. New Candidate 2: ${x}`);
      } else {
        count1--;
        count2--;
        setMessage(`Mismatch! Decrementing both counts.`);
      }
      setCand1(c1);
      setCand2(c2);
      setCnt1(count1);
      setCnt2(count2);
    }

    setMessage("Verification Phase...");
    await new Promise((r) => setTimeout(r, 1000));

    // Manual verification logic would go here for real Algo
    setMessage(`Candidates found: ${c1} and ${c2}. Need to verify > N/3.`);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-pink-500">
        <h1 className="text-3xl font-bold text-pink-400 text-center mb-6">
          👑 Majority Element (&gt; N/3)
        </h1>

        <div className="flex justify-center mb-8">
          <button
            onClick={findMajority}
            disabled={processing}
            className="bg-pink-600 px-6 py-2 rounded font-bold disabled:opacity-50"
          >
            Find Majority
          </button>
        </div>

        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {array.map((val, idx) => (
            <div
              key={idx}
              className="w-10 h-10 flex items-center justify-center bg-gray-700 border border-gray-600 rounded font-bold"
            >
              {val}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-8 mb-6">
          <div className="bg-gray-700 p-4 rounded text-center border-l-4 border-yellow-400">
            <h3 className="text-gray-300">Candidate 1</h3>
            <p className="text-2xl font-bold text-white">
              {cand1 !== null ? cand1 : "-"}
            </p>
            <p className="text-sm text-gray-400">Count: {cnt1}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded text-center border-l-4 border-blue-400">
            <h3 className="text-gray-300">Candidate 2</h3>
            <p className="text-2xl font-bold text-white">
              {cand2 !== null ? cand2 : "-"}
            </p>
            <p className="text-sm text-gray-400">Count: {cnt2}</p>
          </div>
        </div>

        <div className="bg-black/40 p-3 rounded text-center text-green-400 font-mono">
          {message}
        </div>
      </div>
    </div>
  );
};

export default MajorityElementN3;
