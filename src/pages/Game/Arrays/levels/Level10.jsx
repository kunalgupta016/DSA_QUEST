import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

const Level10 = () => {
  // Kadane's Algorithm:
  // [-2, 1, -3, 4, -1, 2, 1, -5, 4]
  // Max Subarray is [4, -1, 2, 1] Sum = 6.

  // Interactive: User "Walks" through the array step-by-step.
  // Dashboard shows: Current Element, Current Sum, Max Sum So Far.
  // User decides: "Add to Current Sum" or "Start New Subarray" (if current sum < 0)?
  // Actually, Kadane logic: currSum = max(num, currSum + num).

  const [array] = useState([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
  const [index, setIndex] = useState(0);
  const [currSum, setCurrSum] = useState(0);
  const [maxSum, setMaxSum] = useState(-Infinity);
  const [history, setHistory] = useState([]); // Visual log
  const [completed, setCompleted] = useState(false);

  // Initial state trigger
  const start = () => {
    setIndex(0);
    setCurrSum(0);
    setMaxSum(-Infinity);
  };

  const handleStep = (choice) => {
    // choice: 'EXTEND' (currSum + arr[i]) or 'NEW' (arr[i])
    // Correct logic: If 'choice' matches Kadane's choice?

    const num = array[index];
    const extendSum = currSum + num;

    // Kadane Logic: If extendSum < num, we should have started new.
    // Wait, Kadane is: currSum = currSum + x. If currSum < x? No, max(x, currSum+x) logic.
    // Actually simplified: If (currSum < 0) currSum = 0 BEFORE adding.
    // Let's stick to max(num, currSum + num).

    let chosenSum;
    let correctChoice;

    if (num > extendSum) {
      correctChoice = "NEW";
      chosenSum = num;
    } else {
      correctChoice = "EXTEND";
      chosenSum = extendSum; // Note: currSum initial 0 might mess up first element.
    }

    // Determine result of user action
    let newCS;
    let isCorrect = true;

    if (index === 0) {
      // First element always starts new
      if (choice === "NEW" || choice === "EXTEND") {
        // Allow both for first index logically or force NEW
        newCS = num;
      }
    } else {
      if (choice === "NEW") newCS = num;
      else newCS = extendSum;

      if (choice !== correctChoice) isCorrect = false;
    }

    // Update State
    const newMax = Math.max(maxSum, newCS);
    setCurrSum(newCS);
    setMaxSum(newMax);
    setHistory((prev) => [
      ...prev,
      { idx: index, val: num, sum: newCS, max: newMax, choice },
    ]);

    if (index < array.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl flex justify-between items-center bg-red-900/20 p-4 rounded-xl border border-red-700 backdrop-blur mb-10">
        <Link to="/game/arrays" className="text-gray-400 hover:text-white">
          ← Retreat
        </Link>
        <h2 className="text-3xl font-bold text-red-500 tracking-widest">
          BOSS LEVEL: KADANE
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl">
        {/* Visualizer Area */}
        <div className="flex flex-col items-center">
          {/* The Array */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {array.map((val, i) => (
              <div
                key={i}
                className={`w-14 h-14 flex items-center justify-center border-2 font-bold text-xl rounded-lg transition-all
                                    ${i === index ? "bg-yellow-500 text-black scale-125 z-10 shadow-[0_0_20px_gold]" : "bg-gray-800 border-gray-700 text-gray-500"}
                                    ${i < index ? "opacity-50" : ""}
                                `}
              >
                {val}
              </div>
            ))}
          </div>

          {!completed ? (
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-700 text-center w-full max-w-md">
              <h3 className="text-gray-400 mb-2">
                Current Element:{" "}
                <span className="text-white text-4xl font-bold">
                  {array[index]}
                </span>
              </h3>
              <h4 className="text-gray-400 mb-8">
                Current Subarray Sum:{" "}
                <span
                  className={`text-2xl font-bold ${currSum < 0 ? "text-red-400" : "text-green-400"}`}
                >
                  {currSum}
                </span>
              </h4>

              <div className="flex gap-4 justify-center">
                {/* Only simple logic: Does adding helps? */}
                <button
                  onClick={() => handleStep("EXTEND")}
                  className="px-6 py-4 bg-blue-600 rounded-xl hover:bg-blue-500 font-bold transition flex-1 border-b-4 border-blue-800 active:border-b-0 active:translate-y-1"
                >
                  ➕ Add to Sum <br />
                  <span className="text-xs font-normal opacity-70">
                    ({currSum} + {array[index]})
                  </span>
                </button>
                <button
                  onClick={() => handleStep("NEW")}
                  className="px-6 py-4 bg-orange-600 rounded-xl hover:bg-orange-500 font-bold transition flex-1 border-b-4 border-orange-800 active:border-b-0 active:translate-y-1"
                >
                  🆕 Start New <br />
                  <span className="text-xs font-normal opacity-70">
                    (Drop prev sum)
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-red-900/50 p-8 rounded-2xl border border-red-500 text-center"
            >
              <h1 className="text-5xl font-bold text-yellow-500 mb-4">
                BOSS DEFEATED!
              </h1>
              <p className="text-2xl mb-8">Maximum Subarray Sum: {maxSum}</p>
              <Link
                to="/game/arrays"
                className="px-8 py-4 bg-yellow-500 text-black font-black text-xl rounded hover:bg-yellow-400 shadow-xl"
              >
                🏆 CLAIM VICTORY
              </Link>
            </motion.div>
          )}
        </div>

        {/* Stats / Log */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 h-[500px] overflow-auto font-mono text-sm">
          <h3 className="text-green-400 font-bold border-b border-gray-700 pb-2 mb-4">
            Battle Log (Kadane's Steps)
          </h3>
          {history.map((step, i) => (
            <div
              key={i}
              className="mb-2 p-2 bg-gray-800/50 rounded border-l-2 border-cyan-500"
            >
              <div className="flex justify-between">
                <span className="text-yellow-200">
                  Index {step.idx} (Val: {step.val})
                </span>
                <span
                  className={`font-bold ${step.choice === "NEW" ? "text-orange-400" : "text-blue-400"}`}
                >
                  {step.choice}
                </span>
              </div>
              <div className="text-gray-400 mt-1">
                New Sum: {step.sum} | Max Corrected: {step.max}
              </div>
            </div>
          ))}
          {index === 0 && history.length === 0 && (
            <span className="text-gray-600">Battle hasn't started...</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Level10;
