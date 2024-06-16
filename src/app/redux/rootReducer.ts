import { combineReducers } from "@reduxjs/toolkit";
import sessionSlice from "./slices/sessionSlice";
import eventsSlice from "./slices/eventsSlice";
import authReducer from "./slices/authSlice";


const rootReducer = combineReducers({
  session: sessionSlice,
  events: eventsSlice,
  auth: authReducer
});
export default rootReducer