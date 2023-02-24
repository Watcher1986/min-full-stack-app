import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "../../../prisma/client";

import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session: any = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ message: "Please sign in" });

    const prismaUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });

    try {
      const { message, postId } = req.body.data;

      if (!message.length) {
        return res.status(403).json({ message: "Content cannot be empty" });
      }
      const result = await prisma.comment.create({
        // @ts-ignore
        data: {
          message,
          userId: prismaUser?.id,
          postId,
        },
      });
      return res.status(200).json(result);
    } catch (err) {
      return res
        .status(403)
        .json({ err: "Error has occured whilst deleting a post" });
    }
  }
}
