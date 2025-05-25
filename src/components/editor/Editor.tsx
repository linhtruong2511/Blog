import { useCallback, useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./editor.css";
import { useNavigate } from "react-router-dom";
import { addPost } from "../../service/postService";
import Post, { Status } from "../../types/Post";
import PostContent from "../../types/PostContent";
import { createContent } from "../../service/contentService";
import { getDateNow } from "../../utils/date";
import { uploadToCloudinary } from "@/service/cloudinaryService";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { DialogFooter, DialogHeader } from "../ui/dialog";
import { Input } from "../ui/input";
import { BadgePlus, FlaskConical, Save, Upload } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { toast } from "react-toastify";

interface Props {
  content: string;
  onSave: (content: string) => void;
}

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  ["link", "image", "video", "formula"],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["clean"],
];

export default function Editor({ content, onSave }: Props) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);
  const navigate = useNavigate();
  const pathname: string = window.location.pathname;
  const isCreate = pathname.includes("createblog");
  const [draftTitle, setDraftTitle] = useState<string>("");
  const handleSaveDraft = async (title: string): Promise<void> => {
    const loadingId = toast.loading('Đang cập nhật !');
    navigate('/admin/draft');

    const dataQuill: string = quillRef.current?.root.innerHTML as string;
    if (title.trim() === "" || dataQuill.trim() === "") return;

    const content: PostContent = {
      createDate: new Date().toLocaleDateString("vi-VN"),
      data: dataQuill,
    };

    const iDContent = await createContent(content);

    if (!iDContent) return;

    const data: Post = {
      contentId: iDContent,
      createDate: getDateNow(),
      id: "",
      isDraft: true,
      lastUpdate: getDateNow(),
      shortDesc: "",
      status: Status.hide,
      tags: [],
      thumbnailURL: "",
      title: title,
      view: 0,
    };

    const id = await addPost(data);

    toast.dismiss(loadingId);
    if (id) {
      toast.success('Cập nhật thành công !')
    } else {
      toast.error('Cập nhật không thành công !')
    }
  };

  const handleImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      if (input !== null && input.files !== null) {
        const file = input.files[0];
        const url = await uploadToCloudinary(file);
        if (quillRef.current) {
          const range = quillRef.current.getSelection();
          range && quillRef.current.insertEmbed(range.index, "image", url);
        }
      }
    };
  }, []);

  const modules = {
    toolbar: {
      container: toolbarOptions,
      handlers: {
        image: handleImage,
      },
    },
  };

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        modules: modules,
        theme: "snow",
      });
    }
  }, []);

  useEffect(() => {
    if (quillRef.current && content) {
      quillRef.current.clipboard.dangerouslyPasteHTML(content);
    }
  }, [content]);

  return (
    <>
      <div className="prose">
        <div ref={editorRef} style={{ height: "550px" }}></div>
        <div className="mt-5 flex gap-5 justify-end">
          {isCreate && (
            <Dialog>
              <DialogTrigger asChild>
                <span>
                  <Button variant={"secondary"}>
                    Lưu bản nháp <FlaskConical />
                  </Button>
                </span>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nhập tên bản nháp</DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>

                <Input
                  type="text"
                  placeholder="Tiêu đề"
                  onChange={(e) => setDraftTitle(e.target.value)}
                />

                <DialogFooter>
                  <DialogClose asChild>
                    <Button  onClick={() => handleSaveDraft(draftTitle)} variant={"default"} color="blue" size={"default"}>
                      Lưu <Save />{" "}
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
          <Button
            variant={"default"}
            className="btn btn-primary"
            onClick={() => onSave(quillRef.current?.root.innerHTML as string)}
          >
            {isCreate ? "Tạo bài viết" : "Cập nhật"}
            {isCreate ? <BadgePlus /> : <Upload />}
          </Button>
        </div>
      </div>
    </>
  );
}
