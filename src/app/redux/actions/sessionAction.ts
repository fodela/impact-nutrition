import { createAsyncThunk } from "@reduxjs/toolkit";
import { Session } from "@prisma/client";

export const setSession = createAsyncThunk(
  "users/setSession",
  async ({
    session,
    sessionStatus,
  }: {
    session: Session;
    sessionStatus: string;
  }) => {
    // Check if session is valid
      return { currentSession: session, sessionStatus };
    }
);
