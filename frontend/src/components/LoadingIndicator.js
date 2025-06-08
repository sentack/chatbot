"use client";
import { motion } from "framer-motion";

const LoadingIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start"
    >
      <div className="flex items-start space-x-3 max-w-xs lg:max-w-md">
        {/* AI Avatar */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center text-white text-sm font-medium">
          🤖
        </div>

        {/* Loading Bubble */}
        <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
          <div className="flex space-x-1">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 0.6,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0,
              }}
              className="w-2 h-2 bg-gray-400 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 0.6,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0.2,
              }}
              className="w-2 h-2 bg-gray-400 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 0.6,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0.4,
              }}
              className="w-2 h-2 bg-gray-400 rounded-full"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingIndicator;
