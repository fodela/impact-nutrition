import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";
import Twitter from "next-auth/providers/twitter";
import prisma from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { signInSchema } from "@/lib/zod";
import { ZodError } from "zod";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Google, Twitter, GitHub, Facebook,
    Credentials({
      name: "Phone",
      credentials: {
        phone: { label: "Phone", type: "text", placeholder: "0544249842" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      authorize: async (credentials, req) => {
        const { phone, password } = await signInSchema.parseAsync(credentials);
        try {
          const user = await prisma.user.findUnique({
            where: {
              phone: phone,
            },
          });
          if (!user) {
            throw new Error("Wrong phone number");
          }
//@ts-ignore
          const isPasswordValid = await compare(password, user.password);
          if (!isPasswordValid) {
            throw new Error("Wrong password");
          }

          return {
            id: user.id,
            phone: user.phone,
            name: user.name, // Ensure name is included
            email: user.email, // Ensure email is included if available
            image: user.image, // Ensure image is included if available
            role: user.role,
          };
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          //@ts-ignore
          id: token.id,
          phone: token.phone,
          name: token.name,
          //@ts-ignore
          email: token.email,
          //@ts-ignore
          image: token.image,
          role: token.role,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        //@ts-ignore
        token.phone = user.phone;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        //@ts-ignore
        token.role = user.role;
      }
      return token;
    },
  },
} satisfies NextAuthConfig;
