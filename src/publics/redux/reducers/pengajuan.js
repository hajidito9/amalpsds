const initialState ={
    dataPengajuan: [],
    dataPengajuanNasabah: [],
    isLoading: false,
    isFinish: false,
    isError: false,
}

export default pengajuan = ( state = initialState, action) => {
    switch (action.type){
        
        case 'POST_PENGAJUAN_PENDING':
        return {
            ...state,
            isLoading: true
        }

        case 'POST_PENGAJUAN_FULFILLED':
        return {
            ...state,
            isLoading: false,
            isFinish: true,
            dataPengajuan: action.payload.data.values
        }

        case 'POST_PENGAJUAN_REJECTED':
        return {
            ...state,
            isLoading: false,
            isError: true
        }

        case 'GET_PENGAJUAN_PENDING':
        return {
            ...state,
            isLoading: true
        }

        case 'GET_PENGAJUAN_FULFILLED':
        return {
            ...state,
            isLoading: false,
            isFinish: true,
            dataPengajuanNasabah: action.payload.data.values
        }

        case 'GET_PENGAJUAN_REJECTED':
        return {
            ...state,
            isLoading: false,
            isError: true
        }

        default:
            return state;
    }
}