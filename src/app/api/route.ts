import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
    const session = await getServerSession(authOptions)
    console.log('session', session)
    return NextResponse.json(session)
}