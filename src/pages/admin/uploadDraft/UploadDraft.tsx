import { getPost, updatePost } from "@/service/postService";
import PostType, { StatusPost } from "@/types/PostType";
import { useEffect, useState } from "react";
import { Link, redirect, useParams } from "react-router-dom";
import UploadPost from "../uploadPost/UploadPost";
// import { PostContentType } from "@/types/PostContentType";
import { getContent, updateContent } from "@/service/contentService";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getDateNow } from "@/utils/date";
import { PostContentType } from "@/types/PostContentType";

export default function UploadDraft() {
  const { postId } = useParams();
  const [post, setPost] = useState<PostType>();
  const [content, setContent] = useState<PostContentType>();

  useEffect(() => {
    if (!postId) return;
    const fetchPost = async () => {
      const post = await getPost(postId);
      setPost(post);
      if (!post?.contentId) return;
      setContent(await getContent(post?.contentId));
    };
    fetchPost();
  });

  const handleUpload = async (
    title: string,
    shortDecs: string,
    thumbnail: string
  ) => {
    if (!content || !post || !post.id) return;
    if (!(await updateContent(post, content.data))) return;
    await updatePost(post.id, {
      title: title,
      shortDesc: shortDecs,
      thumbnailURL: thumbnail,
      isDraft: false,
      createDate: getDateNow(),
      lastUpdate: getDateNow(),
      status: StatusPost.show,
    });
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
                  <BreadcrumbPage>Đăng tải bài viết</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </header>

      {content?.data && (
        <UploadPost
          onBack={() => redirect("/admin/draft")}
          content={content?.data}
          onUpload={handleUpload}
          linkAfterUploaded="/admin/draft"
        />
      )}
    </>
  );
}
