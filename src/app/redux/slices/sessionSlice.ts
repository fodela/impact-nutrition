import { Session } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { setSession } from "../actions/sessionAction";

interface SessionState {
  sessionStatus: null | string;
  currentSession: Session | null;
}

const initialState: SessionState = {
  sessionStatus: null,
  currentSession: null,
};

const sessionSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
        builder.addCase(setSession.fulfilled, (state, action) => {
          state.sessionStatus = action.payload.sessionStatus;
          state.currentSession = action.payload.currentSession;
        });
  },
});

export default sessionSlice.reducer;