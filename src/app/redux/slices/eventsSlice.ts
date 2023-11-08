import { createSlice } from "@reduxjs/toolkit";
import { getEvents } from "../actions/eventsAction";
interface initialState {
  loading: boolean,
  error: null | string,
  data: null | string
}

const initialState = {
  loading: false,
  error: null,
  data: null
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
        state.data = action.payload
        state.error = null
      })
      builder.addCase(getEvents.rejected, (state, action) => {
        state.loading = false
        state.error =action.payload
      })
  },
});

export default eventsSlice.reducer;
