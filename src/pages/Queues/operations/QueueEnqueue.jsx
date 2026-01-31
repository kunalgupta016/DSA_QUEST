import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QueueEnqueue = () => {
  const [queue, setQueue] = useState([10, 20]);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");

  const enqueue = () => {
    if (!inputValue) {
      setMessage("Please enter a value");
      return;
    }
    if (queue.length >= 7) {
      setMessage("Queue Full! Limit reached.");
      return;
    }
    setQueue([...queue, inputValue]);
    setInputValue("");
    setMessage(`Enqueued ${inputValue}`);
  };

  const reset = () => {
    setQueue([10, 20]);
    setMessage("");
    setInputValue("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 px-8 pb-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-green-500">
        Operation: Enqueue
      </h1>
      <div className="mb-8 text-center max-w-3xl space-y-4">
        <p className="text-gray-300">
          <strong>English:</strong> Enqueue adds an element to the REAR (end) of
          the queue.
        </p>
        <p className="text-gray-400 italic">
          <strong>Hinglish:</strong> Enqueue operation queue ke REAR (ant) mein
          ek naya element add karta hai.
        </p>
      </div>

      <div className="flex gap-4 mb-8">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-green-500"
          placeholder="Enter number"
        />
        <button
          onClick={enqueue}
          className="px-6 py-2 bg-green-600 rounded hover:bg-green-700 transition"
        >
          Enqueue
        </button>
        <button
          onClick={reset}
          className="px-6 py-2 bg-gray-600 rounded hover:bg-gray-700 transition"
        >
          Reset
        </button>
      </div>

      <div className="h-8 mb-4 text-xl font-semibold text-blue-400">
        {message}
      </div>

      <div className="flex items-center gap-2 p-4 min-h-[100px] border-2 border-gray-600 rounded-lg overflow-x-auto max-w-4xl">
        <AnimatePresence>
          {queue.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
              className="min-w-[60px] h-[60px] bg-green-500 rounded flex items-center justify-center font-bold text-xl border-2 border-green-300"
            >
              {item}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="flex justify-between w-full max-w-4xl mt-2 text-gray-400 text-sm">
        <span>Front</span>
        <span>Rear</span>
      </div>
    </div>
  );
};

export default QueueEnqueue;
