import { compare } from "bcrypt"
import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";


export type User = {
  id: String,
  name: String,
  email: String,
  password?: String,
  username?: String,
  date_of_birth?: String,
  role: String
}

// const adapter = PrismaAdapter(prisma)

export const authOptions: NextAuthOptions = {
  // adapter,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [
    GoogleProvider({
      //@ts-ignore
      clientId: process.env.GOOGLE_ID,
      //@ts-ignore
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: 'Email',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'kel@gmail.com' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        }
      },
      async authorize(credentials, req) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Please provide an email or a password')
          }

          const user = await prisma.user.findUnique({
            where: {
              email: credentials?.email
            }
          })
          if (!user) {
            throw new Error('Wrong email')
          }
          //@ts-ignore
          const isPasswordValid = await compare(credentials?.password, user.password)
          if (!isPasswordValid) {
            throw new Error('Wrong email')
          }
          return {
            id: user.id,
            email: user.email,
            role: user.role
          }
        } catch (error) {
          return null
        }
        // finally {
        //   await prisma.$disconnect(); // Release the PrismaClient instance after using it
        //   //@ts-ignore
        //   prisma = null; // Set the variable to null for subsequent requests
        // }
      }
      ,
    })
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role
        }
      }
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as User
        return {
          ...token,
          id: u.id,
          role: u.role
        }
      }
      return token
    }
  },
  pages: {
    signIn: "/signin"
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
