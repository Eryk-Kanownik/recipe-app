import { prisma } from "@/database/db";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params: { id },
  }: {
    params: {
      id: string;
    };
  }
) {
  let user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
    select: {
      id: true,
      username: true,
      email: true,
      userRecipes: true,
      Saved: {
        select: {
          recipe: {
            select: {
              id: true,
              recipeName: true,
              description: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(user);
}
