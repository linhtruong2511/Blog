import { useCallback, useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./editor.css";
interface Props {
  content: string;
  onSave: (content: string) => void;
}

export default function Editor({ content, onSave }: Props) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);
  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "post-image");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/" + "dgkgppcom" + "/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    const url = data.url;
    return url;
  };

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
    <div className="prose">
      <div ref={editorRef} style={{ height: "750px" }}></div>
      <div className="mt-5 flex gap-5 justify-end">
        <button
          className="btn "
          onClick={() => onSave(quillRef.current?.root.innerHTML as string)}
        >
          Lưu nháp
        </button>
        <button
          className="btn btn-primary"
          onClick={() => onSave(quillRef.current?.root.innerHTML as string)}
        >
          Đăng bài
        </button>
      </div>
    </div>
  );
}
