const initialState = {
    dataCabang: [],
    isLoading: false,
    isFinish: false,
    isError: false,
}

export default cabang = (state = initialState, action) => {
    switch (action.type) {

        case 'GET_CABANG_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'GET_CABANG_FULFILLED':
            // console.warn(action.payload.data)
            // console.log("data merk: "+action.payload.data)
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                dataCabang: action.payload.data.values
            }

        case 'GET_CABANG_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case 'CARI_CABANG_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'CARI_CABANG_FULFILLED':
            // console.warn(action.payload.data)
            // console.log("data merk: "+action.payload.data)
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                dataCabang: action.payload.data.values
            }

        case 'CARI_CABANG_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        default:
            return state;
    }
}