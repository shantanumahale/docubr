"use client";

import React from "react";
import { Clock, Calendar, User, Edit3 } from "lucide-react";
import { cn } from "@/lib/utils";

// Calculate reading time based on word count
export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

interface ReadingTimeProps {
  content?: string;
  minutes?: number;
  className?: string;
}

export const ReadingTime: React.FC<ReadingTimeProps> = ({
  content,
  minutes,
  className,
}) => {
  const readingTime = minutes || (content ? calculateReadingTime(content) : 0);

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400",
        className
      )}
    >
      <Clock className="h-4 w-4" />
      <span>{readingTime} min read</span>
    </div>
  );
};

interface LastUpdatedProps {
  date: Date | string;
  className?: string;
}

export const LastUpdated: React.FC<LastUpdatedProps> = ({ date, className }) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400",
        className
      )}
    >
      <Calendar className="h-4 w-4" />
      <span>Updated {formattedDate}</span>
    </div>
  );
};

interface AuthorProps {
  name: string;
  avatar?: string;
  className?: string;
}

export const Author: React.FC<AuthorProps> = ({ name, avatar, className }) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400",
        className
      )}
    >
      {avatar ? (
        <img
          src={avatar}
          alt={name}
          className="h-5 w-5 rounded-full object-cover"
        />
      ) : (
        <User className="h-4 w-4" />
      )}
      <span>{name}</span>
    </div>
  );
};

interface DocMetaProps {
  readingTime?: number;
  lastUpdated?: Date | string;
  author?: {
    name: string;
    avatar?: string;
  };
  editUrl?: string;
  className?: string;
}

export const DocMeta: React.FC<DocMetaProps> = ({
  readingTime,
  lastUpdated,
  author,
  editUrl,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-4 py-4 border-b border-neutral-200 dark:border-neutral-800 mb-6",
        className
      )}
    >
      {readingTime !== undefined && <ReadingTime minutes={readingTime} />}
      {lastUpdated && <LastUpdated date={lastUpdated} />}
      {author && <Author name={author.name} avatar={author.avatar} />}
      {editUrl && (
        <a
          href={editUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors ml-auto"
        >
          <Edit3 className="h-4 w-4" />
          <span>Edit this page</span>
        </a>
      )}
    </div>
  );
};

// Version badge
interface VersionBadgeProps {
  version: string;
  status?: "stable" | "beta" | "alpha" | "deprecated";
  className?: string;
}

export const VersionBadge: React.FC<VersionBadgeProps> = ({
  version,
  status = "stable",
  className,
}) => {
  const statusColors = {
    stable: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    beta: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    alpha: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    deprecated: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium",
        statusColors[status],
        className
      )}
    >
      v{version}
      {status !== "stable" && (
        <span className="uppercase text-[10px]">{status}</span>
      )}
    </span>
  );
};

export default DocMeta;
