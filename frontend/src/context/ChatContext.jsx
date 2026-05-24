import { createContext, useCallback, useReducer } from "react";
import { chatInitialState, chatReducer } from "./chatReducer";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [state, dispatch] = useReducer(chatReducer, chatInitialState);

    //getuserfunction
    const getUsers = useCallback(async () => {
        dispatch({ type: "GET_USER_START" });
        try {
            const res = await axiosInstance.get("/messages/users");
            dispatch({ type: "GET_USER_SUCCESS", payload: res.data })
            console.log("Get User Success, ", res.data);
        } catch (error) {
            console.log("Error in chatcontext getusers:", { error });
            toast.error("Cannot Get Users");
            dispatch({ type: "GET_USER_FAILURE" })
        }

    }, [])


    const getMessages = useCallback(async (userId) => {
        dispatch({ type: "GET_MESSAGES_START" });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            dispatch({ type: "GET_MESSAGES_SUCCESS", payload: res.data })
            console.log("Get messages Success, ", res.data);
        } catch (error) {
            console.log("Error in chatcontext getmessages:", { error });
            toast.error("Cannot Get Messages");
            dispatch({ type: "GET_MESSAGES_FAILURE" })
        }


    }, [])

    const setSelectedUser = async (selectedUser) => {
        dispatch({ type: "SELECT_USER", payload: selectedUser });
        console.log("sent this user to setSelectedUser", selectedUser)

    }

    const sendMessage = async (message) => {
        console.log("inside sendMessage start")
        if (!state.selectedUser) {
            console.log("No user selected");
            toast.error("Please select a user first");
            return;
        } try {
            const res = await axiosInstance.post(`/messages/send/${state.selectedUser._id}`, message);
            dispatch({
                type: "SEND_MESSAGE_SUCCESS",
                payload: res.data,
            });
            console.log("success: ", res.data)
        } catch (error) {
            console.log("Error in chatcontext sendmessage:", { error });
            toast.error(error?.response?.data?.message);
            dispatch({ type: "SEND_MESSAGE_FAILURE" });
        }
    }

    const receiveMessage = useCallback((message, authUser, selectedUser) => {
        if((message.senderId==authUser._id && message.receiverId==selectedUser._id)||message.senderId==selectedUser._id && message.receiverId==authUser._id)
        dispatch({ type: "RECEIVE_MESSAGE", payload: message })
    }, [])



    const value = {
        ...state,
        getUsers,
        getMessages,
        setSelectedUser,
        sendMessage,
        receiveMessage,
    }
    return <ChatContext.Provider value={value}>
        {children}
    </ChatContext.Provider>
}
export { ChatContext, ChatProvider }
