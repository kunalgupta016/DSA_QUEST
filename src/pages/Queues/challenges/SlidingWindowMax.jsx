import React, { useState } from "react";
import ChallengeLayout from "../../Challenges/ChallengeLayout";
import { motion } from "framer-motion";

const SlidingWindowMaxVisualizer = () => {
  const [nums] = useState([1, 3, -1, -3, 5, 3, 6, 7]);
  const [k, setK] = useState(3);
  const [windowStart, setWindowStart] = useState(0);
  const [deque, setDeque] = useState([]); // Stores indices
  const [result, setResult] = useState([]);
  const [message, setMessage] = useState("Click Step to move window.");
  const [processing, setProcessing] = useState(false);

  const runSimulation = async () => {
    setProcessing(true);
    setWindowStart(0);
    setResult([]);
    setDeque([]);
    setMessage("Starting Simulation...");

    let d = [];
    let res = [];

    for (let i = 0; i < nums.length; i++) {
      setWindowStart(i - k + 1 < 0 ? 0 : i - k + 1);

      // Remove out of bounds
      if (d.length > 0 && d[0] === i - k) {
        d.shift();
      }

      // Remove smaller
      while (d.length > 0 && nums[d[d.length - 1]] < nums[i]) {
        d.pop();
      }

      d.push(i);
      setDeque([...d]);

      if (i >= k - 1) {
        res.push(nums[d[0]]);
        setResult([...res]);
      }

      setMessage(
        `Index ${i}: Window [${Math.max(0, i - k + 1)}...${i}]. Max is ${nums[d[0]]}`,
      );
      await new Promise((r) => setTimeout(r, 1000));
    }

    setMessage("✅ Simulation Complete");
    setProcessing(false);
  };

  return (
    <div className="p-4 bg-gray-900 h-full overflow-y-auto">
      <h3 className="text-xl font-bold text-blue-400 text-center mb-4">
        Visualizer Mode
      </h3>
      <div className="flex justify-center mb-6">
        <button
          onClick={runSimulation}
          disabled={processing}
          className="bg-blue-600 px-4 py-1 rounded font-bold text-sm"
        >
          Start Simulation (Fixed Input)
        </button>
      </div>

      {/* Array View */}
      <div className="flex justify-center gap-1 mb-6 flex-wrap">
        {nums.map((val, i) => {
          const inWindow =
            i >= windowStart &&
            i < windowStart + k &&
            windowStart + k <= nums.length + (windowStart < 0 ? 0 : 0); // Simplified logic for simulation view
          // Logic fix: Simulation runs index i from 0 to N.
          // Current window is valid when i >= k-1. Range is [i-k+1, i]
          // My state 'windowStart' tracks start
          const isCurrentWindow =
            processing &&
            i >= windowStart &&
            i < windowStart + k &&
            i <= windowStart + k - 1;

          return (
            <div
              key={i}
              className={`w-10 h-10 flex items-center justify-center border-2 rounded font-bold
                            ${isCurrentWindow ? "border-yellow-400 bg-gray-700" : "border-gray-600 bg-gray-800"}
                            ${deque.includes(i) ? "text-green-400" : "text-white"}
                        `}
            >
              {val}
            </div>
          );
        })}
      </div>

      <div className="flex justify-around mb-4">
        <div className="bg-gray-800 p-2 rounded">
          <div className="text-xs text-gray-400 mb-1">Deque (Indices)</div>
          <div className="flex gap-2 font-mono text-sm">
            {deque.map((idx, i) => (
              <span key={i} className="bg-gray-700 px-1 rounded text-green-400">
                {idx} ({nums[idx]})
              </span>
            ))}
          </div>
        </div>
        <div className="bg-gray-800 p-2 rounded">
          <div className="text-xs text-gray-400 mb-1">Result</div>
          <div className="flex gap-2 font-mono text-sm">
            {result.map((val, i) => (
              <span key={i} className="text-yellow-400">
                {val}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center text-yellow-300 font-mono bg-black/30 p-2 rounded text-xs">
        {message}
      </div>
    </div>
  );
};

const SlidingWindowMax = () => {
  const description = `You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.

Return the max sliding window.

Example 1:
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
`;

  const initialCode = {
    javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
    // Write your code here
    
};
`,
    python: `class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        pass
`,
    java: `class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        return new int[0];
    }
}`,
  };

  return (
    <ChallengeLayout
      title="239. Sliding Window Maximum"
      description={description}
      visualizer={SlidingWindowMaxVisualizer}
      initialCode={initialCode}
    />
  );
};

export default SlidingWindowMax;
