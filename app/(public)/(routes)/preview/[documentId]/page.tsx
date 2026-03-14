"use client";
import { Cover } from "@/components/cover";
import { Toolbar } from "@/components/toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import { DocMeta, calculateReadingTime } from "@/components/doc-blocks/doc-meta";
import { TableOfContents } from "@/components/doc-blocks/table-of-contents";
import { Feedback } from "@/components/doc-blocks/feedback";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen } from "lucide-react";
import Link from "next/link";

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

  const handleFeedback = (helpful: boolean, comment?: string) => {
    console.log("Feedback:", { helpful, comment, documentId: params.documentId });
  };

  if (document === undefined) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-950">
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
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            Document Not Found
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 mt-2">
            The document you&apos;re looking for doesn&apos;t exist or is not published.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-4 text-blue-600 dark:text-blue-400 hover:underline"
          >
            <BookOpen className="h-4 w-4" />
            Go to homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold">Docubr</span>
          </Link>
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            Public Documentation
          </div>
        </div>
      </header>

      <div className="pb-40">
        <Cover preview url={document.coverImage} />
        
        <div className="md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto">
          <div className="flex gap-8">
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <Toolbar preview initialData={document} />
              
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

              {/* Editor (Read-only) */}
              <Editor
                editable={false}
                onChange={() => {}}
                initialContent={document.content}
              />

              {/* Feedback Section */}
              <div className="px-4 md:px-[54px] mt-12">
                <Feedback onFeedback={handleFeedback} />
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

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-neutral-500 dark:text-neutral-400">
          <p>
            Powered by{" "}
            <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
              Docubr
            </Link>
            {" "}— Technical Documentation Made Simple
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DocumentIdPage;
