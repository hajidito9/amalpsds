const initialState = {
    dataEmas: [],
    dataDpEmas: [],
    dataKonversi: [],
    isLoading: false,
    isFinish: false,
    isError: false,
}

export default emas = (state = initialState, action) => {
    switch (action.type) {

        case 'GET_EMAS_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'GET_EMAS_FULFILLED':
            // console.log("data merk: "+action.payload.data)
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                dataEmas: action.payload.data.values
            }

        case 'GET_EMAS_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case 'KONVERSI_EMAS_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'KONVERSI_EMAS_FULFILLED':
            // console.warn("data konversi: "+JSON.stringify(action.payload.data))
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                dataKonversi: action.payload.data.values
            }

        case 'KONVERSI_EMAS_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case 'POST_DPEMAS_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'POST_DPEMAS_FULFILLED':
            // console.warn("data konversi: "+JSON.stringify(action.payload.data))
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                dataDpEmas: action.payload.data.values
            }

        case 'POST_DPEMAS_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        default:
            return state;
    }
}