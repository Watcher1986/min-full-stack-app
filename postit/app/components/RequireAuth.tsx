"use client";
import { ReactNode } from "react";

import getSessionData from "../hooks/getSessionStatus";

interface Props {
  children?: ReactNode;
}

export default async function RequireAuth({ children }: Props) {
  const session = await getSessionData();

  return !session?.user ? (
    <div className="flex items-center justify-center mt-24 rounded-lg bg-white shadow-sm">
      <h1 className="my-24 text-gray-700 tracking-wide text-3xl font-bold align-middle">
        Sign in please
      </h1>
    </div>
  ) : (
    children
  );
}
