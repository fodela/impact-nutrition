"use client";
import { redirect } from "next/navigation";
import axios from "axios";

export async function signOutTo(redirectTo: string) {
  await axios.post("/api/logout");

  redirect(redirectTo);
}
