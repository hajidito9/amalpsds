import axios from 'axios';
import linkApi from './linkApi';

export const getEmas = (userid) => {
    return {
        type: 'GET_EMAS',
        payload : axios.get(linkApi.ip+'emas/user/'+userid)
    }
}