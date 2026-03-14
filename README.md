# Docubr - Technical Documentation Platform

A modern, feature-rich technical documentation platform built with Next.js 14, Convex, and Clerk. Create beautiful API documentation, developer guides, and knowledge bases with ease.

![Docubr](https://img.shields.io/badge/Docubr-Technical%20Docs-blue)

## ✨ Features

### 📝 Rich Documentation Components

- **Code Blocks** - Syntax highlighting for 20+ languages with copy button
- **Code Tabs** - Show code examples in multiple languages
- **Callouts/Admonitions** - Note, Info, Tip, Warning, Danger, Success, and more
- **API Reference Blocks** - Document REST APIs with method badges and parameter tables
- **Props Tables** - Document component props with types and defaults
- **Steps** - Create step-by-step guides with numbered steps
- **Tabs** - Organize content with tabbed interfaces
- **Accordions** - Collapsible sections for FAQs and more
- **Timeline** - Display chronological information

### 🧭 Navigation

- **Table of Contents** - Auto-generated from headings with scroll spy
- **Breadcrumb Navigation** - Show document hierarchy
- **Previous/Next Navigation** - Navigate between sibling documents
- **Full-Text Search** - Search across all documents with `⌘K` or `/`

### 📊 Document Features

- **Reading Time** - Estimated reading time for each document
- **Last Updated** - Track when documents were last modified
- **Version Badges** - Show version and status (stable, beta, alpha)
- **Tags** - Organize documents with tags
- **Descriptions** - Add descriptions to documents

### 💬 Engagement

- **Feedback System** - "Was this helpful?" with comments
- **Public Sharing** - Publish documents publicly

### 🎨 Design

- **Dark/Light Mode** - Beautiful themes for all preferences
- **Responsive Design** - Works on all devices
- **Modern UI** - Clean, professional design

## 🚀 Getting Started

### Prerequisites

- Node.js 24+ (required for Vercel deployment)
- npm or yarn
- Convex account
- Clerk account
- EdgeStore account (for image uploads)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/docubr.git
cd docubr
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Add your API keys:

```env
CONVEX_DEPLOYMENT=your_convex_deployment
NEXT_PUBLIC_CONVEX_URL=your_convex_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
EDGE_STORE_ACCESS_KEY=your_edgestore_key
EDGE_STORE_SECRET_KEY=your_edgestore_secret
```

4. Start the development server:

```bash
npm run dev
```

5. In a separate terminal, start Convex:

```bash
npx convex dev
```

Open [http://localhost:3002](http://localhost:3002) to see the app.

## 📦 Documentation Components

### Code Block

```tsx
import { CodeBlock } from "@/components/doc-blocks";

<CodeBlock
  language="typescript"
  filename="api/users.ts"
  code={`const user = await getUser(id);`}
  showLineNumbers={true}
  highlightLines={[1, 3]}
/>;
```

### Code Tabs

```tsx
import { CodeTabs } from "@/components/doc-blocks";

<CodeTabs
  tabs={[
    { language: "javascript", label: "JavaScript", code: "..." },
    { language: "python", label: "Python", code: "..." },
  ]}
/>;
```

### Callouts

```tsx
import { Note, Tip, Warning, Danger } from "@/components/doc-blocks";

<Note>This is important information.</Note>
<Tip>Pro tip for better results!</Tip>
<Warning>Be careful with this action.</Warning>
<Danger>This action cannot be undone!</Danger>
```

### API Reference

```tsx
import { ApiEndpoint, ParameterTable } from "@/components/doc-blocks";

<ApiEndpoint
  method="POST"
  path="/api/v1/users"
  description="Create a new user"
/>

<ParameterTable
  parameters={[
    { name: "email", type: "string", required: true, description: "User email" },
    { name: "name", type: "string", required: false, description: "User name" },
  ]}
/>
```

### Steps

```tsx
import { Steps, Step } from "@/components/doc-blocks";

<Steps>
  <Step title="Install the package">Run `npm install docubr`</Step>
  <Step title="Configure">Create a config file</Step>
</Steps>;
```

### Tabs

```tsx
import { Tabs, TabList, TabTrigger, TabContent } from "@/components/doc-blocks";

<Tabs defaultValue="overview">
  <TabList>
    <TabTrigger value="overview">Overview</TabTrigger>
    <TabTrigger value="api">API</TabTrigger>
  </TabList>
  <TabContent value="overview">Overview content</TabContent>
  <TabContent value="api">API content</TabContent>
</Tabs>;
```

### Accordion

```tsx
import { Accordion, AccordionItem } from "@/components/doc-blocks";

<Accordion>
  <AccordionItem title="What is Docubr?">
    Docubr is a documentation platform...
  </AccordionItem>
</Accordion>;
```

## ⌨️ Keyboard Shortcuts

| Shortcut         | Action                          |
| ---------------- | ------------------------------- |
| `⌘K` or `Ctrl+K` | Open search                     |
| `/`              | Open search (when not in input) |
| `↑↓`             | Navigate search results         |
| `Enter`          | Select search result            |
| `Esc`            | Close search                    |

## 🏗️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Database**: [Convex](https://convex.dev/) - Real-time backend
- **Authentication**: [Clerk](https://clerk.com/)
- **File Storage**: [EdgeStore](https://edgestore.dev/)
- **Editor**: [BlockNote](https://www.blocknotejs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)

## 📁 Project Structure

```
docubr/
├── app/
│   ├── (main)/           # Authenticated app routes
│   ├── (marketing)/      # Landing page
│   └── (public)/         # Public preview routes
├── components/
│   ├── doc-blocks/       # Documentation components
│   ├── providers/        # Context providers
│   └── ui/               # UI components
├── convex/               # Backend functions & schema
├── hooks/                # Custom React hooks
└── lib/                  # Utilities
```

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a PR.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- Inspired by [Notion](https://notion.so), [GitBook](https://gitbook.com), and [Mintlify](https://mintlify.com)
- Built with amazing open-source tools

---

Made with ❤️ by the Docubr team
