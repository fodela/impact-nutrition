import type { NextAuthConfig } from "next-auth"
import GitHub from "next-auth/providers/github";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";
import Twitter from "next-auth/providers/twitter";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcryptjs";

export const authConfig = {
    adapter: PrismaAdapter(prisma),

    providers: [Google, Twitter, GitHub, Facebook,
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
        authorize: async(credentials, req) => {
          try {
            if (!credentials?.phone || !credentials?.password) {
              throw new Error("Please provide an email or a password");
            }
  
            const user = await prisma.user.findUnique({
              where: {
                //@ts-ignore
                phone: credentials?.phone,
              },
            });
            if (!user) {
              throw new Error("Wrong prhone number");
            }
            //@ts-ignore
            const isPasswordValid = await compare(
              //@ts-ignore
              credentials?.password,
              //@ts-ignore
              user.password
            );
            console.log("ispasswordvalid", isPasswordValid)
            if (!isPasswordValid) {
              throw new Error("Wrong password");
            }
            return {
              id: user.id,
              phone: user.phone,
              role: user.role,
            };
          } catch (error) {
            console.log('error--errr', error)
            return null;
          }
        },
      }),
    ],
    pages: {
      signIn: '/auth/signin',
    }, 
    callbacks: {
      async session({session, user}) {
        console.log(session, 'session')
        session.user.id = user.id
        return session
      },
       authorized({ auth, request: { nextUrl } }) {
        const isLoggedIn = !!auth?.user
        const paths = ["/user"]
        const isProtected = paths.some((path) => nextUrl.pathname.startsWith(path))

        if(isProtected && !isLoggedIn) {
          const redirectUrl = new URL("/auth/login", nextUrl.origin)
          redirectUrl.searchParams.append("callbackUrl", nextUrl.href)
          return Response.redirect(redirectUrl)
        }
        return true
       }
    },
} satisfies NextAuthConfig