"use client";

import React from "react";
import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Documents: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({
      title: "Untitled",
    }).then((documentId) => router.push(`/documents/${documentId}`));
    toast.promise(promise, {
      loading: "Create a new doc..",
      success: "New doc created!",
      error: "Failed to create a new doc.",
    });
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4">
      <Image
        src="/next.svg"
        alt=""
        width={300}
        height={300}
        className="dark:invert"
      />
      <h2>{`Welcome to ${user?.firstName}'s Docubr`}</h2>
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a document
      </Button>
    </div>
  );
};

export default Documents;
