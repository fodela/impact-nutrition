import { Session } from "@prisma/client";
import { verifyUserRole } from "./verifyUserRole";

export async function validateAuthorization(
  session: Session,
  authorId: String,
  requiredRole: String
) {
  if (!session) {
    throw new Error("You are not logged in!");
  }
  //@ts-ignore
  if (
    //@ts-ignore
    session.user.id !== authorId ||
    //@ts-ignore
    !verifyUserRole(session.user.role, requiredRole)
  ) {
    throw new Error(
      "Permission error, you are not allowed to perfrom this action"
    );
  }
}
