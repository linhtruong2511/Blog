import { getPost, updatePost } from "@/service/postService";
import Post, { Status } from "@/types/Post";
import { useEffect, useState } from "react";
import { Link, redirect, useParams } from "react-router-dom";
import UploadPost from "../uploadPost/UploadPost";
import PostContent from "@/types/PostContent";
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

export default function UploadDraft() {
  const { postId } = useParams();
  const [post, setPost] = useState<Post>();
  const [content, setContent] = useState<PostContent>();

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
      status: Status.show,
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
