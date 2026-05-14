//initial states

export const chatInitialState = {
    messages: [],
    users: [],
    isUsersLoading: false,
    selectedUser: null,
    isMessagesLoading: false,

};
export const chatReducer = (state, action) => {
    switch (action.type) {
        //getuser logic
        case "GET_USER_START":
            return {
                ...state,
                isUsersLoading: true,
            }

        case "GET_USER_SUCCESS":
            return {
                ...state,
                users: action.payload,
                isUsersLoading: false,
            }

        case "GET_USER_FAILURE":
            return {
                ...state,
                isUsersLoading: false
            }
            //getmessages logic
        case "GET_MESSAGES_START":
            return {
                ...state,
                isMessagesLoading: true,
            }

        case "GET_MESSAGES_SUCCESS":
            return {
                ...state,
                messages: action.payload,
                isMessagesLoading: false,
            }

        case "GET_MESSAGES_FAILURE":
            return {
                ...state,
                isMessagesLoading: false
            }
        //selected user logic:
        case "SELECT_USER":
            return{
                ...state,
                selectedUser:action.payload,
            }
        //send message logic
        case "SEND_MESSAGE_SUCCESS":
            return{
                ...state,
                messages:[...state.messages, action.payload],
            }
        case "SEND_MESSAGE_FAILURE":
            return state;

        default:
            return state;
    }
}
