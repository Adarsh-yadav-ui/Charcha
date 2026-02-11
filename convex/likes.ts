import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getLikes = query({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("likes")
      .withIndex("byPost", (q) => q.eq("post", args.postId))
      .collect();
  },
});

export const like = mutation({
  args: {
    post: v.id("posts"),
    author: v.id("users"),
  },
  handler: async (ctx, args) => {
    const likeId = await ctx.db.insert("likes", {
      post: args.post,
      author: args.author,
      createdAt: Date.now(),
    });
    return likeId;
  },
});

export const dislike = mutation({
  args: {
    likeId: v.id("likes"),
  },
  handler: async (ctx, args) => {
    const like = await ctx.db.get(args.likeId);
    if (!like) {
      throw new Error("Like not found");
    }
    // Perform any authorization checks here if needed (e.g., check if ctx.auth.getUser() matches like.author)

    await ctx.db.delete(args.likeId);
    return { success: true };
  },
});
