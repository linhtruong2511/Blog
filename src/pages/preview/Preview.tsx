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
import Thumbnail from "../article/Thumbnail";
import ArticleInformation from "../article/ArticleInformation";
import MainContent from "../article/MainContent";

const Preview = () => {
  const { content, desc, thumbnail, title, setContent } = useEditContext();
  const navigate = useNavigate();
  const dispath = useAppDispatch();
  const article = useRef<HTMLDivElement | null>(null);
  const toc = useRef<HTMLUListElement | null>(null);
  const { user, posts } = useAppSelector((s) => s.authReducer);

  let post: PostType = {
    authorId: user?.uid as string,
    contentId: "",
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

  const handleUpload = async () => {
    const tId = toast.loading("Đang tải lên");

    const contentId = (await createContent({
      createDate: getDateNow(),
      data: content,
    })) as string;
    post = { ...post, contentId: contentId };
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

  /**
   * Tạo mục lục và gán sự kiện load để tránh người dùng reload lại thì sẽ biến mất hết nội dung và thông tin của bài viết
   */
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
      <Thumbnail thumbnailURL={thumbnail} />
      {posts && user && (
        <ArticleInformation
          author={user}
          post={post}
        />
      )}
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

      <MainContent content={content} />

      {/* Đăng bài viết */}
      <div className="text-right" onClick={handleUpload}>
        <Button>Đăng bài viết</Button>
      </div>
      
    </div>
  );
};

export default Preview;
