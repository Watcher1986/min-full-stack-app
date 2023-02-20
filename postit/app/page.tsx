"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import CreatePost from "./components/AddPost";

const allPosts = async () => {
  const response = await axios.get("/api/posts/getPosts");
  return response.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryFn: allPosts,
    queryKey: ["posts"],
  });

  if (error) return error;
  if (isLoading) return "Loading...";
  console.log(data);

  return (
    <main>
      <CreatePost />
    </main>
  );
}
