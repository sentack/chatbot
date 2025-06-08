import openai from "./config/open-ai.js";

export async function generateAIResponse(chatHistory) {
  try {
    // Prepare messages for OpenAI API
    const messages = chatHistory.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    const chatCompletion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1",
      messages: messages,
      temperature: 0.7,
      max_tokens: 1500,
    });

    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.error("DEEPSEEK API Error:", error);
    throw new Error("Failed to generate AI response");
  }
}
