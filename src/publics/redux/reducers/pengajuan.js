const initialState ={
    dataPengajuan: [],
    dataTolakPengajuan: [],
    dataHapusPengajuan: [],
    dataVerifPengajuan: [],
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

        case 'VERIF_PENGAJUAN_PENDING':
        return {
            ...state,
            isLoading: true
        }

        case 'VERIF_PENGAJUAN_FULFILLED':
        return {
            ...state,
            isLoading: false,
            isFinish: true,
            dataVerifPengajuan: action.payload.data.values
        }

        case 'VERIF_PENGAJUAN_REJECTED':
        return {
            ...state,
            isLoading: false,
            isError: true
        }

        case 'HAPUS_PENGAJUAN_PENDING':
        return {
            ...state,
            isLoading: true
        }

        case 'HAPUS_PENGAJUAN_FULFILLED':
        return {
            ...state,
            isLoading: false,
            isFinish: true,
            dataHapusPengajuan: action.payload.data.values
        }

        case 'HAPUS_PENGAJUAN_REJECTED':
        return {
            ...state,
            isLoading: false,
            isError: true
        }

        case 'TOLAK_PENGAJUAN_PENDING':
            // console.warn('pending')
        return {
            ...state,
            isLoading: true
        }

        case 'TOLAK_PENGAJUAN_FULFILLED':
        return {
            ...state,
            isLoading: false,
            isFinish: true,
            dataTolakPengajuan: action.payload.data.values
        }

        case 'TOLAK_PENGAJUAN_REJECTED':
            console.warn('reject')
        return {
            ...state,
            isLoading: false,
            isError: true
        }

        default:
            return state;
    }
}