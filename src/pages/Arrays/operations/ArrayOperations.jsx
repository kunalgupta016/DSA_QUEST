import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const operations = [
  {
    category: '📥 Insertion',
    items: [
      { name: 'Insert at Beginning', path: '/arrays/operations/insert-begin' },
      { name: 'Insert at End', path: '/arrays/operations/insert-end' },
      { name: 'Insert at Index', path: '/arrays/operations/insert-index' },
    ],
  },
  {
    category: '❌ Deletion',
    items: [
      { name: 'Delete at Beginning', path: '/arrays/operations/delete-begin' },
      { name: 'Delete at End', path: '/arrays/operations/delete-end' },
      { name: 'Delete by Index', path: '/arrays/operations/delete-index' },
    ],
  },
  {
    category: '🔁 Traversal & Updates',
    items: [
      { name: 'Forward Traversal', path: '/arrays/operations/traverse-forward' },
      { name: 'Reverse Traversal', path: '/arrays/operations/traverse-reverse' },
      { name: 'Update at Index', path: '/arrays/operations/update-index' },
    ],
  },
  {
    category: '🔄 Rotation & Reverse',
    items: [
      { name: 'Left Rotate', path: '/arrays/operations/left-rotate' },
      { name: 'Right Rotate', path: '/arrays/operations/right-rotate' },
      { name: 'Reverse Array', path: '/arrays/operations/reverse' },
    ],
  },
  {
    category: '📊 Miscellaneous',
    items: [
      { name: 'Find Max / Min', path: '/arrays/operations/max-min' },
      { name: 'Frequency Count', path: '/arrays/operations/frequency' },
      { name: 'Subarray Sum', path: '/arrays/operations/subarray-sum' },
    ],
  },
];

const ArrayOperations = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-400 text-center mb-12">
          ⚙️ Array Operations
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {operations.map((group, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 border border-yellow-500 rounded-xl p-6 shadow-md"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h2 className="text-xl font-bold text-yellow-300 mb-4">{group.category}</h2>
              <ul className="space-y-3">
                {group.items.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      to={item.path}
                      className="block bg-gray-700 hover:bg-yellow-500 hover:text-black transition px-4 py-2 rounded-md font-semibold"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArrayOperations;
