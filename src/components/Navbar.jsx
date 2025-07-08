import React, { useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const mobileMenu = (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 right-0 w-3/4 h-full bg-gray-900 shadow-lg z-40 p-6 flex flex-col space-y-6 text-lg"
    >
      <button
        onClick={() => setIsOpen(false)}
        className="text-white text-right text-2xl mb-4 hover:text-yellow-400"
      >
        ✕
      </button>
      <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-yellow-300 text-white">Home</Link>
      <Link to="/topics" onClick={() => setIsOpen(false)} className="hover:text-yellow-300 text-white">Topics</Link>
      <Link to="/game" onClick={() => setIsOpen(false)} className="hover:text-yellow-300 text-white">Game</Link>
      <Link to="/ai-help" onClick={() => setIsOpen(false)} className="hover:text-yellow-300 text-white">AI Help</Link>
      <Link to="/progress" onClick={() => setIsOpen(false)} className="hover:text-yellow-300 text-white">Progress</Link>
    </motion.div>
  );

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gray-900 text-white py-4 px-6 md:px-8 shadow-lg fixed w-full z-50"
      >
        <div className="flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-yellow-400">DSA Quest</h1>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 text-lg">
            <Link to="/" className="hover:text-yellow-300 transition duration-300">Home</Link>
            <Link to="/topics" className="hover:text-yellow-300 transition duration-300">Topics</Link>
            <Link to="/game" className="hover:text-yellow-300 transition duration-300">Game</Link>
            <Link to="/ai-help" className="hover:text-yellow-300 transition duration-300">AI Help</Link>
            <Link to="/progress" className="hover:text-yellow-300 transition duration-300">Progress</Link>
          </div>

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden text-yellow-400 text-3xl"
            onClick={() => setIsOpen(true)}
          >
            ☰
          </button>
        </div>
      </motion.nav>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            {/* Sidebar Menu */}
            {mobileMenu}
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
