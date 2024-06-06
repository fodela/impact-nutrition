// import { authOptions } from "@/app/utils/authOptions";
// import NextAuth from "next-auth/next";

import { handlers } from "../../../../../auth";

export const { GET, POST } = handlers

export type User = {
  id: String;
  name: String;
  email: String;
  password?: String;
  phone: String;
  professional_pin?: String;
  role: String;
};

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

