"use client";

import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import React from "react";
import { BookOpen } from "lucide-react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const Logo: React.FC = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
        <BookOpen className="h-5 w-5 text-white" />
      </div>
      <p className={cn("font-semibold text-lg", font.className)}>
        Docubr
      </p>
    </div>
  );
};

export default Logo;
