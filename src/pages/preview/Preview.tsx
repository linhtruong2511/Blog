import { Button } from "@/components/ui/button";
import { useEditContext } from "@/context/EditContext";
import { setUserPosts } from "@/reducer/authReducer";
import { add } from "@/reducer/postReducer";
import { createContent } from "@/service/contentService";
import { addPost } from "@/service/postService";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import PostType, { StatusPost } from "@/types/PostType";
import { getDateNow } from "@/utils/date";
import { createToc } from "@/utils/toc";
import { useEffect, useRef } from "react";
import { FaArrowLeft, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Preview = () => {
  const { content, desc, thumbnail, title, setContent } = useEditContext();
  const navigate = useNavigate();
  const dispath = useAppDispatch();
  const article = useRef<HTMLDivElement | null>(null);
  const toc = useRef<HTMLUListElement | null>(null);
  const { user, posts } = useAppSelector((s) => s.authReducer);

  const handleUpload = async () => {
    const tId = toast.loading("Đang tải lên");

    const contentId = (await createContent({
      createDate: getDateNow(),
      data: content,
    })) as string;

    const post: PostType = {
      authorId: user?.uid as string,
      contentId: contentId,
      createDate: getDateNow(),
      id: "",
      isDraft: false,
      lastUpdate: getDateNow(),
      shortDesc: desc,
      status: StatusPost.pending,
      tags: [],
      thumbnailURL: thumbnail,
      title: title,
      view: 0,
      vote: 0,
    };

    const id = await addPost(post);

    toast.dismiss(tId);
    toast.success(
      "Bài của bạn đã đăng tải thành công, admin sẽ duyệt bài trong thời gian sớm nhất !"
    );

    dispath(
      setUserPosts([
        ...posts,
        {
          ...post,
          id: id as string,
        },
      ])
    );
    navigate("/account");
  };

  useEffect(() => {
    if (!article.current || !toc.current) return;
    createToc(article.current, toc.current);

    window.addEventListener("beforeunload", () => {
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

      {/* Đăng bài viết */}
      <div className="text-right" onClick={handleUpload}>
        <Button>Đăng bài viết</Button>
      </div>
    </div>
  );
};

export default Preview;
