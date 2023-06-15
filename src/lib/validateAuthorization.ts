import { Session } from "@prisma/client";
import { verifyUserRole } from "./verifyUserRole";

export async function validateAuthorization(
  session: Session,
  authorId: String,
  requiredRole: string
) {
  if (!session) {
    throw new Error("You are not logged in!");
  }
  //@ts-ignore
  const { id, role } = session.user;
  //id !== authorId ||
  if (!verifyUserRole(role, requiredRole)) {
    throw new Error(
      "Permission error, you are not allowed to perfrom this action"
    );
  }
}
