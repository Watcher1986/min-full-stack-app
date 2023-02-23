// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
    if (!session)
      return res.status(401).json({ message: "User is not authorized" });

    const title: string = req.body.title;

    const prismaUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });

    if (title.length > 300)
      return res.status(403).json({
        message:
          "Unsupported content length, must be not more than 300 characters",
      });

    if (!title.length)
      return res
        .status(403)
        .json({ message: "Please add some content, it can't be empty" });

    try {
      const result = await prisma.post.create({
        data: {
          title,
          userId: prismaUser?.id,
        },
      });
      return res.status(200).json(result);
    } catch (err) {
      return res
        .status(403)
        .json({ err: "Error has occured whilst making a post" });
    }
  }
}
