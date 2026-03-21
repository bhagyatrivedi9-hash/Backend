import "dotenv/config";
import readline from "readline/promises";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, AIMessage, ToolMessage } from "@langchain/core/messages";
import { tailvySearchTool } from "./tailvy.js";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const model = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.API_KEY,
});

const tools = [tailvySearchTool];
const modelWithTools = model.bindTools(tools);
const toolMap = { tailvySearch: tailvySearchTool };

// ✅ Persist history across turns
const conversationHistory = [];

async function chat(userInput) {
  conversationHistory.push(new HumanMessage(userInput));

  // ✅ Agentic loop — keeps running until model stops calling tools
  while (true) {
    const response = await modelWithTools.invoke(conversationHistory);
    conversationHistory.push(new AIMessage(response));  // ✅ store AI turn
  
    // No tool calls → final answer, break out
    if (!response.tool_calls || response.tool_calls.length === 0) {
      console.log("\nAssistant:", response.content, "\n");
      break;
    }

    // ✅ Execute each tool call and push results back into history
    for (const toolCall of response.tool_calls) {
      console.log(`\n🔍 Searching for: "${toolCall.args.query}"...`);
      const result = await toolMap[toolCall.name].invoke(toolCall.args);
       
      conversationHistory.push(
        new ToolMessage({
          tool_call_id: toolCall.id,
          content: result,
        })
      );
    }
    // Loop again — model will now read the search results and respond
  }
}

async function main() {
  console.log('Chat with Tavily Search (type "exit" to quit)\n');
  while (true) {
    const input = await rl.question("You: ");
    if (input.toLowerCase() === "exit") { rl.close(); break; }
    await chat(input);
  }
}

main();