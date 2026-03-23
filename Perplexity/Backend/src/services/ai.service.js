import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
});

const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

export async function generateResponse(messages) {
  const mapped = messages
    .filter(msg => msg != null)
    .map(msg => {
      const role = msg.role?.toLowerCase();
      if (role === "user" || role === "human")              return new HumanMessage(msg.content);
      if (role === "ai" || role === "assistant" || role === "model") return new AIMessage(msg.content);
      if (role === "system")                                return new SystemMessage(msg.content);
      return null;
    })
    .filter(Boolean); // remove nulls from unrecognized roles

  const response = await geminiModel.invoke(mapped); // ✅ map first, then invoke
  return response.content;
}

export async function generateChatTitle(message) {
  const response = await mistralModel.invoke([
    new SystemMessage(`
      You are a helpful assistant that generates concise and descriptive titles for chat conversations.
      User will provide you with the first message of a chat conversation, and you will generate a 
      title that captures the essence of the conversation in 2-4 words.
    `),
    new HumanMessage(`
      Generate a title for a chat conversation based on the following first message:
      "${message}"
    `),
  ]);

  return response.content;
}
