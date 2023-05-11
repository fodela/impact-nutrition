import { compare } from "bcrypt"
import { PrismaClient } from '@prisma/client'
import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"

const prisma = new PrismaClient()


export const authOptions: NextAuthOptions = {
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },

  providers: [
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
            return null
          }

          const user = await prisma.user.findUnique({
            where: {
              email: credentials?.email
            }
          })
          if (!user) {
            throw new Error('Wrong email')
            return null
          }

          const isPasswordValid = await compare(credentials?.password, user.password)
          if (!isPasswordValid) {
            throw new Error('Wrong email')
            return null
          }
          return {
            id: user.id,
            email: user.email,
            name: `${user.firstname} ${user.lastname} `
          }
        } catch (error) {
          console.error('Authentication error:', error)
          return null
        }
      }
      ,
    })
  ],
  callbacks: {
    session: ({ session, token }) => {
      return session
    },
    jwt: ({ token, user }) => {
      return token
    }
  },
  pages: {
    signIn: "/SignIn"
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }


