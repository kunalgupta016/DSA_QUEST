import React, { useState } from "react";
import { motion } from "framer-motion";

// Basic structure for a BST node
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.x = 0;
    this.y = 0;
  }
}

const TreeTraversal = () => {
  const [root, setRoot] = useState(null);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [treeStructure, setTreeStructure] = useState({});

  // Hardcode a tree for traversal demo
  const buildDemoTree = () => {
    const n50 = new Node(50);
    n50.x = 400;
    n50.y = 50;
    const n30 = new Node(30);
    n30.x = 250;
    n30.y = 110;
    const n70 = new Node(70);
    n70.x = 550;
    n70.y = 110;
    const n20 = new Node(20);
    n20.x = 175;
    n20.y = 170;
    const n40 = new Node(40);
    n40.x = 325;
    n40.y = 170;
    const n60 = new Node(60);
    n60.x = 475;
    n60.y = 170;
    const n80 = new Node(80);
    n80.x = 625;
    n80.y = 170;

    n50.left = n30;
    n50.right = n70;
    n30.left = n20;
    n30.right = n40;
    n70.left = n60;
    n70.right = n80;

    setRoot(n50);
    setTreeStructure(n50);
    setMessage("Demo Tree Built");
  };

  const [traversalLog, setTraversalLog] = useState([]);
  const [highlightVal, setHighlightVal] = useState(null);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const bfs = async () => {
    if (!root) {
      setMessage("Build tree first!");
      return;
    }
    setMessage("Starting Level Order Traversal (BFS)...");
    setTraversalLog([]);

    const queue = [root];
    const log = [];

    while (queue.length > 0) {
      const curr = queue.shift();
      setHighlightVal(curr.value);
      log.push(curr.value);
      setTraversalLog([...log]);

      await sleep(800);

      if (curr.left) queue.push(curr.left);
      if (curr.right) queue.push(curr.right);
    }
    setHighlightVal(null);
    setMessage("Traversal Complete");
  };

  const getRenderNodes = (node) => {
    if (!node) return { nodes: [], edges: [] };
    const nodes = [];
    const queue = [node];
    const edges = [];

    while (queue.length > 0) {
      const curr = queue.shift();
      nodes.push(curr);

      if (curr.left) {
        queue.push(curr.left);
        edges.push({
          x1: curr.x,
          y1: curr.y,
          x2: curr.left.x,
          y2: curr.left.y,
        });
      }
      if (curr.right) {
        queue.push(curr.right);
        edges.push({
          x1: curr.x,
          y1: curr.y,
          x2: curr.right.x,
          y2: curr.right.y,
        });
      }
    }
    return { nodes, edges };
  };

  const { nodes, edges } = getRenderNodes(root);

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 px-8 pb-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-pink-500">BST Traversal</h1>
      <div className="mb-8 text-center max-w-3xl space-y-4">
        <p className="text-gray-300">
          <strong>English:</strong> Visualizing Level Order Traversal (BFS).
        </p>
        <p className="text-gray-400 italic">
          <strong>Hinglish:</strong> Level Order Traversal (BFS) ka
          visualization.
        </p>
      </div>

      <div className="flex gap-4 mb-4">
        <button
          onClick={buildDemoTree}
          className="px-6 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Build Demo Tree
        </button>
        <button
          onClick={bfs}
          className="px-6 py-2 bg-purple-600 rounded hover:bg-purple-700 transition"
        >
          Run BFS
        </button>
      </div>

      <div className="h-8 mb-4 text-xl font-semibold text-green-400">
        {message}
      </div>

      {/* Log */}
      <div className="mb-4 text-lg font-mono bg-gray-800 p-2 rounded border border-gray-600">
        Path: {traversalLog.join(" -> ")}
      </div>

      <div className="w-[800px] h-[400px] bg-gray-800 border-2 border-gray-600 rounded-lg relative overflow-hidden">
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {edges.map((edge, i) => (
            <line
              key={i}
              x1={edge.x1}
              y1={edge.y1 + 20}
              x2={edge.x2}
              y2={edge.y2 + 20}
              stroke="white"
              strokeWidth="2"
            />
          ))}
        </svg>

        {nodes.map((node, i) => (
          <motion.div
            key={node.value + "-" + i}
            initial={{ scale: 0 }}
            animate={{
              scale: highlightVal === node.value ? 1.2 : 1,
              backgroundColor:
                highlightVal === node.value ? "#F59E0B" : "#EC4899", // Amber if highlighted, Pink default
            }}
            className="absolute w-10 h-10 rounded-full flex items-center justify-center font-bold text-white border-2 border-pink-300 z-10 shadow-md transition-colors duration-300"
            style={{ left: node.x - 20, top: node.y }}
          >
            {node.value}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TreeTraversal;
