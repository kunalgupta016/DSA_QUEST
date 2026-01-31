import React, { useState } from "react";
import { motion } from "framer-motion";

const SearchRotated = () => {
  // A rotated sorted array
  const [array] = useState([4, 5, 6, 7, 0, 1, 2]);
  const [target, setTarget] = useState(0);
  const [low, setLow] = useState(null);
  const [high, setHigh] = useState(null);
  const [mid, setMid] = useState(null);
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("Idle");

  const reset = () => {
    setLow(null);
    setHigh(null);
    setMid(null);
    setResult(null);
    setMessage("Idle");
    setProcessing(false);
  };

  const search = async () => {
    setProcessing(true);
    setResult(null);

    let l = 0;
    let h = array.length - 1;

    setLow(l);
    setHigh(h);
    setMessage("Starting Binary Search...");
    await new Promise((r) => setTimeout(r, 800));

    while (l <= h) {
      let m = Math.floor((l + h) / 2);
      setLow(l);
      setHigh(h);
      setMid(m);

      setMessage(`Low: ${l}, High: ${h}, Mid: ${m} (Val: ${array[m]})`);
      await new Promise((r) => setTimeout(r, 1000));

      if (array[m] === parseInt(target)) {
        setResult(m);
        setMessage(`✅ Target found at index ${m}`);
        setProcessing(false);
        return;
      }

      // Check sorted half
      if (array[l] <= array[m]) {
        setMessage(`Left half [${l}..${m}] is sorted.`);
        await new Promise((r) => setTimeout(r, 600));

        if (array[l] <= target && target < array[m]) {
          setMessage(
            `Target ${target} is in left half range. Move High to ${m - 1}`,
          );
          h = m - 1;
        } else {
          setMessage(
            `Target ${target} is NOT in left half. Move Low to ${m + 1}`,
          );
          l = m + 1;
        }
      } else {
        setMessage(`Right half [${m}..${h}] is sorted.`);
        await new Promise((r) => setTimeout(r, 600));

        if (array[m] < target && target <= array[h]) {
          setMessage(
            `Target ${target} is in right half range. Move Low to ${m + 1}`,
          );
          l = m + 1;
        } else {
          setMessage(
            `Target ${target} is NOT in right half. Move High to ${m - 1}`,
          );
          h = m - 1;
        }
      }
      await new Promise((r) => setTimeout(r, 600));
    }

    setResult("Not Found");
    setMessage("❌ Target not found in array.");
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-orange-500">
        <h1 className="text-3xl font-bold text-orange-400 text-center mb-6">
          🔍 Search in Rotated Sorted Array
        </h1>

        <div className="mb-6 text-center">
          <p className="text-gray-300">
            Modified Binary Search. Identify which half is sorted and proceed.
          </p>
          <p className="text-gray-400 italic">
            Hinglish: Pehle check karo kaunsa hissa sorted hai, fir decide karo
            target us range mein hai ya nahi.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-20 px-2 py-2 rounded bg-gray-700 border border-gray-600 text-center"
              placeholder="Target"
            />
          </div>
          <button
            onClick={search}
            disabled={processing}
            className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-md font-bold disabled:opacity-50"
          >
            Search
          </button>
          <button
            onClick={reset}
            disabled={processing}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
          >
            Reset
          </button>
        </div>

        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {array.map((val, idx) => {
            let bg = "bg-gray-700";
            let border = "border-gray-500";

            if (mid === idx) {
              bg = "bg-yellow-500 text-black";
              border = "border-yellow-300";
            } else if (idx >= low && idx <= high) {
              bg = "bg-blue-900/50";
              border = "border-blue-400";
            }

            return (
              <motion.div
                key={idx}
                layout
                className={`w-12 h-12 flex flex-col items-center justify-center rounded-lg border-2 text-lg font-bold transition-colors duration-300 relative ${bg} ${border}`}
              >
                {val}
                {idx === low && (
                  <span className="absolute -bottom-6 text-xs text-blue-400 font-bold">
                    L
                  </span>
                )}
                {idx === high && (
                  <span className="absolute -bottom-6 text-xs text-blue-400 font-bold">
                    H
                  </span>
                )}
                {idx === mid && (
                  <span className="absolute -top-6 text-xs text-yellow-400 font-bold">
                    M
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="bg-black/40 p-4 rounded-lg text-center font-mono text-xl text-yellow-300 min-h-[60px]">
          {message}
        </div>
      </div>
    </div>
  );
};

export default SearchRotated;
