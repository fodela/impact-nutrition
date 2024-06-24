// import { compare } from "bcrypt";
// import { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import prisma from "@/lib/prisma";
// import { User } from "../api/auth/[...nextauth]/route";

// export const authOptions: NextAuthOptions = {
//   // adapter,
//   jwt: {
//     secret: process.env.NEXTAUTH_SECRET,
//   },
//   providers: [
//     GoogleProvider({
//       //@ts-ignore
//       clientId: process.env.GOOGLE_ID,
//       //@ts-ignore
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),
//     CredentialsProvider({
//       name: "Phone",
//       credentials: {
//         phone: { label: "Phone", type: "text", placeholder: "0546249862" },
//         password: {
//           label: "Password",
//           type: "password",
//           placeholder: "Password",
//         },
//       },
//       async authorize(credentials, req) {
//         try {
//           if (!credentials?.phone || !credentials?.password) {
//             throw new Error("Please provide an email or a password");
//           }

//           const user = await prisma.user.findUnique({
//             where: {
//               phone: credentials?.phone,
//             },
//           });
//           if (!user) {
//             throw new Error("Wrong prhone number");
//           }
//           //@ts-ignore
//           const isPasswordValid = await compare(
//             credentials?.password,
//             //@ts-ignore
//             user.password
//           );
//           if (!isPasswordValid) {
//             throw new Error("Wrong password");
//           }
//           return {
//             id: user.id,
//             phone: user.phone,
//             role: user.role,
//           };
//         } catch (error) {
//           return null;
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     session: ({ session, token }) => {
//       return {
//         ...session,
//         user: {
//           ...session.user,
//           id: token.id,
//           role: token.role,
//         },
//       };
//     },
//     jwt: ({ token, user }) => {
//       if (user) {
//         const u = user as unknown as User;
//         return {
//           ...token,
//           id: u.id,
//           role: u.role,
//         };
//       }
//       return token;
//     },
//   },
//   pages: {
//     signIn: "/auth/signin",
//   },
// };
