"use client";
import axios from "axios";

export async function signOutTo(redirectTo: string) {
  await axios.post("/api/auth/logout");
  window.location.href = redirectTo; // Use window.location.href for client-side redirection
}