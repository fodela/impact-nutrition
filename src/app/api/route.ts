import { authenticateUser } from "@/lib/authUtils";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const user = await authenticateUser(req);

  return NextResponse.json(user);
}
