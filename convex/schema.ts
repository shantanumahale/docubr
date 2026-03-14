import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
    documents: defineTable({
        title: v.string(),
        userId: v.string(),
        isArchived: v.boolean(),
        parentDocument: v.optional(v.id("documents")),
        content: v.optional(v.string()),
        coverImage: v.optional(v.string()),
        icon: v.optional(v.string()),
        isPublished: v.boolean(),
        // New documentation-specific fields
        description: v.optional(v.string()),
        lastEditedBy: v.optional(v.string()),
        lastEditedAt: v.optional(v.number()),
        version: v.optional(v.string()),
        tags: v.optional(v.array(v.string())),
        order: v.optional(v.number()),
        slug: v.optional(v.string()),
    })
    .index('by_user', ['userId'])
    .index('by_user_parent', ['userId', 'parentDocument'])
    .index('by_slug', ['slug']),

    // Feedback table for "Was this helpful?" feature
    feedback: defineTable({
        documentId: v.id("documents"),
        userId: v.optional(v.string()),
        helpful: v.boolean(),
        comment: v.optional(v.string()),
        createdAt: v.number(),
    })
    .index('by_document', ['documentId']),

    // Document versions for version history
    documentVersions: defineTable({
        documentId: v.id("documents"),
        content: v.string(),
        title: v.string(),
        version: v.string(),
        createdBy: v.string(),
        createdAt: v.number(),
        changeDescription: v.optional(v.string()),
    })
    .index('by_document', ['documentId'])
    .index('by_document_version', ['documentId', 'version']),
});
