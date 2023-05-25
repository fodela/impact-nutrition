import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "./prisma";
import { verifyUserRole } from "./verifyUserRole";

const getPosts = async () => {
  const feed = await prisma.post.findMany();
  return feed;
};




export const validateRole = async (session: Session, authorId: String, requiredRole: string) => {
  if (!session) {
    throw new Error("You are not logged In")
  }
  //@ts-ignore
  if (verifyUserRole(session.user.role, requiredRole)) throw new Error("You are not authorized to create a new Post")
  //@ts-ignore
  const currentUserRole = session?.user.id;
  if (currentUserRole !== authorId && !verifyUserRole(currentUserRole, 'ADMINISTRATOR')) {
    throw new Error("You are not authorized!")
  }
}

export default getPosts;
