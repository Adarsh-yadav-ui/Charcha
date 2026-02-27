import { step } from "inngest";
import { inngest } from "./client";
import { createAgent, gemini } from "@inngest/agent-kit";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const generalChatbot = inngest.createFunction(
  { id: "general-chatbot" },
  { event: "chat/message" },
  async ({ event }) => {
    const ask = event.data?.ask;
    const history = event.data?.history ?? [];

    if (!ask || typeof ask !== "string") {
      return { message: "Please provide a message." };
    }

    const agent = createAgent({
      name: "General Assistant",
      system: `
          You are a versatile AI assistant. You can:
          - Chat naturally and answer general knowledge questions
          - Write, debug, and explain code in any programming language (always wrap code in proper markdown code blocks)
          - Discuss weather patterns and climate (note that you don't have real-time data)
          - Help with writing, math, brainstorming, analysis, and more

          Be concise, friendly, and helpful.
          If you don't know something, say so clearly.
      `,
      model: gemini({
        model: "gemini-2.5-flash",
        apiKey: process.env.GEMINI_API_KEY!,
      }),
    });

    try {
      // Build full prompt safely
      const fullPrompt =
        history.length > 0
          ? `
Previous conversation:
${history
  .map((h: { role: string; content: string }) => `${h.role}: ${h.content}`)
  .join("\n")}

User: ${ask}
          `
          : ask;

      const result = await agent.run(fullPrompt);

      const responseText =
        typeof result.output === "string"
          ? result.output
          : Array.isArray(result.output)
            ? result.output[0]
            : ("No response generated." as any);

      await step.run("SaveChatResponseToDB", async () => {
        return await convex.mutation(api.cognition.createChat, {
          ask,
          response: responseText?.content,
        });
      });

      return {
        input: ask,
        output: responseText,
        success: true,
      };
    } catch (error) {
      console.error("AI error:", error);

      return {
        input: ask,
        output: "Something went wrong. Please try again.",
        success: false,
      };
    }
  },
);
