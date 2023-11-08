// store.js
import { configureStore } from "@reduxjs/toolkit";
import sessionSlice from "./slices/sessionSlice";



export const store = configureStore({
  reducer: {
    session: sessionSlice,
  },
});


export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;