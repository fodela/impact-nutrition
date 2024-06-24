import { Session } from "@prisma/client";
import { verifyUserRole } from "./verifyUserRole";
import { userSession } from "@/app/api/auth/checkAuth/route";

export async function validateAuthorization(
  user: userSession,
  authorId: String,
  requiredRole: string
) {
  if (!user) {
    throw new Error("You are not logged in!");
  }
  //@ts-ignore
  const { id, role } = user;
  //id !== authorId ||
  if (!verifyUserRole(role, requiredRole)) {
    throw new Error(
      "Permission error, you are not allowed to perfrom this action"
    );
  }
}
