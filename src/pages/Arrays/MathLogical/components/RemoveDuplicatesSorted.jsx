import React, { useState } from "react";
import { motion } from "framer-motion";

const RemoveDuplicatesSorted = () => {
  const [array, setArray] = useState([1, 1, 2, 2, 2, 3, 4, 4, 5]);
  const [uniqueIdx, setUniqueIdx] = useState(0); // 'i' pointer
  const [scanIdx, setScanIdx] = useState(1); // 'j' pointer
  const [message, setMessage] = useState("");
  const [processing, setProcessing] = useState(false);

  const reset = () => {
    setArray([1, 1, 2, 2, 2, 3, 4, 4, 5]);
    setUniqueIdx(0);
    setScanIdx(1);
    setMessage("");
    setProcessing(false);
  };

  const processRemoval = async () => {
    setProcessing(true);
    let arr = [...array];
    let i = 0;

    for (let j = 1; j < arr.length; j++) {
      setUniqueIdx(i);
      setScanIdx(j);

      if (arr[j] !== arr[i]) {
        setMessage(
          `Found new unique element ${arr[j]}. Moving it to index ${i + 1}.`,
        );
        await new Promise((r) => setTimeout(r, 800));

        i++;
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp; // Optional for viz, logically we just overwrite
        setArray([...arr]);
      } else {
        setMessage(`Duplicate ${arr[j]} found. Skipping.`);
        await new Promise((r) => setTimeout(r, 400));
      }
    }

    setMessage(`✅ Done! Unique count: ${i + 1}`);
    setUniqueIdx(i);
    setScanIdx(null);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-red-500">
        <h1 className="text-3xl font-bold text-red-400 text-center mb-6">
          🗑️ Remove Duplicates (Sorted)
        </h1>

        <div className="mb-6 text-center">
          <p className="text-gray-300">
            Two Pointer Approach. O(n) Time, O(1) Space.
          </p>
          <p className="text-gray-400 italic">
            Hinglish: Ek 'i' pointer unique elements track karta hai, 'j'
            pointer naye elements dhoondta hai.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={processRemoval}
            disabled={processing}
            className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-md font-bold disabled:opacity-50"
          >
            Start Removal
          </button>
          <button
            onClick={reset}
            disabled={processing}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
          >
            Reset
          </button>
        </div>

        <div className="space-y-2 mb-10">
          <div className="flex justify-center gap-2 flex-wrap">
            {array.map((val, idx) => {
              // Determine style based on pointers
              let borderColor = "border-gray-500";
              let bgColor = "bg-gray-700";

              if (idx === uniqueIdx) {
                borderColor = "border-green-500";
                bgColor = "bg-green-900/50";
              } else if (idx === scanIdx) {
                borderColor = "border-yellow-500";
                bgColor = "bg-yellow-900/50";
              }

              // Fade out non-unique parts after processing?
              // For visualizer simplicity, we keep all but maybe dim the ends later.

              return (
                <motion.div
                  key={idx}
                  layout
                  className={`relative w-12 h-16 flex flex-col items-center justify-center rounded-lg border-2 ${borderColor} ${bgColor}`}
                >
                  <span className="text-lg font-bold">{val}</span>
                  <span className="text-xs text-gray-400 absolute bottom-1">
                    {idx}
                  </span>

                  {idx === uniqueIdx && (
                    <span className="absolute -top-6 text-green-400 font-bold text-xs">
                      i
                    </span>
                  )}
                  {idx === scanIdx && (
                    <span className="absolute -top-6 text-yellow-400 font-bold text-xs">
                      j
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="bg-black/40 p-4 rounded-lg text-center font-mono text-yellow-300 min-h-[60px]">
          {message}
        </div>

        <div className="mt-8 bg-gray-900 p-4 rounded-lg text-sm text-green-400 font-mono">
          <pre>{`int i = 0;
for (int j = 1; j < n; j++) {
    if (arr[j] != arr[i]) {
        i++;
        arr[i] = arr[j];
    }
}
return i + 1;`}</pre>
        </div>
      </div>
    </div>
  );
};

export default RemoveDuplicatesSorted;
