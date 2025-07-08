import React, { useState } from 'react';
import { motion } from 'framer-motion';

const generateRandomArray = (size) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 10);
};

const MergeSort = () => {
  const [array, setArray] = useState(generateRandomArray(10));
  const [isSorting, setIsSorting] = useState(false);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const mergeSort = async (arr, l, r) => {
    if (l >= r) return;

    const mid = Math.floor((l + r) / 2);
    await mergeSort(arr, l, mid);
    await mergeSort(arr, mid + 1, r);
    await merge(arr, l, mid, r);
  };

  const merge = async (arr, l, mid, r) => {
    let left = arr.slice(l, mid + 1);
    let right = arr.slice(mid + 1, r + 1);
    let i = 0,
      j = 0,
      k = l;

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        arr[k++] = left[i++];
      } else {
        arr[k++] = right[j++];
      }
      setArray([...arr]);
      await sleep(300);
    }

    while (i < left.length) {
      arr[k++] = left[i++];
      setArray([...arr]);
      await sleep(300);
    }

    while (j < right.length) {
      arr[k++] = right[j++];
      setArray([...arr]);
      await sleep(300);
    }
  };

  const startMergeSort = async () => {
    setIsSorting(true);
    let arr = [...array];
    await mergeSort(arr, 0, arr.length - 1);
    setArray([...arr]);
    setIsSorting(false);
  };

  const explainInHinglish = () => {
    alert(`📘 Merge Sort ka samjhauta (Hinglish me):

1️⃣ Ye ek divide & conquer algorithm hai.
2️⃣ Array ko bar-bar do equal parts me divide karta hai.
3️⃣ Har part ko recursively sort karta hai.
4️⃣ Phir dono sorted parts ko ek sath merge karta hai sorted order me.
5️⃣ Jab sab parts merge ho jaate hain, final sorted array milta hai.

💡 Iska time complexity O(n log n) hota hai, jo efficient hai!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-20">

      {/* 📘 Explanation Section */}
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg mb-10">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">📘 Merge Sort: Detailed Approach</h2>

        <p className="text-gray-300 mb-3 font-semibold text-lg">Approach:</p>
        <p className="text-gray-300 mb-4">The algorithm steps are as follows:</p>

        <ul className="list-disc list-inside space-y-3 text-gray-200 text-sm sm:text-base">
          <li>🪓 Divide the array into two halves recursively until each part has one element.</li>
          <li>🔁 Sort each half individually using recursion.</li>
          <li>🔗 Merge the two sorted halves into a single sorted array.</li>
          <li>🧠 Continue this process until the full array is sorted.</li>
          <li className="bg-gray-700 rounded-md p-3">
            💡 <b>Note:</b> Merge sort uses extra space for merging but ensures O(n log n) time in all cases.
          </li>
        </ul>

        <h3 className="text-yellow-400 text-lg mt-6 mb-2 font-semibold">🔁 Pseudocode:</h3>
        <pre className="bg-black text-green-300 text-sm p-4 rounded-md overflow-x-auto">
{`void merge(vector<int> &arr, int low, int mid, int high) {
    vector<int> temp; // temporary array
    int left = low;      // starting index of left half of arr
    int right = mid + 1;   // starting index of right half of arr

    //storing elements in the temporary array in a sorted manner//

    while (left <= mid && right <= high) {
        if (arr[left] <= arr[right]) {
            temp.push_back(arr[left]);
            left++;
        }
        else {
            temp.push_back(arr[right]);
            right++;
        }
    }

    // if elements on the left half are still left //

    while (left <= mid) {
        temp.push_back(arr[left]);
        left++;
    }

    //  if elements on the right half are still left //
    while (right <= high) {
        temp.push_back(arr[right]);
        right++;
    }

    // transfering all elements from temporary to arr //
    for (int i = low; i <= high; i++) {
        arr[i] = temp[i - low];
    }
}

void mergeSort(vector<int> &arr, int low, int high) {
    if (low >= high) return;
    int mid = (low + high) / 2 ;
    mergeSort(arr, low, mid);  // left half
    mergeSort(arr, mid + 1, high); // right half
    merge(arr, low, mid, high);  // merging sorted halves
}`}
        </pre>
      </div>

      {/* 📊 Bars Section */}
      <div className="flex justify-center gap-2 items-end h-64 mt-20 mb-6">
        {array.map((value, index) => (
          <motion.div
            key={`bar-${index}`}
            layout
            className="bg-yellow-400 rounded-t-md"
            style={{ height: `${value * 3}px`, width: '30px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      {/* 🔢 Array Blocks */}
      <div className="flex justify-center gap-4 mb-10">
        {array.map((value, index) => (
          <motion.div
            key={`block-${index}`}
            layout
            className="bg-gray-800 border border-yellow-400 rounded-md px-4 py-2 text-lg font-bold shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            [{value}]
          </motion.div>
        ))}
      </div>

      {/* 🎛 Buttons */}
      <div className="flex justify-center gap-4 flex-wrap">
        <button
          onClick={() => setArray(generateRandomArray(10))}
          className="bg-blue-500 px-5 py-2 rounded-md font-semibold hover:bg-blue-600 transition disabled:opacity-50"
          disabled={isSorting}
        >
          Generate New
        </button>

        <button
          onClick={startMergeSort}
          className="bg-green-500 px-5 py-2 rounded-md font-semibold hover:bg-green-600 transition disabled:opacity-50"
          disabled={isSorting}
        >
          Start Sorting
        </button>

        <button
          onClick={explainInHinglish}
          className="bg-yellow-400 text-black px-5 py-2 rounded-md font-semibold hover:bg-yellow-300 transition"
        >
          Explain in Hinglish 🧠
        </button>
      </div>
    </div>
  );
};

export default MergeSort;
