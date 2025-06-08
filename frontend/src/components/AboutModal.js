"use client";

import { motion, AnimatePresence } from "framer-motion";

const AboutModal = ({ isOpen, onClose, theme }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className={`max-w-3xl w-full h-[85vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            {/* Fixed Header */}
            <div
              className={`flex-shrink-0 p-6 ${
                theme === "dark"
                  ? "bg-gradient-to-r from-purple-600 to-violet-600"
                  : "bg-gradient-to-r from-blue-500 to-purple-600"
              } text-white`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-4xl">💬</div>
                  <div>
                    <h2 className="text-2xl font-bold">About the Chatbot</h2>
                    <p className="text-blue-100">
                      DeepSeek-R1 Powered Chat Application
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {/* Application Overview */}
              <div>
                <h3
                  className={`text-lg font-semibold mb-3 ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  🚀 What is this Chatbot?
                </h3>
                <div
                  className={`p-4 rounded-xl ${
                    theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"
                  }`}
                >
                  <p
                    className={`text-sm mb-3 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    This is a modern, AI-powered chat application built
                    specifically to showcase the capabilities of the DeepSeek-R1
                    reasoning model. It provides an intuitive interface for
                    users to interact with advanced AI technology through
                    natural conversation.
                  </p>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    The application focuses on delivering a seamless chat
                    experience with beautiful design, smooth animations, and
                    powerful features like code syntax highlighting, chat
                    history management, and responsive design.
                  </p>
                </div>
              </div>

              {/* Key Features */}
              <div>
                <h3
                  className={`text-lg font-semibold mb-3 ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  ✨ Key Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: "🌙",
                      title: "Dark/Light Mode",
                      desc: "Seamless theme switching with system preference detection and smooth transitions",
                    },
                    {
                      icon: "💬",
                      title: "Real-time Chat",
                      desc: "Instant messaging with beautiful animations and responsive design",
                    },
                    {
                      icon: "📋",
                      title: "Code Highlighting",
                      desc: "Automatic code detection with syntax highlighting and one-click copy functionality",
                    },
                    {
                      icon: "💾",
                      title: "Chat Management",
                      desc: "Save, restore, and manage multiple chat sessions with backup functionality",
                    },
                    {
                      icon: "🎨",
                      title: "Beautiful UI",
                      desc: "Modern design with smooth animations, gradients, and glass morphism effects",
                    },
                    {
                      icon: "📱",
                      title: "Responsive Design",
                      desc: "Works perfectly on desktop, tablet, and mobile devices with adaptive layouts",
                    },
                    {
                      icon: "🔧",
                      title: "Sidebar Navigation",
                      desc: "Easy access to all features through an elegant collapsible sidebar",
                    },
                    {
                      icon: "⚡",
                      title: "Fast Performance",
                      desc: "Optimized for speed with efficient state management and smooth interactions",
                    },
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-xl ${
                        theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl">{feature.icon}</span>
                        <div>
                          <h4
                            className={`font-medium ${
                              theme === "dark" ? "text-white" : "text-gray-800"
                            }`}
                          >
                            {feature.title}
                          </h4>
                          <p
                            className={`text-sm ${
                              theme === "dark"
                                ? "text-gray-300"
                                : "text-gray-600"
                            }`}
                          >
                            {feature.desc}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* AI Model Information */}
              <div>
                <h3
                  className={`text-lg font-semibold mb-3 ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  🧠 Powered by DeepSeek-R1
                </h3>
                <div
                  className={`p-4 rounded-xl ${
                    theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {[
                      {
                        icon: "🧮",
                        title: "Advanced Reasoning",
                        desc: "Complex problem-solving and logical thinking capabilities",
                      },
                      {
                        icon: "💻",
                        title: "Code Generation",
                        desc: "Multi-language programming assistance and debugging",
                      },
                      {
                        icon: "📊",
                        title: "Data Analysis",
                        desc: "Statistical analysis, insights, and data interpretation",
                      },
                      {
                        icon: "🔬",
                        title: "Research",
                        desc: "In-depth research, fact-checking, and knowledge synthesis",
                      },
                    ].map((capability, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <span className="text-xl">{capability.icon}</span>
                        <div>
                          <h4
                            className={`font-medium text-sm ${
                              theme === "dark" ? "text-white" : "text-gray-800"
                            }`}
                          >
                            {capability.title}
                          </h4>
                          <p
                            className={`text-xs ${
                              theme === "dark"
                                ? "text-gray-300"
                                : "text-gray-600"
                            }`}
                          >
                            {capability.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm border-t pt-4 border-gray-300 dark:border-gray-600">
                    <div>
                      <span
                        className={`font-medium ${
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Model:
                      </span>
                      <span
                        className={`ml-2 ${
                          theme === "dark" ? "text-white" : "text-gray-800"
                        }`}
                      >
                        DeepSeek-R1
                      </span>
                    </div>
                    <div>
                      <span
                        className={`font-medium ${
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Type:
                      </span>
                      <span
                        className={`ml-2 ${
                          theme === "dark" ? "text-white" : "text-gray-800"
                        }`}
                      >
                        Reasoning Model
                      </span>
                    </div>
                    <div>
                      <span
                        className={`font-medium ${
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Context:
                      </span>
                      <span
                        className={`ml-2 ${
                          theme === "dark" ? "text-white" : "text-gray-800"
                        }`}
                      >
                        128K tokens
                      </span>
                    </div>
                    <div>
                      <span
                        className={`font-medium ${
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Languages:
                      </span>
                      <span
                        className={`ml-2 ${
                          theme === "dark" ? "text-white" : "text-gray-800"
                        }`}
                      >
                        Multi-lingual
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Stack */}
              <div>
                <h3
                  className={`text-lg font-semibold mb-3 ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  🛠️ Technical Stack
                </h3>
                <div
                  className={`p-4 rounded-xl ${
                    theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4
                        className={`font-medium mb-2 ${
                          theme === "dark" ? "text-white" : "text-gray-800"
                        }`}
                      >
                        Frontend
                      </h4>
                      <ul
                        className={`text-sm space-y-1 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        <li>• React.js</li>
                        <li>• TailwindCSS</li>
                        <li>• Framer Motion</li>
                        <li>• Custom Hooks</li>
                      </ul>
                    </div>
                    <div>
                      <h4
                        className={`font-medium mb-2 ${
                          theme === "dark" ? "text-white" : "text-gray-800"
                        }`}
                      >
                        Backend
                      </h4>
                      <ul
                        className={`text-sm space-y-1 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        <li>• Express.js</li>
                        <li>• Node.js</li>
                        <li>• RESTful API</li>
                        <li>• CORS Support</li>
                      </ul>
                    </div>
                    <div>
                      <h4
                        className={`font-medium mb-2 ${
                          theme === "dark" ? "text-white" : "text-gray-800"
                        }`}
                      >
                        AI Integration
                      </h4>
                      <ul
                        className={`text-sm space-y-1 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        <li>• DeepSeek-R1 API</li>
                        <li>• Chat History Management</li>
                        <li>• Real-time Processing</li>
                        <li>• Error Handling</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Creator Section */}
              <div>
                <h3
                  className={`text-lg font-semibold mb-3 ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  👨‍💻 About the Creator
                </h3>
                <div
                  className={`p-4 rounded-xl ${
                    theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 flex items-center justify-center text-2xl font-bold text-white">
                      ST
                    </div>
                    <div>
                      <h4
                        className={`text-lg font-bold ${
                          theme === "dark" ? "text-white" : "text-gray-800"
                        }`}
                      >
                        Sena Takele
                      </h4>
                      <p
                        className={`text-sm ${
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        <span className="font-medium text-purple-500">
                          Sentack
                        </span>
                      </p>
                      <p
                        className={`text-xs ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Full-Stack Developer & AI Enthusiast
                      </p>
                    </div>
                  </div>

                  <p
                    className={`text-sm mb-4 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Passionate about creating innovative AI-powered applications
                    and beautiful user experiences. This chatbot represents a
                    perfect blend of modern web technologies and cutting-edge AI
                    capabilities, designed to provide users with an exceptional
                    conversational AI experience.
                  </p>

                  <div className="flex space-x-3">
                    <motion.a
                      href="https://github.com/sentack"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        theme === "dark"
                          ? "bg-gray-600 hover:bg-gray-500 text-white"
                          : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      <span className="text-sm font-medium">GitHub</span>
                    </motion.a>

                    <motion.a
                      href="https://sentack-portfolio.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        theme === "dark"
                          ? "bg-purple-600 hover:bg-purple-500 text-white"
                          : "bg-purple-500 hover:bg-purple-600 text-white"
                      }`}
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
                      <span className="text-sm font-medium">Portfolio</span>
                    </motion.a>
                  </div>
                </div>
              </div>

              {/* How to Use */}
              <div>
                <h3
                  className={`text-lg font-semibold mb-3 ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  📖 How to Use
                </h3>
                <div
                  className={`p-4 rounded-xl ${
                    theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"
                  }`}
                >
                  <div className="space-y-3">
                    {[
                      "💬 Type your message in the input field and press Enter or click Send",
                      "🌙 Toggle between dark and light modes using the theme switcher",
                      "📋 Copy code blocks by clicking the copy button in code containers",
                      "💾 Use the sidebar to manage chat history, create new chats, or restore previous sessions",
                      "📱 The interface is fully responsive and works on all devices",
                      "⚡ Enjoy smooth animations and real-time responses from DeepSeek-R1",
                    ].map((instruction, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`text-sm ${
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {instruction}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div
                className={`text-center text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                } pb-4`}
              >
                <motion.a
                  href="https://sentack-portfolio.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center space-x-1 hover:text-purple-500 transition-colors"
                >
                  <span>Made with</span>
                  <span className="text-red-500">❤️</span>
                  <span>and</span>
                  <span className="text-amber-600">☕</span>
                  <span>by</span>
                  <span className="font-semibold text-purple-500">SENTACK</span>
                </motion.a>
                <br />
                <span className="text-xs">
                  Version 2.0 • Built with React, Express.js, and TailwindCSS
                </span>
                <br />
                <span className="text-xs">Powered by DeepSeek-R1 AI Model</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AboutModal;
