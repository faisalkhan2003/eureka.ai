import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { formatAIText } from "../lib/utils";

// register languages
SyntaxHighlighter.registerLanguage("javascript", js);

export function AIMessage({ text }) {
  return (
    <div className="prose dark:prose-invert max-w-full">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={atomOneDark}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded" {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {formatAIText(text)}
      </ReactMarkdown>
    </div>
  );
}
