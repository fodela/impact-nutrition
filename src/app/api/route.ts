import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../utils/authOptions";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  return NextResponse.json(session);
}
