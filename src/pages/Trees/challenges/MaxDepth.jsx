import React, { useState } from "react";
import ChallengeLayout from "../../Challenges/ChallengeLayout";
import { motion } from "framer-motion";

const MaxDepthVisualizer = () => {
  const [message, setMessage] = useState("DFS to find max depth.");
  const [visiting, setVisiting] = useState(null);
  const [processing, setProcessing] = useState(false);

  const tree = {
    1: { left: 2, right: 3, pos: { x: 150, y: 30 }, d: 1 },
    2: { left: 4, right: 5, pos: { x: 100, y: 80 }, d: 2 },
    3: { left: null, right: null, pos: { x: 200, y: 80 }, d: 2 },
    4: { left: null, right: null, pos: { x: 75, y: 130 }, d: 3 },
    5: { left: null, right: null, pos: { x: 125, y: 130 }, d: 3 },
  };

  const runDFS = async () => {
    setProcessing(true);
    await dfs(1, 1);
    setVisiting(null);
    setProcessing(false);
  };

  const dfs = async (nodeId, d) => {
    if (!nodeId) return 0;
    setVisiting(nodeId);
    setMessage(`Visiting Node ${nodeId} at Depth ${d}`);
    await new Promise((r) => setTimeout(r, 800));

    let leftD = 0;
    if (tree[nodeId].left) leftD = await dfs(tree[nodeId].left, d + 1);

    setVisiting(nodeId);
    setMessage(`Back at Node ${nodeId}`);
    await new Promise((r) => setTimeout(r, 400));

    let rightD = 0;
    if (tree[nodeId].right) rightD = await dfs(tree[nodeId].right, d + 1);
    return Math.max(leftD, rightD) + 1;
  };

  return (
    <div className="p-4 bg-gray-900 h-full overflow-y-auto">
      <h3 className="text-xl font-bold text-green-400 text-center mb-4">
        Visualizer Mode
      </h3>
      <div className="flex justify-center mb-4">
        <button
          onClick={runDFS}
          disabled={processing}
          className="bg-green-600 px-4 py-1 rounded font-bold text-sm"
        >
          Run DFS
        </button>
      </div>

      <div className="relative h-[200px] w-full bg-gray-900 rounded border border-gray-700 flex justify-center">
        {/* Simplified lines for this smaller view. Ideally use tree pos */}
        <svg className="absolute w-full h-full">
          <line
            x1="150"
            y1="30"
            x2="100"
            y2="80"
            stroke="gray"
            strokeWidth="2"
          />
          <line
            x1="150"
            y1="30"
            x2="200"
            y2="80"
            stroke="gray"
            strokeWidth="2"
          />
          <line
            x1="100"
            y1="80"
            x2="75"
            y2="130"
            stroke="gray"
            strokeWidth="2"
          />
          <line
            x1="100"
            y1="80"
            x2="125"
            y2="130"
            stroke="gray"
            strokeWidth="2"
          />
        </svg>
        {Object.keys(tree).map((k) => {
          const node = tree[k];
          return (
            <motion.div
              key={k}
              animate={{
                scale: visiting == k ? 1.3 : 1,
                backgroundColor: visiting == k ? "#22c55e" : "#1f2937",
              }}
              className="absolute w-8 h-8 rounded-full border flex items-center justify-center font-bold text-sm z-20"
              style={{ left: node.pos.x - 16, top: node.pos.y }}
            >
              {k}
            </motion.div>
          );
        })}
      </div>
      <div className="text-center text-yellow-300 font-mono bg-black/30 p-2 rounded mt-2 text-xs">
        {message}
      </div>
    </div>
  );
};

const MaxDepth = () => {
  const description = `Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

Example 1:
Input: root = [3,9,20,null,null,15,7]
Output: 3

Example 2:
Input: root = [1,null,2]
Output: 2
`;

  const initialCode = {
    javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    // Write your code here
    
};
`,
    python: `class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        pass
`,
    java: `class Solution {
    public int maxDepth(TreeNode root) {
        return 0;
    }
}`,
  };

  return (
    <ChallengeLayout
      title="104. Maximum Depth of Binary Tree"
      description={description}
      visualizer={MaxDepthVisualizer}
      initialCode={initialCode}
    />
  );
};

export default MaxDepth;
