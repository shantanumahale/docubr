"use client";

import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PageLink {
  title: string;
  href: string;
  description?: string;
}

interface PageNavigationProps {
  previous?: PageLink;
  next?: PageLink;
  className?: string;
}

export const PageNavigation: React.FC<PageNavigationProps> = ({
  previous,
  next,
  className,
}) => {
  return (
    <nav
      className={cn(
        "flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800",
        className
      )}
    >
      {previous ? (
        <Link
          href={previous.href}
          className="flex-1 group p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors"
        >
          <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-1">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Previous
          </div>
          <div className="font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {previous.title}
          </div>
          {previous.description && (
            <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              {previous.description}
            </div>
          )}
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          href={next.href}
          className="flex-1 group p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors text-right"
        >
          <div className="flex items-center justify-end gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-1">
            Next
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
          <div className="font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {next.title}
          </div>
          {next.description && (
            <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              {next.description}
            </div>
          )}
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
};

// Card-style navigation links
interface CardLinkProps {
  title: string;
  description?: string;
  href: string;
  icon?: React.ReactNode;
  className?: string;
}

export const CardLink: React.FC<CardLinkProps> = ({
  title,
  description,
  href,
  icon,
  className,
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "block p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors group",
        className
      )}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <div className="flex-shrink-0 p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {icon}
          </div>
        )}
        <div>
          <div className="font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {title}
          </div>
          {description && (
            <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              {description}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

interface CardLinksGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3;
  className?: string;
}

export const CardLinksGrid: React.FC<CardLinksGridProps> = ({
  children,
  columns = 2,
  className,
}) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  };

  return (
    <div className={cn("grid gap-4 my-6", gridCols[columns], className)}>
      {children}
    </div>
  );
};

export default PageNavigation;
