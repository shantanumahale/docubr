"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import hljs from "highlight.js";
import {
  defaultBlockSpecs,
  getBlockSchemaFromSpecs,
} from "@blocknote/core";
import {
  BlockNoteView,
  useBlockNote,
  getDefaultReactSlashMenuItems,
  ReactSlashMenuItem,
  createReactBlockSpec,
} from "@blocknote/react";
import "@blocknote/core/style.css";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";
import {
  Code,
  AlertCircle,
  Lightbulb,
  AlertTriangle,
  Info,
  CheckCircle,
  Copy,
  Check,
} from "lucide-react";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

// ── Language data ─────────────────────────────────────────────────────────────

const SUPPORTED_LANGUAGES = [
  "javascript", "typescript", "python", "java", "csharp", "cpp",
  "go", "rust", "ruby", "php", "swift", "kotlin", "sql", "html",
  "css", "json", "yaml", "markdown", "bash", "shell", "dockerfile",
  "graphql", "jsx", "tsx",
];

const LANGUAGE_LABELS: Record<string, string> = {
  javascript: "JavaScript", typescript: "TypeScript", python: "Python",
  java: "Java", csharp: "C#", cpp: "C++", go: "Go", rust: "Rust",
  ruby: "Ruby", php: "PHP", swift: "Swift", kotlin: "Kotlin", sql: "SQL",
  html: "HTML", css: "CSS", json: "JSON", yaml: "YAML", markdown: "Markdown",
  bash: "Bash", shell: "Shell", dockerfile: "Dockerfile", graphql: "GraphQL",
  jsx: "JSX", tsx: "TSX",
};

// ── Code block renderer ───────────────────────────────────────────────────────

interface CodeBlockRendererProps {
  block: any;
  editor: any;
}

