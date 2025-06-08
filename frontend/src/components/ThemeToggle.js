"use client";

import { motion } from "framer-motion";

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={`relative p-3 rounded-2xl transition-all duration-300 ${
        theme === "dark"
          ? "bg-gray-800/80 text-yellow-400 shadow-lg shadow-purple-500/20"
          : "bg-white/80 text-gray-700 shadow-lg shadow-blue-500/20"
      } backdrop-blur-sm border ${
        theme === "dark" ? "border-gray-700/50" : "border-gray-200/50"
      }`}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === "dark" ? 180 : 0,
          scale: theme === "dark" ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="w-6 h-6 flex items-center justify-center"
      >
        {theme === "dark" ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl"
          >
            🌙
          </motion.span>
        ) : (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl"
          >
            ☀️
          </motion.span>
        )}
      </motion.div>

      {/* Glow effect */}
      <div
        className={`absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 ${
          theme === "dark"
            ? "bg-gradient-to-r from-purple-500/20 to-violet-500/20"
            : "bg-gradient-to-r from-blue-500/20 to-purple-500/20"
        }`}
      ></div>
    </motion.button>
  );
};

export default ThemeToggle;
