import { createToc } from "@/utils/toc";
import { useEffect, useRef } from "react";
interface Props {
  content: string;
}
const MainContent = ({ content }: Props) => {
  const article = useRef<HTMLDivElement | null>(null);
  const toc = useRef<HTMLUListElement | null>(null);

  /**
   * Tạo mục lục động
   */
  useEffect(() => {
    if (!article.current || !toc.current) return;
    createToc(article.current, toc.current);
  }, [content]);

  return (
    <div
      className=" flex flex-col-reverse lg:flex-row gap-5"
      style={{
        scrollBehavior: "smooth",
      }}
    >
      <div
        ref={article}
        className="flex-5/6 article-content"
        dangerouslySetInnerHTML={{ __html: content as string }}
      ></div>

      <div className="hidden lg:block relative">
        <ul
          ref={toc}
          className="toc sticky top-5 border-b border max-h-[600px] p-2 rounded-sm mt-5  overflow-y-auto list-disc"
        >
          <span className="text-xl font-bold block border-b">Mục lục:</span>
        </ul>
      </div>
    </div>
  );
};

export default MainContent;
