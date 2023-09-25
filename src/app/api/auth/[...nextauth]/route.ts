import { prisma } from "@/database/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";

import CredentialsProvider from "next-auth/providers/credentials";

interface User {
  username: string;
  email: string;
  password: string;
}

export const OPTIONS: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (!user) {
          throw new Error("Invalid Credentials");
        }
        if (user.password !== credentials.password) {
          throw new Error("Invalid Credentials");
        }

        return {
          id: user.id,
          name: user.username,
          email: user.email,
        } as any;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXT_AUTH_SECRET,

  callbacks: {
    async session({ session, token }) {
      session.user.id = parseInt(token.sub!.toString());
      return session;
    },
  },
};

const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };
