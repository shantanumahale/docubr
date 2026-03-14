"use client";

import React, { useEffect, useState } from "react";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

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

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as any)
      : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUpload,
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
        /* Enhanced code block styling for BlockNote */
        .bn-editor .bn-block-content[data-content-type="codeBlock"] {
          border-radius: 8px;
          overflow: hidden;
          margin: 0.5rem 0;
          border: 1px solid #e5e7eb;
        }
        
        [data-theme="dark"] .bn-editor .bn-block-content[data-content-type="codeBlock"] {
          border-color: #374151;
        }
        
        .bn-editor .bn-block-content[data-content-type="codeBlock"] pre {
          margin: 0;
          padding: 1rem;
          background: #1e1e1e !important;
          overflow-x: auto;
          font-size: 0.875rem;
          line-height: 1.6;
        }
        
        .bn-editor .bn-block-content[data-content-type="codeBlock"] code {
          font-family: 'Fira Code', 'Monaco', 'Consolas', 'Courier New', monospace;
          color: #d4d4d4;
        }
        
        /* Light theme code block */
        [data-theme="light"] .bn-editor .bn-block-content[data-content-type="codeBlock"] pre {
          background: #f8f9fa !important;
        }
        
        [data-theme="light"] .bn-editor .bn-block-content[data-content-type="codeBlock"] code {
          color: #1f2937;
        }
        
        /* Inline code styling */
        .bn-editor code:not(pre code) {
          background: #f3f4f6;
          padding: 0.125rem 0.375rem;
          border-radius: 4px;
          font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
          font-size: 0.875em;
          color: #db2777;
        }
        
        [data-theme="dark"] .bn-editor code:not(pre code) {
          background: #374151;
          color: #f472b6;
        }
        
        /* Slash menu styling */
        .bn-slash-menu {
          max-height: 300px;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
};

export default Editor;
