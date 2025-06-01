import PostType from "@/types/PostType";

interface Props {
  post: PostType;
  onSelect: (id: string) => void
}

const SearchItem = ({ post, onSelect }: Props) => {
  return (
    <div className="flex mb-10 gap-3" onClick={() => onSelect(post.id as string)}>
      <img
        className="object-cover h-18 w-32"
        src={post.thumbnailURL}
        alt={post.title}
      />
      <div className="w-83">
        <h3 className="truncate text-xl font-medium">{post.title}</h3>
        <p className="line-clamp-2 text-gray-500">{post.shortDesc}</p>
      </div>
    </div>
  );
};

export default SearchItem;
