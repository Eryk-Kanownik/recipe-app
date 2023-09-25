import { prisma } from "@/database/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
  let recent = await prisma.recipe.findMany({
    take: 4,
    orderBy: {
      id: "desc",
    },
    select: {
      id: true,
      recipeName: true,
      description: true,
      creator: {
        select: {
          username: true,
        },
      },
      createdAt: true,
    },
  });

  return NextResponse.json(recent);
}
