import { combineReducers } from "@reduxjs/toolkit";
import sessionSlice from "./slices/sessionSlice";
import eventsSlice from "./slices/eventsSlice";


const rootReducer = combineReducers({
  session: sessionSlice,
  events: eventsSlice,
});
export default rootReducer