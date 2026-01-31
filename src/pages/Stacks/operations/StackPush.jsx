import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const StackPush = () => {
  const [stack, setStack] = useState([10, 20]);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");

  const push = () => {
    if (!inputValue) {
      setMessage("Please enter a value");
      return;
    }
    if (stack.length >= 7) {
      setMessage("Stack Overflow! Limit reached.");
      return;
    }
    setStack([...stack, inputValue]);
    setInputValue("");
    setMessage(`Pushed ${inputValue}`);
  };

  const reset = () => {
    setStack([10, 20]);
    setMessage("");
    setInputValue("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 px-8 pb-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-blue-500">Operation: Push</h1>
      <div className="mb-8 text-center max-w-3xl space-y-4">
        <p className="text-gray-300">
          <strong>English:</strong> Push adds an element to the TOP of the
          stack. If the stack is full, it causes a Stack Overflow.
        </p>
        <p className="text-gray-400 italic">
          <strong>Hinglish:</strong> Push operation stack ke TOP par ek naya
          element add karta hai. Agar stack full hai, toh yeh Stack Overflow
          kehlata hai.
        </p>
      </div>

      <div className="flex gap-4 mb-8">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-500"
          placeholder="Enter number"
        />
        <button
          onClick={push}
          className="px-6 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Push
        </button>
        <button
          onClick={reset}
          className="px-6 py-2 bg-gray-600 rounded hover:bg-gray-700 transition"
        >
          Reset
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
              className="w-full h-12 bg-blue-500 mb-2 rounded flex items-center justify-center font-bold text-xl border-2 border-blue-300"
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

export default StackPush;
