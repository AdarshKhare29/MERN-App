import axios from "axios";
import { AppDispatch } from "../store";
const API_URL = `${process.env.REACT_APP_API_BASE_URL}/application`;

// types.ts
export type ApplicationStatus = "applied" | "interview" | "offer" | "rejected";

export interface Application {
    company: string;
    jobTitle: string;
    location: string;
    salary?: string;
    applicationDate: string;
    status: ApplicationStatus;
    notes?: string;
    url?: string;
    _id?: number;
    interviewQuestions?: string[];
}
export interface ApplicationState {
    applications: Application[];
    error: string | null;
}
export const ADD_APPLICATION = "ADD_APPLICATION";
export const APPLICATION_FAIL = "APPLICATION_FAIL";
export const GET_APPLICATIONS = "GET_APPLICATIONS";
export const GET_APPLICATIONS_FAIL = "GET_APPLICATIONS_FAIL";


const initialState: ApplicationState = {
    applications: [],
    error: null,
};

export const addNewApplication =
    (data: Application) => async (dispatch: AppDispatch) => {
        try {
            const token = localStorage.getItem("token"); // Or wherever you're storing it

            const res = await axios.post(
                `${API_URL}/addApplication`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // ✅ send token
                    }
                }
            );

            dispatch({ type: ADD_APPLICATION, payload: res.data.application });

            return { success: true, data: res.data.application };
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



export const getAllApplications = () => async (dispatch: any) => {
    try {
        const token = localStorage.getItem("token"); // or from Redux state
        console.log("token", token)
        const res = await axios.get(`${API_URL}/all`, {
            headers: {
                Authorization: `Bearer ${token}`  // ✅ Include JWT token
            }
        });

        dispatch({
            type: GET_APPLICATIONS,
            payload: res.data.applications,
        });
    } catch (error: any) {
        dispatch({
            type: GET_APPLICATIONS_FAIL,
            payload: error.response?.data?.message || "Failed to fetch applications",
        });
    }
};

const applicationReducer = (state: ApplicationState | undefined = initialState, action: any): ApplicationState => {
    switch (action.type) {
        case ADD_APPLICATION:
            return {
                ...state,
                applications: [...state.applications, action.payload],
                error: null,
            };

        case APPLICATION_FAIL:
            return { ...state, error: action.payload };
        case GET_APPLICATIONS:
            return {
                ...state,
                applications: action.payload,
                error: null,
            };
        case GET_APPLICATIONS_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default applicationReducer;
