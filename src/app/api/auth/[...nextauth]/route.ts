import { compare } from "bcrypt"
import { PrismaClient } from '@prisma/client'
import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"

const prisma = new PrismaClient()

export type User = {
  id: String,
  firstname: String,
  lastname: String,
  email: String,
  password?: String,
  username?: String,
  date_of_birth?: String,
  role: String
}

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
          }

          const user = await prisma.user.findUnique({
            where: {
              email: credentials?.email
            }
          })
          if (!user) {
            throw new Error('Wrong email')
          }

          const isPasswordValid = await compare(credentials?.password, user.password)
          if (!isPasswordValid) {
            throw new Error('Wrong email')
          }

          return {
            id: user.id,
            email: user.email,
            name: `${user.firstname} ${user.lastname}`,
            role: user.role
          }
        } catch (error) {
          return null
        }
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
        console.log('user', user)
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
    signIn: "/SignIn"
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }


