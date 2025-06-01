import { UserType } from "./UserType";

export type AuthState = {
  isAuthenticated: boolean;
  loading: boolean;
  user: UserType | null;
};
