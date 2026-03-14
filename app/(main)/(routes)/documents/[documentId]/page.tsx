"use client";
import { Cover } from "@/components/cover";
import Editor from "@/components/editor";
import { Toolbar } from "@/components/toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";

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
      }),
    []
  );
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  const update = useMutation(api.documents.update);

  const onChange = (content: string) => {
    update({
      id: params.documentId,
      content,
    });
  };

  if (document === undefined) {
    return <div>Loading...</div>;
  }
  if (document === null) {
    return <div>Not Found!</div>;
  }
  return (
    <div className="pb-40">
      <Cover url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
        <Editor onChange={onChange} initialContent={document.content} />
      </div>
    </div>
  );
};

export default DocumentIdPage;
