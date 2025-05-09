import Quill from "quill";
import { useCallback } from "react";
import "quill/dist/quill.snow.css";

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

const handleImage = useCallback((quill: Quill) => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();
  input.onchange = async () => {
    if (input !== null && input.files !== null) {
      const file = input.files[0];
      const url = await uploadToCloudinary(file);
      if (quill) {
        const range = quill.getSelection();
        range && quill.insertEmbed(range.index, "image", url);
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

const useQuill = (el: HTMLDivElement, defaultContent: string) => {
  const quill = new Quill(el, {
    modules: modules,
    theme: "snow",
  });

  quill.clipboard.dangerouslyPasteHTML(defaultContent);

  return quill;
};

export default useQuill;
