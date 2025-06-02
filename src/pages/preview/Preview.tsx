import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEditContext } from "@/context/EditContext";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { getDateNow } from "@/utils/date";
import { createToc } from "@/utils/toc";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Preview = () => {
  const { content, setContent, desc, thumbnail, title } = useEditContext();
  const navigate = useNavigate();
  const dispath = useAppDispatch();
  const article = useRef<HTMLDivElement | null>(null);
  const toc = useRef<HTMLUListElement | null>(null);
  const { user } = useAppSelector((s) => s.authReducer);
  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    if (!article.current || !toc.current) return;
    createToc(article.current, toc.current);

    window.addEventListener("beforeunload", (e) => {
      setContent(content);
    });

    if (content === "") {
      setContent(localStorage.getItem("autoSave") as string);
    }

    return () => {
      window.removeEventListener("beforeunload", () => {});
    };
  }, []);

  return (
    <div className="container mx-auto my-5 max-w-[1120px] px-2 md:px-0">
      <span onClick={() => navigate("/edit")} className="cursor-pointer">
        <FaArrowLeft className="inline mr-3" /> Quay lại Editor
      </span>

      {/* anh bia */}
      <div className="lg:h-[700px] md:my-3">
        <img src={thumbnail} alt="" className="w-full h-full object-contain" />
      </div>

      {/* tieu de */}
      <h1 className="text-2xl lg:text-4xl font-[Montserrat]">
        <b>{title}</b>
      </h1>

      {/* meta data */}
      <div className="flex gap-10 mb-5 mt-1">
        <p>Lần cập nhật cuối: {getDateNow()}</p>
        <p className="flex gap-2 items-center">
          {" "}
          <FaEye className="inline" /> {0}
        </p>
      </div>

      <hr />

      {/* Noi dung chinh */}
      <div
        className=" flex flex-col-reverse lg:flex-row gap-5"
        style={{
          scrollBehavior: "smooth",
        }}
      >
        {/* bai viet */}
        <div
          ref={article}
          className="flex-5/6 article-content"
          dangerouslySetInnerHTML={{ __html: content as string }}
        ></div>

        {/* muc luc */}
        <div className="hidden lg:block relative flex-1/6">
          <ul
            ref={toc}
            className="toc sticky top-5 border-b border max-h-[600px] p-2 rounded-sm mt-5  overflow-y-auto list-disc"
          >
            <span className="text-xl font-bold block border-b">Mục lục:</span>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Preview;
