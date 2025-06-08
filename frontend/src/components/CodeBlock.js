"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const CodeBlock = ({ language, code, theme }) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy code:", err)
    }
  }

  const getLanguageIcon = (lang) => {
    const icons = {
      javascript: "🟨",
      js: "🟨",
      typescript: "🔷",
      ts: "🔷",
      python: "🐍",
      py: "🐍",
      java: "☕",
      cpp: "⚡",
      c: "⚡",
      html: "🌐",
      css: "🎨",
      sql: "🗄️",
      json: "📋",
      xml: "📄",
      bash: "💻",
      shell: "💻",
      php: "🐘",
      ruby: "💎",
      go: "🐹",
      rust: "🦀",
      swift: "🍎",
      kotlin: "🎯",
      dart: "🎯",
      r: "📊",
      matlab: "📊",
      scala: "⚖️",
      perl: "🐪",
      lua: "🌙",
    }
    return icons[lang.toLowerCase()] || "📝"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl overflow-hidden shadow-lg ${
        theme === "dark" ? "bg-gray-900/90 border border-gray-700/50" : "bg-gray-50 border border-gray-200"
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between px-4 py-3 border-b ${
          theme === "dark" ? "bg-gray-800/50 border-gray-700/50" : "bg-gray-100 border-gray-200"
        }`}
      >
        <div className="flex items-center space-x-2">
          <span className="text-lg">{getLanguageIcon(language)}</span>
          <span className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            {language.toUpperCase()}
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={copyToClipboard}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            copied
              ? theme === "dark"
                ? "bg-green-600 text-white"
                : "bg-green-500 text-white"
              : theme === "dark"
                ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                : "bg-gray-200 hover:bg-gray-300 text-gray-600"
          }`}
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span>Copy</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Code Content */}
      <div className="p-4 overflow-x-auto">
        <pre className={`text-sm leading-relaxed ${theme === "dark" ? "text-gray-100" : "text-gray-800"}`}>
          <code>{code}</code>
        </pre>
      </div>
    </motion.div>
  )
}

export default CodeBlock
