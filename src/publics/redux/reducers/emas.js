const initialState = {
    dataEmas: [],
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

        default:
            return state;
    }
}