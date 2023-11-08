import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getEvents } from "../actions/eventsAction";
import { Event } from "@prisma/client";

interface initialState {
  loading: boolean,
  error: null | string,
  events: Event[]
}

const initialState = {
  loading: false,
  error: null,
  events: []
} as initialState;

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers(builder) {
      builder.addCase(getEvents.pending, (state, action) => {
        state.loading = true
      })
      builder.addCase(getEvents.fulfilled, (state, action) => {
        state.loading = false
        state.events = action.payload
        state.error = null
      })
      builder.addCase(getEvents.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.error = action.payload
      })
  },
});

export default eventsSlice.reducer;
