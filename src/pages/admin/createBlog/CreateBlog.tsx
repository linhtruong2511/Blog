import { useState } from "react";
import Editor from "@/components/editor/Editor";
import UploadPost from "@/pages/admin/uploadPost/UploadPost";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link} from "react-router-dom";
import { createContent } from "@/service/contentService";
import { PostContentType } from "@/types/PostContentType";
import { getDateNow } from "@/utils/date";
import { addPost } from "@/service/postService";
import PostType, { StatusPost } from "@/types/PostType";
import { useAppSelector } from "@/store/hook";

export default function CreateBlog() {
  const [content, setContent] = useState<string>("");
  const [isSave, setIsSave] = useState<boolean>(false);
  const { user } = useAppSelector(s => s.authReducer);

  const handleSave = (content: string) => {
    setIsSave(true);
    setContent(content);
  };

  const handleUpload = async (
    title: string,
    shortDecs: string,
    thumbnail: string
  ) => {
    if (!content) return;
    const postContent: PostContentType = {
      createDate: getDateNow(),
      data: content,
    };
    createContent(postContent).then((contentId) => {
      if (!contentId) return;
      const post: PostType = {
        title: title,
        contentId: contentId,
        shortDesc: shortDecs,
        thumbnailURL: thumbnail,
        isDraft: false,
        createDate: getDateNow(),
        lastUpdate: getDateNow(),
        status: StatusPost.show,
        id: "",
        tags: [],
        view: 0,  
        authorId: user?.uid as string,
        vote: 0,
      };
      addPost(post)
    });
  };

  const handleBackToEdit = () => {
    setIsSave(false);
  };

  return (
    <>
      <header>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="border-r" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={"/admin/draft"}>Bài viết gần đây</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  {isSave ? (
                    <BreadcrumbLink asChild onClick={() => setIsSave(false)}>
                      <Link to={""}>Tạo bài viết</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>Tạo bài viết</BreadcrumbPage>
                  )}
                </BreadcrumbItem>

                {isSave && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Upload bài viết</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </header>

      {isSave ? (
        <UploadPost content={content} onBack={handleBackToEdit} onUpload={handleUpload} linkAfterUploaded='/admin'/>
      ) : (
        <div className="px-7">
          <Editor buttonSaveTitle="Tạo mới" children content={content} onSave={handleSave} />
        </div>
      )}
    </>
  );
}
