import { CommentType } from "./Comment";

export type PostType = {
  id: string;
  title: string;
  updatedAt?: string;
  user: {
    email: string;
    id: string;
    image: string;
    name: string;
  };
  comments: CommentType[];
};
