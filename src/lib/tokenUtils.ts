import { Event } from "@prisma/client";
import { randomBytes } from "crypto";

function generateToken() {
  const tokenBytes = 32; // Set the desired number of bytes for the token
  return randomBytes(tokenBytes).toString("hex");
}
export { generateToken };

export function checkIdExists(array: Event[], id: string) {
  return array.some((item: Event) => item.id === id);
}
