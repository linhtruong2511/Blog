import { useState } from "react";
import useCloudinary from "../../hook/useCloudinary";
import CloudinaryUploadWidget from "../../components/cloudinaryUploadWidget/CloudinaryUploadWidget";
import { AdvancedImage, placeholder, responsive } from "@cloudinary/react";
interface Props {
  thumbnail: string;
  setThumbnail: Function;
}

export default function UploadWidgetCloudinary({ setThumbnail }: Props) {
  const cloudName = "dgkgppcom";
  const uploadPreset = "post-image";

  const [publicId, setPublicId] = useState("");

  const cld = useCloudinary();

  const uwConfig = {
    cloudName,
    uploadPreset,
  };

  return (
    <div className="">
      <div className="">
        <CloudinaryUploadWidget
          uwConfig={uwConfig}
          setPublicId={setPublicId}
          setThumbnail={setThumbnail}
        />
      </div>
      <div className="text-center w-96 h-auto mx-auto">
        {publicId && (
          <AdvancedImage
            cldImg={cld.image(publicId)}
            plugins={[responsive(), placeholder()]}
          />
        )}
      </div>
    </div>
  );
}
