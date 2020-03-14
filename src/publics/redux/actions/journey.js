import axios from 'axios';
import linkApi from './linkApi';

export const getJourney = (user_id) => {
    return {
        type: 'GET_JOURNEY',
        payload : axios.get(linkApi.ip+'journey/'+user_id)
    }
}