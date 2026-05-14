import React, { createContext, useReducer } from 'react'
import { authReducer, initialState } from './authReducer';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

//creatin context
const AuthContext = createContext();

//provider component
const AuthProvider = ({ children }) => {
    //useReducer
    const [state, dispatch] = useReducer(authReducer, initialState);

    //checkauthfunctions
    const checkAuth = async () => {
        dispatch({ type: "CHECK_AUTH_START" });
        try {
            const res = await axiosInstance.get("/auth/check");

            dispatch({
                type: "CHECK_AUTH_SUCCESS",
                payload: res.data,
            });

        } catch (error) {
            console.log("Error in authcontext checkAuth:", { error });

            dispatch({ type: "CHECK_AUTH_FAILURE" });

        }
    }

    //siggnup functions
    const signup = async (data) => {
        if (state.isSigningUp) return;

        dispatch({ type: "SIGNUP_START" });

        try {
            const res = await axiosInstance.post("/auth/signup", data);
            console.log("Signup from auth context response:", res.data);
            dispatch({
                type: "SIGNUP_SUCCESS",
                payload: res.data,
            })
            toast.success("account created successfully");
        } catch (error) {
            console.log("Error in authcontext signup:", { error });
            toast.error("signup failed")

            dispatch({ type: "SIGNUP_FAILURE" });
        }
    }
    //logout function
    const logout = async () => {
        try {
            const res = await axiosInstance.post("/auth/logout")
            dispatch({ type: "LOGOUT" })
            console.log("Logout response:", res.data);
            toast.success("logged out successfully");
        } catch (error) {
            console.log("Error in authcontext logout:", { error });
            toast.error("logout failed");
        }
    }
    // login function
    const login = async (data) => {
        dispatch({ type: "LOGIN_START" })
        try {
            const res = await axiosInstance.post("/auth/login", data);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
            toast.success("Login Successful")
            console.log("loggin response: ", res.data)
        } catch (error) {
            console.log("Error in authcontext loggin:", { error });
            toast.error("loggin failed")

            dispatch({ type: "LOGIN_FAILURE" });
        }

    }
    //updateprofile
    const updateProfile = async (data) => {
        dispatch({ type: "UPDATE_START" })

        try {
            const res = await axiosInstance.put("/auth/update-profile", data)
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
            toast.success("update Successful")
            console.log("update response: ", res.data)
        } catch (error) {
            console.log("Error in authcontext updateProfile:", { error });
            toast.error("update failed")

            dispatch({ type: "UPDATE_FAILURE" });
        }
    }


    const value = {
        ...state,
        checkAuth,
        signup,
        logout,
        login,
        updateProfile,
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );


};

export { AuthProvider, AuthContext };