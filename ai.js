import openai from "./config/open-ai.js";
import { translate } from "@vitalets/google-translate-api";
import { chatHistory, chatHistory2 } from "./server.js";

async function main(question) {
  const { text } = await translate(question, { to: "en" });
  const userInput = text;

  try {
    const messages = chatHistory.map(([role, content]) => ({ role, content }));

    messages.push({ role: "user", content: userInput });

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    const completionText = chatCompletion.choices[0].message.content;

    chatHistory.push(["user", userInput]);
    chatHistory.push(["assistant", completionText]);

    //printout
    chatHistory2.push(["user", question]);
    chatHistory2.push(["assistant", completionText]);
  } catch (error) {
    console.log(error);
  }
}

export default main;
