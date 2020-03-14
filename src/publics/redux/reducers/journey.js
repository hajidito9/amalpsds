const initialState = {
    dataJourney: [],
    isLoading: false,
    isFinish: false,
    isError: false,
}

export default journey = (state = initialState, action) => {
    switch (action.type) {

        case 'GET_JOURNEY_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'GET_JOURNEY_FULFILLED':
            // console.warn(action.payload.data)
            // console.log("data merk: "+action.payload.data)
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                dataJourney: action.payload.data.values
            }

        case 'GET_JOURNEY_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        default:
            return state;
    }
}