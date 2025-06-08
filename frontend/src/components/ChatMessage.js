"use client";
import { motion } from "framer-motion";

const ChatMessage = ({ message, index }) => {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${
          isUser ? "flex-row-reverse space-x-reverse" : ""
        }`}
      >
        {/* Avatar */}
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
            isUser
              ? "bg-gradient-to-r from-blue-500 to-purple-600"
              : "bg-gradient-to-r from-green-500 to-teal-600"
          }`}
        >
          {isUser ? "👤" : "🤖"}
        </div>

        {/* Message Bubble */}
        <div
          className={`px-4 py-3 rounded-2xl shadow-sm ${
            isUser
              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md"
              : "bg-white border border-gray-200 text-gray-800 rounded-bl-md"
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
