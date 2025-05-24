import { ChangeEvent, useEffect, useRef, useState } from "react";
import "@/assets/css/reset-tailwin.css";
import "quill/dist/quill.snow.css";
import UploadWidgetCloudinary from "@/pages/admin/createBlog/UploadWidgetCloudinary";
import Post, { Status } from "../../../types/Post";
import { addDoc, collection } from "firebase/firestore";
import useDB from "../../../hook/useDB";
import { useNavigate } from "react-router-dom";
import PostContent from "../../../types/PostContent";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CloudUpload, Undo2 } from "lucide-react";

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
      createDate: new Date().toLocaleDateString("vi-VN"),
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
      status: Status.show,
      tags: [],
      view: 0,
      isDraft: false,
      lastUpdate: new Date().toLocaleDateString("vi-VN"),
    };
    try {
      await addDoc(collection(db, "post"), {
        ...data,
      });
      setTimeout(() => {
        navigate("/admin");
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
      <Button variant={'secondary'} onClick={onBackToEdit} className="mb-4">
        Quay lại <Undo2 />
      </Button> 
      <div className="flex flex-col gap-4">
        <div className="grid w-full gap-1.5">
          <Label htmlFor="title">Tiêu đề</Label>
          <Input
            id="title"
            onChange={handleChangeTitle}
          />
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="desc">Mô tả</Label>
          <Textarea
            id="desc"
            className="input mb-4 h-50"
            onChange={handleChangeDecs}
          />
        </div>
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
          <Button onClick={handlePost}>
            Đăng bài viết <CloudUpload />
          </Button>{" "}
        </div>
      </div>
    </>
  );
}
