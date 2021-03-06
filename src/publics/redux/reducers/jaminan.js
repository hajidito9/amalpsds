const initialState ={
    dataHapusJaminan: [],
    isLoading: false,
    isFinish: false,
    isError: false,
}

export default jaminan = ( state = initialState, action) => {
    switch (action.type){
        
        case 'POST_JAMINAN_PENDING':
        return {
            ...state,
            isLoading: true
        }

        case 'POST_JAMINAN_FULFILLED':
        return {
            ...state,
            isLoading: false,
            isFinish: true,
            dataJaminan: action.payload.data.values
        }

        case 'POST_JAMINAN_REJECTED':
        return {
            ...state,
            isLoading: false,
            isError: true
        }

        case 'HAPUS_JAMINAN_PENDING':
        return {
            ...state,
            isLoading: true
        }

        case 'HAPUS_JAMINAN_FULFILLED':
        return {
            ...state,
            isLoading: false,
            isFinish: true,
            dataHapusJaminan: action.payload.data.values
        }

        case 'HAPUS_JAMINAN_REJECTED':
        return {
            ...state,
            isLoading: false,
            isError: true
        }


        default:
            return state;
    }
}