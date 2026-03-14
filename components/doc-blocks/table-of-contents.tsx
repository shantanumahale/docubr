"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { List } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  className?: string;
  maxDepth?: number;
  title?: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  className,
  maxDepth = 3,
  title = "On this page",
}) => {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Find all headings in the document content
    const selector = Array.from({ length: maxDepth }, (_, i) => `h${i + 1}`)
      .join(", ");
    
    const elements = document.querySelectorAll(selector);
    const items: TocItem[] = [];

    elements.forEach((element) => {
      const id = element.id || element.textContent?.toLowerCase().replace(/\s+/g, "-") || "";
      if (!element.id) {
        element.id = id;
      }
      
      items.push({
        id,
        text: element.textContent || "",
        level: parseInt(element.tagName[1]),
      });
    });

    setHeadings(items);
  }, [maxDepth]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 0,
      }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  const minLevel = Math.min(...headings.map((h) => h.level));

  return (
    <nav
      className={cn(
        "sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
        <List className="h-4 w-4" />
        {title}
      </div>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - minLevel) * 12}px` }}
          >
            <button
              onClick={() => handleClick(heading.id)}
              className={cn(
                "text-left w-full py-1 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100",
                activeId === heading.id
                  ? "text-blue-600 dark:text-blue-400 font-medium"
                  : "text-neutral-600 dark:text-neutral-400"
              )}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// Inline TOC that can be placed within content
export const InlineTableOfContents: React.FC<{
  items: { title: string; href: string }[];
  className?: string;
}> = ({ items, className }) => {
  return (
    <div
      className={cn(
        "my-6 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900",
        className
      )}
    >
      <h4 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 mb-3">
        Contents
      </h4>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="text-neutral-400 dark:text-neutral-600 text-sm">
              {index + 1}.
            </span>
            <a
              href={item.href}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
