import { useEffect, useRef } from "react";
interface Cloudinary {
  createUploadWidget: (
    config: any,
    callback: (error: any, result: any) => void
  ) => any;
}
interface Widget {
  open: Function;
}
declare global {
  interface Window {
    cloudinary: Cloudinary;
  }
}
const CloudinaryUploadWidget = ({
  uwConfig,
  setPublicId,
  setThumbnail,
}: {
  uwConfig: object;
  setPublicId: Function;
  setThumbnail: Function;
}) => {
  const uploadWidgetRef = useRef<Widget | null>(null);
  const uploadButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const initializeUploadWidget = () => {
      if (window.cloudinary && uploadButtonRef.current) {
        // Create upload widget
        uploadWidgetRef.current = window.cloudinary.createUploadWidget(
          uwConfig,
          (error, result) => {
            if (!error && result && result.event === "success") {
              // console.log("Upload successful:", result.info);
              setThumbnail(result.info.url);
              setPublicId(result.info.public_id);
            }
          }
        );

        // Add click event to open widget
        const handleUploadClick = () => {
          if (uploadWidgetRef.current) {
            uploadWidgetRef.current.open();
          }
        };

        const buttonElement = uploadButtonRef.current;
        buttonElement.addEventListener("click", handleUploadClick);

        // Cleanup
        return () => {
          buttonElement.removeEventListener("click", handleUploadClick);
        };
      }
    };

    initializeUploadWidget();
  }, [uwConfig, setPublicId]);

  return (
    <button
      ref={uploadButtonRef}
      id="upload_widget"
      className="btn btn-primary"
    >
      Chọn ảnh bìa
    </button>
  );
};

export default CloudinaryUploadWidget;