const CodeBlockRenderer: React.FC<CodeBlockRendererProps> = ({ block, editor }) => {
  const { resolvedTheme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [code, setCode] = useState<string>(block.props.code || "");
  const [language, setLanguage] = useState<string>(block.props.language || "javascript");
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const codeRef = useRef<HTMLElement>(null);

  // Load highlight.js theme CSS based on current theme
  useEffect(() => {
    const id = "hljs-theme";
    let link = document.getElementById(id) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    link.href =
      resolvedTheme === "dark"
        ? "/hljs/github-dark.min.css"
        : "/hljs/github.min.css";
  }, [resolvedTheme]);

  // Run highlight.js whenever the displayed code or language changes
  const highlight = useCallback(() => {
    if (!codeRef.current) return;
    const lang = block.props.language || "javascript";
    const raw = block.props.code || "";
    if (!raw) {
      codeRef.current.innerHTML = "";
      return;
    }
    try {
      const result = hljs.highlight(raw, {
        language: hljs.getLanguage(lang) ? lang : "plaintext",
        ignoreIllegals: true,
      });
      codeRef.current.innerHTML = result.value;
    } catch {
      codeRef.current.textContent = raw;
    }
  }, [block.props.code, block.props.language]);

  useEffect(() => {
    if (!isEditing) highlight();
  }, [isEditing, highlight]);

  const startEditing = () => {
    setCode(block.props.code || "");
    setLanguage(block.props.language || "javascript");
    setIsEditing(true);
  };

  const saveAndClose = () => {
    editor.updateBlock(block, { props: { code, language } });
    setIsEditing(false);
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(isEditing ? code : (block.props.code || ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Escape") { saveAndClose(); return; }
    if (e.key === "Tab") {
      e.preventDefault();
      const el = textareaRef.current!;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const updated = code.substring(0, start) + "  " + code.substring(end);
      setCode(updated);
      requestAnimationFrame(() => {
        el.selectionStart = start + 2;
        el.selectionEnd = start + 2;
      });
    }
  };

  const displayLang = isEditing ? language : (block.props.language || "javascript");
  const monoFont = "'Fira Code', 'Monaco', 'Consolas', monospace";

  // ── Editing UI ──────────────────────────────────────────────────────────────
  // Close only when focus leaves the entire block container
  const handleContainerBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      saveAndClose();
    }
  };

  if (isEditing) {
    const lines = code.split("\n");
    return (
      <div
        contentEditable={false}
        className="rounded-lg border-2 border-blue-400 dark:border-blue-500 overflow-hidden my-2 w-full"
        style={{ background: resolvedTheme === "dark" ? "#0d1117" : "#f6f8fa" }}
        onBlur={handleContainerBlur}
      >
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="text-xs font-medium bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-600 rounded px-2 py-0.5 cursor-pointer"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>{LANGUAGE_LABELS[lang] || lang}</option>
            ))}
          </select>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-2 py-0.5 text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors"
            >
              {copied ? <><Check className="h-3 w-3" /> Copied!</> : <><Copy className="h-3 w-3" /> Copy</>}
            </button>
            <button
              onMouseDown={(e) => { e.preventDefault(); saveAndClose(); }}
              className="text-xs px-2.5 py-0.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors font-medium"
            >
              Done
            </button>
          </div>
        </div>
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck={false}
          placeholder="// Write your code here..."
          rows={Math.max(5, lines.length + 2)}
          className="w-full p-4 text-sm leading-relaxed resize-none outline-none block text-neutral-800 dark:text-neutral-200"
          style={{ fontFamily: monoFont, background: "transparent" }}
        />
      </div>
    );
  }

  // ── View UI (with highlight.js) ─────────────────────────────────────────────
  const rawCode = block.props.code || "";
  const lineCount = rawCode ? rawCode.split("\n").length : 0;

  return (
    <div
      contentEditable={false}
      className="group rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden my-2 w-full cursor-text"
      style={{ background: resolvedTheme === "dark" ? "#0d1117" : "#f6f8fa" }}
      onClick={startEditing}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-3 py-1.5 border-b border-neutral-200 dark:border-neutral-800"
        style={{ background: resolvedTheme === "dark" ? "#161b22" : "#f0f2f4" }}
      >
        <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
          {LANGUAGE_LABELS[displayLang] || displayLang}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors"
        >
          {copied ? <><Check className="h-3 w-3" /> Copied!</> : <><Copy className="h-3 w-3" /> Copy</>}
        </button>
      </div>

      {/* Code with line numbers + syntax highlighting */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm leading-relaxed border-collapse" style={{ fontFamily: monoFont }}>
          <tbody>
            {rawCode ? (
              // We render line numbers separately; hljs output goes into the <code> ref via innerHTML
              // But we need per-line rendering with line numbers — so split highlighted HTML by newlines
              <tr>
                {/* Line numbers column */}
                <td
                  className="select-none text-right pr-4 pl-4 pt-4 pb-4 align-top text-neutral-400 dark:text-neutral-600 border-r border-neutral-200 dark:border-neutral-800 w-[3rem]"
                  style={{ userSelect: "none", lineHeight: "1.625" }}
                >
                  {Array.from({ length: lineCount }, (_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </td>
                {/* Highlighted code column — innerHTML set via ref after hljs runs */}
                <td className="p-4 align-top w-full">
                  <pre className="m-0 whitespace-pre">
                    <code
                      ref={codeRef}
                      className={`hljs language-${displayLang}`}
                      style={{ background: "transparent", padding: 0 }}
                    />
                  </pre>
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan={2} className="px-4 py-4 text-neutral-400 dark:text-neutral-500 italic text-sm">
                  Click to write code...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Hover hint */}
      <div
        className="px-3 py-1 text-xs text-neutral-400 dark:text-neutral-600 border-t border-neutral-200 dark:border-neutral-800 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: resolvedTheme === "dark" ? "#161b22" : "#f0f2f4" }}
      >
        Click to edit · Esc to close · Tab to indent
      </div>
    </div>
  );
};

// ── Custom BlockNote block spec ───────────────────────────────────────────────

const codeBlockSpec = createReactBlockSpec(
  {
    type: "codeBlock" as const,
    propSchema: {
      language: { default: "javascript" },
      code: { default: "" },
    },
    content: "none" as const,
  },
  {
    render: ({ block, editor }: { block: any; editor: any; contentRef: any }) => (
      <CodeBlockRenderer block={block} editor={editor} />
    ),
  }
);

const blockSpecs = {
  ...defaultBlockSpecs,
  codeBlock: codeBlockSpec,
};

const blockSchema = getBlockSchemaFromSpecs(blockSpecs);

// ── Slash menu items ──────────────────────────────────────────────────────────

const codeBlockItem: ReactSlashMenuItem<any, any, any> = {
  name: "Code Block",
  execute: (editor) => {
    const currentBlock = editor.getTextCursorPosition().block;
    editor.insertBlocks(
      [{ type: "codeBlock", props: { code: "", language: "javascript" } }],
      currentBlock,
      "after"
    );
  },
  aliases: ["code", "codeblock", "pre", "```", "snippet"],
  group: "Code",
  icon: <Code size={18} />,
  hint: "Insert an editable code block with syntax highlighting",
};

const noteCalloutItem: ReactSlashMenuItem<any, any, any> = {
  name: "Note",
  execute: (editor) => {
    const currentBlock = editor.getTextCursorPosition().block;
    editor.updateBlock(currentBlock, {
      type: "paragraph",
      content: [
        { type: "text", text: "📝 Note: ", styles: { bold: true } },
        { type: "text", text: "Your note here...", styles: {} },
      ],
    });
  },
  aliases: ["note", "callout", "info"],
  group: "Callouts",
  icon: <Info size={18} />,
  hint: "Insert a note callout",
};

const tipCalloutItem: ReactSlashMenuItem<any, any, any> = {
  name: "Tip",
  execute: (editor) => {
    const currentBlock = editor.getTextCursorPosition().block;
    editor.updateBlock(currentBlock, {
      type: "paragraph",
      content: [
        { type: "text", text: "💡 Tip: ", styles: { bold: true } },
        { type: "text", text: "Your tip here...", styles: {} },
      ],
    });
  },
  aliases: ["tip", "hint", "pro"],
  group: "Callouts",
  icon: <Lightbulb size={18} />,
  hint: "Insert a tip callout",
};

const warningCalloutItem: ReactSlashMenuItem<any, any, any> = {
  name: "Warning",
  execute: (editor) => {
    const currentBlock = editor.getTextCursorPosition().block;
    editor.updateBlock(currentBlock, {
      type: "paragraph",
      content: [
        { type: "text", text: "⚠️ Warning: ", styles: { bold: true } },
        { type: "text", text: "Your warning here...", styles: {} },
      ],
    });
  },
  aliases: ["warning", "caution", "alert"],
  group: "Callouts",
  icon: <AlertTriangle size={18} />,
  hint: "Insert a warning callout",
};

const dangerCalloutItem: ReactSlashMenuItem<any, any, any> = {
  name: "Danger",
  execute: (editor) => {
    const currentBlock = editor.getTextCursorPosition().block;
    editor.updateBlock(currentBlock, {
      type: "paragraph",
      content: [
        { type: "text", text: "🚨 Danger: ", styles: { bold: true } },
        { type: "text", text: "Your danger message here...", styles: {} },
      ],
    });
  },
  aliases: ["danger", "error", "critical"],
  group: "Callouts",
  icon: <AlertCircle size={18} />,
  hint: "Insert a danger callout",
};

const successCalloutItem: ReactSlashMenuItem<any, any, any> = {
  name: "Success",
  execute: (editor) => {
    const currentBlock = editor.getTextCursorPosition().block;
    editor.updateBlock(currentBlock, {
      type: "paragraph",
      content: [
        { type: "text", text: "✅ Success: ", styles: { bold: true } },
        { type: "text", text: "Your success message here...", styles: {} },
      ],
    });
  },
  aliases: ["success", "done", "check", "complete"],
  group: "Callouts",
  icon: <CheckCircle size={18} />,
  hint: "Insert a success callout",
};

// ── Editor component ──────────────────────────────────────────────────────────

const Editor: React.FC<EditorProps> = ({
  onChange,
  initialContent,
  editable = true,
}) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({ file });
    return response.url;
  };

  const editor = useBlockNote({
    blockSpecs,
    editable,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as any)
      : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUpload,
    slashMenuItems: [
      ...getDefaultReactSlashMenuItems(blockSchema),
      codeBlockItem,
      noteCalloutItem,
      tipCalloutItem,
      warningCalloutItem,
      dangerCalloutItem,
      successCalloutItem,
    ],
  });

  if (!mounted) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-pulse text-neutral-500">Loading editor...</div>
      </div>
    );
  }

  return (
    <BlockNoteView
      editor={editor}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
};

export default Editor;
