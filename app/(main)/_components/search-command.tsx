"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { File, FileText, Hash, Search } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useSearch } from "@/hooks/use-search";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

const SearchCommand: React.FC = () => {
  const { user } = useUser();
  const router = useRouter();
  const documents = useQuery(api.documents.getSearch);

  const [mounted, setMounted] = useState(false);

  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
      // Also support "/" for quick search
      if (e.key === "/" && !isOpen) {
        const activeElement = document.activeElement;
        const isInputFocused = 
          activeElement?.tagName === "INPUT" || 
          activeElement?.tagName === "TEXTAREA" ||
          (activeElement as HTMLElement)?.isContentEditable;
        
        if (!isInputFocused) {
          e.preventDefault();
          toggle();
        }
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle, isOpen]);

  const onSelect = (id: string) => {
    router.push(`/documents/${id}`);
    onClose();
  };

  // Group documents by parent for better organization
  const rootDocuments = documents?.filter(doc => !doc.parentDocument) || [];
  const nestedDocuments = documents?.filter(doc => doc.parentDocument) || [];

  if (!mounted) {
    return null;
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput 
        placeholder={`Search documentation...`}
        className="border-none focus:ring-0"
      />
      <CommandList className="max-h-[400px]">
        <CommandEmpty>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <Search className="h-10 w-10 text-neutral-400 mb-3" />
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              No documents found.
            </p>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
              Try searching with different keywords.
            </p>
          </div>
        </CommandEmpty>
        
        {rootDocuments.length > 0 && (
          <CommandGroup heading="Documents">
            {rootDocuments.map((document) => (
              <CommandItem
                key={document._id}
                value={`${document._id}-${document.title}`}
                title={document.title}
                onSelect={() => onSelect(document._id)}
                className="flex items-center gap-2 py-3"
              >
                {document.icon ? (
                  <span className="text-lg">{document.icon}</span>
                ) : (
                  <FileText className="h-4 w-4 text-neutral-500" />
                )}
                <div className="flex flex-col">
                  <span className="font-medium">{document.title}</span>
                  {document.description && (
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">
                      {document.description}
                    </span>
                  )}
                </div>
                {document.tags && document.tags.length > 0 && (
                  <div className="ml-auto flex gap-1">
                    {document.tags.slice(0, 2).map((tag, i) => (
                      <span
                        key={i}
                        className="px-1.5 py-0.5 text-[10px] rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {nestedDocuments.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Nested Pages">
              {nestedDocuments.map((document) => (
                <CommandItem
                  key={document._id}
                  value={`${document._id}-${document.title}`}
                  title={document.title}
                  onSelect={() => onSelect(document._id)}
                  className="flex items-center gap-2 py-2 pl-6"
                >
                  {document.icon ? (
                    <span className="text-base">{document.icon}</span>
                  ) : (
                    <Hash className="h-3.5 w-3.5 text-neutral-400" />
                  )}
                  <span>{document.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
      
      {/* Footer with keyboard hints */}
      <div className="border-t border-neutral-200 dark:border-neutral-800 px-3 py-2 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 font-mono text-[10px]">↑↓</kbd>
            Navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 font-mono text-[10px]">↵</kbd>
            Open
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 font-mono text-[10px]">esc</kbd>
            Close
          </span>
        </div>
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 font-mono text-[10px]">⌘K</kbd>
          or
          <kbd className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 font-mono text-[10px]">/</kbd>
          to search
        </span>
      </div>
    </CommandDialog>
  );
};

export default SearchCommand;
