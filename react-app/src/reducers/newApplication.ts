import axios from "axios";
import { AppDispatch } from "../store";
const API_URL = `${process.env.REACT_APP_API_BASE_URL}/application`;

// types.ts
export interface Application {
    company: string;
    jobTitle: string;
    location: string;
    salary?: string;
    applicationDate: string;
    status: string;
    notes?: string;
    url?: string;
}
interface ApplicationState {
    applications: Application[];
    error: string | null;
}
export const ADD_APPLICATION = "ADD_APPLICATION";
export const APPLICATION_FAIL = "APPLICATION_FAIL";


const initialState: ApplicationState = {
    applications: [],
    error: null,
};

export const addNewApplication =
    (data: Application) => async (dispatch: AppDispatch) => {
        try {
            const res = await axios.post(`${API_URL}/addApplication`, data);
            dispatch({ type: ADD_APPLICATION, payload: res.data });
            return { success: true, data: res.data };
        } catch (error: any) {
            dispatch({
                type: APPLICATION_FAIL,
                payload: error.response?.data?.message || "Add application failed",
            });
            return {
                success: false,
                message: error.response?.data?.message || "Add application failed",
            };
        }
    };

const applicationReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_APPLICATION:
            return {
                ...state,
                applications: [...state.applications, action.payload.application],
                error: null,
            };

        case APPLICATION_FAIL:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default applicationReducer;
