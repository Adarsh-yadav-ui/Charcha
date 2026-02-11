import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const followUser = mutation({
  args: {
    follower: v.id("users"),
    following: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("followers", {
      follower: args.follower,
      following: args.following,
      createdAt: Date.now(),
    });
  },
});

export const unfollowUser = mutation({
  args: {
    follower: v.id("users"),
    following: v.id("users"),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("followers")
      .withIndex("byFollowerAndFollowing", (q) =>
        q.eq("follower", args.follower).eq("following", args.following),
      )
      .unique();

    if (!existing) {
      throw new Error("Not following");
    }

    await ctx.db.delete(existing._id);
    return { success: true };
  },
});

export const getFollowers = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("followers")
      .withIndex("byFollowing", (q) => q.eq("following", args.userId))
      .collect();
  },
});

export const getFollowing = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("followers")
      .withIndex("byFollower", (q) => q.eq("follower", args.userId))
      .collect();
  },
});
