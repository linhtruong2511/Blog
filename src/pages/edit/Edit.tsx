import Editor from "@/components/editor/Editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEditContext } from "@/context/EditContext";
import { uploadToCloudinary } from "@/service/cloudinaryService";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Edit = () => {
  const {
    content,
    setContent,
    title,
    setTitle,
    desc,
    setDesc,
    setThumbnail,
    thumbnail,
  } = useEditContext();

  const navigate = useNavigate();
  const handleSave = (content: string) => {
    setContent(content);
    navigate("/preview");
    localStorage.setItem('autoSave', content);
  };

  useEffect(() => {
    setContent(localStorage.getItem('autoSave') as string)
  }, [])

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
            const url = await uploadToCloudinary(
              e.target.files?.item(0) as File
            );
            setThumbnail(url);
          }}
        ></Input>
      </Label>
      <Editor children content={content} onSave={handleSave}></Editor>
    </div>
  );
};

export default Edit;
