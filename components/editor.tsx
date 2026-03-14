"use client";

import React, { useEffect, useState } from "react";
import { BlockNoteEditor } from "@blocknote/core";
import {
  BlockNoteView,
  useBlockNote,
  getDefaultReactSlashMenuItems,
  ReactSlashMenuItem,
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
} from "lucide-react";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

// Custom slash menu item for Code Block
const insertCodeBlock = (editor: BlockNoteEditor<any, any, any>) => {
  const currentBlock = editor.getTextCursorPosition().block;
  
  // Insert a new paragraph with code-styled content
  editor.insertBlocks(
    [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "// Your code here",
            styles: { code: true },
          },
        ],
      },
    ],
    currentBlock,
    "after"
  );
};

const codeBlockItem: ReactSlashMenuItem<any, any, any> = {
  name: "Code Block",
  execute: insertCodeBlock,
  aliases: ["code", "codeblock", "pre", "```", "snippet"],
  group: "Code",
  icon: <Code size={18} />,
  hint: "Insert a code block",
};

// Custom slash menu item for Note callout
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

// Custom slash menu item for Tip callout
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

// Custom slash menu item for Warning callout
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

// Custom slash menu item for Danger callout
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

// Custom slash menu item for Success callout
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
    const response = await edgestore.publicFiles.upload({
      file,
    });
    return response.url;
  };

  // Get default items and add custom ones
  const customSlashMenuItems = [
    ...getDefaultReactSlashMenuItems(),
    codeBlockItem,
    noteCalloutItem,
    tipCalloutItem,
    warningCalloutItem,
    dangerCalloutItem,
    successCalloutItem,
  ];

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as any)
      : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUpload,
    slashMenuItems: customSlashMenuItems,
  });

  if (!mounted) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-pulse text-neutral-500">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className="relative">
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
      <style jsx global>{`
        /* Enhanced code styling */
        .bn-editor .bn-inline-content [data-text-style-code="true"],
        .bn-editor code {
          background: #1e1e1e;
          color: #d4d4d4;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-family: 'Fira Code', 'Monaco', 'Consolas', 'Courier New', monospace;
          font-size: 0.875em;
        }
        
        /* Light theme code */
        [data-theme="light"] .bn-editor .bn-inline-content [data-text-style-code="true"],
        [data-theme="light"] .bn-editor code {
          background: #f6f8fa;
          color: #24292f;
        }
        
        /* Slash menu styling */
        .bn-slash-menu {
          max-height: 400px;
          overflow-y: auto;
        }
        
        /* Group headers in slash menu */
        .bn-slash-menu .bn-slash-menu-group-label {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          color: #6b7280;
          padding: 0.5rem 0.75rem;
        }
      `}</style>
    </div>
  );
};

export default Editor;
