import React, { useState } from "react";
import ChallengeLayout from "../../Challenges/ChallengeLayout";
import { motion } from "framer-motion";

const StartCycleVisualizer = () => {
  const [nodes] = useState([1, 2, 3, 4, 5]);
  const [slow, setSlow] = useState(0);
  const [fast, setFast] = useState(0);
  const [message, setMessage] = useState("Floyd's Cycle Detection.");
  const [processing, setProcessing] = useState(false);
  const nextMap = [1, 2, 3, 4, 2];

  const detect = async () => {
    setProcessing(true);
    let s = 0;
    let f = 0;
    setSlow(s);
    setFast(f);
    setMessage("Start at Head (1)");
    await new Promise((r) => setTimeout(r, 800));

    while (true) {
      s = nextMap[s];
      f = nextMap[nextMap[f]];
      setSlow(s);
      setFast(f);
      setMessage(`Slow -> ${nodes[s]}, Fast -> ${nodes[f]}`);
      await new Promise((r) => setTimeout(r, 800));

      if (s === f) {
        setMessage(`✅ Cycle Detected at Node ${nodes[s]}!`);
        break;
      }
    }
    setProcessing(false);
  };

  return (
    <div className="p-4 bg-gray-900 h-full overflow-y-auto">
      <h3 className="text-xl font-bold text-pink-400 text-center mb-4">
        Visualizer Mode
      </h3>
      <div className="flex justify-center mb-4">
        <button
          onClick={detect}
          disabled={processing}
          className="bg-pink-600 px-4 py-1 rounded font-bold text-sm"
        >
          Start Detection
        </button>
      </div>

      <div className="flex justify-center items-center gap-4 relative h-40 scale-75 origin-top">
        {nodes.map((val, i) => (
          <div key={i} className="relative">
            <motion.div
              className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold border-4 z-10 bg-gray-800 relative
                                ${slow === i ? "border-green-500" : fast === i ? "border-red-500" : "border-gray-600"}
                            `}
            >
              {val}
            </motion.div>
            {slow === i && (
              <motion.div
                layoutId="slow"
                className="absolute -top-10 w-full text-center text-green-400 font-bold"
              >
                SL
              </motion.div>
            )}
            {fast === i && (
              <motion.div
                layoutId="fast"
                className="absolute -bottom-10 w-full text-center text-red-400 font-bold"
              >
                FA
              </motion.div>
            )}
            {i < 4 && (
              <div className="absolute top-1/2 left-16 w-4 h-1 bg-gray-500"></div>
            )}
          </div>
        ))}
        <svg className="absolute w-full h-full pointer-events-none">
          <path
            d="M 370 40 Q 370 -20, 220 -20 Q 200 -20, 200 10"
            fill="none"
            stroke="gray"
            strokeWidth="2"
            markerEnd="url(#arrow)"
          />
          <defs>
            <marker
              id="arrow"
              markerWidth="10"
              markerHeight="10"
              refX="0"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L0,6 L9,3 z" fill="gray" />
            </marker>
          </defs>
        </svg>
      </div>
      <div className="text-center text-yellow-300 font-mono bg-black/30 p-2 rounded text-xs">
        {message}
      </div>
    </div>
  );
};

const StartCycle = () => {
  const description = `Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer.

Example 1:
Input: head = [3,2,0,-4], pos = 1
Output: tail connects to node index 1

Example 2:
Input: head = [1,2], pos = 0
Output: tail connects to node index 0
`;

  const initialCode = {
    javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
    // Write your code here
    
};
`,
    python: `def detectCycle(head):
    # Write your code here
    pass
`,
    java: `public class Solution {
    public ListNode detectCycle(ListNode head) {
        // Write your code here
        return null;
    }
}`,
  };

  return (
    <ChallengeLayout
      title="142. Linked List Cycle II"
      description={description}
      visualizer={StartCycleVisualizer}
      initialCode={initialCode}
    />
  );
};

export default StartCycle;
