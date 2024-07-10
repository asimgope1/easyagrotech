import { ACCESS_TOKEN, CURRENT_INDEX, LOADING_END, LOADING_START } from "./actionType";

const initialState = {
    accessToken: "",
    currentIndex: -1,
    loading: false
};

const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_START:
            return {
                ...state,
                loading: true
            };
        case LOADING_END:
            return {
                ...state,
                loading: false
            };
        case ACCESS_TOKEN:
            return {
                ...state,
                accessToken: action.payload
            };
        case CURRENT_INDEX:
            return {
                ...state,
                currentIndex: action.payload
            };
        default:
            return state;
    }
};

export default authenticationReducer;
