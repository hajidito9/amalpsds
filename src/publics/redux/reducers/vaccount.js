const initialState ={
    dataVa: [],
    isLoading: false,
    isFinish: false,
    isError: false,
}

export default vaccount = ( state = initialState, action) => {
    switch (action.type){
        
        case 'POST_VA_PENDING':
        return {
            ...state,
            isLoading: true
        }

        case 'POST_VA_FULFILLED':
        return {
            ...state,
            isLoading: false,
            isFinish: true,
            dataVa: action.payload.data.values
        }

        case 'POST_VA_REJECTED':
        return {
            ...state,
            isLoading: false,
            isError: true
        }

        default:
            return state;
    }
}