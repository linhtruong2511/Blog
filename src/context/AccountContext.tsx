import PostType from "@/types/PostType";
import { UserType } from "@/types/UserType";
import { createContext, ReactNode, useContext, useState } from "react";

export type PostAuthor = {
  posts: PostType[] | undefined,
  author: UserType | undefined,
  setPosts: (p : PostType[] | undefined) => void,
  setAuthor: (a : UserType | undefined) => void;
}

export const AccountContext = createContext<PostAuthor>({
  posts: [],
  author: {} as UserType,
  setAuthor: () => {},
  setPosts: () => {}
});

export default function AccountContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [author, setAuthor] = useState<UserType>();
  const [posts, setPosts] = useState<PostType[]>();

  return (
    <AccountContext.Provider
      value={{
        author: author,
        setAuthor: setAuthor,
        posts: posts,
        setPosts: setPosts,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export const useAccountContext = () => useContext(AccountContext);
