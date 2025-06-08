"use client";

import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const Sidebar = ({
  isOpen,
  onClose,
  theme,
  toggleTheme,
  onNewChat,
  onClearChat,
  onRestoreChat,
  onShowAbout,
  chatHistory1,
  chatHistory2,
}) => {
  const menuItems = [
    {
      icon: "💬",
      label: "New Chat",
      action: onNewChat,
      description: "Start a fresh conversation",
    },
    {
      icon: "🗑️",
      label: "Clear Chat",
      action: onClearChat,
      description: "Clear current messages",
      disabled: chatHistory1.length === 0,
    },
    {
      icon: "🔄",
      label: "Restore Chat",
      action: onRestoreChat,
      description: "Restore previous session",
      disabled: chatHistory2.length === 0,
    },
    {
      icon: "ℹ️",
      label: "About",
      action: onShowAbout,
      description: "Learn about the application and it's features",
    },
  ];

  return (
    <>
      <motion.div
        initial={{ x: -320 }}
        animate={{ x: isOpen ? 0 : -320 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`fixed left-0 top-0 h-full w-80 z-50 ${
          theme === "dark" ? "bg-gray-900/95" : "bg-white/95"
        } backdrop-blur-xl border-r ${
          theme === "dark" ? "border-gray-700/50" : "border-gray-200/50"
        } shadow-2xl`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <h2
              className={`text-xl font-bold ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
            >
              Navigation
            </h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className={`p-2 rounded-lg ${
                theme === "dark"
                  ? "hover:bg-gray-800 text-gray-400"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <span
              className={`text-sm ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Theme
            </span>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-6 space-y-2">
          {menuItems.map((item, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: item.disabled ? 1 : 1.02 }}
              whileTap={{ scale: item.disabled ? 1 : 0.98 }}
              onClick={item.disabled ? undefined : item.action}
              disabled={item.disabled}
              className={`w-full p-4 rounded-xl text-left transition-all ${
                item.disabled
                  ? theme === "dark"
                    ? "bg-gray-800/30 text-gray-600 cursor-not-allowed"
                    : "bg-gray-100/30 text-gray-400 cursor-not-allowed"
                  : theme === "dark"
                  ? "bg-gray-800/50 hover:bg-gray-700/50 text-gray-200"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-700"
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="font-medium">{item.label}</div>
                  <div
                    className={`text-xs ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {item.description}
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Stats */}
        <div className="p-6 border-t border-gray-700/50 mt-auto">
          <h3
            className={`text-sm font-medium mb-3 ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Session Stats
          </h3>
          <div className="space-y-2">
            <div
              className={`flex justify-between text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <span>Current Messages:</span>
              <span className="font-medium">{chatHistory1.length}</span>
            </div>
            <div
              className={`flex justify-between text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <span>Backup Messages:</span>
              <span className="font-medium">{chatHistory2.length}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700/50">
          <div className="text-center space-y-3">
            {/* Creator Info */}
            <div className="flex items-center justify-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 flex items-center justify-center text-xs font-bold text-white">
                ST
              </div>
              <div className="text-left">
                <div
                  className={`text-sm font-medium ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  Sena Takele
                </div>
                <div
                  className={`text-xs ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Sentack
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="flex justify-center space-x-3">
              <motion.a
                href="https://github.com/sentack"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-lg transition-colors ${
                  theme === "dark"
                    ? "hover:bg-gray-700 text-gray-400"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
                title="GitHub"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </motion.a>

              <motion.a
                href="https://sentack-portfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-lg transition-colors ${
                  theme === "dark"
                    ? "hover:bg-purple-600 text-purple-400"
                    : "hover:bg-purple-100 text-purple-600"
                }`}
                title="Portfolio"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                  />
                </svg>
              </motion.a>
            </div>

            {/* Made with love */}
            <motion.a
              href="https://sentack-portfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              className={`inline-flex items-center space-x-1 text-xs transition-colors ${
                theme === "dark"
                  ? "text-gray-400 hover:text-purple-400"
                  : "text-gray-500 hover:text-purple-600"
              }`}
            >
              <span>Made with</span>
              <span className="text-red-500">❤️</span>
              <span>and</span>
              <span className="text-amber-600">☕</span>
              <span>by</span>
              <span className="font-semibold">SENTACK</span>
            </motion.a>

            <div
              className={`text-xs ${
                theme === "dark" ? "text-gray-500" : "text-gray-400"
              }`}
            >
              DeepSeek-R1 Chat Assistant
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
