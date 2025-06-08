import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { generateAIResponse } from "./ai.js";

const port = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API endpoint to handle chat responses
app.post("/api/respond", async (req, res) => {
  try {
    const { chatHistory } = req.body;

    if (!chatHistory || !Array.isArray(chatHistory)) {
      return res.status(400).json({ error: "Invalid chat history format" });
    }

    if (chatHistory.length === 0) {
      return res.status(400).json({ error: "Chat history is empty" });
    }

    // Get the last message (should be from user)
    const lastMessage = chatHistory[chatHistory.length - 1];

    if (lastMessage.role !== "user") {
      return res.status(400).json({ error: "Last message must be from user" });
    }

    // Generate AI response
    const aiResponse = await generateAIResponse(chatHistory);

    // Create updated chat history with AI response
    const updatedChatHistory = [
      ...chatHistory,
      {
        role: "assistant",
        content: aiResponse,
      },
    ];

    res.json({ chatHistory: updatedChatHistory });
  } catch (error) {
    console.error("Error generating AI response:", error);
    res.status(500).json({ error: "Failed to generate AI response" });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
