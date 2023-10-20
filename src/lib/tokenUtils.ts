import { Event } from "@prisma/client";
import { randomBytes } from "crypto";

function generateToken() {
  const tokenBytes = 32; // Set the desired number of bytes for the token
  return randomBytes(tokenBytes).toString("hex").substring(4);
}


function generatePasswordToken() {
  const tokenBytes = 4; // Set the desired number of bytes for the token
  return randomBytes(tokenBytes).toString("hex").substring(4);
}

export { generateToken, generatePasswordToken };

export function checkIdExists(array: Event[], id: string) {
  return array.some((item: Event) => item.id === id);
}
