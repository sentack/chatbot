"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const ChatInput = ({ onSendMessage, disabled, theme }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-4">
      <div className="flex-1 relative">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
          disabled={disabled}
          rows="1"
          className={`w-full px-6 py-4 rounded-2xl focus:ring-2 focus:ring-offset-2 resize-none disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg backdrop-blur-sm ${
            theme === "dark"
              ? "bg-gray-800/80 border border-gray-700/50 text-gray-100 placeholder-gray-400 focus:ring-purple-500 focus:border-transparent focus:ring-offset-gray-900"
              : "bg-white/80 border border-gray-300/50 text-gray-800 placeholder-gray-500 focus:ring-blue-500 focus:border-transparent focus:ring-offset-white"
          }`}
          style={{ minHeight: "56px", maxHeight: "120px" }}
        />

        {/* Character count */}
        <div
          className={`absolute bottom-2 right-4 text-xs ${
            theme === "dark" ? "text-gray-500" : "text-gray-400"
          }`}
        >
          {message.length}/1000
        </div>
      </div>

      <motion.button
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        type="submit"
        disabled={disabled || !message.trim()}
        className={`px-8 py-4 rounded-2xl font-semibold shadow-lg transition-all duration-300 ${
          disabled || !message.trim()
            ? theme === "dark"
              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
            : theme === "dark"
            ? "bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-purple-500/25"
            : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-blue-500/25"
        }`}
      >
        {disabled ? (
          <div className="flex items-center space-x-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
            />
            <span>Sending...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <span>Send</span>
            <motion.svg
              whileHover={{ x: 2 }}
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </motion.svg>
          </div>
        )}
      </motion.button>
    </form>
  );
};

export default ChatInput;
