"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import LoadingIndicator from "./components/LoadingIndicator";
import Sidebar from "./components/Sidebar";
import AboutModal from "./components/AboutModal";
import { useTheme } from "./hooks/useTheme";

function App() {
  const [chatHistory1, setChatHistory1] = useState([]);
  const [chatHistory2, setChatHistory2] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
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

  const newChat = () => {
    if (chatHistory1.length > 0) {
      setChatHistory2([...chatHistory1]);
    }
    setChatHistory1([]);
    setError(null);
  };

  return (
    <div
      className={`min-h-screen flex transition-all duration-500 ${
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

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        theme={theme}
        toggleTheme={toggleTheme}
        onNewChat={newChat}
        onClearChat={clearChat}
        onRestoreChat={restoreChat}
        onShowAbout={() => setShowAbout(true)}
        chatHistory1={chatHistory1}
        chatHistory2={chatHistory2}
      />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "ml-80" : "ml-0"
        }`}
      >
        {/* Header */}
        <div className="flex-shrink-0 p-6 pb-0">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`p-3 rounded-xl transition-all ${
                  theme === "dark"
                    ? "bg-gray-800/50 hover:bg-gray-700/50 text-gray-300"
                    : "bg-white/50 hover:bg-white/70 text-gray-600"
                } backdrop-blur-sm shadow-lg`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </motion.button>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-center"
              >
                <h1
                  className={`text-3xl md:text-4xl font-bold ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400 bg-clip-text text-transparent"
                      : "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
                  }`}
                >
                  DeepSeek-R1 Chat
                </h1>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Advanced AI Assistant • Powered by DeepSeek-R1
                </p>
              </motion.div>
            </div>

            <div className="flex items-center space-x-2">
              <div
                className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                  theme === "dark"
                    ? "bg-gray-800/50 text-gray-300"
                    : "bg-white/50 text-gray-600"
                } backdrop-blur-sm shadow-lg`}
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">AI Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 flex flex-col px-6 pb-6 min-h-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex-1 flex flex-col rounded-3xl shadow-2xl border overflow-hidden backdrop-blur-sm ${
              theme === "dark"
                ? "bg-gray-800/80 border-gray-700/50"
                : "bg-white/80 border-gray-200/50"
            }`}
          >
            {/* Messages Area - Scrollable */}
            <div
              ref={chatContainerRef}
              className={`flex-1 overflow-y-auto p-6 space-y-6 ${
                theme === "dark" ? "bg-gray-900/50" : "bg-gray-50/50"
              } custom-scrollbar`}
              style={{ minHeight: "400px" }}
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
                      🧠
                    </motion.div>
                    <h3
                      className={`text-2xl font-bold mb-2 ${
                        theme === "dark" ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Start Your DeepSeek-R1 Conversation
                    </h3>
                    <p
                      className={`text-lg mb-4 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Ask me anything! I'm powered by advanced reasoning
                      capabilities.
                    </p>
                    <div className="flex justify-center space-x-4 text-sm flex-wrap gap-2">
                      {[
                        "💡 Complex reasoning",
                        "🔍 Code analysis",
                        "✨ Creative solutions",
                        "📊 Data insights",
                      ].map((suggestion, index) => (
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
                      ))}
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

            {/* Input Area - Sticky */}
            <div
              className={`flex-shrink-0 border-t p-6 ${
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
        </div>
      </div>

      {/* About Modal */}
      <AboutModal
        isOpen={showAbout}
        onClose={() => setShowAbout(false)}
        theme={theme}
      />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        />
      )}
    </div>
  );
}

export default App;
