export const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "post-image");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/" + "dgkgppcom" + "/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    const url = data.secure_url;
    return url;
  };