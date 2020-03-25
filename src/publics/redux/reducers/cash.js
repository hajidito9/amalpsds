const initialState ={
    dataDpCash: [],
    dataHapusDpCash: [],
    isLoading: false,
    isFinish: false,
    isError: false,
}

export default cash = ( state = initialState, action) => {
    switch (action.type){
        
        case 'POST_DPCASH_PENDING':
        return {
            ...state,
            isLoading: true
        }

        case 'POST_DPCASH_FULFILLED':
        return {
            ...state,
            isLoading: false,
            isFinish: true,
            dataDpCash: action.payload.data.values
        }

        case 'POST_DPCASH_REJECTED':
        return {
            ...state,
            isLoading: false,
            isError: true
        }

        case 'HAPUS_CASH_PENDING':
        return {
            ...state,
            isLoading: true
        }

        case 'HAPUS_CASH_FULFILLED':
        return {
            ...state,
            isLoading: false,
            isFinish: true,
            dataHapusDpCash: action.payload.data.values
        }

        case 'HAPUS_CASH_REJECTED':
        return {
            ...state,
            isLoading: false,
            isError: true
        }

        default:
            return state;
    }
}