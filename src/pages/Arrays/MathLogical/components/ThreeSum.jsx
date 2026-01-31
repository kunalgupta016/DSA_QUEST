import React, { useState } from "react";
import { motion } from "framer-motion";

const ThreeSum = () => {
  const [array] = useState([-1, 0, 1, 2, -1, -4]);
  const [triplets, setTriplets] = useState([]);
  const [message, setMessage] = useState(
    "Sorted Array Required. Pointers: i, left, right",
  );
  const [processing, setProcessing] = useState(false);
  const [pointers, setPointers] = useState({
    i: null,
    left: null,
    right: null,
  });

  const findTriplets = async () => {
    setProcessing(true);
    setTriplets([]);

    let arr = [...array].sort((a, b) => a - b);
    let found = [];
    // Note: For visualization we sort a copy but ideally we visualize the sorting too or just start sorted.
    // Let's assume we sort it first for the algo.

    setMessage(`Sorted Array: [${arr.join(", ")}]`);
    await new Promise((r) => setTimeout(r, 1000));

    for (let i = 0; i < arr.length - 2; i++) {
      if (i > 0 && arr[i] === arr[i - 1]) continue;

      let l = i + 1;
      let r = arr.length - 1;

      while (l < r) {
        setPointers({ i, left: l, right: r });
        const sum = arr[i] + arr[l] + arr[r];
        setMessage(`Cheking: ${arr[i]} + ${arr[l]} + ${arr[r]} = ${sum}`);
        await new Promise((r) => setTimeout(r, 800));

        if (sum === 0) {
          setMessage(`✅ Found Triplet: [${arr[i]}, ${arr[l]}, ${arr[r]}]`);
          found.push([arr[i], arr[l], arr[r]]);
          setTriplets([...found]);
          await new Promise((r) => setTimeout(r, 1000));

          while (l < r && arr[l] === arr[l + 1]) l++;
          while (l < r && arr[r] === arr[r - 1]) r--;
          l++;
          r--;
        } else if (sum < 0) {
          setMessage(`Sum ${sum} < 0. Need larger value. Moving Left ->`);
          l++;
        } else {
          setMessage(`Sum ${sum} > 0. Need smaller value. <- Moving Right`);
          r--;
        }
      }
    }
    setMessage("Search Complete.");
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-purple-500">
        <h1 className="text-3xl font-bold text-purple-400 text-center mb-6">
          3️⃣ Three Sum
        </h1>

        <div className="flex justify-center mb-6">
          <button
            onClick={findTriplets}
            disabled={processing}
            className="bg-purple-600 px-6 py-2 rounded font-bold disabled:opacity-50"
          >
            Find Triplets (Sum 0)
          </button>
        </div>

        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {/* We display the ORIGINAL array for simplicity unless we update state to sorted */}
          {array.map((val, idx) => (
            <div
              key={idx}
              className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded font-mono"
            >
              {val}
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-gray-500 mb-4">
          (Algorithm runs on sorted version internally)
        </p>

        <div className="bg-gray-700/50 p-4 rounded mb-6 text-center">
          <h3 className="text-lg font-bold text-gray-300 mb-4">
            Found Triplets
          </h3>
          <div className="flex justify-center gap-4 flex-wrap">
            {triplets.map((t, i) => (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={i}
                className="bg-purple-900 px-3 py-1 rounded border border-purple-400"
              >
                [{t[0]}, {t[1]}, {t[2]}]
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-black/40 p-3 rounded text-center text-yellow-300 font-mono">
          {message}
        </div>
      </div>
    </div>
  );
};

export default ThreeSum;
