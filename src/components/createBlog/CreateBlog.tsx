import { useState } from "react";
import Editor from "../editor/Editor";
import UploadPost from "../uploadPost/UploadPost";
import Draft from "../draftEdit/Draft";

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
