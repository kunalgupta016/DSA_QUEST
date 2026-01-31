import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QueueFront = () => {
  const [queue, setQueue] = useState([10, 20, 30, 40]);
  const [message, setMessage] = useState("");

  const front = () => {
    if (queue.length === 0) {
      setMessage("Queue is empty");
    } else {
      setMessage(`Front element is ${queue[0]}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 px-8 pb-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-yellow-500">
        Operation: Front
      </h1>
      <div className="mb-8 text-center max-w-3xl space-y-4">
        <p className="text-gray-300">
          <strong>English:</strong> Front operation gets the element at the
          FRONT of the queue without removing it.
        </p>
        <p className="text-gray-400 italic">
          <strong>Hinglish:</strong> Front operation queue ke FRONT element ko
          bina remove kiye access karta hai.
        </p>
      </div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={front}
          className="px-6 py-2 bg-yellow-600 rounded hover:bg-yellow-700 transition"
        >
          Front
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
              className={`min-w-[60px] h-[60px] rounded flex items-center justify-center font-bold text-xl border-2 
               ${index === 0 && message.includes("Front") ? "bg-yellow-500 border-yellow-300" : "bg-green-500 border-green-300"}`}
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

export default QueueFront;
