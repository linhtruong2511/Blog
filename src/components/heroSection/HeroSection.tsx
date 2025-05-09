import "./hero-section.css";
export default function HeroSection() {
  return (
    <>
      <div className="hero flex flex-col justify-center items-center w-full text-center text-xl px-32 py-60 mb-20">
        <div className="overlay"></div>
        <div className="content flex flex-col items-center">
          {/* <img src={CodeIcon} alt="" className="h-32" /> */}
          <h2 className="flex gap-3 font-bold text-6xl text-gray-100">
            {"< "}DEVTRUONG{" />"}
          </h2>
          <p className="text-gray-400">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </p>
        </div>
      </div>
    </>
  );
}
