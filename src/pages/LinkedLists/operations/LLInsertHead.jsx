import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LLInsertHead = () => {
  const [list, setList] = useState([
    { value: 20, id: 2 },
    { value: 30, id: 3 },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");

  const insertHead = () => {
    if (!inputValue) {
      setMessage("Please enter a value");
      return;
    }
    if (list.length >= 7) {
      setMessage("List full (for visualization purposes)");
      return;
    }
    const newNode = { value: inputValue, id: Date.now() };
    setList([newNode, ...list]);
    setInputValue("");
    setMessage(`Inserted ${inputValue} at Head`);
  };

  const reset = () => {
    setList([
      { value: 20, id: 2 },
      { value: 30, id: 3 },
    ]);
    setMessage("");
    setInputValue("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 px-8 pb-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-purple-500">
        Insert at Head
      </h1>
      <div className="mb-8 text-center max-w-3xl space-y-4">
        <p className="text-gray-300">
          <strong>English:</strong> Inserts a new node at the beginning of the
          linked list. The new node becomes the new Head.
        </p>
        <p className="text-gray-400 italic">
          <strong>Hinglish:</strong> Linked List ki shuruat mein naya node
          insert karta hai. Naya node Head ban jata hai.
        </p>
      </div>

      <div className="flex gap-4 mb-8">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-purple-500"
          placeholder="Enter number"
        />
        <button
          onClick={insertHead}
          className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 transition"
        >
          Insert Head
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 transition"
        >
          Reset
        </button>
      </div>

      <div className="h-8 mb-8 text-xl font-semibold text-yellow-400">
        {message}
      </div>

      <div className="flex items-center justify-center gap-0 w-full overflow-x-auto p-4 min-h-[150px]">
        <AnimatePresence>
          {list.map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              layout
              className="flex items-center"
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center font-bold text-xl border-4 border-purple-300 z-10">
                  {node.value}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {index === 0
                    ? "Head"
                    : index === list.length - 1
                      ? "Tail"
                      : ""}
                </div>
              </div>

              {index < list.length - 1 && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 50 }}
                  className="h-2 bg-white mx-1 relative"
                >
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 -bg-white border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-white"></div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LLInsertHead;
