const initialState ={
    dataMikro: [],
    dataHapusMikro: [],
    isLoading: false,
    isFinish: false,
    isError: false,
}

export default mikro = ( state = initialState, action) => {
    switch (action.type){
        
        case 'POST_MIKRO_PENDING':
        return {
            ...state,
            isLoading: true
        }

        case 'POST_MIKRO_FULFILLED':
        return {
            ...state,
            isLoading: false,
            isFinish: true,
            dataMikro: action.payload.data.values
        }

        case 'POST_MIKRO_REJECTED':
        return {
            ...state,
            isLoading: false,
            isError: true
        }

        case 'HAPUS_MIKRO_PENDING':
        return {
            ...state,
            isLoading: true
        }

        case 'HAPUS_MIKRO_FULFILLED':
        return {
            ...state,
            isLoading: false,
            isFinish: true,
            dataHapusMikro: action.payload.data.values
        }

        case 'HAPUS_MIKRO_REJECTED':
        return {
            ...state,
            isLoading: false,
            isError: true
        }
        
        default:
            return state;
    }
}