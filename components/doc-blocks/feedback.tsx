"use client";

import React, { useState } from "react";
import { ThumbsUp, ThumbsDown, MessageSquare, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeedbackProps {
  documentId?: string;
  onFeedback?: (helpful: boolean, comment?: string) => void;
  className?: string;
}

export const Feedback: React.FC<FeedbackProps> = ({
  documentId,
  onFeedback,
  className,
}) => {
  const [feedback, setFeedback] = useState<"helpful" | "not-helpful" | null>(null);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFeedback = (isHelpful: boolean) => {
    setFeedback(isHelpful ? "helpful" : "not-helpful");
    if (!isHelpful) {
      setShowComment(true);
    } else {
      onFeedback?.(true);
      setSubmitted(true);
    }
  };

  const handleSubmitComment = () => {
    onFeedback?.(feedback === "helpful", comment);
    setSubmitted(true);
    setShowComment(false);
  };

  if (submitted) {
    return (
      <div
        className={cn(
          "flex items-center justify-center gap-2 py-6 px-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800",
          className
        )}
      >
        <ThumbsUp className="h-5 w-5 text-green-600 dark:text-green-400" />
        <span className="text-sm font-medium text-green-700 dark:text-green-300">
          Thank you for your feedback!
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "py-6 px-4 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800",
        className
      )}
    >
      <div className="text-center">
        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-4">
          Was this page helpful?
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => handleFeedback(true)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors",
              feedback === "helpful"
                ? "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-700 dark:text-green-300"
                : "border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            )}
          >
            <ThumbsUp className="h-4 w-4" />
            Yes
          </button>
          <button
            onClick={() => handleFeedback(false)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors",
              feedback === "not-helpful"
                ? "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700 text-red-700 dark:text-red-300"
                : "border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            )}
          >
            <ThumbsDown className="h-4 w-4" />
            No
          </button>
        </div>
      </div>

      {showComment && (
        <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            How can we improve this page?
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Your feedback helps us improve our documentation..."
            className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-none"
            rows={3}
          />
          <div className="flex items-center justify-end gap-2 mt-3">
            <button
              onClick={() => {
                setShowComment(false);
                setFeedback(null);
              }}
              className="px-3 py-1.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitComment}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Send className="h-3.5 w-3.5" />
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Simple inline feedback
interface InlineFeedbackProps {
  onFeedback?: (helpful: boolean) => void;
  className?: string;
}

export const InlineFeedback: React.FC<InlineFeedbackProps> = ({
  onFeedback,
  className,
}) => {
  const [feedback, setFeedback] = useState<boolean | null>(null);

  const handleFeedback = (isHelpful: boolean) => {
    setFeedback(isHelpful);
    onFeedback?.(isHelpful);
  };

  if (feedback !== null) {
    return (
      <span
        className={cn(
          "text-sm text-green-600 dark:text-green-400",
          className
        )}
      >
        Thanks for your feedback!
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-2 text-sm", className)}>
      <span className="text-neutral-500 dark:text-neutral-400">Helpful?</span>
      <button
        onClick={() => handleFeedback(true)}
        className="p-1 text-neutral-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
        aria-label="Yes, this was helpful"
      >
        <ThumbsUp className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleFeedback(false)}
        className="p-1 text-neutral-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
        aria-label="No, this was not helpful"
      >
        <ThumbsDown className="h-4 w-4" />
      </button>
    </span>
  );
};

export default Feedback;
