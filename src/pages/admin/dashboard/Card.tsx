import ModalConfirm from "@/components/modalConfirm/ModalConfirm";
import PostType, { StatusPost } from "@/types/PostType";
import { EllipsisVertical, Eye, Pencil, Trash2 } from "lucide-react";
import { ChangeEvent } from "react";
import UpdatePostButton from "@/components/updatePostButton/UpdatePostButton";
import { useAppSelector } from "@/store/hook";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  post: PostType;
  onSelect: (id: string) => void;
  onEdit: (val: string | number | boolean | string[], name: string) => void;
  onUpdateThumbnail: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  onSaveEdit: () => void;
  onDelete: () => Promise<void>;
  onUpdate: (id: string) => void;
}

export default function Card({
  post,
  onSelect,
  onEdit,
  onUpdateThumbnail,
  onDelete,
  onSaveEdit,
  onUpdate,
}: Props) {
  const { user } = useAppSelector((s) => s.authReducer);
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-between items-center mb-3 bg-gray-50 p-4 rounded-md hover:shadow-md hover:translate-[1px] transition-all">
        <div className="flex items-center gap-5">
          <img
            src={post.thumbnailURL}
            alt=""
            className="h-16 object-cover w-32 rounded-md hidden sm:block"
          />
          <div className="overflow-hidden">
            <h2 className="lg:text-xl truncate">
              <b
                style={{
                  color: post.status === StatusPost.hide ? "red" : "",
                }}
              >
                {post.title}
              </b>
            </h2>
            <div className="hidden gap-4 text-gray-500  lg:block">
              <p>
                Lượt xem: <b>{post.view}</b>
              </p>
            </div>
          </div>
        </div>
        <div className="hidden items-center gap-5 mr-8 text-gray-500  lg:flex">
          <>
            <span
              onClick={() => navigate("/blog/" + post.id)}
              className="cursor-pointer hover:underline border-r pr-4"
            >
              <Eye size={16} />
            </span>
            {user?.uid === post.authorId && (
              <>
                <span
                  className="cursor-pointer hover:underline border-r pr-4"
                  onClick={() => onUpdate(post.id as string)}
                >
                  <Pencil size={16} />
                </span>

                <UpdatePostButton
                  onEdit={onEdit}
                  onSaveEdit={onSaveEdit}
                  onSelect={onSelect}
                  onUpdateThumbnail={onUpdateThumbnail}
                  post={post}
                />

                <ModalConfirm
                  question={"Bạn có muốn xóa " + post.title + " không?"}
                  onConfirm={onDelete}
                >
                  <button
                    onClick={() => onSelect(post.id as string)}
                    className="cursor-pointer hover:underline"
                  >
                    <Trash2 size={16} />
                  </button>
                </ModalConfirm>
              </>
            )}
          </>
        </div>

        <div className="lg:hidden">
          <EllipsisVertical />
        </div>
      </div>
    </>
  );
}
