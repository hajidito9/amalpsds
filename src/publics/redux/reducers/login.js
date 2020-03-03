const initialState ={
    dataLogin: [],
    isLoading: false,
    isFinish: false,
    isError: false,
}

export default login = ( state = initialState, action) => {
    switch (action.type){
        
        case 'POST_LOGIN_PENDING':
        return {
            ...state,
            isLoading: true
        }

        case 'POST_LOGIN_FULFILLED':
        return {
            ...state,
            isLoading: false,
            isFinish: true,
            dataLogin: action.payload.data
        }

        case 'POST_LOGIN_REJECTED':
        return {
            ...state,
            isLoading: false,
            isError: true
        }

        default:
            return state;
    }
}