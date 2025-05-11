import { FaArrowLeft } from "react-icons/fa";
import Post from "../../types/Post";
import { useEffect, useState } from "react";
import "../../assets/css/reset-tailwin.css";
import { useParams } from "react-router-dom";
import useDB from "../../hook/useDB";
import { doc, getDoc } from "firebase/firestore";
import Comment from "../../components/comment/Comment";
import BlogRelated from "../../components/blogRelated/BlogRelated";
import { getPost } from "../../service/postService";
import { getContent } from "../../service/contentService";

export default function BLog() {
  const { id } = useParams();
  const [post, setPost] = useState<Post>();
  const [content, setContent] = useState<string>();
  useEffect(() => {
    const fetchPost = async () => {
      const post = await getPost(id as string);
      setPost(post);
    };
    fetchPost();
  }, []);
  useEffect(() => {
    const fetchContent = async () => {
      if (post){   
        const content = await getContent(post?.contentId);
        if (!content) return;
        setContent(content.data);
      } else {
        console.log("post is " + post);
      }
    };
    fetchContent();
  }, [post]);
  return (
    <div className="container mx-auto my-5 px-5">
      <span>
        <FaArrowLeft className="inline mr-5" /> Quay lại danh sách bài viết
      </span>
      <div className="h-[800px] mt-10">
        <img
          src={post?.thumbnailURL}
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      <h1>{post?.title}</h1>
      <div className="flex gap-5">
        <p>{post?.createDate}</p>
        <p>{post?.view}</p>
      </div>
      <div>
        <>
          {post?.tags &&
            post.tags.forEach((tag) => {
              return <span>{tag}</span>;
            })}{" "}
        </>
      </div>
      <hr />
      <div className="flex ">
        <div
          className="flex-2/3 article-content"
          dangerouslySetInnerHTML={{ __html: content as string }}
        ></div>

        <div className="grow">
          <div>Mục lục</div>
          <BlogRelated />
        </div>
      </div>

      <div>
        <h2>Bình luận</h2>
        <div>
          <div className="flex gap-5">
            <img src="" className="h-16 w-16 rounded-full" alt="" />
            <textarea
              className="grow border border-gray-400 h-32"
              name="comment"
              id=""
            ></textarea>
          </div>
          <div className="text-right mt-5">
            <button className="btn ">Gửi bình luận</button>
          </div>
        </div>
        <Comment />
      </div>
    </div>
  );
}
