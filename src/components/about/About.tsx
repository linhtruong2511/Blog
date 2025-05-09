import me from "../../assets/me.jpg";
export default function About() {
  return (
    <div className="border-gray-400 border p-5 bg-gray-700 rounded-xl">
      <div className="flex items-center gap-2 mb-4">
        <img src={me} alt="" className="h-20 rounded-2xl" />
        <div>
          <h3 className="text-xl">Truong Khanh Linh</h3>
          <p className="text-gray-300">Software Engineer</p>
        </div>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas ipsum
        distinctio, natus dignissimos enim iure aspernatur impedit cum.
        Repellendus dignissimos dolorum placeat doloremque eos ea quod, dolore
        accusantium asperiores voluptates.
      </p>
    </div>
  );
}
