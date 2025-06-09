import axios from "axios";

// const API_URL = "http://localhost:5000/api/auth";
const API_URL = `${process.env.REACT_APP_API_BASE_URL}/auth`;

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";

export const login =
  (email: string, password: string) => async (dispatch: any) => {
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      console.log("data in log", res.data);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    } catch (error: any) {
      console.log("fail", error.response?.data?.message);
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response?.data?.message || "Login failed",
      });
    }
  };

export const logout = () => (dispatch: any) => {
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT });
  console.log("here ")
};

export const register =
  (name: string, email: string, password: string) => async (dispatch: any) => {
    try {
      const res = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
      });
      console.log("res in register", res.data);
      localStorage.setItem("token", res.data.token);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    } catch (error: any) {
      console.log("fail", error.response?.data?.message);
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response?.data?.message || "Login failed",
      });
    }
  };

export interface AuthState {
  token: string | null;
  user: any | null;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  user: null,
  error: null,
};

const authReducer = (state: AuthState | undefined = initialState, action: any): AuthState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        error: null,
      };
    case LOGIN_FAIL:
      return { ...state, error: action.payload };
    case LOGOUT:
      return { ...state, token: null, user: null };
    case REGISTER_SUCCESS: {
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        error: null,
      };
    }
    case REGISTER_FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default authReducer;
