"use client";

import { motion } from "framer-motion";

const LoadingIndicator = ({ theme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start"
    >
      <div className="flex items-start space-x-4">
        {/* AI Avatar */}
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center text-lg font-medium shadow-lg ${
            theme === "dark"
              ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
              : "bg-gradient-to-r from-green-500 to-teal-600 text-white"
          }`}
        >
          🧠
        </div>

        {/* Loading Bubble */}
        <div
          className={`px-6 py-4 rounded-2xl rounded-bl-md shadow-lg backdrop-blur-sm ${
            theme === "dark"
              ? "bg-gray-800/80 border border-gray-700/50 text-gray-100"
              : "bg-white/80 border border-gray-200/50 text-gray-800"
          }`}
        >
          <div className="flex items-center space-x-2">
            <span className="text-sm">DeepSeek-R1 is thinking</span>
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                  }}
                  className={`w-2 h-2 rounded-full ${
                    theme === "dark" ? "bg-purple-400" : "bg-blue-500"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Message tail */}
          <div
            className={`absolute top-4 w-3 h-3 transform rotate-45 ${
              theme === "dark"
                ? "bg-gray-800 -left-1 border-l border-t border-gray-700/50"
                : "bg-white -left-1 border-l border-t border-gray-200/50"
            }`}
          ></div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingIndicator;
