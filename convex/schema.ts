// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    clerkUserId: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    username: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    bio: v.optional(v.string()), // NEW
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("byClerkUserId", ["clerkUserId"])
    .index("byEmail", ["email"])
    .index("byUsername", ["username"]),

  posts: defineTable({
    content: v.string(),
    attachments: v.optional(v.array(v.string())),
    authorId: v.id("users"),
    replyTo: v.optional(v.id("posts")), // NEW - for threading
    createdAt: v.number(), // NEW
    updatedAt: v.number(), // NEW
    edited: v.optional(v.boolean()), // NEW - track if edited
  })
    .index("byAuthor", ["authorId"])
    .index("byCreatedAt", ["createdAt"]) // NEW
    .index("byReplyTo", ["replyTo"]) // NEW
    .index("byAuthorAndCreatedAt", ["authorId", "createdAt"]),

  comments: defineTable({
    post: v.id("posts"),
    author: v.id("users"),                            
    content: v.string(),
    createdAt: v.number(), // NEW
    updatedAt: v.number(), // NEW
    edited: v.optional(v.boolean()), // NEW
    deletedAt: v.optional(v.number()), // NEW
  })
    .index("byPost", ["post"])
    .index("byAuthor", ["author"])
    .index("byPostAndCreatedAt", ["post", "createdAt"]), // NEW

  likes: defineTable({
    post: v.id("posts"),
    author: v.id("users"),
    createdAt: v.number(), // NEW
  })
    .index("byPost", ["post"])
    .index("byAuthor", ["author"])
    .index("byPostAndAuthor", ["post", "author"]), // NEW - prevent duplicates

  followers: defineTable({
    follower: v.id("users"),
    following: v.id("users"),
    createdAt: v.number(), // NEW
  })
    .index("byFollower", ["follower"])
    .index("byFollowing", ["following"])
    .index("byFollowerAndFollowing", ["follower", "following"]), // NEW
});
