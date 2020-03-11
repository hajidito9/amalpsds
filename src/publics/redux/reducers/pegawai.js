const initialState ={
    dataPegawai: [],
    isLoading: false,
    isFinish: false,
    isError: false,
}

export default pegawai = ( state = initialState, action) => {
    switch (action.type){
        
        case 'POST_PEGAWAI_PENDING':
        return {
            ...state,
            isLoading: true
        }

        case 'POST_PEGAWAI_FULFILLED':
        return {
            ...state,
            isLoading: false,
            isFinish: true,
            dataPegawai: action.payload.data.values
        }

        case 'POST_PEGAWAI_REJECTED':
        return {
            ...state,
            isLoading: false,
            isError: true
        }

        default:
            return state;
    }
}