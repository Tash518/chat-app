//initial states

export const initialState = {
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    onlineUsers: [],
    isCheckingAuth: true,
};

//reducer function
export const authReducer = (state, action) => {
    //checkauth
    switch (action.type) {
        case "CHECK_AUTH_START":
            return {
                ...state,
                isCheckingAuth: true,
            }
        case "CHECK_AUTH_SUCCESS":
            return {
                ...state,
                authUser: action.payload,
                isCheckingAuth: false,
            }
        case "CHECK_AUTH_FAILURE":
            return {
                ...state,
                authUser: null,
                isCheckingAuth: false,
            }
        //signup loic
        case "SIGNUP_START":
            return {
                ...state,
                isSigningUp: true,
            }
        case "SIGNUP_SUCCESS":
            return {
                ...state,
                authUser: action.payload,
                isSigningUp: false,
            }
        case "SIGNUP_FAILURE":
            return {
                ...state,
                isSigningUp: false,
            }
        //logout logic
        case "LOGOUT":
            return {
                ...state,
                authUser: null,
            }
        // login loggic
        case "LOGIN_START":
            return {
                ...state,
                isLoggingIn: true,
            }
        case "LOGIN_SUCCESS":
            return {
                ...state,
                authUser: action.payload,
                isLoggingIn: false,
            }
        case "LOGIN_FAILURE":
            return {
                ...state,
                isLoggingIn: false
            }
        //update logic
        case "UPDATE_START":
            return {
                ...state,
                isUpdatingProfile: true,
            }
        case "UPDATE_SUCCESS":
            return {
                ...state,
                authUser: action.payload,
                isUpdatingProfile: false,
            }
        case "UPDATE_FAILURE":
            return {
                ...state,
                isUpdatingProfile: false,
            }
        default:
            return state;
    }
};
