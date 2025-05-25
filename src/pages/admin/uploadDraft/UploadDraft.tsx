import { getPost } from "@/service/postService";
import Post from "@/types/Post";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UploadPost from "../uploadPost/UploadPost";
import PostContent from "@/types/PostContent";
import { getContent } from "@/service/contentService";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export default function UploadDraft() {
  const { postId } = useParams();
  const [content, setContent] = useState<PostContent>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!postId) return;
    const fetchPost = async () => {
      const post = await getPost(postId);
      if (!post?.contentId) return;
      setContent(await getContent(post?.contentId));
    };
    fetchPost();
  });

  const handleBack = () => {
    navigate("/admin/draft");
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
                    <Link to={'/admin/draft'}>Bài viết gần đây</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem >
                  <BreadcrumbPage>Đăng tải bài viết</BreadcrumbPage>
                </BreadcrumbItem>

              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <Link to={"/admin/createblog"}>
            <Button variant={"default"}>Thêm bài viết</Button>
          </Link>
        </div>
      </header>

      {content?.data && (
        <UploadPost onBack={handleBack} content={content?.data} />
      )}
    </>
  );
}
