import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Lenis from 'lenis'
import { Link } from "react-router";

const Home = () => {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-x-hidden relative px-4 md:px-10">
      
      {/* 🔆 Floating Background Circle */}
      <motion.div
        className="absolute w-[300px] h-[300px] bg-yellow-400 rounded-full blur-3xl opacity-10 top-0 left-1/3 z-0"
        animate={{ y: [0, 100, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 💥 Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center z-10 relative">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold text-yellow-400"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Welcome to DSA Quest
        </motion.h1>
        <motion.p
          className="mt-4 text-gray-300 text-lg max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Master Data Structures with ✨ animations, 🎮 games, and 🤖 AI explanations.
        </motion.p>
        <motion.div
          className="mt-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 120 }}
        >
          <Link
            to="/topics"
            className="bg-yellow-400 text-black px-6 py-3 rounded-md text-lg font-semibold hover:bg-yellow-300 transition"
          >
            Start Your Journey 🚀
          </Link>
        </motion.div>
      </section>

      {/* 🌟 Features */}
      <section className="py-20 text-center z-10 relative">
        <h2 className="text-3xl font-bold text-yellow-300 mb-4">
          What Makes Us Different?
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-10">
          We're not just a DSA learning site — we're an experience!
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {[
            {
              title: "🎥 Visualized Algorithms",
              desc: "See sorting, searching, trees in action with live animation.",
            },
            {
              title: "🧠 AI Guidance",
              desc: "Get hints and problem explanations from AI like Gemini.",
            },
            {
              title: "🎮 Play DSA Games",
              desc: "Test your skills with interactive DSA-based minigames.",
            },
            {
              title: "📊 Track Your Progress",
              desc: "Your learning journey gets saved locally.",
            },
            {
              title: "🌙 Dark Mode Delight",
              desc: "Enjoy modern UI with smooth animations and scroll.",
            },
            {
              title: "🚀 Built for Beginners",
              desc: "Easy to navigate, beginner-friendly explanations & visuals.",
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className="bg-gray-800 border border-yellow-400 rounded-lg p-6 shadow-md"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
            >
              <h3 className="text-xl font-bold text-yellow-300 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🤖 AI Help */}
      <section className="py-16 text-center relative z-10">
        <h2 className="text-3xl font-bold text-yellow-300 mb-6">
          Need Help from AI?
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-10">
          Our Gemini-powered assistant can help you understand DSA problems.
        </p>
        <Link
          to="/ai-help"
          className="px-8 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300"
        >
          Ask AI Now 🤖
        </Link>
      </section>

      {/* 🧑‍💻 Testimonials */}
      <section className="py-20 bg-gray-900 rounded-xl my-10">
        <h2 className="text-3xl text-center font-bold text-yellow-300 mb-10">
          What Learners Say
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {[
            {
              name: "Radha ",
              feedback:
                "Absolutely loved the animations and AI help. It made learning sorting algorithms super fun!",
            },
            {
              name: "Kanha ",
              feedback:
                "The interface is smooth and I like how it's focused on visualization. Great for self-learners!",
            },
            {
              name: "Himanshu",
              feedback:
                "The game mode is a game changer! Learning DSA has never been this engaging 🔥",
            },
          ].map((user, idx) => (
            <motion.div
              key={idx}
              className="bg-gray-800 rounded-lg p-6 text-left shadow-lg border border-yellow-400"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.2 }}
            >
              <p className="text-gray-300 mb-4">"{user.feedback}"</p>
              <p className="text-yellow-300 font-semibold">– {user.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 📝 Latest Updates */}
      <section className="py-16 max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-yellow-300 mb-6 text-center">
          Latest Updates & Version Log 📜
        </h2>
        <ul className="space-y-6 text-gray-300">
          <li>
            <p className="font-bold text-yellow-200">📅 July 2025:</p>
            - Added Gemini AI Integration with local chat support.
          </li>
          <li>
            <p className="font-bold text-yellow-200">📅 June 2025:</p>
            - Sorting Visualizers for Bubble, Quick, Merge, Heap, and Radix sort.
          </li>
          <li>
            <p className="font-bold text-yellow-200">📅 May 2025:</p>
            - DSA Games & Accountless Local Progress Tracking!
          </li>
        </ul>
      </section>

      {/* 🔗 Quick Links */}
      <section className="py-16 bg-gray-950 mt-10 text-center">
        <h2 className="text-3xl font-bold text-yellow-300 mb-6">
          Quick Explore 🚀
        </h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/sorting"
            className="px-6 py-2 bg-yellow-500 text-black rounded-md font-semibold hover:bg-yellow-400"
          >
            Sorting Visualizer
          </Link>
          <Link
            to="/searching"
            className="px-6 py-2 bg-yellow-500 text-black rounded-md font-semibold hover:bg-yellow-400"
          >
            Searching Visualizer
          </Link>
          <Link
            to="/games"
            className="px-6 py-2 bg-yellow-500 text-black rounded-md font-semibold hover:bg-yellow-400"
          >
            DSA Games 🎮
          </Link>
        </div>
      </section>

      {/* 🧾 Footer */}
      <footer className="text-center py-8 border-t border-gray-700 text-sm text-gray-500 z-10 mt-10">
        Made with 💛 by Kunnu | © 2025 DSA Quest
      </footer>
    </div>
  );
};

export default Home;
