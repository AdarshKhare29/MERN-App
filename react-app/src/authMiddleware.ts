import { Middleware } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";

// Middleware to redirect if user is not authenticated
const authMiddleware: Middleware = (storeAPI) => (next) => (action: any) => {
  const authState = storeAPI.getState().auth; // Get auth state

  if (action.type === "NAVIGATE_PROTECTED" && !authState.isAuthenticated) {
    console.warn("🔒 Access Denied! Redirecting to login...");
    (action.payload as NavigateFunction)("/login"); // Redirect to login page
    return;
  }

  return next(action);
};

export default authMiddleware;
