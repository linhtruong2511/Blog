export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type UserType = {
  uid: string;
  email: string;

  photoURL: string;
  name: string;
  
  providerId: string;
  creationTime: string;
  lastSignIn: string;

  follower: number; //Đang theo dõi
  following: number; //Được theo dõi

  numberOfPost: number; // số lượng bài viết
  viewOfPost: number; // số lượt đọc bài
  numberOfVote: number; // tổng số lượng vote các bài

  role: Role;
};
