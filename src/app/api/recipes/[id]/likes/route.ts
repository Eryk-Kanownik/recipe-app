import { prisma } from "@/database/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  let likes = await prisma.like.findMany({
    where: {
      recipeId: parseInt(id),
    },
  });
  return NextResponse.json(likes);
}

export async function POST(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  let { userId } = await req.json();

  let like = await prisma.like.findFirst({
    where: {
      userId: userId,
      recipeId: parseInt(id),
    },
  });

  if (!like) {
    await prisma.like.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        recipe: {
          connect: {
            id: parseInt(id),
          },
        },
      },
    });
  } else {
    await prisma.like.deleteMany({
      where: {
        userId: userId,
        recipeId: parseInt(id),
      },
    });
  }

  let data = await prisma.like.findMany({
    where: {
      recipeId: parseInt(id),
    },
  });

  return NextResponse.json(data);
}
