"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import LoadingIndicator from "./components/LoadingIndicator";

function App() {
  const [chatHistory1, setChatHistory1] = useState([]);
  const [chatHistory2, setChatHistory2] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatContainerRef = useRef(null);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            AI Chat Assistant
          </h1>
          <p className="text-gray-600">
            Powered by OpenAI • Built with React & Express
          </p>
        </motion.div>

        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 text-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-medium">Online</span>
              </div>
              <div className="flex space-x-2">
                {chatHistory2.length > 0 && (
                  <button
                    onClick={restoreChat}
                    className="px-3 py-1 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-sm"
                  >
                    Restore
                  </button>
                )}
                <button
                  onClick={clearChat}
                  className="px-3 py-1 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-sm"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div
            ref={chatContainerRef}
            className="h-96 overflow-y-auto p-6 space-y-4 bg-gray-50/50"
          >
            <AnimatePresence>
              {chatHistory1.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-gray-500 mt-20"
                >
                  <div className="text-6xl mb-4">💬</div>
                  <p className="text-lg">Start a conversation with AI</p>
                  <p className="text-sm mt-2">
                    Type your message below to begin
                  </p>
                </motion.div>
              ) : (
                chatHistory1.map((message, index) => (
                  <ChatMessage key={index} message={message} index={index} />
                ))
              )}
            </AnimatePresence>

            {/* Loading Indicator */}
            {isLoading && <LoadingIndicator />}

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700"
              >
                {error}
              </motion.div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-6 bg-white">
            <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 text-gray-500 text-sm"
        >
          <p>
            Messages: {chatHistory1.length} • Backup: {chatHistory2.length}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
