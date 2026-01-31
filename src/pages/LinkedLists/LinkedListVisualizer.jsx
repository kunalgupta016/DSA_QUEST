import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LinkedListVisualizer = () => {
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");

  const insertHead = () => {
    if (!inputValue) {
      setMessage("Please enter a value");
      return;
    }
    if (list.length >= 8) {
      setMessage("List full (for visualization purposes)");
      return;
    }
    const newNode = { value: inputValue, id: Date.now() };
    setList([newNode, ...list]);
    setInputValue("");
    setMessage(`Inserted ${inputValue} at Head`);
  };

  const insertTail = () => {
    if (!inputValue) {
      setMessage("Please enter a value");
      return;
    }
    if (list.length >= 8) {
      setMessage("List full (for visualization purposes)");
      return;
    }
    const newNode = { value: inputValue, id: Date.now() };
    setList([...list, newNode]);
    setInputValue("");
    setMessage(`Inserted ${inputValue} at Tail`);
  };

  const deleteHead = () => {
    if (list.length === 0) {
      setMessage("List is empty");
      return;
    }
    const removed = list[0];
    setList(list.slice(1));
    setMessage(`Deleted Head (${removed.value})`);
  };

  const deleteTail = () => {
    if (list.length === 0) {
      setMessage("List is empty");
      return;
    }
    const removed = list[list.length - 1];
    setList(list.slice(0, -1));
    setMessage(`Deleted Tail (${removed.value})`);
  };

  const clear = () => {
    setList([]);
    setMessage("List cleared");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 px-8 pb-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-purple-500">
        Linked List Visualizer
      </h1>

      <div className="flex flex-wrap gap-4 mb-8 justify-center">
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
          onClick={insertTail}
          className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 transition"
        >
          Insert Tail
        </button>
        <button
          onClick={deleteHead}
          className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
        >
          Delete Head
        </button>
        <button
          onClick={deleteTail}
          className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
        >
          Delete Tail
        </button>
        <button
          onClick={clear}
          className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 transition"
        >
          Clear
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
        {list.length === 0 && (
          <span className="text-gray-500 italic">List is empty</span>
        )}
      </div>
    </div>
  );
};

export default LinkedListVisualizer;
