import { createContext, ReactNode, useContext, useState } from "react";

export type GlobalPost = {
  content: string;
  setContent: (c: string) => void;
  title: string;
  setTitle: (t: string) => void;
  desc: string;
  setDesc: (d: string) => void;
  thumbnail: string;
  setThumbnail: (t: string) => void;
};

export const EditContext = createContext<GlobalPost>({
  content: "",
  desc: "",
  setContent: () => {},
  setDesc: () => {},
  setThumbnail: () => {},
  setTitle: () => {},
  thumbnail: "",
  title: "",
});

export default function PostEditProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  return (
    <EditContext.Provider
      value={{
        content: content,
        setContent: setContent,
        desc: desc,
        setDesc: setDesc,
        setThumbnail: setThumbnail,
        setTitle: setTitle,
        thumbnail: thumbnail,
        title: title,
      }}
    >
      {children}
    </EditContext.Provider>
  );
}

export const useEditContext = () => useContext(EditContext);
