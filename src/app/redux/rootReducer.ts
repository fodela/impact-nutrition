import { combineReducers } from "@reduxjs/toolkit";
import sessionSlice from "./slices/sessionSlice";
import eventsSlice from "./slices/eventsSlice";
import authReducer from "./slices/authSlice";
import usersReducer from "./slices/userSlice";


const rootReducer = combineReducers({
  session: sessionSlice,
  events: eventsSlice,
  auth: authReducer,
  users: usersReducer
});
export default rootReducer