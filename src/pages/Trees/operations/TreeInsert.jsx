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

const TreeInsert = () => {
  const [root, setRoot] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
  const [treeStructure, setTreeStructure] = useState({}); // For re-renders

  const insertNode = (rootNode, value, x, y, level, offset) => {
    if (!rootNode) {
      const newNode = new Node(value);
      newNode.x = x;
      newNode.y = y;
      return newNode;
    }

    if (value < rootNode.value) {
      rootNode.left = insertNode(
        rootNode.left,
        value,
        x - offset,
        y + 60,
        level + 1,
        offset / 1.8,
      );
    } else if (value > rootNode.value) {
      rootNode.right = insertNode(
        rootNode.right,
        value,
        x + offset,
        y + 60,
        level + 1,
        offset / 1.8,
      );
    } else {
      setMessage("Value already exists!");
    }
    return rootNode;
  };

  const addValue = () => {
    if (!inputValue) {
      setMessage("Please enter a value");
      return;
    }
    const val = parseInt(inputValue);
    if (isNaN(val)) {
      setMessage("Please enter a valid number");
      return;
    }

    const newRoot = insertNode(root ? { ...root } : null, val, 400, 50, 0, 150);
    setRoot(newRoot);
    setTreeStructure({ ...newRoot });
    setInputValue("");
    setMessage(`Inserted ${val}`);
  };

  const clear = () => {
    setRoot(null);
    setTreeStructure({});
    setMessage("Tree cleared");
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
      <h1 className="text-4xl font-bold mb-8 text-pink-500">BST Insertion</h1>
      <div className="mb-8 text-center max-w-3xl space-y-4">
        <p className="text-gray-300">
          <strong>English:</strong> Inserts a new value into the Binary Search
          Tree.
        </p>
        <p className="text-gray-400 italic">
          <strong>Hinglish:</strong> Binary Search Tree mein naya value insert
          karta hai.
        </p>
      </div>

      <div className="flex gap-4 mb-4">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-pink-500"
          placeholder="Enter number"
        />
        <button
          onClick={addValue}
          className="px-6 py-2 bg-pink-600 rounded hover:bg-pink-700 transition"
        >
          Insert
        </button>
        <button
          onClick={clear}
          className="px-6 py-2 bg-gray-600 rounded hover:bg-gray-700 transition"
        >
          Clear
        </button>
      </div>

      <div className="h-8 mb-4 text-xl font-semibold text-green-400">
        {message}
      </div>

      <div className="w-[800px] h-[600px] bg-gray-800 border-2 border-gray-600 rounded-lg relative overflow-hidden">
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
            animate={{ scale: 1 }}
            className="absolute w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center font-bold text-white border-2 border-pink-300 z-10 shadow-md"
            style={{ left: node.x - 20, top: node.y }}
          >
            {node.value}
          </motion.div>
        ))}
        {nodes.length === 0 && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500">
            Empty Tree
          </div>
        )}
      </div>
    </div>
  );
};

export default TreeInsert;
