const initialState ={
    dataGcash: [],
    dataGcashBalance: [],
    dataBayarGcash: [],
    dataAutodebet: [],
    isLoading: false,
    isFinish: false,
    isError: false,
}

export default gcash = ( state = initialState, action) => {
    switch (action.type){
        
        case 'POST_GCASH_PENDING':
        return {
            ...state,
            isLoading: true
        }

        case 'POST_GCASH_FULFILLED':
        return {
            ...state,
            isLoading: false,
            isFinish: true,
            dataBayarGcash: action.payload.data.values
        }

        case 'POST_GCASH_REJECTED':
        return {
            ...state,
            isLoading: false,
            isError: true
        }

        case 'GET_GCASH_PENDING':
        return {
            ...state,
            isLoading: true
        }

        case 'GET_GCASH_FULFILLED':
        return {
            ...state,
            isLoading: false,
            isFinish: true,
            dataGcash: action.payload.data.values
        }

        case 'GET_GCASH_REJECTED':
        return {
            ...state,
            isLoading: false,
            isError: true
        }

        case 'GET_GCASHBALANCE_PENDING':
        return {
            ...state,
            isLoading: true
        }

        case 'GET_GCASHBALANCE_FULFILLED':
        return {
            ...state,
            isLoading: false,
            isFinish: true,
            dataGcashBalance: action.payload.data.values
        }

        case 'GET_GCASHBALANCE_REJECTED':
        return {
            ...state,
            isLoading: false,
            isError: true
        }

        case 'AUTODEBET_PENDING':
        return {
            ...state,
            isLoading: true
        }

        case 'AUTODEBET_FULFILLED':
        return {
            ...state,
            isLoading: false,
            isFinish: true,
            dataAutodebet: action.payload.data.values
        }

        case 'AUTODEBET_REJECTED':
        return {
            ...state,
            isLoading: false,
            isError: true
        }

        default:
            return state;
    }
}