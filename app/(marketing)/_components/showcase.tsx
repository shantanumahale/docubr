"use client";

import React from "react";
import {
  CodeBlock,
  CodeTabs,
  Callout,
  Note,
  Tip,
  Warning,
  Danger,
  Steps,
  Step,
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
  Accordion,
  AccordionItem,
  ApiEndpoint,
  ParameterTable,
  PropsTable,
} from "@/components/doc-blocks";

export const Showcase: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-neutral-50 dark:bg-neutral-900/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            See It In Action
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Here&apos;s a preview of the components you can use in your documentation.
          </p>
        </div>

        <div className="space-y-12">
          {/* Code Blocks */}
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              Code Blocks with Syntax Highlighting
            </h3>
            <CodeBlock
              language="typescript"
              filename="api/users.ts"
              code={`import { Hono } from 'hono';

const app = new Hono();

app.get('/users/:id', async (c) => {
  const id = c.req.param('id');
  const user = await db.users.findUnique({ 
    where: { id } 
  });
  
  return c.json(user);
});

export default app;`}
            />
          </div>

          {/* Code Tabs */}
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              Multi-Language Code Examples
            </h3>
            <CodeTabs
              tabs={[
                {
                  language: "javascript",
                  label: "JavaScript",
                  code: `fetch('/api/users/123')
  .then(res => res.json())
  .then(data => console.log(data));`,
                },
                {
                  language: "python",
                  label: "Python",
                  code: `import requests

response = requests.get('/api/users/123')
data = response.json()
print(data)`,
                },
                {
                  language: "bash",
                  label: "cURL",
                  code: `curl -X GET https://api.example.com/users/123 \\
  -H "Authorization: Bearer YOUR_TOKEN"`,
                },
              ]}
            />
          </div>

          {/* Callouts */}
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              Callouts & Admonitions
            </h3>
            <div className="space-y-4">
              <Note>
                This is a note callout. Use it to highlight important information.
              </Note>
              <Tip>
                Pro tip: You can customize the title and make callouts collapsible!
              </Tip>
              <Warning>
                Be careful! This action cannot be undone.
              </Warning>
              <Danger>
                Critical: This will delete all your data permanently.
              </Danger>
            </div>
          </div>

          {/* Steps */}
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              Step-by-Step Guides
            </h3>
            <Steps>
              <Step title="Install the package">
                Run the following command to install the package:
                <CodeBlock
                  language="bash"
                  code="npm install @docubr/sdk"
                  showLineNumbers={false}
                />
              </Step>
              <Step title="Configure your project">
                Create a configuration file in your project root.
              </Step>
              <Step title="Start building">
                You&apos;re all set! Start creating amazing documentation.
              </Step>
            </Steps>
          </div>

          {/* API Reference */}
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              API Reference Blocks
            </h3>
            <ApiEndpoint
              method="POST"
              path="/api/v1/documents"
              description="Create a new document in your workspace."
            />
            <ParameterTable
              title="Request Body"
              parameters={[
                {
                  name: "title",
                  type: "string",
                  required: true,
                  description: "The title of the document",
                },
                {
                  name: "content",
                  type: "string",
                  required: false,
                  description: "The initial content in JSON format",
                },
                {
                  name: "parentId",
                  type: "string",
                  required: false,
                  description: "ID of the parent document for nesting",
                },
              ]}
            />
          </div>

          {/* Tabs */}
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              Content Tabs
            </h3>
            <Tabs defaultValue="overview">
              <TabList>
                <TabTrigger value="overview">Overview</TabTrigger>
                <TabTrigger value="installation">Installation</TabTrigger>
                <TabTrigger value="usage">Usage</TabTrigger>
              </TabList>
              <TabContent value="overview">
                <p className="text-neutral-600 dark:text-neutral-400">
                  Docubr is a powerful documentation platform that helps you create
                  beautiful technical documentation with ease.
                </p>
              </TabContent>
              <TabContent value="installation">
                <CodeBlock
                  language="bash"
                  code="npm install docubr"
                  showLineNumbers={false}
                />
              </TabContent>
              <TabContent value="usage">
                <p className="text-neutral-600 dark:text-neutral-400">
                  Import the components you need and start building your docs!
                </p>
              </TabContent>
            </Tabs>
          </div>

          {/* Accordion */}
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              Collapsible Sections
            </h3>
            <Accordion>
              <AccordionItem title="What is Docubr?">
                Docubr is a modern documentation platform designed specifically for
                technical documentation. It provides all the components you need to
                create beautiful, functional docs.
              </AccordionItem>
              <AccordionItem title="Is it free to use?">
                Yes! Docubr offers a generous free tier that includes all core
                features. Premium plans are available for teams that need advanced
                features.
              </AccordionItem>
              <AccordionItem title="Can I self-host?">
                Absolutely! Docubr is open-source and can be self-hosted on your own
                infrastructure.
              </AccordionItem>
            </Accordion>
          </div>

          {/* Props Table */}
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              Component Props Documentation
            </h3>
            <PropsTable
              props={[
                {
                  name: "variant",
                  type: '"default" | "outline" | "ghost"',
                  default: '"default"',
                  description: "The visual style variant of the button",
                },
                {
                  name: "size",
                  type: '"sm" | "md" | "lg"',
                  default: '"md"',
                  description: "The size of the button",
                },
                {
                  name: "disabled",
                  type: "boolean",
                  default: "false",
                  description: "Whether the button is disabled",
                },
                {
                  name: "onClick",
                  type: "() => void",
                  required: true,
                  description: "Callback function when button is clicked",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
