export enum StatusPost {
  show = "Công khai",
  hide = "Ẩn",
  pending = "Chưa duyệt",
}

interface PostType {
  id: string | null;
  title: string;
  contentId: string;
  thumbnailURL: string;
  createDate: string;
  view: number;
  status: StatusPost;
  tags: Array<string>;
  shortDesc: string;
  lastUpdate: string;
  isDraft: boolean;

  authorId: string;
  vote: number;
}

export default PostType;
