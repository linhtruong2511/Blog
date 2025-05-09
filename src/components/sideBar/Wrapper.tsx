import { ReactNode } from "react";

export default function Wrapper({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <>
      <div className="relative flex  border-gray-400 border p-5 bg-gray-700 rounded-xl">
        <h1 className="absolute text-xl -top-8 left-7 bg-[#1e293b] py-2 px-4 rounded-full border border-gray-400">
          {title}
        </h1>
        {children}
      </div>
    </>
  );
}
