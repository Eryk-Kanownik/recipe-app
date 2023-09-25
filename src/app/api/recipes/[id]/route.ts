import { prisma } from "@/database/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(
  req: NextApiRequest,
  { params: { id } }: { params: { id: string } }
) {
  let recipe = await prisma.recipe.findUnique({
    where: { id: parseInt(id) },
    select: {
      id: true,
      recipeName: true,
      description: true,
      methodOfPreparation: true,
      ingredients: true,
      creator: {
        select: {
          username: true,
          id: true,
        },
      },
    },
  });
  return NextResponse.json(recipe);
}
