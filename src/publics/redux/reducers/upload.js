const initialState ={
    dataUpload: [],
    isLoading: false,
    isFinish: false,
    isError: false,
}

export default upload = ( state = initialState, action) => {
    switch (action.type){
        
        case 'UPLOAD_PENDING':
            // console.warn('pending')
        return {
            ...state,
            isLoading: true
        }

        case 'UPLOAD_FULFILLED':
            // console.warn("link url: "+action.payload.data)
        return {
            ...state,
            isLoading: false,
            isFinish: true,
            dataUpload: action.payload.data
        }

        case 'UPLOAD_REJECTED':
            // console.warn('jadi error')
        return {
            ...state,
            isLoading: false,
            isError: true
        }

        default:
            return state;
    }
}