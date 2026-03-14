"use client";

import React from "react";
import { Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  id?: string;
  children: React.ReactNode;
  className?: string;
  showAnchor?: boolean;
}

const generateId = (children: React.ReactNode): string => {
  const text = React.Children.toArray(children)
    .map((child) => {
      if (typeof child === "string") return child;
      if (React.isValidElement(child) && child.props.children) {
        return generateId(child.props.children);
      }
      return "";
    })
    .join("");

  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

export const Heading: React.FC<HeadingProps> = ({
  level,
  id,
  children,
  className,
  showAnchor = true,
}) => {
  const headingId = id || generateId(children);
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  const sizeClasses = {
    1: "text-4xl font-bold mt-8 mb-4",
    2: "text-3xl font-bold mt-8 mb-4",
    3: "text-2xl font-semibold mt-6 mb-3",
    4: "text-xl font-semibold mt-4 mb-2",
    5: "text-lg font-medium mt-4 mb-2",
    6: "text-base font-medium mt-3 mb-2",
  };

  return (
    <Tag
      id={headingId}
      className={cn(
        "group relative scroll-mt-20 text-neutral-900 dark:text-neutral-100",
        sizeClasses[level],
        className
      )}
    >
      {showAnchor && (
        <a
          href={`#${headingId}`}
          className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
          aria-label={`Link to ${children}`}
        >
          <LinkIcon className="h-4 w-4" />
        </a>
      )}
      {children}
    </Tag>
  );
};

// Shorthand components
export const H1: React.FC<Omit<HeadingProps, "level">> = (props) => (
  <Heading level={1} {...props} />
);

export const H2: React.FC<Omit<HeadingProps, "level">> = (props) => (
  <Heading level={2} {...props} />
);

export const H3: React.FC<Omit<HeadingProps, "level">> = (props) => (
  <Heading level={3} {...props} />
);

export const H4: React.FC<Omit<HeadingProps, "level">> = (props) => (
  <Heading level={4} {...props} />
);

export const H5: React.FC<Omit<HeadingProps, "level">> = (props) => (
  <Heading level={5} {...props} />
);

export const H6: React.FC<Omit<HeadingProps, "level">> = (props) => (
  <Heading level={6} {...props} />
);

export default Heading;
