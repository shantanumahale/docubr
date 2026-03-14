"use client";

import CoverImageModal from "@/app/(main)/_components/modals/cover-image-modal";
import SettingsModal from "@/app/(main)/_components/modals/settings-modal";
import React, { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <>
      <SettingsModal />
      <CoverImageModal />
    </>
  );
};
