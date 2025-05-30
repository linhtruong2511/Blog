import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import PostType from "@/types/PostType";
import { searchPost } from "@/service/postService";
import SearchItem from "../search/SearchItem";
import { ScrollArea } from "../ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { DialogClose } from "@radix-ui/react-dialog";

export default function SearchDiaglog() {
  const [keyword, setKeyword] = useState<string>("");
  const [postSearch, setPostSearch] = useState<PostType[]>([]);
  const navigate = useNavigate();
  const handleSelect = (blogId: string) => {
    setKeyword("");
    navigate("/blog/" + blogId);
  };
  useEffect(() => {
    const fetchData = async () => {
      const posts =
        keyword?.trim() !== "" ? await searchPost(keyword || "") : [];
      setPostSearch(posts || []);
    };
    fetchData();
  }, [keyword]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Button className="hidden md:flex">
            <Search /> Tìm kiếm
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tìm kiếm</DialogTitle>
          <DialogDescription asChild>
            <Input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Nhập từ khóa của bạn"
              type="search"
            ></Input>
          </DialogDescription>
        </DialogHeader>

        <ScrollArea>
          {postSearch.map((item) => {
            return (
              <DialogClose asChild>
                <div>
                  <SearchItem
                    post={item}
                    key={item.id}
                    onSelect={handleSelect}
                  />
                </div>
              </DialogClose>
            );
          })}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
