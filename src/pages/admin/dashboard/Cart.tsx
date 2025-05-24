import ModalConfirm from "@/components/modalConfirm/ModalConfirm";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Post, { Status } from "@/types/Post";
import { Pencil, Settings2, Trash2 } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
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

interface Props {
  cart: Post;
  onClickDelete: (id: string) => void;
  onEdit: (val: string | number | boolean | string[], name: string) => void;
  onUpdateThumbnail: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  onSaveEdit: () => void;
  onDelete: () => Promise<void>;
}
const data: string[] = localStorage.getItem("tags")?.split(",") || [""];

export default function Cart({
  cart,
  onClickDelete,
  onEdit,
  onUpdateThumbnail,
  onDelete,
  onSaveEdit,
}: Props) {
  console.log(data);
  const [title, setTitle] = useState<string>(cart.title);
  const [isShowStatus, setIsShowStatus] = useState<boolean>(
    cart.status === Status.show
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(cart.tags);
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

  return (
    <>
      <div className="flex justify-between items-center mb-3 bg-gray-50 p-4 rounded-md hover:shadow-md hover:translate-[1px] transition-all">
        <div className="flex items-center gap-5">
          <img
            src={cart.thumbnailURL}
            alt=""
            className="h-16 object-cover w-32 rounded-md"
          />
          <div>
            <h2 className="text-xl">
              <b>{cart.title}</b>
            </h2>
            <div className="flex gap-4 text-gray-500">
              <p>
                Lượt xem: <b>{cart.view}</b>
              </p>
              <p className="flex items-center gap-2">
                Trạng thái: <b>{cart.status}</b>
                {cart.status === Status.show ? (
                  <span className="h-3 w-3 inline-block rounded-full bg-green-400"></span>
                ) : (
                  <span className="h-3 w-3 inline-block rounded-full bg-red-400"></span>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5 mr-8 text-gray-500">
          <Link to={"/admin/editblog/" + cart.id}>
            <button className="cursor-pointer hover:underline border-r pr-4">
              <Pencil size={16} />
            </button>
          </Link>

          <Dialog>
            <DialogTrigger asChild>
              <button
                onClick={() => onClickDelete(cart.id as string)}
                className="cursor-pointer hover:underline border-r pr-4"
              >
                <Settings2 size={16} />
              </button>
            </DialogTrigger>

            <Modal
              buttonOkTitle="Cập nhật"
              description=""
              onOk={onSaveEdit}
              title={cart.title}
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
                  <Label
                    htmlFor="thumnailURL"
                    className="text-right col-span-1"
                  >
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
                    <Select
                      onValueChange={(tag) => handleSelectedTagChange(tag)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Tags" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">
                          Lựa chọn thẻ tag
                        </SelectItem>
                        {tags.map((tag) => {
                          return (
                            <>
                              <SelectItem key={tag} value={tag}>
                                {tag}
                              </SelectItem>
                            </>
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

          <ModalConfirm
            question={"Bạn có muốn xóa " + cart.title + " không?"}
            onConfirm={onDelete}
          >
            <button
              onClick={() => onClickDelete(cart.id as string)}
              className="cursor-pointer hover:underline"
            >
              <Trash2 size={16} />
            </button>
          </ModalConfirm>
        </div>
      </div>
    </>
  );
}
