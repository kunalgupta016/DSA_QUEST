import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const mathLogicalTopics = [
  {
    category: "🔢 Basic Array Logic",
    items: [
      { name: "Find Max & Min", path: "/arrays/logical/max-min" },
      {
        name: "Second Largest / Smallest",
        path: "/arrays/logical/second-largest",
      },
      { name: "Check if Sorted", path: "/arrays/logical/check-sorted" },
      { name: "Reverse Array", path: "/arrays/logical/reverse-array" },
      { name: "Rotate Array (by K)", path: "/arrays/logical/rotate-array" },
    ],
  },
  {
    category: "🧩 Duplicates & Missing",
    items: [
      {
        name: "Remove Duplicates (Sorted)",
        path: "/arrays/logical/remove-duplicates-sorted",
      },
      {
        name: "Remove Duplicates (Unsorted)",
        path: "/arrays/logical/remove-duplicates-unsorted",
      },
      { name: "Find Missing Number", path: "/arrays/logical/missing-number" },
      {
        name: "Find Duplicate Number",
        path: "/arrays/logical/duplicate-number",
      },
      {
        name: "Find Missing & Repeating",
        path: "/arrays/logical/missing-repeating",
      },
      {
        name: "Find Element Odd Times",
        path: "/arrays/logical/odd-occurrence",
      },
    ],
  },
  {
    category: "➕ Sums & Subarrays",
    items: [
      { name: "Two Sum", path: "/arrays/logical/two-sum" },
      { name: "Three Sum", path: "/arrays/logical/three-sum" },
      { name: "Max Subarray Sum (Kadane)", path: "/arrays/logical/kadane" },
      { name: "Subarray with Sum K", path: "/arrays/logical/subarray-sum-k" },
      {
        name: "Count Subarrays Sum < K",
        path: "/arrays/logical/count-subarray-less-k",
      },
      {
        name: "Longest Subarray Sum 0",
        path: "/arrays/logical/longest-subarray-zero",
      },
    ],
  },
  {
    category: "👑 Majority & Occurrences",
    items: [
      { name: "Majority Element (n/2)", path: "/arrays/logical/majority-n2" },
      { name: "Majority Element (n/3)", path: "/arrays/logical/majority-n3" },
      {
        name: "First & Last Occurrence",
        path: "/arrays/logical/first-last-occurrence",
      },
      {
        name: "First Non-Repeating",
        path: "/arrays/logical/first-non-repeating",
      },
    ],
  },
  {
    category: "🔍 Search & Intersection",
    items: [
      { name: "Binary Search", path: "/arrays/logical/binary-search" },
      { name: "Search Rotated Sorted", path: "/arrays/logical/search-rotated" },
      {
        name: "Intersection of Two Arrays",
        path: "/arrays/logical/intersection",
      },
      { name: "Union of Two Arrays", path: "/arrays/logical/union" },
      { name: "Merge Two Sorted Arrays", path: "/arrays/logical/merge-sorted" },
    ],
  },
  {
    category: "💧 Water Problems",
    items: [
      { name: "Container Most Water", path: "/arrays/logical/container-water" },
      { name: "Trapping Rain Water", path: "/arrays/logical/trapping-rain" },
    ],
  },
  {
    category: "📐 Math Fundamentals",
    items: [
      { name: "Check Prime", path: "/arrays/logical/check-prime" },
      { name: "Sieve of Eratosthenes", path: "/arrays/logical/sieve" },
      { name: "GCD of Two Numbers", path: "/arrays/logical/gcd" },
      { name: "LCM of Two Numbers", path: "/arrays/logical/lcm" },
      { name: "Check Co-Prime", path: "/arrays/logical/check-coprime" },
      { name: "Power (Fast Expo)", path: "/arrays/logical/power" },
      {
        name: "Trailing Zeros Factorial",
        path: "/arrays/logical/trailing-zeros",
      },
    ],
  },
  {
    category: "🔢 Number Theory & Digits",
    items: [
      { name: "Reverse Number", path: "/arrays/logical/reverse-number" },
      { name: "Palindrome Number", path: "/arrays/logical/palindrome-number" },
      { name: "Armstrong Number", path: "/arrays/logical/armstrong" },
      { name: "Count Digits", path: "/arrays/logical/count-digits" },
      { name: "Sum of Digits", path: "/arrays/logical/sum-digits" },
      { name: "Check Power of 2", path: "/arrays/logical/power-of-2" },
      { name: "Check Power of 3", path: "/arrays/logical/power-of-3" },
    ],
  },
  {
    category: "💾 Binary & Bits",
    items: [
      { name: "Binary to Decimal", path: "/arrays/logical/binary-to-decimal" },
      { name: "Decimal to Binary", path: "/arrays/logical/decimal-to-binary" },
      { name: "Find Duplicate (XOR)", path: "/arrays/logical/duplicate-xor" },
    ],
  },
  {
    category: "🧠 Others",
    items: [
      { name: "Clock Angle Problem", path: "/arrays/logical/clock-angle" },
      { name: "Speed–Time–Distance", path: "/arrays/logical/speed-time" },
    ],
  },
];

const MathLogicalMenu = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-pink-500 text-center mb-12">
          🧩 Math & Logical Problems
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mathLogicalTopics.map((group, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 border border-pink-500/30 rounded-xl p-6 shadow-md hover:shadow-pink-500/20 transition"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <h2 className="text-xl font-bold text-pink-300 mb-4 border-b border-gray-700 pb-2">
                {group.category}
              </h2>
              <ul className="space-y-2">
                {group.items.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      to={item.path}
                      className="block text-sm bg-gray-700/50 hover:bg-pink-600 hover:text-white transition px-3 py-2 rounded-md font-medium"
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

export default MathLogicalMenu;
