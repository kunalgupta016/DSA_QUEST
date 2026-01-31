import React, { useState } from "react";
import ChallengeLayout from "../../Challenges/ChallengeLayout";
import { motion } from "framer-motion";

const InvertTreeVisualizer = () => {
  // Simple 3 node tree for invert demo
  //      4
  //    /   \
  //   2     7
  const [inverted, setInverted] = useState(false);

  const toggle = () => {
    setInverted(!inverted);
  };

  return (
    <div className="p-4 bg-gray-900 h-full overflow-y-auto text-center">
      <h3 className="text-xl font-bold text-green-400 mb-4">Visualizer Mode</h3>
      <button
        onClick={toggle}
        className="bg-green-600 px-4 py-2 rounded font-bold mb-8"
      >
        Invert Tree
      </button>

      <div className="relative h-[200px] w-full max-w-sm mx-auto">
        <svg className="absolute w-full h-full left-0 top-0">
          <line
            x1="50%"
            y1="40"
            x2="30%"
            y2="100"
            stroke="gray"
            strokeWidth="2"
          />
          <line
            x1="50%"
            y1="40"
            x2="70%"
            y2="100"
            stroke="gray"
            strokeWidth="2"
          />
        </svg>

        {/* Root */}
        <div className="absolute left-1/2 top-4 -translate-x-1/2 w-12 h-12 bg-gray-800 rounded-full border-2 border-green-500 flex items-center justify-center font-bold z-10">
          4
        </div>

        {/* Left Child (becomes right) */}
        <motion.div
          animate={{ left: inverted ? "70%" : "30%" }}
          className="absolute top-24 -translate-x-1/2 w-12 h-12 bg-gray-800 rounded-full border-2 border-green-500 flex items-center justify-center font-bold z-10"
        >
          2
        </motion.div>

        {/* Right Child (becomes left) */}
        <motion.div
          animate={{ left: inverted ? "30%" : "70%" }}
          className="absolute top-24 -translate-x-1/2 w-12 h-12 bg-gray-800 rounded-full border-2 border-green-500 flex items-center justify-center font-bold z-10"
        >
          7
        </motion.div>
      </div>
      <p className="text-gray-400 mt-4 text-sm">
        Click button to swap children
      </p>
    </div>
  );
};

const InvertTree = () => {
  const description = `Given the root of a binary tree, invert the tree, and return its root.

Example 1:
Input: root = [4,2,7,1,3,6,9]
Output: [4,7,2,9,6,3,1]
`;

  const initialCode = {
    javascript: `/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
    // Write your code here
    
};
`,
    python: `class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        pass
`,
    java: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        return null;
    }
}`,
  };

  return (
    <ChallengeLayout
      title="226. Invert Binary Tree"
      description={description}
      visualizer={InvertTreeVisualizer}
      initialCode={initialCode}
    />
  );
};

export default InvertTree;
