import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Back = () => {
  const navigate = useNavigate();

  return (
    <span onClick={() => navigate("/")} className="cursor-pointer">
      <FaArrowLeft className="inline mr-3" /> Quay lại danh sách bài viết
    </span>
  );
};

export default Back;
