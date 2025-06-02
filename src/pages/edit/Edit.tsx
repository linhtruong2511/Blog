import Editor from "@/components/editor/Editor";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEditContext } from "@/context/EditContext";
import { uploadToCloudinary } from "@/service/cloudinaryService";
import { Label } from "@radix-ui/react-label";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Edit = () => {
  const { content, setContent, title, setTitle, desc, setDesc, setThumbnail } =
    useEditContext();

  const navigate = useNavigate();
  const hanlePreview = (content: string) => {
    setContent(content);
    if (title === "" || desc === "") {
      toast.error("Bạn cần nhập đầy đủ tiêu đề và mô tả của bài viết");
    } else {
      navigate("/preview");
    }
    // localStorage.setItem("autoSave", content);
  };

  useEffect(() => {
    // Hỏi người dùng có muốn tải lại trang trong khi đang edit không
    const handleReload = () => {
      const ok = confirm(
        "Bạn đang tạo bài viết, bạn có muốn lưu vào bộ nhớ không"
      );
      if (ok) {
        setContent(localStorage.getItem("autoSave") as string);
      } else {
        localStorage.removeItem("autoSave");
      }
    };
    window.addEventListener("beforeunload", handleReload);
    return () => {
      window.removeEventListener("beforeunload", handleReload);
    };
  }, []);

  return (
    <div className=" p-5 max-w-[1120px] mx-auto flex flex-col gap-5">
      <Input
        placeholder="Tiêu đề bài viết"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      ></Input>
      <Textarea
        placeholder="Mô tả bài viết"
        onChange={(e) => setDesc(e.target.value)}
        value={desc}
      ></Textarea>
      <Label className="font-medium" htmlFor="thumbnail">
        Ảnh bìa
        <Input
          id="thumbnail"
          type="file"
          placeholder="Ảnh bìa"
          onChange={async (e) => {
            const toastId = toast.loading("Ảnh đang được tải");
            const url = await uploadToCloudinary(
              e.target.files?.item(0) as File
            );
            setThumbnail(url);
            toast.success("Cập nhật ảnh thành công");
            toast.dismiss(toastId);
          }}
        ></Input>
      </Label>
      <Editor
        buttonSaveTitle="Preview"
        children
        content={content}
        onSave={hanlePreview}
      ></Editor>
    </div>
  );
};

export default Edit;
