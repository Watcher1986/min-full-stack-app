"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import CreatePost from "./components/AddPost";
import Post from "./components/Post";

import { PostType } from "./types/Post";

const allPosts = async () => {
  const response = await axios.get("/api/posts/getPosts");
  return response.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: allPosts,
    queryKey: ["posts"],
  });

  if (error) return error;
  if (isLoading) return "Loading...";

  return (
    <main>
      <CreatePost />
      {data &&
        data?.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            name={post?.user?.name}
            avatar={post?.user?.image}
            postTitle={post.title}
            comments={post?.comments}
          />
        ))}
    </main>
  );
}
