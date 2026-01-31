import React, { useState } from "react";
import ChallengeLayout from "../../Challenges/ChallengeLayout";
import { motion } from "framer-motion";

const SymmetricTreeVisualizer = () => {
  //      1
  //    /   \
  //   2     2
  //  / \   / \
  // 3   4 4   3
  const [highlight, setHighlight] = useState([]);
  const [message, setMessage] = useState("Check Symmetry");

  const check = async () => {
    // Visualize the comparison flow
    setMessage("Checking Root...");
    await new Promise((r) => setTimeout(r, 600));

    setMessage("Compare L(2) and R(2)");
    setHighlight(["l2", "r2"]);
    await new Promise((r) => setTimeout(r, 800));

    setMessage("Compare Outer: L-Left(3) and R-Right(3)");
    setHighlight(["l3", "r3"]);
    await new Promise((r) => setTimeout(r, 800));

    setMessage("Compare Inner: L-Right(4) and R-Left(4)");
    setHighlight(["l4", "r4"]);
    await new Promise((r) => setTimeout(r, 800));

    setHighlight([]);
    setMessage("✅ Tree is Symmetric");
  };

  return (
    <div className="p-4 bg-gray-900 h-full overflow-y-auto text-center">
      <h3 className="text-xl font-bold text-green-400 mb-4">Visualizer Mode</h3>
      <button
        onClick={check}
        className="bg-green-600 px-4 py-2 rounded font-bold mb-8"
      >
        Visualize Check
      </button>

      <div className="relative h-[250px] w-full max-w-sm mx-auto">
        <svg className="absolute w-full h-full left-0 top-0">
          <line
            x1="50%"
            y1="30"
            x2="30%"
            y2="80"
            stroke="gray"
            strokeWidth="2"
          />
          <line
            x1="50%"
            y1="30"
            x2="70%"
            y2="80"
            stroke="gray"
            strokeWidth="2"
          />

          <line
            x1="30%"
            y1="80"
            x2="15%"
            y2="150"
            stroke="gray"
            strokeWidth="2"
          />
          <line
            x1="30%"
            y1="80"
            x2="45%"
            y2="150"
            stroke="gray"
            strokeWidth="2"
          />

          <line
            x1="70%"
            y1="80"
            x2="55%"
            y2="150"
            stroke="gray"
            strokeWidth="2"
          />
          <line
            x1="70%"
            y1="80"
            x2="85%"
            y2="150"
            stroke="gray"
            strokeWidth="2"
          />
        </svg>

        {/* Root */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-10 h-10 bg-gray-800 rounded-full border border-gray-500 flex items-center justify-center">
          1
        </div>

        {/* L2, R2 */}
        <motion.div
          animate={{
            scale: highlight.includes("l2") ? 1.3 : 1,
            borderColor: highlight.includes("l2") ? "#22c55e" : "#6b7280",
          }}
          className="absolute left-[30%] top-20 -translate-x-1/2 w-10 h-10 bg-gray-800 rounded-full border border-gray-500 flex items-center justify-center"
        >
          2
        </motion.div>
        <motion.div
          animate={{
            scale: highlight.includes("r2") ? 1.3 : 1,
            borderColor: highlight.includes("r2") ? "#22c55e" : "#6b7280",
          }}
          className="absolute left-[70%] top-20 -translate-x-1/2 w-10 h-10 bg-gray-800 rounded-full border border-gray-500 flex items-center justify-center"
        >
          2
        </motion.div>

        {/* Children */}
        <motion.div
          animate={{
            scale: highlight.includes("l3") ? 1.3 : 1,
            borderColor: highlight.includes("l3") ? "#22c55e" : "#6b7280",
          }}
          className="absolute left-[15%] top-36 -translate-x-1/2 w-10 h-10 bg-gray-800 rounded-full border border-gray-500 flex items-center justify-center"
        >
          3
        </motion.div>
        <motion.div
          animate={{
            scale: highlight.includes("l4") ? 1.3 : 1,
            borderColor: highlight.includes("l4") ? "#22c55e" : "#6b7280",
          }}
          className="absolute left-[45%] top-36 -translate-x-1/2 w-10 h-10 bg-gray-800 rounded-full border border-gray-500 flex items-center justify-center"
        >
          4
        </motion.div>
        <motion.div
          animate={{
            scale: highlight.includes("r4") ? 1.3 : 1,
            borderColor: highlight.includes("r4") ? "#22c55e" : "#6b7280",
          }}
          className="absolute left-[55%] top-36 -translate-x-1/2 w-10 h-10 bg-gray-800 rounded-full border border-gray-500 flex items-center justify-center"
        >
          4
        </motion.div>
        <motion.div
          animate={{
            scale: highlight.includes("r3") ? 1.3 : 1,
            borderColor: highlight.includes("r3") ? "#22c55e" : "#6b7280",
          }}
          className="absolute left-[85%] top-36 -translate-x-1/2 w-10 h-10 bg-gray-800 rounded-full border border-gray-500 flex items-center justify-center"
        >
          3
        </motion.div>
      </div>
      <div className="mt-4 text-yellow-500 font-mono text-xs">{message}</div>
    </div>
  );
};

const SymmetricTree = () => {
  const description = `Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).

Example 1:
Input: root = [1,2,2,3,4,4,3]
Output: true

Example 2:
Input: root = [1,2,2,null,3,null,3]
Output: false
`;

  const initialCode = {
    javascript: `/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
    // Write your code here
    
};
`,
    python: `class Solution:
    def isSymmetric(self, root: Optional[TreeNode]) -> bool:
        pass
`,
    java: `class Solution {
    public boolean isSymmetric(TreeNode root) {
        return false;
    }
}`,
  };

  return (
    <ChallengeLayout
      title="101. Symmetric Tree"
      description={description}
      visualizer={SymmetricTreeVisualizer}
      initialCode={initialCode}
    />
  );
};

export default SymmetricTree;
