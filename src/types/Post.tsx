export enum Status {
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
  status: Status;
  tags: Array<string>;
  shortDesc: string;
  lastUpdate: string;
  isDraft: boolean;
}

export default Post;
