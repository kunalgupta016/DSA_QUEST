import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const StackPeek = () => {
  const [stack, setStack] = useState([100, 200, 300]);
  const [message, setMessage] = useState("");

  const peek = () => {
    if (stack.length === 0) {
      setMessage("Stack is empty");
    } else {
      setMessage(`Top element is ${stack[stack.length - 1]}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 px-8 pb-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-yellow-500">
        Operation: Peek
      </h1>
      <div className="mb-8 text-center max-w-3xl space-y-4">
        <p className="text-gray-300">
          <strong>English:</strong> Peek views the top element without removing
          it.
        </p>
        <p className="text-gray-400 italic">
          <strong>Hinglish:</strong> Peek operation stack ke TOP element ko bina
          remove kiye dekhne ke liye use hota hai.
        </p>
      </div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={peek}
          className="px-6 py-2 bg-yellow-600 rounded hover:bg-yellow-700 transition"
        >
          Peek
        </button>
      </div>

      <div className="h-8 mb-4 text-xl font-semibold text-green-400">
        {message}
      </div>

      <div className="flex flex-col-reverse items-center w-32 bg-gray-800 border-x-4 border-b-4 border-gray-600 rounded-b-lg p-2 min-h-[400px]">
        <AnimatePresence>
          {stack.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
              className={`w-full h-12 mb-2 rounded flex items-center justify-center font-bold text-xl border-2 
              ${index === stack.length - 1 && message.includes("Top") ? "bg-yellow-500 border-yellow-300" : "bg-blue-500 border-blue-300"}`}
            >
              {item}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="mt-4 text-gray-400 text-sm">Top of Stack</div>
    </div>
  );
};

export default StackPeek;
