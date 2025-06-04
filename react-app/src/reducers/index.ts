import { combineReducers } from "redux";
import userReducer from "./usersReducer";

const rootReducer = combineReducers({
  userS: userReducer,

});

export default rootReducer;
