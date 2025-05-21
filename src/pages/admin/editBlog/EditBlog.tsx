import { useEffect, useState } from "react";
import Post from "@/types/Post";
import Editor from "@/components/editor/Editor";
import { doc, getDoc } from "firebase/firestore";
import useDB from "@/hook/useDB";
import { useParams } from "react-router-dom";
import UpdatePost from "@/components/updatePost/UpdatePost";
import { getPost } from "@/service/postService";

export default function EditBlog() {
  const [isSave, setIsSave] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [post, setPost] = useState<Post>();
  const { postId } = useParams<string>();
  console.log(postId)
  const db = useDB();

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
        const contentRef = await getDoc(doc(db, "content", post.contentId));
        if (contentRef.exists()) {
          setContent(contentRef.get("data"));
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
      {!isSave ? (
        <Editor content={content} onSave={() => setIsSave(true)} />
      ) : (
        <UpdatePost
          post={post as Post}
          setPost={setPost}
          content={content}
          onBackToEdit={() => setIsSave(false)}
        />
      )}
    </>
  );
}
