import { v } from "convex/values";
import { mutation, query } from './_generated/server';
import { Doc, Id } from './_generated/dataModel';

export const archive = mutation({
    args: {
        id: v.id('documents')
    },
    handler: async (context, args) => {
        const identity = await context.auth.getUserIdentity();

        if(!identity) {
            throw new Error('Not authenticated');
        }

        const userId = identity.subject;

        const existingDocument = await context.db.get(args.id);

        if(!existingDocument) {
            throw new Error("Not found");
        }

        if(existingDocument.userId !== userId) {
            throw new Error("Unauthorized");
        }

        const recursiveArchive =async (documentId: Id<"documents">) => {
            const children = await context.db.query('documents').withIndex('by_user_parent', (q) => (
                q
                    .eq('userId', userId)
                    .eq('parentDocument', documentId)
            )).collect();
            for (const child of children) {
                await context.db.patch(child._id, {
                    isArchived: true,
                })
                await recursiveArchive(child._id);
            }
        }
        
        const document = await context.db.patch(args.id, {
            isArchived: true
        });

        recursiveArchive(args.id);

        return document;
    }
})

export const getSideBar = query({
    args: {
        parentDocument: v.optional(v.id('documents'))
    },
    handler: async (context, args) => {
        const identity = await context.auth.getUserIdentity();

        if(!identity) {
            throw new Error('Not authenticated');
        }

        const userId = identity.subject;

        const documents = await context.db.query('documents').withIndex('by_user_parent', (q) => 
            q
            .eq('userId', userId)
            .eq('parentDocument',args.parentDocument))
            .filter((q) => q.eq(q.field('isArchived'), false))
            .order('desc')
            .collect();

        return documents;
    }
})

export const create = mutation({
    args: {
        title: v.string(),
        parentDocument: v.optional(v.id('documents'))
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity) {
            throw new Error('Not authenticated');
        }

        const userId = identity.subject;

        const document = await ctx.db.insert('documents', {
            title: args.title,
            parentDocument: args.parentDocument,
            userId,
            isArchived: false,
            isPublished: false
        })

        return document;
    }
});

export const getTrash = query({
    handler: async (context) => {
        const identity = await context.auth.getUserIdentity();
        if(!identity) {
            throw new Error('Not authenticated');
        }

        const userId = identity.subject;

        const documents = await context.db.query('documents').withIndex('by_user', (q) => q.eq('userId', userId))
        .filter((q) => q.eq(q.field('isArchived'), true))
        .order('desc')
        .collect();

        return documents;
    }
});

export const restore = mutation({
    args: {
        id: v.id('documents')
    },
    handler: async (context, args) => {
        const identity = await context.auth.getUserIdentity();

        if(!identity) {
            throw new Error('Not authenticated');
        }

        const userId = identity.subject;

        const existingDocument = await context.db.get(args.id);

        if(!existingDocument) {
            throw new Error("Not found");
        }

        if(existingDocument.userId !== userId) {
            throw new Error("Unauthorized");
        }

        const recursiveRestore = async (documentId: Id<"documents">) => {
            const children = await context.db.query('documents').withIndex('by_user_parent', (q) => (
                q
                    .eq('userId', userId)
                    .eq('parentDocument', documentId)
            )).collect();
            for (const child of children) {
                await context.db.patch(child._id, {
                    isArchived: false,
                })
                await recursiveRestore(child._id);
            }
        }

        const options: Partial<Doc<'documents'>> = {
            isArchived: false
        };

        if(existingDocument.parentDocument) {
            const parent = await context.db.get(existingDocument.parentDocument);
            if (parent?.isArchived) {
                options.parentDocument = undefined;
            }

            
        }
        
        const document = await context.db.patch(args.id, options);

        recursiveRestore(args.id);

        return document;
    }
});

