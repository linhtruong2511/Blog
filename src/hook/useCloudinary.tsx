import { Cloudinary } from "@cloudinary/url-gen";

const useCloudinary = () => {
  return new Cloudinary({ cloud: { cloudName: "dgkgppcom" } });
};

export default useCloudinary;
