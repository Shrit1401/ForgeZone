"use client";
import React, { useState, useEffect } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import Prisma from "react-syntax-highlighter/dist/esm/prism";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import ReactPlayer from "react-player";
import { ClipboardIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";

type MarkdownProps = {
  source: string;
  name: string;
};

const CourseMarkdown: React.FC<MarkdownProps> = ({ source, name }) => {
  const [markdown, setMarkdown] = useState<string>("");

  useEffect(() => {
    const fetchMarkdown = async () => {
      const response = await fetch(source);
      const text = await response.text();
      setMarkdown(text);
    };

    fetchMarkdown();
  }, []);

  const codeComponent: Components = {
    code({ node, inline, className, children, style, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");

      const handleCopy = () => {
        navigator.clipboard.writeText(String(children));
      };

      return !inline && match ? (
        <div className="relative">
          {(() => {
            const [copied, setCopied] = useState(false);

            const handleCopyClick = () => {
              navigator.clipboard.writeText(String(children));
              setCopied(true);
              setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
            };

            return (
              <button
                onClick={handleCopyClick}
                className="absolute top-2 right-2 p-2 cursor-pointer rounded-lg hover:bg-black/50"
                aria-label="Copy code"
              >
                {copied ? (
                  <CheckBadgeIcon className="w-5 h-5 text-white/60" />
                ) : (
                  <ClipboardIcon className="w-5 h-5 text-white/60" />
                )}
              </button>
            );
          })()}
          <Prisma
            style={vscDarkPlus}
            language={match[1]}
            PreTag="div"
            className="rounded-md"
            {...props}
          >
            {String(children).replace(/\n$/, "")}
          </Prisma>
        </div>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  const renderLink = (props: any) => {
    const { href, children } = props;
    const vimeoRegex = /https?:\/\/(www\.)?vimeo\.com\/(\d+)/;
    const match = vimeoRegex.exec(href);

    if (match) {
      const videoId = match[2];
      return (
        <div className="my-4">
          <ReactPlayer url={`https://vimeo.com/${videoId}`} controls />
        </div>
      );
    }

    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-4">
      <h1 className="text-6xl manrope font-semibold mb-8">{name}</h1>
      <div className="prose prose-invert prose-p:text-lg prose-h3:text-2xl prose-p:leading-loose prose-img:rounded-lg max-w-2xl">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            ...codeComponent,
            a: renderLink,
            h1: ({ node, ...props }) => (
              <h1 className=" font-bold manrope" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className=" font-bold manrope" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className=" font-bold manrope" {...props} />
            ),
            h4: ({ node, ...props }) => (
              <h4 className=" font-bold manrope" {...props} />
            ),
            h5: ({ node, ...props }) => (
              <h5 className=" font-bold manrope" {...props} />
            ),
            h6: ({ node, ...props }) => (
              <h6 className=" font-bold manrope" {...props} />
            ),
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default CourseMarkdown;
