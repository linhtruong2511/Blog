import { ChangeEvent, useEffect, useRef, useState } from "react";
import "../../assets/css/reset-tailwin.css";
import "quill/dist/quill.snow.css";
import UploadWidgetCloudinary from "../createBlog/UploadWidgetCloudinary";
import Post, { status } from "../../types/Post";
import { addDoc, collection } from "firebase/firestore";
import useDB from "../../hook/useDB";
import { useNavigate } from "react-router-dom";
import PostContent from "../../types/PostContent";
interface Props {
  content: string;
  onBackToEdit: () => void;
}
export default function UploadPost({ content, onBackToEdit }: Props) {
  const [thumbnail, setThumbnail] = useState<string>("");
  const title = useRef<string>("");
  const shortDecs = useRef<string>("");
  const preview = useRef<HTMLDivElement | null>(null);
  const db = useDB();
  const navigate = useNavigate();

  useEffect(() => {
    if (preview.current) {
      preview.current.innerHTML = content;
    }
  });

  const handlePost = async () => {
    const postDataContent: PostContent = {
      createDate: new Date(),
      data: content,
    };
    const contentId = await addDoc(collection(db, "content"), postDataContent);
    const data: Post = {
      id: "",
      thumbnailURL: thumbnail,
      contentId: contentId.id,
      title: title.current,
      createDate: new Date().toLocaleString("vi-VN"),
      shortDesc: shortDecs.current,
      status: status.show,
      tags: [],
      view: 0,
    };
    try {
      await addDoc(collection(db, "post"), {
        ...data,
      });
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    title.current = e.target.value;
  };
  const handleChangeDecs = (e: ChangeEvent<HTMLTextAreaElement>) => {
    shortDecs.current = e.target.value;
  };
  return (
    <>
      <button onClick={onBackToEdit} className="btn mb-4">
        Quay lại
      </button>
      <input
        type="text"
        className="input mb-4"
        placeholder="Tiêu đề"
        onChange={handleChangeTitle}
      />
      <textarea
        className="input mb-4 h-50"
        placeholder="Mô tả bài viết"
        onChange={handleChangeDecs}
      />
      <div className="mb-4">
        <UploadWidgetCloudinary
          thumbnail={thumbnail}
          setThumbnail={setThumbnail}
        />
      </div>
      <div>
        <h2 className="text-3xl font-black">Preview</h2>
        <hr />
        <div className="article-content" ref={preview}></div>
      </div>
      <div className="text-right pt-5">
        <button onClick={handlePost} className="btn">
          Post
        </button>{" "}
      </div>
    </>
  );
}
