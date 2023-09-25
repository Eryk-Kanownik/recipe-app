import { prisma } from "@/database/db";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url!);
  if (url.searchParams.get("name") === null) {
    var recipes = await prisma.recipe.findMany({
      where: {
        recipeName: {
          contains: url.searchParams.get("name")?.toString(),
        },
      },
      select: {
        id: true,
        recipeName: true,
        description: true,
        creator: {
          select: {
            username: true,
            id: true,
          },
        },
      },
    });
  } else {
    var recipes = await prisma.recipe.findMany({
      where: {
        recipeName: {
          contains: url.searchParams.get("name")?.toString(),
        },
      },
      select: {
        id: true,
        recipeName: true,
        description: true,
        creator: {
          select: {
            username: true,
            id: true,
          },
        },
      },
    });
  }
  return NextResponse.json(recipes);
}

export async function POST(req: NextRequest) {
  let data = await req.json();
  let recipe = await prisma.recipe.create(data);
  return NextResponse.json(recipe);
}
