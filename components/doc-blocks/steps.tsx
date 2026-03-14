"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepProps {
  number?: number;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Step: React.FC<StepProps> = ({
  number,
  title,
  children,
  className,
}) => {
  return (
    <div className={cn("relative pl-10 pb-8 last:pb-0", className)}>
      {/* Vertical line */}
      <div className="absolute left-4 top-8 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800 last:hidden" />
      
      {/* Step number */}
      <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold text-sm">
        {number}
      </div>
      
      {/* Content */}
      <div>
        <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
          {title}
        </h4>
        <div className="text-sm text-neutral-600 dark:text-neutral-400 prose prose-sm dark:prose-invert max-w-none">
          {children}
        </div>
      </div>
    </div>
  );
};

interface StepsProps {
  children: React.ReactNode;
  className?: string;
}

export const Steps: React.FC<StepsProps> = ({ children, className }) => {
  // Clone children and add step numbers
  const childrenWithNumbers = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<StepProps>, {
        number: index + 1,
      });
    }
    return child;
  });

  return (
    <div className={cn("my-6", className)}>
      {childrenWithNumbers}
    </div>
  );
};

// Checklist style steps
interface ChecklistItemProps {
  checked?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const ChecklistItem: React.FC<ChecklistItemProps> = ({
  checked = false,
  children,
  className,
}) => {
  return (
    <div className={cn("flex items-start gap-3 py-2", className)}>
      <div
        className={cn(
          "flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5",
          checked
            ? "bg-green-500 border-green-500"
            : "border-neutral-300 dark:border-neutral-600"
        )}
      >
        {checked && <Check className="h-3 w-3 text-white" />}
      </div>
      <div
        className={cn(
          "text-sm",
          checked
            ? "text-neutral-500 dark:text-neutral-500 line-through"
            : "text-neutral-700 dark:text-neutral-300"
        )}
      >
        {children}
      </div>
    </div>
  );
};

interface ChecklistProps {
  children: React.ReactNode;
  className?: string;
}

export const Checklist: React.FC<ChecklistProps> = ({ children, className }) => {
  return <div className={cn("my-4", className)}>{children}</div>;
};

// Timeline component
interface TimelineItemProps {
  date?: string;
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  date,
  title,
  children,
  icon,
  className,
}) => {
  return (
    <div className={cn("relative pl-8 pb-8 last:pb-0", className)}>
      {/* Vertical line */}
      <div className="absolute left-3 top-6 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800" />
      
      {/* Dot/Icon */}
      <div className="absolute left-0 top-1 flex items-center justify-center w-6 h-6 rounded-full bg-neutral-100 dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-600">
        {icon || (
          <div className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-500" />
        )}
      </div>
      
      {/* Content */}
      <div>
        {date && (
          <span className="text-xs text-neutral-500 dark:text-neutral-500 font-medium">
            {date}
          </span>
        )}
        <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
          {title}
        </h4>
        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          {children}
        </div>
      </div>
    </div>
  );
};

interface TimelineProps {
  children: React.ReactNode;
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ children, className }) => {
  return <div className={cn("my-6", className)}>{children}</div>;
};

export default Steps;
