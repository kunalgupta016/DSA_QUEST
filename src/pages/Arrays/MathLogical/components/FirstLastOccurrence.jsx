import React, { useState } from "react";
import { motion } from "framer-motion";

const FirstLastOccurrence = () => {
  const [array] = useState([1, 2, 2, 2, 2, 3, 4, 4, 5]);
  const [target, setTarget] = useState(2);
  const [first, setFirst] = useState(-1);
  const [last, setLast] = useState(-1);
  const [low, setLow] = useState(null);
  const [high, setHigh] = useState(null);
  const [mid, setMid] = useState(null);
  const [message, setMessage] = useState("Sorted Array Required");
  const [processing, setProcessing] = useState(false);

  const binarySearch = async (isFirst) => {
    let l = 0,
      h = array.length - 1;
    let ans = -1;
    setMessage(
      isFirst
        ? "Searching for FIRST Occurrence..."
        : "Searching for LAST Occurrence...",
    );

    while (l <= h) {
      setLow(l);
      setHigh(h);
      await new Promise((r) => setTimeout(r, 600));

      let m = Math.floor((l + h) / 2);
      setMid(m);
      setMessage(`Checking Middle ${m} (Val: ${array[m]})`);
      await new Promise((r) => setTimeout(r, 600));

      if (array[m] === parseInt(target)) {
        ans = m;
        if (isFirst) {
          setMessage(
            `Found ${target} at ${m}. Looking Left for earlier occurrence.`,
          );
          if (ans !== -1) setFirst(ans);
          h = m - 1;
        } else {
          setMessage(
            `Found ${target} at ${m}. Looking Right for later occurrence.`,
          );
          if (ans !== -1) setLast(ans);
          l = m + 1;
        }
      } else if (array[m] < target) {
        l = m + 1;
      } else {
        h = m - 1;
      }
    }
    return ans;
  };

  const findOccurrences = async () => {
    setProcessing(true);
    setFirst(-1);
    setLast(-1);

    const f = await binarySearch(true);
    setFirst(f);
    if (f !== -1) {
      const l = await binarySearch(false);
      setLast(l);
      setMessage(`✅ Result: First at ${f}, Last at ${l}. Count: ${l - f + 1}`);
    } else {
      setMessage("❌ Target not found.");
    }

    setLow(null);
    setHigh(null);
    setMid(null);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-yellow-500">
        <h1 className="text-3xl font-bold text-yellow-400 text-center mb-6">
          🔍 First & Last Occurrence
        </h1>

        <div className="flex justify-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <label>Target:</label>
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-16 px-2 py-1 bg-gray-700 rounded border border-gray-600"
            />
          </div>
          <button
            onClick={findOccurrences}
            disabled={processing}
            className="bg-yellow-600 hover:bg-yellow-700 px-6 py-2 rounded font-bold disabled:opacity-50"
          >
            Find
          </button>
        </div>

        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {array.map((val, idx) => {
            let style = "bg-gray-700 border-gray-500";
            if (idx === mid) style = "bg-white text-black scale-110";
            else if (idx >= low && idx <= high && low !== null)
              style = "bg-blue-900 border-blue-400";

            if (idx === first)
              style = "bg-green-600 border-green-400 scale-110";
            if (idx === last) style = "bg-green-600 border-green-400 scale-110";

            return (
              <motion.div
                key={idx}
                animate={{ scale: idx === first || idx === last ? 1.2 : 1 }}
                className={`w-12 h-12 flex items-center justify-center rounded border-2 font-bold transition-all ${style}`}
              >
                {val}
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-4 text-center mb-6">
          <div className="bg-gray-700 p-4 rounded">
            <h3 className="text-gray-400">First Occurrence</h3>
            <p className="text-2xl font-bold text-white">
              {first !== -1 ? first : "Not Found"}
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <h3 className="text-gray-400">Last Occurrence</h3>
            <p className="text-2xl font-bold text-white">
              {last !== -1 ? last : "Not Found"}
            </p>
          </div>
        </div>

        <div className="bg-black/40 p-3 rounded text-center text-yellow-300 font-mono">
          {message}
        </div>
      </div>
    </div>
  );
};

export default FirstLastOccurrence;