export const remove = mutation({
    args: {
        id: v.id('documents')
    },
    handler: async (context, args) => {
        const identity = await context.auth.getUserIdentity();

        if(!identity) {
            throw new Error('Not authenticated');
        }

        const userId = identity.subject;

        const existingDocument = await context.db.get(args.id);

        if(!existingDocument) {
            throw new Error("Not found");
        }

        if(existingDocument.userId !== userId) {
            throw new Error("Unauthorized");
        }

        const document = await context.db.delete(args.id);

        return document;
    }
})

export const getSearch = query({
    handler: async (context) => {
        const identity = await context.auth.getUserIdentity();

        if(!identity) {
            throw new Error('Not authenticated');
        }

        const userId = identity.subject;

        const documents = await context.db.query('documents').withIndex('by_user', (q) => q.eq('userId', userId))
        .filter((q) => q.eq(q.field('isArchived'), false))
        .order('desc')
        .collect();

        return documents;
    }
})

export const getById = query({
    args: {
        documentId: v.id('documents')
    },
    handler: async (context, args) => {
        const identity = await context.auth.getUserIdentity();

        const document = await context.db.get(args.documentId);
        
        if(!document) {
            throw new Error("Not found");
        }

        if(document.isPublished && !document.isArchived) {
            return document;
        }

        if(!identity) {
            throw new Error("Not authenticated");
        }

        const userId = identity.subject;

        if(document.userId !== userId) {
            throw new Error("Unauthorized");
        }

        return document;
    }
});

export const update = mutation({
    args: {
        id: v.id('documents'),
        title: v.optional(v.string()),
        content: v.optional(v.string()),
        coverImage: v.optional(v.string()),
        icon: v.optional(v.string()),
        isPublished: v.optional(v.boolean()),
        // New documentation fields
        description: v.optional(v.string()),
        version: v.optional(v.string()),
        tags: v.optional(v.array(v.string())),
        order: v.optional(v.number()),
        slug: v.optional(v.string()),
    },
    handler: async (context, args) => {
        const identity = await context.auth.getUserIdentity();

        if(!identity) {
            throw new Error('Not authenticated');
        }

        const userId = identity.subject;

        const { id, ...rest } = args;

        const existingDocument = await context.db.get(args.id);

        if(!existingDocument) {
            throw new Error("Not Found");
        }

        if(existingDocument.userId !== userId) {
            throw new Error("Unauthorized");
        }

        const document = await context.db.patch(args.id, {
            ...rest,
            lastEditedBy: userId,
            lastEditedAt: Date.now(),
        });

        return document;
    }
});

export const removeIcon = mutation({
    args: {
        id: v.id('documents')
    },
    handler: async (context, args) => {
        const identity = await context.auth.getUserIdentity();

        if(!identity) {
            throw new Error('Not authenticated');
        }

        const userId = identity.subject;

        const existingDocument = await context.db.get(args.id);

        if(!existingDocument) {
            throw new Error("Not found");
        }

        if(existingDocument.userId !== userId) {
            throw new Error("Unauthorized");
        }

        const document = await context.db.patch(args.id, {
            icon: undefined
        })

        return document;
    }
})

export const removeCover = mutation({
    args: {
        id: v.id('documents')
    },
    handler: async (context, args) => {
        const identity = await context.auth.getUserIdentity();

        if(!identity) {
            throw new Error('Not authenticated');
        }

        const userId = identity.subject;

        const existingDocument = await context.db.get(args.id);

        if(!existingDocument) {
            throw new Error("Not found");
        }

        if(existingDocument.userId !== userId) {
            throw new Error("Unauthorized");
        }

        const document = await context.db.patch(args.id, {
            coverImage: undefined
        })

        return document;
    }
})

