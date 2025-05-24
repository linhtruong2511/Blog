import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { Image } from "lucide-react";

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
  const toastLoadingId = useRef<any | null>(null);
  useEffect(() => {
    const initializeUploadWidget = () => {
      if (window.cloudinary && uploadButtonRef.current) {
        // Create upload widget
        uploadWidgetRef.current = window.cloudinary.createUploadWidget(
          uwConfig,
          (error, result) => {
            if (result && result.event === "queues-start") {
              toastLoadingId.current = toast.loading("Đang tải ảnh lên cloud");
            }

            if (!error && result && result.event === "success") {
              // console.log("Upload successful:", result.info);
              toast.dismiss(toastLoadingId.current);
              toast.success("Tải ảnh thành công");

              setThumbnail(result.info.url);
              setPublicId(result.info.public_id);
            }

            if (error) {
              toast.dismiss(toastLoadingId.current);
              toast.error("Tải ảnh không thành công");
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
      //base
      //variant
      //size

      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive 
      bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 
      h-9 px-4 py-2 has-[>svg]:px-3"
    >
      Tải ảnh bìa <Image />
    </button>
  );
};

export default CloudinaryUploadWidget;
