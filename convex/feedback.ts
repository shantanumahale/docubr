import { v } from "convex/values";
import { mutation, query } from './_generated/server';

// Submit feedback for a document
export const submit = mutation({
    args: {
        documentId: v.id('documents'),
        helpful: v.boolean(),
        comment: v.optional(v.string()),
    },
    handler: async (context, args) => {
        const identity = await context.auth.getUserIdentity();
        
        const feedback = await context.db.insert('feedback', {
            documentId: args.documentId,
            userId: identity?.subject,
            helpful: args.helpful,
            comment: args.comment,
            createdAt: Date.now(),
        });

        return feedback;
    }
});

// Get feedback stats for a document
export const getStats = query({
    args: {
        documentId: v.id('documents'),
    },
    handler: async (context, args) => {
        const feedbacks = await context.db
            .query('feedback')
            .withIndex('by_document', (q) => q.eq('documentId', args.documentId))
            .collect();

        const helpful = feedbacks.filter(f => f.helpful).length;
        const notHelpful = feedbacks.filter(f => !f.helpful).length;
        const total = feedbacks.length;

        return {
            helpful,
            notHelpful,
            total,
            helpfulPercentage: total > 0 ? Math.round((helpful / total) * 100) : 0,
        };
    }
});

// Get all feedback for a document (admin view)
export const getByDocument = query({
    args: {
        documentId: v.id('documents'),
    },
    handler: async (context, args) => {
        const identity = await context.auth.getUserIdentity();

        if (!identity) {
            throw new Error('Not authenticated');
        }

        // Verify user owns the document
        const document = await context.db.get(args.documentId);
        if (!document || document.userId !== identity.subject) {
            throw new Error('Unauthorized');
        }

        const feedbacks = await context.db
            .query('feedback')
            .withIndex('by_document', (q) => q.eq('documentId', args.documentId))
            .order('desc')
            .collect();

        return feedbacks;
    }
});
