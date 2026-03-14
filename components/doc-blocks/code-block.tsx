"use client";

import React, { useState } from "react";
import { Check, Copy, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  className?: string;
}

const SUPPORTED_LANGUAGES = [
  "javascript",
  "typescript",
  "python",
  "java",
  "csharp",
  "cpp",
  "go",
  "rust",
  "ruby",
  "php",
  "swift",
  "kotlin",
  "sql",
  "html",
  "css",
  "json",
  "yaml",
  "markdown",
  "bash",
  "shell",
  "dockerfile",
  "graphql",
  "jsx",
  "tsx",
];

const LANGUAGE_LABELS: Record<string, string> = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  python: "Python",
  java: "Java",
  csharp: "C#",
  cpp: "C++",
  go: "Go",
  rust: "Rust",
  ruby: "Ruby",
  php: "PHP",
  swift: "Swift",
  kotlin: "Kotlin",
  sql: "SQL",
  html: "HTML",
  css: "CSS",
  json: "JSON",
  yaml: "YAML",
  markdown: "Markdown",
  bash: "Bash",
  shell: "Shell",
  dockerfile: "Dockerfile",
  graphql: "GraphQL",
  jsx: "JSX",
  tsx: "TSX",
};

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "typescript",
  filename,
  showLineNumbers = true,
  highlightLines = [],
  className,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div
      className={cn(
        "group relative rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 overflow-hidden my-4",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800/50">
        <div className="flex items-center gap-2">
          {filename && (
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {filename}
            </span>
          )}
          {!filename && language && (
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase">
              {LANGUAGE_LABELS[language] || language}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm leading-relaxed">
          <code className={`language-${language}`}>
            {lines.map((line, index) => (
              <div
                key={index}
                className={cn(
                  "flex",
                  highlightLines.includes(index + 1) &&
                    "bg-yellow-100 dark:bg-yellow-900/30 -mx-4 px-4"
                )}
              >
                {showLineNumbers && (
                  <span className="select-none pr-4 text-neutral-400 dark:text-neutral-600 text-right w-8 flex-shrink-0">
                    {index + 1}
                  </span>
                )}
                <span className="flex-1 text-neutral-800 dark:text-neutral-200">
                  {line || " "}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};

// Code Tabs Component for showing code in multiple languages
interface CodeTab {
  language: string;
  label?: string;
  code: string;
}

interface CodeTabsProps {
  tabs: CodeTab[];
  filename?: string;
  showLineNumbers?: boolean;
}

export const CodeTabs: React.FC<CodeTabsProps> = ({
  tabs,
  filename,
  showLineNumbers = true,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(tabs[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = tabs[activeTab].code.split("\n");

  return (
    <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 overflow-hidden my-4">
      {/* Tabs Header */}
      <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800/50">
        <div className="flex items-center">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={cn(
                "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                activeTab === index
                  ? "border-blue-500 text-blue-600 dark:text-blue-400 bg-white dark:bg-neutral-900"
                  : "border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
              )}
            >
              {tab.label || LANGUAGE_LABELS[tab.language] || tab.language}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1 mr-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm leading-relaxed">
          <code className={`language-${tabs[activeTab].language}`}>
            {lines.map((line, index) => (
              <div key={index} className="flex">
                {showLineNumbers && (
                  <span className="select-none pr-4 text-neutral-400 dark:text-neutral-600 text-right w-8 flex-shrink-0">
                    {index + 1}
                  </span>
                )}
                <span className="flex-1 text-neutral-800 dark:text-neutral-200">
                  {line || " "}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};

// Inline Code Component
interface InlineCodeProps {
  children: React.ReactNode;
  className?: string;
}

export const InlineCode: React.FC<InlineCodeProps> = ({
  children,
  className,
}) => {
  return (
    <code
      className={cn(
        "px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-sm font-mono text-pink-600 dark:text-pink-400",
        className
      )}
    >
      {children}
    </code>
  );
};

export default CodeBlock;
