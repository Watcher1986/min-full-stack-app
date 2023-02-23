"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";

import Post from "@/app/components/Post";
import AddComment from "@/app/components/AddComment";

import { PostType } from "@/app/types/Post";

type URL = {
  params: {
    slug: string;
  };
};

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

export default function PostDetail(url: URL) {
  const { data, isLoading } = useQuery<PostType>({
    queryKey: ["detail-post"],
    queryFn: () => fetchDetails(url.params.slug),
  });

  if (isLoading) return <p>Loading...</p>;

  console.log("DATA => ", data);

  return (
    data && (
      <div>
        <Post
          id={data?.id}
          name={data?.user?.name}
          avatar={data?.user?.image}
          postTitle={data?.title}
          comments={data?.comments}
        />
        <AddComment id={data.id} />
        {data?.comments?.map((comment) => (
          <div key={comment.id} className="bg-white my-6 p-8 rounded-lg">
            <div className="flex items-center gap-3">
              <Image
                className="rounded-full"
                width={24}
                height={24}
                src={comment.user?.image ?? ""}
                alt="avatar"
              />
              <h3 className="font-bold text-gray-700">{comment?.user?.name}</h3>
              <h2 className="text-sm">{comment.createdAt}</h2>
            </div>
            <div className="pt-4">{comment?.message}</div>
          </div>
        ))}
      </div>
    )
  );
}
