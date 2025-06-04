import {
  UserActionTypes,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from "../actions/userActionTypes";

interface UserState {
  users: any[]; // Change this type based on actual API response
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [], // ✅ Renamed from `usersInfo` to `users` for consistency
  loading: false,
  error: null,
};

// ✅ Fixed reducer typing
const userReducer = (state = initialState, action: any): UserState => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default userReducer;
