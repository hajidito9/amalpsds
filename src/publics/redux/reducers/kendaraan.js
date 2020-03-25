const initialState = {
    dataMerk: [],
    dataList: [],
    dataWarna: [],
    dataDetailKendaraan: [],
    dataDetailMerk: [],
    dataKendaraanNasabah: [],
    dataHapusKendaraanNasabah: [],
    dataInputBpkb: [],
    isLoading: false,
    isFinish: false,
    isError: false,
}

export default kendaraan = (state = initialState, action) => {
    switch (action.type) {

        case 'GET_MERK_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'GET_MERK_FULFILLED':
            // console.log("data merk: "+action.payload.data)
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                dataMerk: action.payload.data.values
            }

        case 'GET_MERK_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case 'CARI_MERK_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'CARI_MERK_FULFILLED':
            // console.log("data merk: "+action.payload.data)
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                dataMerk: action.payload.data.values
            }

        case 'CARI_MERK_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case 'GET_LIST_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'GET_LIST_FULFILLED':
            // console.log("data merk: "+action.payload.data)
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                dataList: action.payload.data.values
            }

        case 'GET_LIST_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case 'CARI_TIPE_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'CARI_TIPE_FULFILLED':
            // console.log("data merk: "+action.payload.data)
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                dataList: action.payload.data.values
            }

        case 'CARI_TIPE_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case 'GET_WARNA_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'GET_WARNA_FULFILLED':
            // console.log("data merk: "+action.payload.data)
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                dataWarna: action.payload.data.values
            }

        case 'GET_WARNA_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case 'GET_DETAILKENDARAAN_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'GET_DETAILKENDARAAN_FULFILLED':
            // console.log("data merk: "+action.payload.data)
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                dataDetailKendaraan: action.payload.data.values
            }

        case 'GET_DETAILKENDARAAN_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case 'GET_DETAILMERK_PENDING':
            // console.log("data merk: "+action.payload.data)
            return {
                ...state,
                isLoading: true
            }

        case 'GET_DETAILMERK_FULFILLED':
            // console.log("data merk: " + action.payload.data)
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                dataDetailMerk: action.payload.data.values
            }

        case 'GET_DETAILMERK_REJECTED':
            // console.log("data merk: " + action.payload.data)
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case 'POST_KENDARAANNASABAH_PENDING':
            // console.log("data merk: "+action.payload.data)
            return {
                ...state,
                isLoading: true
            }

        case 'POST_KENDARAANNASABAH_FULFILLED':
            // console.log("data merk: " + action.payload.data)
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                dataKendaraanNasabah: action.payload.data.values
            }

        case 'POST_KENDARAANNASABAH_REJECTED':
            // console.log("data merk: " + action.payload.data)
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case 'INPUT_BPKB_PENDING':
            // console.log("data merk: "+action.payload.data)
            return {
                ...state,
                isLoading: true
            }

        case 'INPUT_BPKB_FULFILLED':
            // console.log("data merk: " + action.payload.data)
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                dataInputBpkb: action.payload.data.values
            }

        case 'INPUT_BPKB_REJECTED':
            // console.log("data merk: " + action.payload.data)
            return {
                ...state,
                isLoading: false,
                isError: true
            }

            case 'HAPUS_KENDARAAN_PENDING':
            // console.log("data merk: "+action.payload.data)
            return {
                ...state,
                isLoading: true
            }

        case 'HAPUS_KENDARAAN_FULFILLED':
            // console.log("data merk: " + action.payload.data)
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                dataHapusKendaraanNasabah: action.payload.data.values
            }

        case 'HAPUS_KENDARAAN_REJECTED':
            // console.log("data merk: " + action.payload.data)
            return {
                ...state,
                isLoading: false,
                isError: true
            }
            
        default:
            return state;
    }
}