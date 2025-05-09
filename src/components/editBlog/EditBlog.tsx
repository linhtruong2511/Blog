import { useEffect, useState } from "react";
import Post from "../../types/Post";
import Editor from "../editor/Editor";
import { doc, getDoc } from "firebase/firestore";
import useDB from "../../hook/useDB";
import { useParams } from "react-router-dom";
import UpdatePost from "../updatePost/UpdatePost";

export default function EditBlog() {
  const [isSave, setIsSave] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [post, setPost] = useState<Post>();
  const { postId } = useParams<string>();
  const db = useDB();

  useEffect(() => {
    const fetchPost = async () => {
      if (postId) {
        const postSnap = await getDoc(doc(db, "post", postId));
        if (postSnap.exists()) {
          setPost({
            contentId: postSnap.get("contentId"),
            createDate: postSnap.get("createDate"),
            id: postSnap.id,
            shortDesc: postSnap.get("shortDesc"),
            status: postSnap.get("status"),
            tags: postSnap.get("tags"),
            thumbnailURL: postSnap.get("thumbnailURL"),
            title: postSnap.get("title"),
            view: postSnap.get("view"),
          });
          console.log(postSnap.id);
        } else {
          console.log("post id not exist");
        }
      } else {
        console.log("post id has error !!!");
      }
    };
    fetchPost();
    console.log(post);
  }, [postId]);
  useEffect(() => {
    console.log(post);
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
