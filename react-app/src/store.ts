import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import authMiddleware from "./authMiddleware";
import userReducer from "./reducers/usersReducer";
import { thunk } from "redux-thunk";
import { persistStore } from "redux-persist";
import authReducer from "./reducers/auth";

// import todo from "./reducers/todo";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    userInfo: userReducer,
    authReducer: authReducer,
  },
  //   middleware: (getDefaultMiddleware) =>
  //     getDefaultMiddleware().concat(authMiddleware),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
