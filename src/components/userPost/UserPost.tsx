import {
  removeUserPosts,
  setUserPosts,
  updateUserPosts,
} from "@/reducer/authReducer";
import { deletePost, getPostAuthor, updatePost } from "@/service/postService";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { ChangeEvent, useEffect, useState } from "react";
import PostCard from "../blogPostList/PostCard";
import Card from "@/pages/admin/dashboard/Card";
import { uploadToCloudinary } from "@/service/cloudinaryService";
import { toast } from "react-toastify";
import { remove, update } from "@/reducer/postReducer";
import { deleteContent } from "@/service/contentService";
import PostType from "@/types/PostType";
import { useNavigate } from "react-router-dom";

const UserPost = () => {
  const { user, posts } = useAppSelector((s) => s.authReducer);
  const dispath = useAppDispatch();
  const [selectedPost, setSelectedPost] = useState<PostType>(posts[0]);
  const [postUpdate, setPostUpdate] = useState({});
  const navigate = useNavigate();

  const handleSelect = (id: string): void => {
    setSelectedPost(posts.find((post) => post.id === id) || posts[0]);
  };

  const handleSaveEdit = async (): Promise<void> => {
    if (!selectedPost?.id) return;

    dispath(
      updateUserPosts({
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
      dispath(removeUserPosts(selectedPost.id));
      toast.success("Xóa " + selectedPost.title + " thành công !");
    } else {
      toast.error("Xóa " + selectedPost.title + " không thành công !");
    }
  };

  const handleUpdate = (id: string) => {
    navigate("/edit/" + id);
  };

  useEffect(() => {
    const fetchPost = async () => {
      const posts = await getPostAuthor(user?.uid as string);
      if (!posts) return;
      dispath(setUserPosts(posts));
    };
    fetchPost();
  }, [user]);

  return (
    <div className=" mr-5">
      {posts ? (
        <div className="grow">
          {posts.map((post) => {
            return (
              <Card
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                onSaveEdit={handleSaveEdit}
                onSelect={handleSelect}
                onUpdateThumbnail={handleUpdateThumbnail}
                onEdit={handleEdit}
                post={post}
                key={post.id}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex-7/12">Không có bài viết nào được hiển thị </div>
      )}
    </div>
  );
};

export default UserPost;
