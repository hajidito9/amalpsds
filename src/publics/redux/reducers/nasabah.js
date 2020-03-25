const initialState = {
    dataNasabah: [],
    dataHapusNasabah: [],
    dataNasabahAdmin: [],
    dataDetailNasabahAdmin: [],
    dataDetailKendaraanNasabah: [],
    dataDpCash: [],
    dataDpJaminan: [],
    dataDpEmas: [],
    dataMikroNasabah: [],
    dataPegawaiNasabah: [],
    isLoading: false,
    isFinish: false,
    isError: false,
}

export default nasabah = (state = initialState, action) => {
    switch (action.type) {

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

        case 'GET_NASABAH_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'GET_NASABAH_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                dataNasabahAdmin: action.payload.data.values
            }

        case 'GET_NASABAH_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case 'GET_DETAILNASABAH_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'GET_DETAILNASABAH_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                dataDetailNasabahAdmin: action.payload.data.values
            }

        case 'GET_DETAILNASABAH_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case 'GET_DETAILKENDARAANNASABAH_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'GET_DETAILKENDARAANNASABAH_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                dataDetailKendaraanNasabah: action.payload.data.values
            }

        case 'GET_DETAILKENDARAANNASABAH_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case 'GET_DPCASH_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'GET_DPCASH_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                dataDpCash: action.payload.data.values
            }

        case 'GET_DPCASH_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case 'GET_DPJAMINAN_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'GET_DPJAMINAN_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                dataDpJaminan: action.payload.data.values
            }

        case 'GET_DPJAMINAN_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case 'GET_DPTABEMAS_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'GET_DPTABEMAS_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                dataDpEmas: action.payload.data.values
            }

        case 'GET_DPTABEMAS_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case 'GET_MIKRONASABAH_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'GET_MIKRONASABAH_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                dataMikroNasabah: action.payload.data.values
            }

        case 'GET_MIKRONASABAH_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case 'GET_PEGAWAINASABAH_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'GET_PEGAWAINASABAH_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                dataPegawaiNasabah: action.payload.data.values
            }

        case 'GET_PEGAWAINASABAH_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
            }

            case 'HAPUS_NASABAH_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'HAPUS_NASABAH_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                dataHapusNasabah: action.payload.data.values
            }

        case 'HAPUS_NASABAH_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
            }
            
        default:
            return state;
    }
}