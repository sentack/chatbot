"use client";

import { motion } from "framer-motion";
import CodeBlock from "./CodeBlock";

const ChatMessage = ({ message, index, theme }) => {
  const isUser = message.role === "user";

  // Function to parse message content and extract code blocks
  const parseMessageContent = (content) => {
    const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        const textBefore = content.slice(lastIndex, match.index);
        if (textBefore.trim()) {
          parts.push({ type: "text", content: textBefore });
        }
      }

      // Add code block
      const language = match[1] || "text";
      const code = match[2].trim();
      parts.push({ type: "code", language, content: code });

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < content.length) {
      const remainingText = content.slice(lastIndex);
      if (remainingText.trim()) {
        parts.push({ type: "text", content: remainingText });
      }
    }

    return parts.length > 0 ? parts : [{ type: "text", content }];
  };

  const messageParts = parseMessageContent(message.content);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex items-start space-x-4 max-w-xs lg:max-w-4xl ${
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
          {isUser ? "👤" : "🧠"}
        </motion.div>

        {/* Message Content */}
        <div className="space-y-3">
          {messageParts.map((part, partIndex) => (
            <div key={partIndex}>
              {part.type === "text" ? (
                <motion.div
                  whileHover={{ scale: 1.01 }}
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
                    {part.content}
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
              ) : (
                <CodeBlock
                  language={part.language}
                  code={part.content}
                  theme={theme}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
