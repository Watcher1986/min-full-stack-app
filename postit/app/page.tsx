"use client";
import CreatePost from "./components/AddPost";

export default function Home() {
  return (
    <main>
      <h1 className="text-lg py-5">Hey there, yes you !</h1>
      <CreatePost />
    </main>
  );
}
