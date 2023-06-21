import { randomBytes } from "crypto";

function generateToken() {
    const tokenBytes = 32; // Set the desired number of bytes for the token
    return randomBytes(tokenBytes).toString("hex");
}
export { generateToken }