const initialState ={
    dataAngsuran: [],
    isLoading: false,
    isFinish: false,
    isError: false,
}

export default angsuran = ( state = initialState, action) => {
    switch (action.type){
        
        case 'POST_ANGSURAN_PENDING':
        return {
            ...state,
            isLoading: true
        }

        case 'POST_ANGSURAN_FULFILLED':
        return {
            ...state,
            isLoading: false,
            isFinish: true,
            dataAngsuran: action.payload.data.values
        }

        case 'POST_ANGSURAN_REJECTED':
        return {
            ...state,
            isLoading: false,
            isError: true
        }

        default:
            return state;
    }
}