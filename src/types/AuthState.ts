import PostType from "./PostType";
import { UserType } from "./UserType";

export type AuthState = {
  isAuthenticated: boolean;
  loading: boolean;
  user: UserType | null;
  posts: PostType[];
};
