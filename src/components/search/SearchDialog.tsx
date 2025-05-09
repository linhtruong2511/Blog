import react from "../../assets/react-thumbnail-test.webp";
export default function SearchDiaglog() {
  return (
    <div className="p-5 border rounded-xl border-gray-600">
      <input
        type="text"
        className="bg-gray-400 focus:bg-gray-100 border py-2 px-2 rounded-md outline-none text-black mx-2 transition-colors"
        placeholder="Search"
      />
      <div className="mt-4">
        <div className="flex items-center gap-5 h-16 overflow-hidden mb-5 p-2 hover:-translate-y-1/12 transition-transform">
          <img src={react} alt="" className="h-full object-cover w-24" />
          <h3>React jfldsjflkdjsfk jsdlkafjl sdjflsjflk</h3>
        </div>
        <div className="flex items-center gap-5 h-16 overflow-hidden mb-5 p-2 hover:-translate-y-1/12 transition-transform">
          <img src={react} alt="" className="h-full object-cover w-24" />
          <h3>React jfldsjflkdjsfk jsdlkafjl sdjflsjflk</h3>
        </div>
      </div>
    </div>
  );
}
