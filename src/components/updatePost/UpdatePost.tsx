import { ChangeEvent, useEffect, useRef, useState } from "react";
import "../../assets/css/reset-tailwin.css";
import UploadWidgetCloudinary from "../createBlog/UploadWidgetCloudinary";
import Post from "../../types/Post";
import { doc, updateDoc } from "firebase/firestore";
import useDB from "../../hook/useDB";
import { useNavigate } from "react-router-dom";
interface Props {
  content: string;
  post: Post;
  setPost: (newPost: Post) => void;
  onBackToEdit: () => void;
}
export default function UpdatePost({
  content,
  onBackToEdit,
  setPost,
  post,
}: Props) {
  const preview = useRef<HTMLDivElement | null>(null);
  const db = useDB();
  const navigate = useNavigate();
  const [currentThumbnail] = useState<string>(post.thumbnailURL);
  let thumbnailChanged = false;
  if (currentThumbnail !== post.thumbnailURL) {
    thumbnailChanged = true;
  }
  useEffect(() => {
    if (preview.current) {
      preview.current.innerHTML = content;
    }
  }, [content, post]);

  const handleUpdate = async () => {
    try {
      await updateDoc(doc(db, "post", post.id as string), {
        ...post,
        createDate: new Date().toLocaleString("vi-VN"),
      });
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setPost({
      ...post,
      title: e.target.value,
    });
  };
  const handleChangeDecs = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPost({
      ...post,
      shortDesc: e.target.value,
    });
  };
  return (
    <div className="flex flex-col items-start">
      <button onClick={onBackToEdit} className="btn btn-primary mb-4 ">
        Quay lại
      </button>
      <label htmlFor="title" className=" text-xl font-medium">
        Tiêu đề:
      </label>
      <input
        type="text"
        className="input mb-4"
        placeholder="Tiêu đề"
        onChange={handleChangeTitle}
        value={post.title}
        id="title"
      />
      <label htmlFor="desc" className=" text-xl font-medium">
        Mô tả:
      </label>
      <textarea
        className="input mb-4 h-50"
        placeholder="Mô tả bài viết"
        onChange={handleChangeDecs}
        value={post.shortDesc}
        id="desc"
      />
      <div className="mb-4">
        <UploadWidgetCloudinary
          thumbnail={post.thumbnailURL}
          setThumbnail={(newThumbnailURL: string) =>
            setPost({
              ...post,
              thumbnailURL: newThumbnailURL,
            })
          }
        />
        {!thumbnailChanged && (
          <div className="text-center">
            <img
              src={post.thumbnailURL}
              alt=""
              className="w-96 h-auto mx-auto"
            />
          </div>
        )}
      </div>
      <div>
        <h2 className="text-3xl font-black">Preview</h2>
        <hr />
        <div className="article-content" ref={preview}></div>
      </div>
      <div className="text-right pt-5">
        <button onClick={handleUpdate} className="btn btn-primary">
          Update
        </button>{" "}
      </div>
    </div>
  );
}
