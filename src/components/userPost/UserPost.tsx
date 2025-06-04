import { removeUserPosts, updateUserPosts } from "@/reducer/authReducer";
import { deletePost, updatePost } from "@/service/postService";
import { useAppDispatch } from "@/store/hook";
import { ChangeEvent, useState } from "react";
import Card from "@/pages/admin/dashboard/Card";
import { uploadToCloudinary } from "@/service/cloudinaryService";
import { toast } from "react-toastify";
import { deleteContent } from "@/service/contentService";
import PostType, { StatusPost } from "@/types/PostType";
import { useNavigate } from "react-router-dom";
import { useAccountContext } from "@/context/AccountContext";

const UserPost = () => {
  const dispath = useAppDispatch();
  const [selectedPost, setSelectedPost] = useState<PostType>();
  const [postUpdate, setPostUpdate] = useState({});
  const navigate = useNavigate();
  const { posts, author, setAuthor, setPosts } = useAccountContext();
  const handleSelect = (id: string): void => {
    if (posts) {
      setSelectedPost(posts.find((post) => post.id === id) || posts[0]);
    } else {
      console.log("handle select error");
    }
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

  const isHavePost = () => {
    return posts && posts.length != 0;
  };

  const handleUpdate = (id: string) => {
    navigate("/edit/" + id);
  };

  return (
    <div className=" mr-5">
      {isHavePost() ? (
        <div className="grow">
          {posts &&
            posts.map((post) => {
              if (post.status !== StatusPost.pending) {
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
              }
            })}
        </div>
      ) : (
        <div className="flex-7/12">Không có bài viết nào được hiển thị </div>
      )}
    </div>
  );
};

export default UserPost;
