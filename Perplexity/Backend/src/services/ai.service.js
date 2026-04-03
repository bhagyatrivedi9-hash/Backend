import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";
import { tool } from "@langchain/core/tools";
import * as z from "zod";
import { searchInternet } from "./internet.service.js";

const model = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY,
});

const searchInternetTool = tool(searchInternet, {
    name: "searchInternet",
    description: "Use this tool to get the latest information from the internet.",
    schema: z.object({
        query: z.string().describe("The search query to look up on the internet."),
    }),
});

const modelWithTools = model.bindTools([searchInternetTool]);

export async function* generateResponseStream(messages) {
    const formattedMessages = [
        new SystemMessage(`
            You are a helpful and precise assistant for answering questions.
            If you don't know the answer, say you don't know.
            If the question requires up-to-date information, use the "searchInternet" tool.
        `),
        ...messages
            .map((msg) => {
                if (!msg?.content) return null;
                if (msg.role === "user") return new HumanMessage(msg.content);
                if (msg.role === "ai") return new AIMessage(msg.content);
                return null;
            })
            .filter(Boolean),
    ];

    while (true) {
        let fullContent = "";
        let toolCalls = {};

        
        const stream = await modelWithTools.stream(formattedMessages);

        for await (const chunk of stream) {
         
            const text = typeof chunk.content === "string"
                ? chunk.content
                : Array.isArray(chunk.content)
                    ? chunk.content.map(c => c?.text || "").join("")
                    : "";

            if (text) {
                fullContent += text;
                yield text; 
            }

       
            if (chunk.tool_call_chunks) {
                for (const tc of chunk.tool_call_chunks) {
                    if (!toolCalls[tc.index]) {
                        toolCalls[tc.index] = { id: tc.id, name: tc.name, args: "" };
                    }
                    if (tc.args) toolCalls[tc.index].args += tc.args;
                }
            }
        }

        const toolCallList = Object.values(toolCalls);

        // No tool calls — we're done
        if (toolCallList.length === 0) break;

        formattedMessages.push(
            new AIMessage({
                content: fullContent,
                tool_calls: toolCallList.map(tc => ({
                    id: tc.id,
                    name: tc.name,
                    args: JSON.parse(tc.args || "{}"),
                })),
            })
        );

        for (const tc of toolCallList) {
            console.log("Calling tool:", tc.name, "with args:", tc.args);
            let toolResult = "";
            try {
                toolResult = await searchInternetTool.invoke(JSON.parse(tc.args || "{}"));
            } catch (err) {
                toolResult = "Tool call failed: " + err.message;
            }

            formattedMessages.push({
                role: "tool",
                tool_call_id: tc.id,
                content: typeof toolResult === "string"
                    ? toolResult
                    : JSON.stringify(toolResult),
            });
        }
      
    }
}

export async function generateChatTitle(message) {
  const response = await model.invoke([
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
