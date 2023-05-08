import { compare } from "bcrypt"
import { PrismaClient } from '@prisma/client'
import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import  CredentialsProvider  from "next-auth/providers/credentials"

const prisma = new PrismaClient()


export const authOptions: NextAuthOptions = {
  jwt: {
    secret: process.env.NEXT_AUTH_SECRET,
  },
 
    providers: [
        CredentialsProvider({
          name: 'Sign in',
          credentials: { 
            username: { label: 'Username', type: 'text', placeholder: 'username' },
            password: {
              label: 'Password',
              type: 'password',
              placeholder: 'Password',
            }
          },
          async authorize(credentials, req) {            
             if(!credentials?.username || !credentials?.password){
              return null
            }
            
            const user = await prisma.user.findUnique({
              where: {
                username: credentials?.username
              }
            })
           if(!user) return null
            
           const isPasswordValid = await compare(credentials?.password, user.password)

           if(!isPasswordValid) return null
           return {
            id: user.id,
            email: user.email,
            name: `${user.firstname} ${user.lastname} ` 
           }
          },
        })
    ],
    callbacks: {
      session: ({session, token}) => {
        console.log('sess', {token, session})
        return session
      },
      jwt: ({token, user}) => {
        console.log('jwtcall', {token, user})
        return token
      }
    }
}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}


