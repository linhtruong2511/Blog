import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, doc, query, deleteDoc } from "firebase/firestore";
import useDB from "../../../hook/useDB";
import Post, { status } from "../../../types/Post";
import ModalConfirm from "../../../components/modalConfirm/ModalConfirm";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
export default function BLogPostList() {
  const db = useDB();
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
    if (selectedPost?.id) {
      try {
        await deleteDoc(doc(db, "post", selectedPost.id));
        setPosts(posts.filter((item) => item.id !== selectedPost.id));
        setDeleteError(false);
        setShowModalConfirm(false);
      } catch (e) {
        setDeleteError(true);
        console.log("error: " + e);
      }
    }
  };
  useEffect(() => {
    const fetchPost = async () => {
      const postRef = collection(db, "post");
      const q = query(postRef);
      const postsSnap = await getDocs(q);
      const newPosts = postsSnap.docs.map((post): Post => {
        return {
          id: post.id,
          title: post.get("title"),
          createDate: post.get("createDate"),
          shortDesc: post.get("shortDecs"),
          tags: post.get("tags"),
          thumbnailURL: post.get("thumbnailURL"),
          contentId: post.get("content"),
          status: post.get("status"),
          view: post.get("view"),
        };
      });
      setPosts(newPosts);
    };
    fetchPost();
  }, []);
  return (
    <>
      <div className="flex justify-between mb-10">
        <h2 className="text-3xl font-bold">Danh sách bài viết</h2>
        <Link to={"/admin/createblog"}>
          <button className="btn text-white hover:text-black cursor-pointer hover:underlie">
            Thêm bài viết
          </button>
        </Link>
      </div>
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
                  <div className="flex gap-4">
                    <p>
                      Lượt xem: <b>{cart.view}</b>
                    </p>
                    <p className="flex items-center gap-2">
                      Trạng thái: <b>{cart.status}</b>
                      {cart.status === status.show ? (
                        <span className="h-3 w-3 inline-block rounded-full bg-green-400"></span>
                      ) : (
                        <span className="h-3 w-3 inline-block rounded-full bg-red-400"></span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-7 mr-8">
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
