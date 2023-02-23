export type CommentType = {
  createdAt: string;
  id: string;
  postId: string;
  userId: string;
  message: string;
  user?: {
    email: string;
    id: string;
    image: string;
    name: string;
  };
};
