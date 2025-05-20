import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Post, { Status } from "../../../types/Post";
import ModalConfirm from "../../../components/modalConfirm/ModalConfirm";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { deletePost, getAllPost } from "../../../service/postService";
import { deleteContent } from "../../../service/contentService";
export default function BLogPostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [_, setDeleteError] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post>();
  const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);
  const question = "Bạn có muốn xóa " + selectedPost?.title + " không?";
  
  const handleClickDelete = (id: string) => {
    setSelectedPost(posts.find((post) => (post.id = id)));
    setShowModalConfirm(true);
  };
 
  const handleDelete = async () => {
    if (!selectedPost) return;
    
    if (await deleteContent(selectedPost.contentId) && await deletePost(selectedPost)) {
      setPosts(posts.filter((item) => item.id !== selectedPost.id));
      setShowModalConfirm(false);
      setDeleteError(false);
    } else {
      setDeleteError(true);
    }
  };

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
            <div
              key={index}
              className="flex justify-between items-center mb-8 bg-gray-100 p-4 rounded-md hover:shadow-xl hover:translate-0.5 transition-all"
            >
              <div className="flex items-center gap-5">
                <img
                  src={cart.thumbnailURL}
                  alt=""
                  className="h-32 object-cover w-44 rounded-md"
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
              <div className="flex items-center gap-7 mr-8 text-gray-500">
                <Link to={"/admin/editblog/" + cart.id}>
                  <button className="cursor-pointer hover:underline">
                    <FaEdit size={20} />
                  </button>
                </Link>
                <button
                  onClick={() => handleClickDelete(cart.id as string)}
                  className="cursor-pointer hover:underline"
                >
                  <FaTrash size={20} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showModalConfirm && (
        <ModalConfirm
          question={question}
          onConfirm={handleDelete}
          onCancel={() => setShowModalConfirm(false)}
        />
      )}
    </>
  );
}
