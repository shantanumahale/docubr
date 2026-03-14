"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./code-block";

// HTTP Method Badge
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";

const methodColors: Record<HttpMethod, string> = {
  GET: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  POST: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  PUT: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  PATCH: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  DELETE: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  HEAD: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  OPTIONS: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
};

interface MethodBadgeProps {
  method: HttpMethod;
  className?: string;
}

export const MethodBadge: React.FC<MethodBadgeProps> = ({ method, className }) => {
  return (
    <span
      className={cn(
        "px-2 py-1 text-xs font-bold rounded uppercase",
        methodColors[method],
        className
      )}
    >
      {method}
    </span>
  );
};

// API Endpoint Component
interface ApiEndpointProps {
  method: HttpMethod;
  path: string;
  description?: string;
  className?: string;
}

export const ApiEndpoint: React.FC<ApiEndpointProps> = ({
  method,
  path,
  description,
  className,
}) => {
  return (
    <div
      className={cn(
        "my-4 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <MethodBadge method={method} />
        <code className="text-sm font-mono text-neutral-800 dark:text-neutral-200">
          {path}
        </code>
      </div>
      {description && (
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
      )}
    </div>
  );
};

// Parameter Table
interface Parameter {
  name: string;
  type: string;
  required?: boolean;
  default?: string;
  description: string;
}

interface ParameterTableProps {
  title?: string;
  parameters: Parameter[];
  className?: string;
}

export const ParameterTable: React.FC<ParameterTableProps> = ({
  title,
  parameters,
  className,
}) => {
  return (
    <div className={cn("my-4", className)}>
      {title && (
        <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
          {title}
        </h4>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-800">
              <th className="text-left py-2 pr-4 font-semibold text-neutral-900 dark:text-neutral-100">
                Name
              </th>
              <th className="text-left py-2 pr-4 font-semibold text-neutral-900 dark:text-neutral-100">
                Type
              </th>
              <th className="text-left py-2 pr-4 font-semibold text-neutral-900 dark:text-neutral-100">
                Required
              </th>
              <th className="text-left py-2 pr-4 font-semibold text-neutral-900 dark:text-neutral-100">
                Default
              </th>
              <th className="text-left py-2 font-semibold text-neutral-900 dark:text-neutral-100">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {parameters.map((param, index) => (
              <tr
                key={index}
                className="border-b border-neutral-100 dark:border-neutral-800/50"
              >
                <td className="py-3 pr-4">
                  <code className="text-sm font-mono text-pink-600 dark:text-pink-400">
                    {param.name}
                  </code>
                </td>
                <td className="py-3 pr-4">
                  <code className="text-sm font-mono text-blue-600 dark:text-blue-400">
                    {param.type}
                  </code>
                </td>
                <td className="py-3 pr-4">
                  {param.required ? (
                    <span className="text-red-600 dark:text-red-400 font-medium">
                      Yes
                    </span>
                  ) : (
                    <span className="text-neutral-500">No</span>
                  )}
                </td>
                <td className="py-3 pr-4">
                  {param.default ? (
                    <code className="text-sm font-mono text-neutral-600 dark:text-neutral-400">
                      {param.default}
                    </code>
                  ) : (
                    <span className="text-neutral-400">-</span>
                  )}
                </td>
                <td className="py-3 text-neutral-600 dark:text-neutral-400">
                  {param.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Props Table (for component documentation)
interface PropDefinition {
  name: string;
  type: string;
  required?: boolean;
  default?: string;
  description: string;
}

interface PropsTableProps {
  props: PropDefinition[];
  className?: string;
}

export const PropsTable: React.FC<PropsTableProps> = ({ props, className }) => {
  return (
    <div className={cn("my-4 overflow-x-auto", className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b-2 border-neutral-200 dark:border-neutral-700">
            <th className="text-left py-3 pr-4 font-semibold text-neutral-900 dark:text-neutral-100">
              Prop
            </th>
            <th className="text-left py-3 pr-4 font-semibold text-neutral-900 dark:text-neutral-100">
              Type
            </th>
            <th className="text-left py-3 pr-4 font-semibold text-neutral-900 dark:text-neutral-100">
              Default
            </th>
            <th className="text-left py-3 font-semibold text-neutral-900 dark:text-neutral-100">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, index) => (
            <tr
              key={index}
              className="border-b border-neutral-100 dark:border-neutral-800"
            >
              <td className="py-3 pr-4">
                <code className="text-sm font-mono text-pink-600 dark:text-pink-400">
                  {prop.name}
                </code>
                {prop.required && (
                  <span className="ml-1 text-red-500 text-xs">*</span>
                )}
              </td>
              <td className="py-3 pr-4">
                <code className="text-xs font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                  {prop.type}
                </code>
              </td>
              <td className="py-3 pr-4">
                {prop.default ? (
                  <code className="text-sm font-mono text-neutral-600 dark:text-neutral-400">
                    {prop.default}
                  </code>
                ) : (
                  <span className="text-neutral-400">-</span>
                )}
              </td>
              <td className="py-3 text-neutral-600 dark:text-neutral-400">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Response Example
interface ResponseExampleProps {
  status: number;
  statusText?: string;
  body: string;
  language?: string;
  className?: string;
}

export const ResponseExample: React.FC<ResponseExampleProps> = ({
  status,
  statusText,
  body,
  language = "json",
  className,
}) => {
  const statusColor =
    status >= 200 && status < 300
      ? "text-green-600 dark:text-green-400"
      : status >= 400
      ? "text-red-600 dark:text-red-400"
      : "text-yellow-600 dark:text-yellow-400";

  return (
    <div className={cn("my-4", className)}>
      <div className="flex items-center gap-2 mb-2">
        <span className={cn("font-mono font-bold", statusColor)}>{status}</span>
        {statusText && (
          <span className="text-sm text-neutral-500">{statusText}</span>
        )}
      </div>
      <CodeBlock code={body} language={language} showLineNumbers={false} />
    </div>
  );
};

// Full API Reference Block
interface ApiReferenceProps {
  method: HttpMethod;
  path: string;
  description?: string;
  parameters?: Parameter[];
  requestBody?: {
    description?: string;
    example: string;
    language?: string;
  };
  responses?: {
    status: number;
    statusText?: string;
    description?: string;
    example: string;
  }[];
  className?: string;
}

export const ApiReference: React.FC<ApiReferenceProps> = ({
  method,
  path,
  description,
  parameters,
  requestBody,
  responses,
  className,
}) => {
  return (
    <div
      className={cn(
        "my-6 p-6 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950",
        className
      )}
    >
      {/* Endpoint Header */}
      <div className="flex items-center gap-3 mb-4">
        <MethodBadge method={method} />
        <code className="text-lg font-mono font-medium text-neutral-800 dark:text-neutral-200">
          {path}
        </code>
      </div>

      {description && (
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          {description}
        </p>
      )}

      {/* Parameters */}
      {parameters && parameters.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3 uppercase tracking-wide">
            Parameters
          </h4>
          <ParameterTable parameters={parameters} />
        </div>
      )}

      {/* Request Body */}
      {requestBody && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3 uppercase tracking-wide">
            Request Body
          </h4>
          {requestBody.description && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
              {requestBody.description}
            </p>
          )}
          <CodeBlock
            code={requestBody.example}
            language={requestBody.language || "json"}
          />
        </div>
      )}

      {/* Responses */}
      {responses && responses.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3 uppercase tracking-wide">
            Responses
          </h4>
          {responses.map((response, index) => (
            <div key={index} className="mb-4">
              {response.description && (
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                  {response.description}
                </p>
              )}
              <ResponseExample
                status={response.status}
                statusText={response.statusText}
                body={response.example}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApiReference;
