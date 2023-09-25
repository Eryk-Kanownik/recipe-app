import { prisma } from "@/database/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url!);
  if (url.searchParams.get("name") === null) {
    var users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        userRecipes: {
          select: {
            likes: true,
          },
        },
      },
    });
  } else {
    var users = await prisma.user.findMany({
      where: {
        username: {
          contains: url.searchParams.get("name")?.toString(),
        },
      },
      select: {
        id: true,
        username: true,
        userRecipes: {
          select: {
            likes: true,
          },
        },
      },
    });
  }

  return NextResponse.json(users);
}
