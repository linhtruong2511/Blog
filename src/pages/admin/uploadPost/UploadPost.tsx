import { ChangeEvent, useEffect, useRef, useState } from "react";
import "@/assets/css/reset-tailwin.css";
import "quill/dist/quill.snow.css";
import UploadWidgetCloudinary from "@/pages/admin/createBlog/UploadWidgetCloudinary";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CloudUpload, Loader2, Undo2 } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface Props {
  content: string;
  onUpload: (
    title: string,
    shortDecs: string,
    thumbnail: string
  ) => Promise<void>;
  onBack: () => void;
  linkAfterUploaded: string;
}
export default function UploadPost({
  content,
  onBack,
  onUpload,
  linkAfterUploaded,
}: Props) {
  const [thumbnail, setThumbnail] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const title = useRef<string>("");
  const shortDecs = useRef<string>("");
  const preview = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (preview.current) {
      preview.current.innerHTML = content;
    }
  }, []);

  const handlePost = async () => {
    setIsLoading(true);
    await onUpload(title.current, shortDecs.current, thumbnail);
    setTimeout(() => {
      navigate(linkAfterUploaded);
      setIsLoading(false);
      toast.success("Tạo bài viết thành công !!!");
    }, 1000);
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    title.current = e.target.value;
  };

  const handleChangeDecs = (e: ChangeEvent<HTMLTextAreaElement>) => {
    shortDecs.current = e.target.value;
  };

  return (
    <>
      <Button variant={"secondary"} onClick={onBack} className="mb-4">
        Quay lại <Undo2 />
      </Button>
      <div className="flex flex-col gap-4">
        <div className="grid w-full gap-1.5">
          <Label htmlFor="title">Tiêu đề</Label>
          <Input id="title" onChange={handleChangeTitle} />
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
          {!isLoading ? (
            <Button onClick={handlePost}>
              Đăng bài viết <CloudUpload />
            </Button>
          ) : (
            <Button onClick={handlePost} disabled>
              <Loader2 className="animate-spin" />
              Đang tải bài viết
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
