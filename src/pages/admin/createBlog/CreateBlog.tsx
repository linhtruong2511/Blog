import { useState } from "react";
import Editor from "@/components/editor/Editor";
import UploadPost from "@/components/uploadPost/UploadPost";

export default function CreateBlog() {
  const [content, setContent] = useState<string>("");
  const [isSave, setIsSave] = useState<boolean>(false);
  const handleSave = (content: string) => {
    setIsSave(true);
    setContent(content);
  };
  const handleBackToEdit = () => {
    setIsSave(false);
  };
  return (
    <>
      {isSave ? (
        <UploadPost content={content} onBackToEdit={handleBackToEdit} />
      ) : (
        <Editor content={content} onSave={handleSave} />
      )}
    </>
  );
}
