import { FaArrowLeft } from "react-icons/fa";
import Post from "../../types/Post";
import { useEffect, useState } from "react";
import "../../assets/css/reset-tailwin.css";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "../../components/comment/Comment";
import { getPost } from "../../service/postService";
import { getContent } from "../../service/contentService";
import { FaEye } from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton";
export default function BLog() {
  const { id } = useParams();
  const [post, setPost] = useState<Post>();
  const [content, setContent] = useState<string>();
  const navigate = useNavigate();
  const isLoaded = content && post ? true : false;
  

  useEffect(() => {
    const fetchPost = async () => {
      const post = await getPost(id as string);
      setPost(post);
    };
    fetchPost();
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      if (post) {
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
    <div className="container mx-auto my-5 max-w-[1120px]">
      {isLoaded ? (
        <>
          <span onClick={() => navigate(-1)} className="cursor-pointer">
            <FaArrowLeft className="inline mr-3" /> Quay lại danh sách bài viết
          </span>
          <div className="h-[700px] my-10">
            <img
              src={post?.thumbnailURL}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>

          <h1 className="text-4xl font-[Montserrat]">
            <b>{post?.title}</b>
          </h1>
          <div className="flex gap-10 mb-5 mt-1">
            <p>Ngày tạo: {post?.createDate}</p>
            <p className="flex gap-2 items-center">
              {" "}
              <FaEye className="inline" /> {post?.view}
            </p>
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
              {/* <BlogRelated /> */}
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
        </>
      ) : (
        <div className="h-screen">
          <Skeleton className="h-full w-full" />
        </div>
      )}
    </div>
  );
}
