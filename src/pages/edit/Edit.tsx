import Editor from "@/components/editor/Editor";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";

const Edit = () => {
  return (
    <div className=" p-5 max-w-[1120px] mx-auto flex flex-col gap-5">
      <Input placeholder="Tiêu đề bài viết"></Input>
      <Textarea placeholder="Mô tả bài viết"></Textarea>
      <Label className="font-medium" htmlFor="thumbnail">
        Ảnh bìa
        <Input id="thumbnail" type="file" placeholder="Ảnh bìa"></Input>
      </Label>
      <Editor content="" onSave={() => {}} />
    </div>
  );
};

export default Edit;
