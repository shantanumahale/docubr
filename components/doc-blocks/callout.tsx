"use client";

import React from "react";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Info as InfoIcon,
  Lightbulb,
  XCircle,
  Bug,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutType =
  | "note"
  | "info"
  | "tip"
  | "warning"
  | "danger"
  | "success"
  | "caution"
  | "bug"
  | "example";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
  className?: string;
  collapsible?: boolean;
  defaultOpen?: boolean;
}

const calloutConfig: Record<
  CalloutType,
  {
    icon: React.ElementType;
    title: string;
    bgColor: string;
    borderColor: string;
    iconColor: string;
    titleColor: string;
  }
> = {
  note: {
    icon: InfoIcon,
    title: "Note",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    borderColor: "border-blue-200 dark:border-blue-800",
    iconColor: "text-blue-500 dark:text-blue-400",
    titleColor: "text-blue-700 dark:text-blue-300",
  },
  info: {
    icon: InfoIcon,
    title: "Info",
    bgColor: "bg-sky-50 dark:bg-sky-950/30",
    borderColor: "border-sky-200 dark:border-sky-800",
    iconColor: "text-sky-500 dark:text-sky-400",
    titleColor: "text-sky-700 dark:text-sky-300",
  },
  tip: {
    icon: Lightbulb,
    title: "Tip",
    bgColor: "bg-green-50 dark:bg-green-950/30",
    borderColor: "border-green-200 dark:border-green-800",
    iconColor: "text-green-500 dark:text-green-400",
    titleColor: "text-green-700 dark:text-green-300",
  },
  warning: {
    icon: AlertTriangle,
    title: "Warning",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
    borderColor: "border-yellow-200 dark:border-yellow-800",
    iconColor: "text-yellow-500 dark:text-yellow-400",
    titleColor: "text-yellow-700 dark:text-yellow-300",
  },
  danger: {
    icon: XCircle,
    title: "Danger",
    bgColor: "bg-red-50 dark:bg-red-950/30",
    borderColor: "border-red-200 dark:border-red-800",
    iconColor: "text-red-500 dark:text-red-400",
    titleColor: "text-red-700 dark:text-red-300",
  },
  success: {
    icon: CheckCircle,
    title: "Success",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    iconColor: "text-emerald-500 dark:text-emerald-400",
    titleColor: "text-emerald-700 dark:text-emerald-300",
  },
  caution: {
    icon: AlertCircle,
    title: "Caution",
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
    borderColor: "border-orange-200 dark:border-orange-800",
    iconColor: "text-orange-500 dark:text-orange-400",
    titleColor: "text-orange-700 dark:text-orange-300",
  },
  bug: {
    icon: Bug,
    title: "Known Issue",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
    borderColor: "border-purple-200 dark:border-purple-800",
    iconColor: "text-purple-500 dark:text-purple-400",
    titleColor: "text-purple-700 dark:text-purple-300",
  },
  example: {
    icon: Zap,
    title: "Example",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/30",
    borderColor: "border-indigo-200 dark:border-indigo-800",
    iconColor: "text-indigo-500 dark:text-indigo-400",
    titleColor: "text-indigo-700 dark:text-indigo-300",
  },
};

export const Callout: React.FC<CalloutProps> = ({
  type = "note",
  title,
  children,
  className,
  collapsible = false,
  defaultOpen = true,
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "my-4 rounded-lg border-l-4 p-4",
        config.bgColor,
        config.borderColor,
        className
      )}
    >
      <div
        className={cn(
          "flex items-start gap-3",
          collapsible && "cursor-pointer"
        )}
        onClick={() => collapsible && setIsOpen(!isOpen)}
      >
        <Icon className={cn("h-5 w-5 mt-0.5 flex-shrink-0", config.iconColor)} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className={cn("font-semibold text-sm", config.titleColor)}>
              {title || config.title}
            </p>
            {collapsible && (
              <svg
                className={cn(
                  "h-4 w-4 transition-transform",
                  config.iconColor,
                  isOpen && "rotate-180"
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </div>
          {(!collapsible || isOpen) && (
            <div className="mt-2 text-sm text-neutral-700 dark:text-neutral-300 prose prose-sm dark:prose-invert max-w-none">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Shorthand components for each type
export const Note: React.FC<Omit<CalloutProps, "type">> = (props) => (
  <Callout type="note" {...props} />
);

export const InfoCallout: React.FC<Omit<CalloutProps, "type">> = (props) => (
  <Callout type="info" {...props} />
);

export const Tip: React.FC<Omit<CalloutProps, "type">> = (props) => (
  <Callout type="tip" {...props} />
);

export const Warning: React.FC<Omit<CalloutProps, "type">> = (props) => (
  <Callout type="warning" {...props} />
);

export const Danger: React.FC<Omit<CalloutProps, "type">> = (props) => (
  <Callout type="danger" {...props} />
);

export const Success: React.FC<Omit<CalloutProps, "type">> = (props) => (
  <Callout type="success" {...props} />
);

export const Caution: React.FC<Omit<CalloutProps, "type">> = (props) => (
  <Callout type="caution" {...props} />
);

export const BugCallout: React.FC<Omit<CalloutProps, "type">> = (props) => (
  <Callout type="bug" {...props} />
);

export const Example: React.FC<Omit<CalloutProps, "type">> = (props) => (
  <Callout type="example" {...props} />
);

export default Callout;
