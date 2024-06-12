import { object, string } from "zod"
 
export const signInSchema = object({
  phone: string({ required_error: "Phone is required" })
    .min(1, "Phone is required")
    .max(10, "Use your Ghanaian 10 digits phone number"), 
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})