import React, { useState } from "react";
import ChallengeLayout from "../../Challenges/ChallengeLayout";
import { motion } from "framer-motion";

const CloneGraphVisualizer = () => {
  // 1 -- 2
  // |    |
  // 4 -- 3
  const [message, setMessage] = useState("Clone this Graph");
  const [clonedNodes, setClonedNodes] = useState([]);
  const [processing, setProcessing] = useState(false);

  const clone = async () => {
    setProcessing(true);
    setMessage("DFS/BFS Traversal to clone...");
    setClonedNodes([]);

    const sequence = [1, 2, 3, 4];
    let current = [];
    for (let node of sequence) {
      current.push(node);
      setClonedNodes([...current]);
      setMessage(`Cloned Node ${node}`);
      await new Promise((r) => setTimeout(r, 800));
    }

    setMessage("✅ Graph Cloned Deep Copy Created!");
    setProcessing(false);
  };

  return (
    <div className="p-4 bg-gray-900 h-full overflow-y-auto text-center">
      <h3 className="text-xl font-bold text-purple-400 mb-4">
        Visualizer Mode
      </h3>
      <button
        onClick={clone}
        disabled={processing}
        className="bg-purple-600 px-4 py-2 rounded font-bold mb-8"
      >
        Start Clone
      </button>

      <div className="flex justify-around">
        {/* Original */}
        <div className="relative w-40 h-40 border border-gray-600 rounded bg-gray-800/50">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 text-gray-400 text-xs">
            Original
          </div>
          {/* Nodes 1,2,3,4 */}
          <div className="absolute top-10 left-10 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center border">
            1
          </div>
          <div className="absolute top-10 right-10 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center border">
            2
          </div>
          <div className="absolute bottom-10 right-10 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center border">
            3
          </div>
          <div className="absolute bottom-10 left-10 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center border">
            4
          </div>

          {/* Edges */}
          <svg className="absolute w-full h-full pointer-events-none">
            <rect
              x="35%"
              y="35%"
              width="30%"
              height="30%"
              fill="none"
              stroke="gray"
            />
          </svg>
        </div>

        {/* Cloned */}
        <div className="relative w-40 h-40 border border-purple-500 rounded bg-gray-800/50">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 text-purple-400 text-xs">
            Cloned Copy
          </div>

          {clonedNodes.includes(1) && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-10 left-10 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center border"
            >
              1
            </motion.div>
          )}
          {clonedNodes.includes(2) && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-10 right-10 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center border"
            >
              2
            </motion.div>
          )}
          {clonedNodes.includes(3) && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute bottom-10 right-10 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center border"
            >
              3
            </motion.div>
          )}
          {clonedNodes.includes(4) && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute bottom-10 left-10 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center border"
            >
              4
            </motion.div>
          )}
        </div>
      </div>

      <div className="mt-8 text-yellow-500 font-mono text-xs">{message}</div>
    </div>
  );
};

const CloneGraph = () => {
  const description = `Given a reference of a node in a connected undirected graph.

Return a deep copy (clone) of the graph.

Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.

class Node {
    public int val;
    public List<Node> neighbors;
}
`;

  const initialCode = {
    javascript: `/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function(node) {
    // Write your code here
    
};
`,
    python: `"""
# Definition for a Node.
class Node:
    def __init__(self, val = 0, neighbors = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []
"""
class Solution:
    def cloneGraph(self, node: Optional['Node']) -> Optional['Node']:
        pass
`,
    java: `/*
// Definition for a Node.
class Node {
    public int val;
    public List<Node> neighbors;
    public Node() {
        val = 0;
        neighbors = new ArrayList<Node>();
    }
    public Node(int _val) {
        val = _val;
        neighbors = new ArrayList<Node>();
    }
    public Node(int _val, ArrayList<Node> _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
}
*/
class Solution {
    public Node cloneGraph(Node node) {
        return null;
    }
}`,
  };

  return (
    <ChallengeLayout
      title="133. Clone Graph"
      description={description}
      visualizer={CloneGraphVisualizer}
      initialCode={initialCode}
    />
  );
};

export default CloneGraph;
