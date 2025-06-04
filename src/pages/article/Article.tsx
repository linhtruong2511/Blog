import { FaArrowLeft, FaSearch } from "react-icons/fa";
import PostType from "../../types/PostType";
import { useEffect, useRef, useState } from "react";
import "../../assets/css/reset-tailwin.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Comment from "../../components/comment/Comment";
import { getPost, updatePost } from "../../service/postService";
import { getContent } from "../../service/contentService";
import { FaEye } from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton";
import { update } from "@/reducer/postReducer";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import "./Article.css";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { UserType } from "@/types/UserType";
import { getUser } from "@/service/userService";
import { ArrowUp } from "lucide-react";
import Back from "./Back";
import Thumbnail from "./Thumbnail";
import ArticleInformation from "./ArticleInformation";
import MainContent from "./MainContent";
import LoaderScreen from "@/components/loader/LoaderScreen";
import ScrollToTop from "@/components/button/ScrollToTop";

export default function Article() {
  const { id } = useParams();
  const [post, setPost] = useState<PostType>();
  const [content, setContent] = useState<string>();
  const isLoading = content && post ? false : true;
  const dispath = useAppDispatch();
  const [author, setAuthor] = useState<UserType>();

  /**
   * Fetch bài viết
   */
  useEffect(() => {
    const fetchData = async () => {
      const post = await getPost(id as string);
      if (!post) return;
      const author = await getUser(post?.authorId as string);

      setPost(post);
      setAuthor(author);
    };
    fetchData();
  }, [id]);

  /**
   * Sau khi có bài viết thì fetch nội dung
   * Đồng thời đặt 1 hàm settimeout để đếm thời gian đọc của bài viết để tăng view
   */
  useEffect(() => {
    const fetchContent = async () => {
      if (post) {
        const content = await getContent(post?.contentId);
        if (!content) return;
        setContent(content.data);
      }
    };
    if (!post) return;

    const timeoutId = setTimeout(async () => {
      if (!post || !id) return;
      await updatePost(id, { view: post.view + 1 });
      dispath(update({ id, newData: { view: post.view + 1 } }));
    }, 1000 * 60);
    fetchContent();

    // Hàm clean up để xóa đếm thời gian đọc của bài viết khi unmount
    return () => clearTimeout(timeoutId);
  }, [post]);

  if (isLoading) return <LoaderScreen />

  return (
    <div className="container mx-auto my-5 max-w-[1120px] px-2 md:px-0">
      <Back />
      <Thumbnail thumbnailURL={post?.thumbnailURL || ""} />
      {author && post && <ArticleInformation author={author} post={post} />}
      <hr />
      <MainContent content={content || ""} />
      <Comment />
      <ScrollToTop />      
    </div>
  );
}
