"use client";

import { motion } from "framer-motion";

const ChatMessage = ({ message, index, theme }) => {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex items-start space-x-4 max-w-xs lg:max-w-2xl ${
          isUser ? "flex-row-reverse space-x-reverse" : ""
        }`}
      >
        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center text-lg font-medium shadow-lg ${
            isUser
              ? theme === "dark"
                ? "bg-gradient-to-r from-purple-500 to-violet-600 text-white"
                : "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
              : theme === "dark"
              ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
              : "bg-gradient-to-r from-green-500 to-teal-600 text-white"
          }`}
        >
          {isUser ? "👤" : "🤖"}
        </motion.div>

        {/* Message Bubble */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`relative px-6 py-4 rounded-2xl shadow-lg backdrop-blur-sm ${
            isUser
              ? theme === "dark"
                ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-br-md"
                : "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md"
              : theme === "dark"
              ? "bg-gray-800/80 border border-gray-700/50 text-gray-100 rounded-bl-md"
              : "bg-white/80 border border-gray-200/50 text-gray-800 rounded-bl-md"
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>

          {/* Message tail */}
          <div
            className={`absolute top-4 w-3 h-3 transform rotate-45 ${
              isUser
                ? theme === "dark"
                  ? "bg-purple-600 -right-1"
                  : "bg-blue-500 -right-1"
                : theme === "dark"
                ? "bg-gray-800 -left-1 border-l border-t border-gray-700/50"
                : "bg-white -left-1 border-l border-t border-gray-200/50"
            }`}
          ></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
