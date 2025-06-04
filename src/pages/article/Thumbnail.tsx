import React from "react";

const Thumbnail = ({ thumbnailURL }: { thumbnailURL: string }) => {
  return (
    <div className="lg:h-[700px] md:my-5">
      <img
        src={thumbnailURL}
        alt=""
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Thumbnail;
