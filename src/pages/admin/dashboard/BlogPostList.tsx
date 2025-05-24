import { ChangeEvent, useEffect, useState } from "react";
import Post from "../../../types/Post";
import {
  deletePost,
  getAllPost,
  updatePost,
} from "../../../service/postService";
import { deleteContent } from "../../../service/contentService";
import { uploadToCloudinary } from "@/service/cloudinaryService";
import Cart from "./Cart";
import { toast } from "react-toastify";

export default function BLogPostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [_, setDeleteError] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post>(posts[0]);
  const [postUpdate, setPostUpdate] = useState({});

  const handleClickDelete = (id: string): void => {
    setSelectedPost(posts.find((post) => post.id === id) || posts[0]);
  };

  const handleSaveEdit = async (): Promise<void> => {
    if (!selectedPost?.id) return;
    const isDone = await updatePost(selectedPost.id, postUpdate);
    setPosts(
      posts.map((post): Post => {
        if (selectedPost.id === post.id) {
          return {
            ...post,
            ...postUpdate,
          };
        } else {
          return post;
        }
      })
    );
    if (isDone) {
      toast.success('Cập nhật thành công')
    } else {
      toast.error('Cập nhật thất bại, vui lòng kiểm tra lại đường truyền !')
    }
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
    if (!url) return;
    handleEdit(url, "thumbnailURL");
  };

  const handleDelete = async (): Promise<void> => {
    if (!selectedPost) return;

    if (
      (await deleteContent(selectedPost.contentId)) &&
      (await deletePost(selectedPost))
    ) {
      setPosts(posts.filter((item) => item.id !== selectedPost.id));
      setDeleteError(false);
    } else {
      setDeleteError(true);
    }
  };

  const handleClickSetting = () => {};

  useEffect(() => {
    const fetchPost = async () => {
      const posts = await getAllPost();
      if (!posts) return;
      setPosts(posts);
    };
    fetchPost();
  }, []);

  return (
    <>
      <div>
        {posts.map((cart, index) => {
          return (
            <Cart
              cart={cart}
              key={cart.id}
              onClickDelete={handleClickDelete}
              // onClickSetting={handleClickSetting}
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
