"use client";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

import { CommentType } from "../types/Comment";

type PropsType = {
  id: string;
};

export default function AddComment({ id }: PropsType) {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const queryClient = useQueryClient();
  let toastId: string;

  const { mutate } = useMutation(
    async (data: Partial<CommentType>) =>
      await axios.post(`/api/posts/addComment`, { data }),
    {
      onError: (err: any) => {
        if (err instanceof AxiosError) {
          toast.error(err?.response?.data.message, { id: toastId });
        }
        setIsDisabled(false);
      },
      onSuccess: () => {
        toast.success("Comment has been created successfully", {
          id: toastId,
        });
        queryClient.invalidateQueries(["detail-post"]);
        setTitle("");
        setIsDisabled(false);
      },
    }
  );

  const onCommentCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    toastId = toast.loading("Adding your comment...", { id: toastId });
    setIsDisabled(true);
    mutate({ message: title, postId: id });
  };

  return (
    <form onSubmit={onCommentCreate} className="my-8">
      <h3>Add a comment</h3>
      <div className="flex flex-col my-2">
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          name="title"
          className="p-4 text-lg rounded-md my-2"
        />
        <div className="flex items-center justify-between gap-2 mt-1">
          <p
            className={`font-bold ml-1 text-sm ${
              title.length > 300 ? "text-red-700" : "text-gray-700"
            }`}
          >{`${title.length}/300`}</p>
          <button
            disabled={isDisabled}
            className="text-sm mr-1 bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
            type="submit"
          >
            Add a comment
          </button>
        </div>
      </div>
    </form>
  );
}
