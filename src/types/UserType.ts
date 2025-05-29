export type UserType = {
  uid: string,
  photoURL: string,
  name: string,
  email: string, 
  providerId: string,
  creationTime: string,
  lastSignIn: string,
  
  follower: number, //Đang theo dõi
  following: number, //Được theo dõi
  numberOfPost: number, // số lượng bài viết
  viewOfPost: number, // số lượt đọc bài
  numberOfVote: number, // tổng số lượng vote các bài
}