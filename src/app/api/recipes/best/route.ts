import { prisma } from "@/database/db";
import { NextResponse } from "next/server";

let sort = (a: any, b: any) => {
  if (a.likes.length > b.likes.length) {
    return -1;
  } else {
    return 1;
  }
};

export async function GET() {
  let best = await prisma.recipe.findMany({
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
      likes: true,
    },
  });
  best.sort(sort);
  if (best.length > 4) {
    best.length = 4;
  }

  return NextResponse.json(best);
}
