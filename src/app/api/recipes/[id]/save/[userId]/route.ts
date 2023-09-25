import { prisma } from "@/database/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { id, userId } }: { params: { id: string; userId: string } }
) {
  let saved = await prisma.saved.findFirst({
    where: {
      userId: parseInt(userId),
      recipeId: parseInt(id),
    },
  });

  if (saved === null) {
    return NextResponse.json(false);
  } else {
    return NextResponse.json(true);
  }
}

export async function POST(
  req: NextRequest,
  { params: { id, userId } }: { params: { id: string; userId: string } }
) {
  let saved = await prisma.saved.findFirst({
    where: {
      userId: parseInt(userId),
      recipeId: parseInt(id),
    },
  });

  if (!saved) {
    await prisma.saved.create({
      data: {
        user: {
          connect: {
            id: parseInt(userId),
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
    await prisma.saved.deleteMany({
      where: {
        userId: parseInt(userId),
        recipeId: parseInt(id),
      },
    });
  }

  let data = await prisma.saved.findFirst({
    where: {
      recipeId: parseInt(id),
      userId: parseInt(userId),
    },
  });

  if (data === null) {
    return NextResponse.json(false);
  } else {
    return NextResponse.json(true);
  }
}
