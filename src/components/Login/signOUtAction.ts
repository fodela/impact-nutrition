"use client";
import { useRouter } from "next/navigation";
import axios from "axios";

export async function signOutTo(redirectTo: string) {
  await axios.post("/api/logout");
  const router = useRouter();
  router.push(redirectTo);
}
