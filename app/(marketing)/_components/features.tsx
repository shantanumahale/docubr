"use client";

import React from "react";
import {
  Code2,
  FileText,
  Search,
  Palette,
  GitBranch,
  Users,
  Zap,
  BookOpen,
  Terminal,
  Layers,
  MessageSquare,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  className,
}) => {
  return (
    <div
      className={cn(
        "group p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all duration-300",
        className
      )}
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
          {title}
        </h3>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        {description}
      </p>
    </div>
  );
};

const features = [
  {
    icon: <Code2 className="h-5 w-5" />,
    title: "Syntax Highlighting",
    description:
      "Beautiful code blocks with syntax highlighting for 20+ languages. Copy button included.",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    title: "API References",
    description:
      "Document your APIs with method badges, parameter tables, and response examples.",
  },
  {
    icon: <Layers className="h-5 w-5" />,
    title: "Rich Components",
    description:
      "Callouts, tabs, accordions, steps, and more. Everything you need for great docs.",
  },
  {
    icon: <Search className="h-5 w-5" />,
    title: "Full-Text Search",
    description:
      "Lightning-fast search across all your documentation with keyboard shortcuts.",
  },
  {
    icon: <Palette className="h-5 w-5" />,
    title: "Dark Mode",
    description:
      "Beautiful light and dark themes that your developers will love.",
  },
  {
    icon: <GitBranch className="h-5 w-5" />,
    title: "Version Control",
    description:
      "Track changes, manage versions, and maintain documentation history.",
  },
  {
    icon: <Terminal className="h-5 w-5" />,
    title: "Code Tabs",
    description:
      "Show code examples in multiple languages with easy tab switching.",
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: "Table of Contents",
    description:
      "Auto-generated TOC with scroll spy for easy navigation.",
  },
  {
    icon: <MessageSquare className="h-5 w-5" />,
    title: "Feedback System",
    description:
      "Built-in 'Was this helpful?' feedback to improve your docs.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Team Collaboration",
    description:
      "Work together with your team in real-time with live updates.",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "Public Sharing",
    description:
      "Publish your docs publicly or keep them private for your team.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Fast & Responsive",
    description:
      "Optimized for speed with instant page loads and mobile support.",
  },
];

export const Features: React.FC = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            Everything You Need for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Great Documentation
            </span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Powerful features designed specifically for technical documentation.
            No compromises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
