import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onOk: () => void;
  onCancel: () => void;
  title: string;
}

export default function Modal({ children, title, onOk, onCancel }: Props) {
  return (
    <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center">
      <div className="absolute top-0 left-0 h-full w-full bg-black opacity-60"></div>
      {/* title and body */}
      <div className="flex flex-col justify-between p-5 rounded-md bg-white text-black z-10 min-h-50 min-w-96">
        <div>
          <div>
            <h2 className="text-2xl font-semibold">{title}</h2>
          </div>
          <hr className="text-gray-300 mt-2 mb-5" />
          <div>{children}</div>
        </div>

        <div className="flex items-center gap-4 justify-end">
          <button onClick={onOk} className="btn btn-primary">
            OK
          </button>
          <button onClick={onCancel} className="btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
