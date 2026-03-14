"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight, BookOpen, Code2, FileText, Zap } from "lucide-react";
import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-4xl space-y-6">
      {/* Badge */}
      <div className="flex justify-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">
          <Zap className="h-4 w-4" />
          Technical Documentation Made Simple
        </span>
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center">
        Build Beautiful{" "}
        <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          Technical Docs
        </span>{" "}
        <br className="hidden sm:block" />
        Your Users Will Love
      </h1>
      
      <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 text-center max-w-2xl mx-auto">
        Create stunning API documentation, developer guides, and knowledge bases 
        with our powerful editor. Code blocks, callouts, API references, and more — 
        all in one place.
      </p>

      {/* Feature highlights */}
      <div className="flex flex-wrap justify-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4 text-blue-500" />
          <span>Syntax Highlighting</span>
        </div>
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-green-500" />
          <span>API References</span>
        </div>
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-purple-500" />
          <span>Version Control</span>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        {isLoading && (
          <div className="w-full flex items-center justify-center">
            <Spinner size={"lg"} />
          </div>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href={"/documents"}>
                Go to Dashboard
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href={"/documents"}>
                View Documentation
              </Link>
            </Button>
          </>
        )}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started Free
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </SignInButton>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              View Demo
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
