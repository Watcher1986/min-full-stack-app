"use client";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import Image from "next/image";
import toast from "react-hot-toast";

import Toggle from "./Toggle";

type EditProps = {
  id: string;
  title: string;
  avatar: string;
  name: string;
  key: string;
  comments?: {
    id: string;
    postId: string;
    userId: string;
  }[];
};

export default function EditPost({
  avatar,
  name,
  title,
  comments,
  id,
}: EditProps) {
  const queryClient = useQueryClient();
  const [toggle, setToggle] = useState(false);
  let deleteToastID: string;

  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete("/api/posts/deletePost", { data: id }),
    {
      onError: (err: any) => {
        if (err instanceof AxiosError) {
          toast.error(err?.response?.data.message, { id: deleteToastID });
        }
      },
      onSuccess: () => {
        toast.success("Post has been successfully deleted", {
          id: deleteToastID,
        });
        queryClient.invalidateQueries(["auth-posts"]);
      },
    }
  );

  const deletePost = () => {
    deleteToastID = toast.loading("Deleting your post.", { id: deleteToastID });
    mutate(id);
  };

  return (
    <>
      {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}

      <div className="bg-white my-8 p-7 rounded-lg">
        <div
          className="flex items-center gap-4
      "
        >
          <Image
            className="rounded-full"
            width={32}
            height={32}
            src={avatar}
            alt="avatar"
          />
          <h3 className="font-bold text-gray-700">{name}</h3>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <h2 className="font-bold text-gray-700">{title}</h2>
          <p className="break-all text-gray-700 text-base">
            {comments?.length} Comments
          </p>
          <div className="flex items-center justify-between">
            <button
              onClick={() => setToggle(true)}
              className="text-sm font-bold bg-red-500 text-white py-1 px-3 rounded-xl disabled:opacity-25"
            >
              Delete post
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
