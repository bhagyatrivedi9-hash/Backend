import "dotenv/config";
import { tavily } from "@tavily/core";
import { tool } from "@langchain/core/tools";
import { z } from "zod";

const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

export const tailvySearchTool = tool(
  async ({ query }) => {                          // ✅ destructure correctly
    try {
      const response = await tvly.search(query);  // ✅ pass plain string
      if (response.results?.length > 0) {
        return response.results
          .map((r) => `Title: ${r.title}\nContent: ${r.content}\nURL: ${r.url}`)
          .join("\n\n");
      }
      return "No results found.";
    } catch (error) {
      return `Error searching: ${error.message}`;
    }
  },
  {
    name: "tailvySearch",
    description:
      "Search the web using Tavily. Use this to find current information about recent events, people, places, and topics.",
    schema: z.object({
      query: z.string().describe("The search query"),  // ✅ renamed from 'input'
    }),
  }
);