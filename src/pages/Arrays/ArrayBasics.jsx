import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.2, duration: 0.6 }
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const ArrayBasics = () => {
  const handleExplain = () => {
    alert(`📘 Hinglish Explanation:

Array ek container hota hai jo same type ke elements ko ek sath memory me store karta hai.
Jaise ek dabba hai jisme 5 number rakhe gaye hain — sab same size ke aur order me.

Access karne ke liye index ka use hota hai. For example, arr[2] ka matlab hai 3rd element.

Array ka size fix hota hai, aur har element directly access ho sakta hai.`);
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto bg-gray-800 p-8 mt-20 mb-20 rounded-xl shadow-lg border border-yellow-400"
      >
        <motion.h1
          variants={itemVariants}
          className="text-3xl font-bold text-yellow-400 mb-6 text-center"
        >
          📘 Array Basics
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-gray-300 mb-4 text-lg leading-7"
        >
          <span className="font-semibold text-yellow-300">What is an Array?</span><br />
          An array is a linear data structure that stores elements of the same type in contiguous memory locations.
        </motion.p>

        <motion.ul
          variants={itemVariants}
          className="list-disc list-inside space-y-3 text-gray-200 text-base mb-6"
        >
          <li>⚙️ Arrays are zero-indexed (starts from 0).</li>
          <li>📏 Fixed size at declaration (in C/C++).</li>
          <li>⏱️ Constant time access via index (O(1)).</li>
          <li>🧠 Used to store similar items like marks, IDs etc.</li>
        </motion.ul>

        <motion.h2
          variants={itemVariants}
          className="text-yellow-300 text-xl mt-6 mb-2 font-semibold"
        >
          🧾 Syntax (C++):
        </motion.h2>

        <motion.pre
          variants={itemVariants}
          className="bg-black text-green-300 text-sm p-4 rounded-md overflow-x-auto"
        >
{`int arr[5];                  // Declaration
int arr[5] = {1, 2, 3, 4, 5}; // Initialization
cout << arr[0];              // Access first element`}
        </motion.pre>

        <motion.h2
          variants={itemVariants}
          className="text-yellow-300 text-xl mt-6 mb-2 font-semibold"
        >
          💡 Memory Layout:
        </motion.h2>

        <motion.div
          variants={itemVariants}
          className="overflow-x-auto bg-gray-900 p-4 rounded-md mb-6 text-green-300 text-sm"
        >
          Index → | 0 | 1 | 2 | 3 | 4 |<br />
          Value → | 1 | 2 | 3 | 4 | 5 |
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-yellow-300 text-xl mt-6 mb-2 font-semibold"
        >
          📋 Common Operations:
        </motion.h2>

        <motion.ul
          variants={itemVariants}
          className="list-disc list-inside space-y-2 text-gray-200 text-base mb-6"
        >
          <li>🔁 Traversing: Loop through elements</li>
          <li>🧮 Sum / Average of array</li>
          <li>🔍 Searching for a value</li>
          <li>🎯 Updating value at index</li>
        </motion.ul>

        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleExplain}
          className="mt-6 bg-yellow-400 text-black px-6 py-2 rounded-md font-semibold hover:bg-yellow-300 transition"
        >
          Explain in Hinglish 🧠
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ArrayBasics;
