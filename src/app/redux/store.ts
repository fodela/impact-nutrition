// store.js
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";



export const store = configureStore({
  reducer: rootReducer
});


export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;