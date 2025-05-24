import { useEffect, useState } from "react";
import Post from "@/types/Post";
import Editor from "@/components/editor/Editor";
import { doc, getDoc } from "firebase/firestore";
import useDB from "@/hook/useDB";
import { useNavigate, useParams } from "react-router-dom";
import { getPost } from "@/service/postService";
import { getContent, updateContent } from "@/service/contentService";
import { toast } from "react-toastify";

export default function EditBlog() {
  const [content, setContent] = useState<string>("");
  const [post, setPost] = useState<Post>();
  const { postId } = useParams<string>();
  const db = useDB();
  const navigate = useNavigate();

  const handleUpdate = async (content: string) => {
    if (!post) return;
    const id = toast.loading("đang cập nhật bài viết");
    const isSuccess = await updateContent(post, content);

    toast.dismiss(id);
    if (isSuccess) {
      toast.info("Cập nhật thành công");
      setTimeout(() => {
        navigate("/admin/draft");
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
      <Editor content={content} onSave={handleUpdate} />
    </>
  );
}
