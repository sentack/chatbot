"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import LoadingIndicator from "./components/LoadingIndicator";
import ThemeToggle from "./components/ThemeToggle";
import { useTheme } from "./hooks/useTheme";

function App() {
  const [chatHistory1, setChatHistory1] = useState([]);
  const [chatHistory2, setChatHistory2] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatContainerRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory1]);

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    // Add user message to chat history
    const userMessage = { role: "user", content: message.trim() };
    const updatedHistory = [...chatHistory1, userMessage];
    setChatHistory1(updatedHistory);
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/respond", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatHistory: updatedHistory }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setChatHistory1(data.chatHistory);
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setChatHistory2([...chatHistory1]); // Backup current chat
    setChatHistory1([]);
    setError(null);
  };

  const restoreChat = () => {
    if (chatHistory2.length > 0) {
      setChatHistory1([...chatHistory2]);
      setChatHistory2([]);
    }
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900"
          : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
      }`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-20 blur-3xl animate-pulse ${
            theme === "dark" ? "bg-purple-500" : "bg-blue-300"
          }`}
        ></div>
        <div
          className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl animate-pulse delay-1000 ${
            theme === "dark" ? "bg-violet-500" : "bg-purple-300"
          }`}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <div></div>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>

          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <h1
              className={`text-5xl md:text-6xl font-bold mb-4 ${
                theme === "dark"
                  ? "bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400 bg-clip-text text-transparent"
                  : "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
              }`}
            >
              AI Chat Assistant
            </h1>
            <div
              className={`absolute -top-2 -right-2 w-4 h-4 rounded-full animate-ping ${
                theme === "dark" ? "bg-purple-400" : "bg-blue-500"
              }`}
            ></div>
          </motion.div>

          <p
            className={`text-lg ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Powered by OpenAI • Built with React & Express
          </p>
          <div className="flex justify-center items-center space-x-4 mt-4">
            <div
              className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                theme === "dark"
                  ? "bg-gray-800/50 text-gray-300"
                  : "bg-white/50 text-gray-600"
              } backdrop-blur-sm`}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">AI Online</span>
            </div>
          </div>
        </motion.div>

        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`rounded-3xl shadow-2xl border overflow-hidden backdrop-blur-sm ${
            theme === "dark"
              ? "bg-gray-800/80 border-gray-700/50"
              : "bg-white/80 border-gray-200/50"
          }`}
        >
          {/* Chat Header */}
          <div
            className={`px-6 py-5 ${
              theme === "dark"
                ? "bg-gradient-to-r from-purple-600 to-violet-600"
                : "bg-gradient-to-r from-blue-500 to-purple-600"
            } text-white relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-4 h-4 bg-green-400 rounded-full animate-ping opacity-75"></div>
                </div>
                <div>
                  <span className="font-semibold text-lg">Chat Session</span>
                  <p className="text-xs opacity-80">Ready to assist you</p>
                </div>
              </div>
              <div className="flex space-x-2">
                {chatHistory2.length > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={restoreChat}
                    className="px-4 py-2 bg-white/20 rounded-xl hover:bg-white/30 transition-all text-sm font-medium backdrop-blur-sm"
                  >
                    🔄 Restore
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearChat}
                  className="px-4 py-2 bg-white/20 rounded-xl hover:bg-white/30 transition-all text-sm font-medium backdrop-blur-sm"
                >
                  🗑️ Clear
                </motion.button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div
            ref={chatContainerRef}
            className={`h-[500px] overflow-y-auto p-6 space-y-6 ${
              theme === "dark" ? "bg-gray-900/50" : "bg-gray-50/50"
            } custom-scrollbar`}
          >
            <AnimatePresence>
              {chatHistory1.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mt-32"
                >
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 3,
                    }}
                    className="text-8xl mb-6"
                  >
                    💬
                  </motion.div>
                  <h3
                    className={`text-2xl font-bold mb-2 ${
                      theme === "dark" ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Start Your Conversation
                  </h3>
                  <p
                    className={`text-lg mb-4 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Ask me anything! I'm here to help.
                  </p>
                  <div className="flex justify-center space-x-4 text-sm">
                    {["💡 Get ideas", "🔍 Ask questions", "✨ Be creative"].map(
                      (suggestion, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.2 }}
                          className={`px-4 py-2 rounded-full ${
                            theme === "dark"
                              ? "bg-gray-800 text-gray-300"
                              : "bg-white text-gray-600"
                          } shadow-sm`}
                        >
                          {suggestion}
                        </motion.div>
                      )
                    )}
                  </div>
                </motion.div>
              ) : (
                chatHistory1.map((message, index) => (
                  <ChatMessage
                    key={index}
                    message={message}
                    index={index}
                    theme={theme}
                  />
                ))
              )}
            </AnimatePresence>

            {/* Loading Indicator */}
            {isLoading && <LoadingIndicator theme={theme} />}

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-xl p-4 border ${
                  theme === "dark"
                    ? "bg-red-900/50 border-red-700/50 text-red-300"
                    : "bg-red-50 border-red-200 text-red-700"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xl">⚠️</span>
                  <span>{error}</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input Area */}
          <div
            className={`border-t p-6 ${
              theme === "dark"
                ? "border-gray-700 bg-gray-800/50"
                : "border-gray-200 bg-white/50"
            } backdrop-blur-sm`}
          >
            <ChatInput
              onSendMessage={handleSendMessage}
              disabled={isLoading}
              theme={theme}
            />
          </div>
        </motion.div>

        {/* Footer Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <div className="flex justify-center space-x-8">
            <div
              className={`px-4 py-2 rounded-full ${
                theme === "dark"
                  ? "bg-gray-800/50 text-gray-300"
                  : "bg-white/50 text-gray-600"
              } backdrop-blur-sm`}
            >
              <span className="text-sm">
                💬 Messages: {chatHistory1.length}
              </span>
            </div>
            <div
              className={`px-4 py-2 rounded-full ${
                theme === "dark"
                  ? "bg-gray-800/50 text-gray-300"
                  : "bg-white/50 text-gray-600"
              } backdrop-blur-sm`}
            >
              <span className="text-sm">💾 Backup: {chatHistory2.length}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
