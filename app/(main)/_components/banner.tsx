"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ConfirmModal from "./modals/confirm-modal";

interface BannerProps {
  documentId: Id<"documents">;
}

const Banner: React.FC<BannerProps> = ({ documentId }) => {
  const router = useRouter();

  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRestore = () => {
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring doc..",
      success: "Doc restored",
      error: "Failed to restore doc.",
    });
  };

  const onRemove = () => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "Deleting doc..",
      success: "Doc deleted",
      error: "Failed to delete doc.",
    });
    router.push("/documents");
  };

  return (
    <div className="'w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
      <p>This page is in the trash</p>
      <Button
        size={"sm"}
        onClick={onRestore}
        variant={"outline"}
        className="border-white bg-transparent hover:bg-primary/20 text-white hover:text-white p-1 px-2 h-auto font-normal">
        Restore
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size={"sm"}
          variant={"outline"}
          className="border-white bg-transparent hover:bg-primary/20 text-white hover:text-white p-1 px-2 h-auto font-normal">
          Delete Forever
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default Banner;
