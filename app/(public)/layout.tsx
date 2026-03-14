"use client";

import React from "react";

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="h-screen flex dark:bg-[#1F1F1F]">
      <main className="flex-1 h-full overflow-y-auto">{children}</main>
    </div>
  );
};

export default PublicLayout;
