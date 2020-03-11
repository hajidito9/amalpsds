const initialState ={
    dataNasabah: [],
    isLoading: false,
    isFinish: false,
    isError: false,
}

export default nasabah = ( state = initialState, action) => {
    switch (action.type){
        
        case 'POST_NASABAH_PENDING':
        return {
            ...state,
            isLoading: true
        }

        case 'POST_NASABAH_FULFILLED':
        return {
            ...state,
            isLoading: false,
            isFinish: true,
            dataNasabah: action.payload.data.values
        }

        case 'POST_NASABAH_REJECTED':
        return {
            ...state,
            isLoading: false,
            isError: true
        }

        default:
            return state;
    }
}