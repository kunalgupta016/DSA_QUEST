import React, { useState } from 'react';
import { motion } from 'framer-motion';

const generateArray = (size = 6) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const DeleteIndex = () => {
  const [array, setArray] = useState(generateArray());
  const [deleteIndex, setDeleteIndex] = useState('');
  const [highlight, setHighlight] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (deleteIndex === '' || deleteIndex < 0 || deleteIndex >= array.length) return;

    setDeleting(true);
    const newArr = [...array];

    // Highlight the deleting element
    setHighlight(Number(deleteIndex));
    await sleep(400);

    // Shift elements to the left
    for (let i = Number(deleteIndex); i < newArr.length - 1; i++) {
      newArr[i] = newArr[i + 1];
      setArray([...newArr.slice(0, newArr.length - 1)]);
      setHighlight(i + 1);
      await sleep(250);
    }

    setHighlight(null);
    setDeleting(false);
    setDeleteIndex('');
  };

  const explainInHinglish = () => {
    alert(`📤 Hinglish Explanation:

Delete at Index ka matlab hai array ke kisi particular index par jo element hai, usse hata dena.

1️⃣ Uske baad wale sabhi elements ko left shift karna padta hai.
2️⃣ Jaise ek queue me beech se banda hatao to sab peeche waale ek step aage aate hain.
3️⃣ Time complexity: O(n - index)`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-16">
      <div className="max-w-5xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-red-400">

        <h1 className="text-3xl font-bold text-red-400 text-center mb-8">
          🗑️ Delete at Specific Index
        </h1>

        {/* 💻 Code Block */}
        <div className="bg-gray-900 text-green-300 text-sm p-4 rounded-md mb-8 overflow-x-auto">
<pre>
{`// Delete at specific index
int arr[100], n = 6, index = 3;
for (int i = index; i < n - 1; i++) {
    arr[i] = arr[i + 1];
}
n--;`}
</pre>
        </div>

        {/* 📊 Array Boxes */}
        <div className="flex justify-center gap-3 flex-wrap mb-10">
          {array.map((val, idx) => (
            <motion.div
              key={idx}
              layout
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className={`px-4 py-2 rounded-md text-lg font-bold border
              ${highlight === idx ? 'bg-yellow-400 text-black border-yellow-300' : 'bg-gray-700 border-gray-600'}`}
            >
              {val}
            </motion.div>
          ))}
        </div>

        {/* 🎛 Controls */}
        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          <input
            type="number"
            placeholder="Index"
            value={deleteIndex}
            onChange={(e) => setDeleteIndex(e.target.value)}
            className="px-4 py-2 rounded-md text-black font-semibold"
            disabled={deleting}
          />
          <button
            onClick={handleDelete}
            className="bg-red-500 px-5 py-2 rounded-md font-semibold hover:bg-red-600 transition disabled:opacity-50"
            disabled={deleting || deleteIndex === ''}
          >
            Delete
          </button>
          <button
            onClick={() => {
              setArray(generateArray());
              setDeleteIndex('');
              setHighlight(null);
              setDeleting(false);
            }}
            className="bg-blue-500 px-5 py-2 rounded-md font-semibold hover:bg-blue-600 transition disabled:opacity-50"
            disabled={deleting}
          >
            Reset Array
          </button>
        </div>

        {/* 💬 Hinglish Explain */}
        <div className="flex justify-center">
          <button
            onClick={explainInHinglish}
            className="bg-yellow-400 text-black px-6 py-2 rounded-md font-semibold hover:bg-yellow-300 transition"
          >
            Explain in Hinglish 🧠
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteIndex;
