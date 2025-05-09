interface Props {
  question: string;
  onConfirm: () => void;
  onCancel: () => void;
}
export default function ModalConfirm({ question, onConfirm, onCancel }: Props) {
  return (
    <>
      <div
        className="fixed top-0 left-0 h-full w-full flex items-center justify-center"
        style={{}}
      >
        <div className="absolute top-0 left-0 h-full w-full bg-black opacity-60"></div>
        <div className="p-5 rounded-md bg-white text-black z-10">
          <h3 className="text-xl text-red-500">{question}</h3>
          <div className="flex justify-end gap-5 mt-5">
            <button
              className="cursor-pointer border py-1 px-2 rounded-md"
              onClick={onCancel}
            >
              Thoát
            </button>
            <button
              className="cursor-pointer border py-1 px-2 rounded-md"
              onClick={onConfirm}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
