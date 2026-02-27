import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAllChats = query({
  handler: async (ctx) => {
    return await ctx.db.query("cognition").order("asc").collect();
  },
});

export const createChat = mutation({
  args: {
    ask: v.string(),
    response: v.any(),
  },
  handler: async (ctx, args) => {
    const postId = await ctx.db.insert("cognition", {
      ask: args.ask,
      response: args.response,
      createdAt: Date.now(),
    });
    return postId;
  },
});
