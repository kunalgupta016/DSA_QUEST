import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const GameHome = () => {
  const realms = [
    {
      id: "arrays",
      title: "Kingdom of Arrays",
      description: "Master the art of contiguous memory. 10 Levels Await.",
      locked: false,
      color: "from-cyan-500 to-blue-600",
      path: "/game/arrays",
      icon: "🏰",
    },
    {
      id: "pointers",
      title: "Forest of Pointers",
      description: "Navigate the treacherous memory addresses. (Coming Soon)",
      locked: true,
      color: "from-green-500 to-emerald-700",
      path: "/game/pointers",
      icon: "🌲",
    },
    {
      id: "linkedlist",
      title: "Linked List Chains",
      description: "Break and forge the chains of nodes. (Coming Soon)",
      locked: true,
      color: "from-purple-500 to-indigo-700",
      path: "/game/linkedlist",
      icon: "🔗",
    },
    {
      id: "sorting",
      title: "Sorting Arena",
      description: "Battle in the arena of order. (Coming Soon)",
      locked: true,
      color: "from-red-500 to-orange-700",
      path: "/game/sorting",
      icon: "⚔️",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f1016] text-white pt-24 px-4 pb-12 overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-cyan-600/20 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-200 bg-clip-text text-transparent drop-shadow-lg">
            DSA Quest
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Select a realm to begin your adventure. Conquer levels to master the
            algorithms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {realms.map((realm, index) => (
            <Link
              key={realm.id}
              to={realm.locked ? "#" : realm.path}
              className={`block group ${realm.locked ? "cursor-not-allowed grayscale opacity-60" : "cursor-pointer"}`}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={
                  !realm.locked
                    ? {
                        y: -10,
                        scale: 1.02,
                        boxShadow:
                          "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.5)",
                      }
                    : {}
                }
                className={`h-full bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 relative overflow-hidden transition-all duration-300
                            ${!realm.locked ? "hover:border-cyan-400/50 hover:bg-gray-800" : ""}
                        `}
              >
                {/* Card Background Gradient */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${realm.color}`}
                />

                <div className="text-6xl mb-6 relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                  {realm.icon}
                </div>

                <h3 className="text-2xl font-bold mb-2 group-hover:text-yellow-400 transition-colors">
                  {realm.title}
                </h3>

                <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                  {realm.description}
                </p>

                {!realm.locked && (
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                    <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-xs font-bold border border-cyan-500/30">
                      ENTER REALM →
                    </span>
                  </div>
                )}

                {realm.locked && (
                  <div className="absolute top-4 right-4 text-gray-500">
                    🔒 Locked
                  </div>
                )}
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameHome;
