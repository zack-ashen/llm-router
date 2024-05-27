import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

// import "./katex.css";

export default function ChatContent({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  return (
    <Markdown
      className={`${className} prose marker:text-grey-900 prose-p:text-grey-900 prose-headings:text-grey-900 prose-li:text-grey-900 prose-p:my-1`}
      remarkPlugins={[remarkBreaks, remarkGfm, remarkMath]}
      rehypePlugins={[rehypeHighlight, rehypeKatex]}
    >
      {content}
    </Markdown>
  );
}
