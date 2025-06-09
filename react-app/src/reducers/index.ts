import { combineReducers, Reducer } from "redux";
import authReducer from "./auth";
import applicationReducer from "./newApplication";

const rootReducer = combineReducers({
    auth: authReducer,
    application: applicationReducer,
});

// The important part:
// This type explicitly says the reducer can accept state or undefined
export type RootStateReducer = ReturnType<typeof rootReducer>;
export type RootReducer = Reducer<RootStateReducer | undefined>;

export default rootReducer;
