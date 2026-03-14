"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Error: React.FC = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4">
      <p className="text-xl font-medium">Something went wrong!</p>
      <Button asChild>
        <Link href={`/documents`}>Go Back</Link>
      </Button>
    </div>
  );
};

export default Error;
