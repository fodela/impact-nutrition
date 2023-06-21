"use client";

import { SessionProvider } from "next-auth/react";

export interface ChildrenProps {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: ChildrenProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};