// Get siblings (documents at the same level) for navigation
export const getSiblings = query({
    args: {
        documentId: v.id('documents')
    },
    handler: async (context, args) => {
        const identity = await context.auth.getUserIdentity();

        if(!identity) {
            throw new Error('Not authenticated');
        }

        const userId = identity.subject;

        const document = await context.db.get(args.documentId);

        if(!document) {
            throw new Error("Not found");
        }

        // Get all siblings (same parent)
        const siblings = await context.db
            .query('documents')
            .withIndex('by_user_parent', (q) =>
                q
                    .eq('userId', userId)
                    .eq('parentDocument', document.parentDocument)
            )
            .filter((q) => q.eq(q.field('isArchived'), false))
            .collect();

        // Sort by order field, then by title
        const sortedSiblings = siblings.sort((a, b) => {
            if (a.order !== undefined && b.order !== undefined) {
                return a.order - b.order;
            }
            if (a.order !== undefined) return -1;
            if (b.order !== undefined) return 1;
            return a.title.localeCompare(b.title);
        });

        const currentIndex = sortedSiblings.findIndex(s => s._id === args.documentId);

        return {
            previous: currentIndex > 0 ? sortedSiblings[currentIndex - 1] : null,
            next: currentIndex < sortedSiblings.length - 1 ? sortedSiblings[currentIndex + 1] : null,
            siblings: sortedSiblings,
            currentIndex,
        };
    }
});

// Get breadcrumb path for a document
export const getBreadcrumbs = query({
    args: {
        documentId: v.id('documents')
    },
    handler: async (context, args) => {
        const identity = await context.auth.getUserIdentity();

        const document = await context.db.get(args.documentId);

        if(!document) {
            throw new Error("Not found");
        }

        // For published documents, allow public access
        if(!document.isPublished || document.isArchived) {
            if(!identity) {
                throw new Error("Not authenticated");
            }
            if(document.userId !== identity.subject) {
                throw new Error("Unauthorized");
            }
        }

        const breadcrumbs: Array<{ _id: string; title: string; icon?: string }> = [];
        let currentDoc = document;

        // Build breadcrumb path from current document to root
        while (currentDoc) {
            breadcrumbs.unshift({
                _id: currentDoc._id,
                title: currentDoc.title,
                icon: currentDoc.icon,
            });

            if (currentDoc.parentDocument) {
                const parent = await context.db.get(currentDoc.parentDocument);
                if (parent) {
                    currentDoc = parent;
                } else {
                    break;
                }
            } else {
                break;
            }
        }

        return breadcrumbs;
    }
});

// Get all documents in a tree structure for sidebar
export const getDocumentTree = query({
    args: {
        parentDocument: v.optional(v.id('documents'))
    },
    handler: async (context, args) => {
        const identity = await context.auth.getUserIdentity();

        if(!identity) {
            throw new Error('Not authenticated');
        }

        const userId = identity.subject;

        const documents = await context.db
            .query('documents')
            .withIndex('by_user_parent', (q) =>
                q
                    .eq('userId', userId)
                    .eq('parentDocument', args.parentDocument)
            )
            .filter((q) => q.eq(q.field('isArchived'), false))
            .collect();

        // Sort by order, then by title
        const sortedDocs = documents.sort((a, b) => {
            if (a.order !== undefined && b.order !== undefined) {
                return a.order - b.order;
            }
            if (a.order !== undefined) return -1;
            if (b.order !== undefined) return 1;
            return a.title.localeCompare(b.title);
        });

        return sortedDocs;
    }
});

// Search documents with full-text search
export const searchDocuments = query({
    args: {
        query: v.string(),
    },
    handler: async (context, args) => {
        const identity = await context.auth.getUserIdentity();

        if(!identity) {
            throw new Error('Not authenticated');
        }

        const userId = identity.subject;

        const documents = await context.db
            .query('documents')
            .withIndex('by_user', (q) => q.eq('userId', userId))
            .filter((q) => q.eq(q.field('isArchived'), false))
            .collect();

        const searchQuery = args.query.toLowerCase();

        // Filter documents that match the search query
        const results = documents.filter(doc => {
            const titleMatch = doc.title.toLowerCase().includes(searchQuery);
            const contentMatch = doc.content?.toLowerCase().includes(searchQuery);
            const descriptionMatch = doc.description?.toLowerCase().includes(searchQuery);
            const tagsMatch = doc.tags?.some(tag => tag.toLowerCase().includes(searchQuery));
            
            return titleMatch || contentMatch || descriptionMatch || tagsMatch;
        });

        return results;
    }
});