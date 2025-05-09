export enum status {
  show = "Công khai",
  hide = "Ẩn",
}
interface Post {
  id: string | null;
  title: string;
  contentId: string;
  thumbnailURL: string;
  createDate: string;
  view: number;
  status: status;
  tags: Array<string>;
  shortDesc: string;
}

export default Post;
