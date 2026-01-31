import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LLDeleteTail = () => {
  const [list, setList] = useState([
    { value: 10, id: 1 },
    { value: 20, id: 2 },
    { value: 30, id: 3 },
  ]);
  const [message, setMessage] = useState("");

  const deleteTail = () => {
    if (list.length === 0) {
      setMessage("List is empty");
      return;
    }
    const removed = list[list.length - 1];
    setList(list.slice(0, -1));
    setMessage(`Deleted Tail (${removed.value})`);
  };

  const reset = () => {
    setList([
      { value: 10, id: 1 },
      { value: 20, id: 2 },
      { value: 30, id: 3 },
    ]);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 px-8 pb-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-red-500">Delete Tail</h1>
      <div className="mb-8 text-center max-w-3xl space-y-4">
        <p className="text-gray-300">
          <strong>English:</strong> Removes the last node of the list.
        </p>
        <p className="text-gray-400 italic">
          <strong>Hinglish:</strong> List ka aakhri node remove karta hai.
        </p>
      </div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={deleteTail}
          className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
        >
          Delete Tail
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
        {list.length === 0 && (
          <span className="text-gray-500 italic">List is empty</span>
        )}
      </div>
    </div>
  );
};

export default LLDeleteTail;
