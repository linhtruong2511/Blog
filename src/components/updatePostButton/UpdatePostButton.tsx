import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Post, { Status } from "@/types/Post";
import { Settings2 } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import Modal from "@/components/modal/Modal";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const data: string[] = localStorage.getItem("tags")?.split(",").map(item => item.trim()) || [];

interface Props {
  post: Post;
  onEdit: (val: string | number | boolean | string[], name: string) => void;
  onUpdateThumbnail: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  onSaveEdit: () => void;
  onSelect: (id: string) => void;
}

export default function UpdatePostButton({
  post,
  onSelect,
  onEdit,
  onUpdateThumbnail,
  onSaveEdit,
}: Props) {
  const [isShowStatus, setIsShowStatus] = useState<boolean>(
    post.status === Status.show
  );
  const [title, setTitle] = useState<string>(post.title);
  const [selectedTags, setSelectedTags] = useState<string[]>(post.tags.map(item => item.trim()));
  const [tags, setTags] = useState<string[]>(
    data?.filter((item) => !selectedTags.includes(item))
  );

  const handleSelectedTagChange = (tag: string) => {
    if (tag === "default") return;
    const newTags = [...selectedTags, tag];
    setSelectedTags(newTags);
    setTags(tags.filter((item) => item !== tag));
    onEdit(newTags, "tags");
  };

  const handleDeleteSelectedTag = (tag: string) => {
    const newTags = selectedTags.filter((item) => item !== tag);
    setTags([...tags, tag]);
    setSelectedTags(newTags);
    onEdit(newTags, "tags");
  };

  const handleChangeInputTitle = (e: ChangeEvent<HTMLInputElement>) => {
    onEdit(e.target.value, "title");
    setTitle(e.target.value);
  };

  if (!post || !post.id) return <></>;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="cursor-pointer hover:underline border-r pr-4"
          onClick={() => onSelect(post.id as string)}
        >
          <Settings2 size={16} />
        </button>
      </DialogTrigger>

      <Modal
        buttonOkTitle="Cập nhật"
        description=""
        onOk={onSaveEdit}
        title={post.title}
      >
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Tiêu đề
            </Label>
            <Input
              id="title"
              value={title}
              className="col-span-3"
              onChange={(e) => handleChangeInputTitle(e)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="thumnailURL" className="text-right col-span-1">
              Thumbnail
            </Label>
            <Input
              id="thumnailURL"
              type="file"
              className="col-span-3"
              onChange={onUpdateThumbnail}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="switch" className="text-right col-span-1">
              Công khai
            </Label>
            <Switch
              checked={isShowStatus}
              id="switch"
              className="col-span-3"
              onClick={() => {
                const newStatus = !isShowStatus;
                setIsShowStatus(newStatus);
                onEdit(newStatus ? Status.show : Status.hide, "status");
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tags" className="text-right col-span-1">
              Tags
            </Label>
            <div className="col-span-3 relative">
              <Select onValueChange={(tag) => handleSelectedTagChange(tag)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tags" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Lựa chọn thẻ tag</SelectItem>
                  {tags.map((tag) => {
                    return (
                      <SelectItem key={tag} value={tag}>
                        {tag}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <div className="flex gap-2 mt-1 absolute overflow-auto">
                {selectedTags.map((item) => (
                  <Badge
                    key={item}
                    variant="outline"
                    onClick={() => handleDeleteSelectedTag(item)}
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </Dialog>
  );
}
