import avatar from "../../assets/user-avatar.png";
export function Avatar() {
  return (
    <>
      <div>
        <img src={avatar} alt="" className="h-12 w-12 rounded-full" />
      </div>
    </>
  );
}
