import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

let geminiModel;
let mistralModel;

const getGeminiModel = () => {
  if (!geminiModel) {
    geminiModel = new ChatGoogleGenerativeAI({
      model: "gemini-1.5-flash",
      apiKey: process.env.GEMINI_API_KEY,
    });
  }
  return geminiModel;
};

const getMistralModel = () => {
  if (!mistralModel) {
    mistralModel = new ChatMistralAI({
      model: "mistral-small-latest",
      apiKey: process.env.MISTRAL_API_KEY,
    });
  }
  return mistralModel;
};

export const generateResponse = async (messages) => {
  try {
    const response = await getGeminiModel().invoke([new HumanMessage(messages)]);
    return response.content;
  } catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
};

export const generateChatTitle = async (message) => {
  try {
    const response = await getMistralModel().invoke([
      new SystemMessage(`
        You are a helpful assistant that generates concise and descriptive titles for chat conversations.
        User will provide you with the first message of a chat conversation, and you will generate a 
        title that captures the essence of the conversation in 2-4 words. The title should be clear, 
        relevant, and engaging, giving users a quick understanding of the chat's topic.
      `),
      new HumanMessage(`
        Generate a title for a chat conversation based on the following first message:
        "${message}"
      `),
    ]);
    return response.content;
  } catch (error) {
    console.error("Error generating chat title:", error);
    throw error;
  }
};