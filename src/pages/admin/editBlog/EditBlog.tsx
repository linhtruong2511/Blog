import { useEffect, useState } from "react";
import PostType from "@/types/PostType";
import Editor from "@/components/editor/Editor";
import { useNavigate, useParams } from "react-router-dom";
import { getPost } from "@/service/postService";
import { getContent, updateContent } from "@/service/contentService";
import { toast } from "react-toastify";

export default function EditBlog() {
  const [content, setContent] = useState<string>("");
  const [post, setPost] = useState<PostType>();
  const { postId } = useParams<string>();
  const navigate = useNavigate();

  const handleUpdate = async (content: string) => {
    if (!post) return;
    navigate("/admin/draft");
    const isSuccess = await updateContent(post, content);
    
    if (isSuccess) {
      toast.info("Cập nhật thành công");
      setTimeout(() => {
      }, 2000);
    } else {
      toast.error("Cập nhật thất bại");
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      if (postId) {
        const post = await getPost(postId);
        if (post) setPost(post);
      } else {
        console.log("post id has error !!!");
      }
    };
    fetchPost();
  }, [postId]);

  useEffect(() => {
    const fetchContentData = async () => {
      if (!post) return;
      try {
        const content = await getContent(post.contentId);
        if (content) {
          setContent(content.data);
        } else {
          console.log("content data not exist");
        }
      } catch (e) {
        console.log("fetch error: " + e);
      }
    };
    fetchContentData();
  }, [post]);

  return (
    <>
      <Editor buttonSaveTitle="Cập nhật " children content={content} onSave={handleUpdate} />
    </>
  );
}
