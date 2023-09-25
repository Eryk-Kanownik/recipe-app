import { NextResponse } from "next/server";
import { prisma } from "../../../database/db";

export async function POST(request: Request) {
  let data = await request.json();
  let { username, email, password } = data;
  try {
    let user = await prisma.user.findUnique({ where: { email } });
    if (user === null) {
      await prisma.user.create({
        data: {
          username,
          email,
          password,
        },
      });
      return NextResponse.json({ message: "User Created!" });
    } else {
      return NextResponse.json({ message: "User Already Exist" });
    }
  } catch (e) {
    return NextResponse.json({ message: e });
  }
}
