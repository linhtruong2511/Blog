import { Checkbox } from "@/components/ui/checkbox";
import PostType from "@/types/PostType";
import ShowPostButton from "./ShowPostButton";
import CheckedButton from "./CheckedButton";
import RejectButton from "./RejectButton";

const PendingPostRow = ({
  pp,
  onChecked,
  onReject,
}: {
  pp: PostType;
  onChecked: (id: string) => void;
  onReject: (post: PostType) => void;
}) => {
  return (
    <tr
      key={pp.id}
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
    >
      <td className="px-6 py-4">
        <Checkbox />
      </td>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {pp.title}
      </th>
      <td className="px-6 py-4">{pp.createDate}</td>
      <td className="px-6 py-4">{pp.authorId}</td>
      <td className="px-6 py-4 text-red-500">{pp.status}</td>
      <td className="flex gap-4 items-center px-5 py-4">
        <ShowPostButton post={pp} />
        <CheckedButton onChecked={() => onChecked(pp.id as string)} />
        <RejectButton onReject={() => onReject(pp)}/>
      </td>
    </tr>
  );
};

export default PendingPostRow;
