import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// All comments for a specific post
export const getComments = query({
  args: {
    postId: v.id("post"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("comments")
      .withIndex("byPost", (q) => q.eq("post", args.postId))
      .order("desc")
      .collect();
  },
});

// All comments for a specific user
export const getCommentsForUser = query({
  args: {
    authorId: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("comments")
      .withIndex("byAuthor", (q) => q.eq("author", args.authorId))
      .order("desc")
      .collect();
  },
});

// Fetching Post by ID
export const getCommentForPost = query({
  args: { postId: v.id("post") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.postId);
  },
});

export const createComment = mutation({
  args: {
    post: v.id("post"),
    author: v.id("users"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const commentId = await ctx.db.insert("comments", {
      post: args.post,
      author: args.author,
      content: args.content,
    });
    return commentId;
  },
});

export const deleteComment = mutation({
  args: {
    commentId: v.id("comments"),
  },
  handler: async (ctx, args) => {
    const comment = await ctx.db.get(args.commentId);
    if (!comment) {
      throw new Error("Comment not found");
    }
    // Perform any authorization checks here if needed (e.g., check if ctx.auth.getUser() matches comment.author)

    await ctx.db.delete(args.commentId);
    return { success: true };
  },
});
