import { ChangeEvent,  useState } from "react";
import PostType from "../../../types/PostType";
import {
  deletePost,
  updatePost,
} from "../../../service/postService";
import { deleteContent } from "../../../service/contentService";
import { uploadToCloudinary } from "@/service/cloudinaryService";
import Card from "./Card";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { remove, update } from "@/reducer/postReducer";

export default function BLogPostList() {
  const posts = useAppSelector((s) => s.postReducer);
  const [selectedPost, setSelectedPost] = useState<PostType>(posts[0]);
  const [postUpdate, setPostUpdate] = useState({});
  const dispath = useAppDispatch();

  const handleSelect = (id: string): void => {
    setSelectedPost(posts.find((post) => post.id === id) || posts[0]);
  };

  const handleSaveEdit = async (): Promise<void> => {
    if (!selectedPost?.id) return;

    dispath(
      update({
        id: selectedPost.id,
        newData: postUpdate,
      })
    );

    (await updatePost(selectedPost.id, postUpdate))
      ? toast.success("Cập nhật thành công")
      : toast.error("Cập nhật thất bại, vui lòng kiểm tra lại đường truyền !");
  };

  const handleEdit = (
    val: string | number | boolean | string[],
    name: string
  ): void => {
    setPostUpdate({
      ...postUpdate,
      [name]: val,
    });
  };

  const handleUpdateThumbnail = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file: File | null | undefined = e.target.files?.item(0);
    if (!file) return;

    const url = await uploadToCloudinary(file);
    if (url) {
      handleEdit(url, "thumbnailURL");
    }
  };

  const handleDelete = async (): Promise<void> => {
    if (!selectedPost || !selectedPost.id) return;

    if (
      (await deleteContent(selectedPost.contentId)) &&
      (await deletePost(selectedPost))
    ) {

      dispath(remove(selectedPost.id))
      toast.success("Xóa " + selectedPost.title + " thành công !");

    } else {
      toast.error("Xóa " + selectedPost.title + " không thành công !");
    }
  };

  return (
    <>
      <div>
        {posts.map((post) => {
          return (
            <Card
              post={post}
              key={post.id}
              onSelect={handleSelect}
              onDelete={handleDelete}
              onSaveEdit={handleSaveEdit}
              onEdit={handleEdit}
              onUpdateThumbnail={handleUpdateThumbnail}
            />
          );
        })}
      </div>
    </>
  );
}
