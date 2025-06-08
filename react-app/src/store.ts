import { configureStore } from "@reduxjs/toolkit";
import authMiddleware from "./authMiddleware";
import { thunk } from "redux-thunk";
import { persistStore } from "redux-persist";
import authReducer from "./reducers/auth";
import applicationReducer from "./reducers/newApplication";
export const store = configureStore({
  reducer: {
    authReducer: authReducer,
    applicationReducer: applicationReducer
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
