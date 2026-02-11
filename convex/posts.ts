import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// All uploaded posts
export const getAllPosts = query({
  handler: async (ctx) => {
    return await ctx.db.query("posts").order("desc").collect();
  },
});

// All uploaded posts for a specific user
export const getAllPostsForUser = query({
  args: {
    authorId: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("posts")
      .withIndex("byAuthor", (q) => q.eq("authorId", args.authorId))
      .order("desc")
      .collect();
  },
});

// Fetching Post by ID
export const getPostById = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.postId);
  },
});

export const createPost = mutation({
  args: {
    content: v.string(),
    attachments: v.optional(v.array(v.string())),
    authorId: v.id("users"),
    replyTo: v.optional(v.id("posts")),
  },
  handler: async (ctx, args) => {
    const postId = await ctx.db.insert("posts", {
      content: args.content,
      attachments: args.attachments,
      authorId: args.authorId,
      replyTo: args.replyTo,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      edited: false,
    });
    return postId;
  },
});

// Example pattern
export const deletePost = mutation({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const post = await ctx.db.get(args.postId);
    if (!post) throw new Error("Post not found");

    // Verify ownership
    const user = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", (q) => q.eq("clerkUserId", identity.subject))
      .unique();

    if (post.authorId !== user?._id) {
      throw new Error("Not authorized to delete this post");
    }

    await ctx.db.delete(args.postId);
  },
});

export const updatePost = mutation({
  args: {
    postId: v.id("posts"),
    content: v.optional(v.string()),
    attachments: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const { postId, ...updates } = args;

    const post = await ctx.db.get(postId);
    if (!post) {
      throw new Error("Post not found");
    }

    // Perform authorization checks here

    await ctx.db.patch(postId, updates);
    return { success: true };
  },
});

// Get post with related data
export const getPostWithDetails = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.postId);
    if (!post) return null;

    const [author, likesCount, commentsCount] = await Promise.all([
      ctx.db.get(post.authorId),
      ctx.db
        .query("likes")
        .withIndex("byPost", (q) => q.eq("post", args.postId))
        .collect()
        .then((likes) => likes.length),
      ctx.db
        .query("comments")
        .withIndex("byPost", (q) => q.eq("post", args.postId))
        .collect()
        .then((comments) => comments.length),
    ]);

    return {
      ...post,
      author,
      likesCount,
      commentsCount,
    };
  },
});
