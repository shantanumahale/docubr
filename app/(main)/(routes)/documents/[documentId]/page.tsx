"use client";
import { Cover } from "@/components/cover";
import { Toolbar } from "@/components/toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import { Breadcrumb } from "@/components/doc-blocks/breadcrumb";
import { DocMeta, calculateReadingTime } from "@/components/doc-blocks/doc-meta";
import { TableOfContents } from "@/components/doc-blocks/table-of-contents";
import { PageNavigation } from "@/components/doc-blocks/page-navigation";
import { Feedback } from "@/components/doc-blocks/feedback";
import { Skeleton } from "@/components/ui/skeleton";

interface DocumentIdProps {
  params: {
    documentId: Id<"documents">;
  };
}

const DocumentIdPage: React.FC<DocumentIdProps> = ({ params }) => {
  const Editor = useMemo(
    () =>
      dynamic(() => import("@/components/editor"), {
        ssr: false,
        loading: () => (
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-4 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        ),
      }),
    []
  );

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  const breadcrumbs = useQuery(api.documents.getBreadcrumbs, {
    documentId: params.documentId,
  });

  const siblings = useQuery(api.documents.getSiblings, {
    documentId: params.documentId,
  });

  const update = useMutation(api.documents.update);

  const onChange = (content: string) => {
    update({
      id: params.documentId,
      content,
    });
  };

  const handleFeedback = (helpful: boolean, comment?: string) => {
    // Feedback will be handled when the API is available
    console.log("Feedback:", { helpful, comment, documentId: params.documentId });
  };

  // Calculate reading time from content
  const readingTime = useMemo(() => {
    if (!document?.content) return 1;
    try {
      const blocks = JSON.parse(document.content);
      const textContent = blocks
        .map((block: any) => {
          if (block.content) {
            return block.content
              .map((c: any) => c.text || "")
              .join(" ");
          }
          return "";
        })
        .join(" ");
      return calculateReadingTime(textContent);
    } catch {
      return 1;
    }
  }, [document?.content]);

  if (document === undefined) {
    return (
      <div className="pb-40">
        <div className="h-[35vh] bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            Document Not Found
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 mt-2">
            The document you&apos;re looking for doesn&apos;t exist or has been deleted.
          </p>
        </div>
      </div>
    );
  }

  // Build breadcrumb items
  const breadcrumbItems = breadcrumbs?.map((item) => ({
    label: item.title,
    href: `/documents/${item._id}`,
  })) || [];

  return (
    <div className="pb-40">
      <Cover url={document.coverImage} />
      
      <div className="md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto">
        {/* Breadcrumb Navigation */}
        {breadcrumbItems.length > 1 && (
          <div className="px-4 md:px-8 pt-6">
            <Breadcrumb items={breadcrumbItems.slice(0, -1)} />
          </div>
        )}

        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <Toolbar initialData={document} />
            
            {/* Document Meta */}
            <div className="px-4 md:px-[54px]">
              <DocMeta
                readingTime={readingTime}
                lastUpdated={document.lastEditedAt ? new Date(document.lastEditedAt) : undefined}
              />
              
              {/* Description */}
              {document.description && (
                <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                  {document.description}
                </p>
              )}

              {/* Tags */}
              {document.tags && document.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {document.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs font-medium rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Editor */}
            <Editor onChange={onChange} initialContent={document.content} />

            {/* Page Navigation */}
            <div className="px-4 md:px-[54px]">
              {siblings && (siblings.previous || siblings.next) && (
                <PageNavigation
                  previous={
                    siblings.previous
                      ? {
                          title: siblings.previous.title,
                          href: `/documents/${siblings.previous._id}`,
                        }
                      : undefined
                  }
                  next={
                    siblings.next
                      ? {
                          title: siblings.next.title,
                          href: `/documents/${siblings.next._id}`,
                        }
                      : undefined
                  }
                />
              )}

              {/* Feedback Section */}
              <div className="mt-12">
                <Feedback
                  documentId={params.documentId}
                  onFeedback={handleFeedback}
                />
              </div>
            </div>
          </div>

          {/* Table of Contents Sidebar (Desktop only) */}
          <aside className="hidden xl:block w-64 flex-shrink-0">
            <div className="sticky top-20 pt-6">
              <TableOfContents />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DocumentIdPage;
