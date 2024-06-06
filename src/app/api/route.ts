import { NextResponse } from "next/server";
import { auth } from "../../../auth";

export async function GET(req: Request) {
  const session = await auth();
  return NextResponse.json(session);
}
