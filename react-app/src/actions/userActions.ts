import axios from "axios";
import { Dispatch } from "redux";
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  UserActionTypes,
  User,
} from "./userActionTypes";

// Action Creators
export const fetchUsersRequest = (): UserActionTypes => ({
  type: FETCH_USERS_REQUEST,
});

export const fetchUsersSuccess = (users: User[]): UserActionTypes => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

export const fetchUsersFailure = (error: string): UserActionTypes => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

// Thunk Function to Fetch Users
export const fetchUsers = () => {
  console.log("here in fetch ur");
  return async (dispatch: Dispatch<UserActionTypes>) => {
    dispatch(fetchUsersRequest());

    try {
      const response = await axios.get<User[]>(
        "https://jsonplaceholder.typicode.com/users"
      );
      dispatch(fetchUsersSuccess(response.data));
    } catch (error: any) {
      dispatch(fetchUsersFailure(error.message));
    }
  };
};
